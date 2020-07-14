# nuxt 中使用 echarts

## 安装

``` shell
npm install echarts --save
```

## 在 plugins 目录下创建 echarts. js

``` js
import Vue from 'vue'
import Echarts from 'echarts'

Vue.prototype.$echarts = Echarts
```

## 配置 nuxt. config. js

``` js
plugins: ['~/plugins/echarts']
```

## 使用

``` html
<template>
    <div id="echarts" style="width:400px;height: 300px"></div>
</template>

<script>
    export default {
        mounted() {
            let vm = this
            vm.getEcharts()
        },
        methods: {
            getEcharts() {
                let vm = this
                let myEchart = vm.$echarts.init(document.getElementById('echarts'))
                let option = {
                    title: 'echarts',
                    xAxis: {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 5]
                    }]
                }

                myEchart.setOption(option)
            }
        }
    }
</script>
```
