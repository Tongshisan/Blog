# echarts 饼图默认高亮

需求: 饼图默认高亮第一条数据, 鼠标移入某一块, 取消其他高亮, 鼠标移出时高亮最后悬停的块

``` html
...
<div id="test"></div>
...

<script>
    let echart = echarts.init(document.getElementById('test'))

    let option = {
        ...
    }

    echart.setOption(option)

    // 默认高亮饼图的第一条数据
    echart.dispatchAction({
        type: 'highlight',
        dataIndex: 0
    })

    // 检测鼠标悬停事件
    echart.on('mouseover', (e) => {
        // 鼠标划入取消整个系列所有高亮
        echart.dispatchAction({
            type: 'downplay',
            seriesIndex: e.seriesIndex
        })
        // 然后高亮鼠标悬停的那块
        echart.dispatchAction({
            type: 'highlight',
            dataIndex: e.dataIndex
        })
    })

    // 检测鼠标移除事件
    echart.on('mouseout', (e) => {
        // 鼠标移除取消整个系列所有高亮
        echart.dispatchAction({
            type: 'downplay',
            seriesIndex: e.seriesIndex
        })
        // 然后高亮鼠标最后悬停的那块
        echart.dispatchAction({
            type: 'highlight',
            dataIndex: e.dataIndex
        })
    })
</script>
```
