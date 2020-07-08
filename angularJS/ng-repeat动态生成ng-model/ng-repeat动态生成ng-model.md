# ng-repeat 动态生成 ng-model

## html
```js
<div ng-repeat="item in items">
    <span>{{item}}</span>    
    <input type="text" ng-model="$parent.arr[index]">
</div> 
```

## controller
```js
$scope.arr = []

```

*参考连接:  https://blog.csdn.net/itfootball/article/details/51455839 * 