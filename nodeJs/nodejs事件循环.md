# nodejs 事件循环

## 示意图
┌───────────────────────┐
┌─>│ timers │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
│ │ I/O callbacks │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
│ │ idle, prepare │
│ └──────────┬────────────┘ ┌───────────────┐
│ ┌──────────┴────────────┐ │ incoming: │
│ │ poll │<──connections─── │
│ └──────────┬────────────┘ │ data, etc. │
│ ┌──────────┴────────────┐ └───────────────┘
│ │ check │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
└──┤ close callbacks │
└───────────────────────┘

## node 中的事件循环顺序

**外部数据输入 --> 轮询阶段(poll) --> 检查阶段(check) --> 关闭事件回调阶段(close callbacks) --> 定时器检测阶段(timer) --> I/O 事件回调阶段(I/O callbacks) --> 闲置阶段(idle, prepare) --> 轮询阶段(poll) --> ...**

## 循环各个阶段的大致功能
  + timers: 执行定时器队列中的回调, 如 setTimeout() 和 setInterval()
  + I/O callbacks: 执行几乎所有的回调, 但是不包括close 事件, 定时器 和 setImmediate()的回调
  + idle, prepare: 仅内部使用, 不必理会
  + poll: 等待新的 I/O 事件, node 会在一定条件下阻塞在此阶段
  + check: 执行 setImmediate() 的回调
  + close callbacks: 执行例如 socket.on('close', ...) 这种 close 事件

## 按照第一次进入 libuv 引擎顺序详细解读

#### poll 阶段

当 v8 引擎解析 js 代码传入 libuv 引擎后, 循环首先进入 poll 阶段, poll 阶段执行逻辑如下:
 + 先检查 poll 队列中是否有任务, 有任务就按照先进先出的顺序执行回调
 + 当 poll 队列为空时, 会检查是否有 setImmediate 的回调, 如果有就进入 check 阶段执行这些回调, 同时检查是否有到期的 timer 回调, 如果有按照顺序添加到 timer 队列中, 之后循环会进入到 timer 阶段执行队列中的回调
 + 上一条两者的顺序是不固定的, 受到代码运行环境的影响
 + 如果两者队列都是空的, 那么 loop 会在poll 阶段停留, 直到有一个 I/O 事件返回, 循环会进入到 I/O callback 阶段, 并立即执行这个时间的 callback
 + poll 阶段在执行 poll 队列中的回调时不会无限的执行下去, 有两种情况会中止
     + 所有回调执行完毕
    + 执行数超过了 node 的限制

#### check 阶段
check 阶段专门执行 setImmediate() 的回调, 当poll 阶段进入空闲状态, 并且 setImmediate 队列中有callback 时, 事件循环进入此阶段

#### close 阶段
当一个 socket 连接或 handle 被突然关闭时(例如调用了socket.destroy()方法), close 方法会被发送到这个阶段执行回调, 否则事件会用 process.nextTick() 发送出去

#### timer 阶段
这个阶段以先进先出的顺序执行所有到期的 timer 加入 timer 队列中的callback, 一个 timer callback 指 setTimeout() 或 setInterval() 设置的回调

#### I/O callback 阶段
这个阶段主要执行大部分 I/O 事件的回调, 包括一些为操作系统设置的回调, 例如一个 TCP 连接发生错误时, 系统需要执行回调获取这个错误的内容

## process.nextTick(), setTimeout() 和 setImmediate()
这三种都是推迟任务执行的方法
### process.nextTick()

node 中存在一个特殊队列: nextTick 队列, 这个队列中的回调执行虽然没有被表示为一个阶段, 但这些事件会在一个阶段执行完毕进入下一个队列之前优先执行. 当事件循环进入下一个队列之前会先检测 nextTick 队列中是否有任务, 如果有, 会先清空这个队列， 与 poll 阶段不同的是, 这个操作在队列清空前不会停止, 也就是说错误的使用   process.nextTick() 会导致 node 进入死循环， 直到内存泄露