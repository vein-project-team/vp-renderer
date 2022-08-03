<script lang="ts">
import * as echarts from 'echarts';
import { computed, ref, Ref, watch } from 'vue'

type EChartsOption = echarts.EChartsOption;

var chartDom = document.getElementById('main')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

// Each item: open，close，lowest，highest
const data0 = splitData([
  ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
  ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
  ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
  ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
  ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
  ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
  ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
  ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
  ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
  ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
  ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
  ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
  ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
  ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
  ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
  ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
  ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
  ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
  ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
  ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
  ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
  ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
  ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
  ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
  ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
  ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
  ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
  ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
  ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
  ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
  ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
  ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
  ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
  ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
  ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
  ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
  ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
  ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
  ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
  ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
  ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
  ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
  ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
  ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
  ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
  ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
  ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
  ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
  ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
  ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
  ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
  ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51]
]);

function splitData(rawData: (number | string)[][]) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}

function calculateMA(dayCount: number) {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data0.values[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}

// function init(this: any){
//   let myChart = this.$echarts.init(this.$refs.b)
//   let optionline = {
//     backgroundColor:'#f0f0f0',
//   }
// }

// methods:{
//   drawLine(){
//     let myChart = this.$echarts.init(this.$refs.b)
//     let optionline = {
//       backgroundColor:'#f0f0f0',
//     }
//   }
// }

// option = 
//   {
//   title: {
//     text: '上证指数',
//     left: 0
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross'
//     }
//   },
//   legend: {
//     data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
//     name:"日K"
//   },
//   grid: {
//     left: '10%',
//     right: '10%',
//     bottom: '15%'
//   },
//   xAxis: {
//     type: 'category',
//     data: data0.categoryData,
//     boundaryGap: false,
//     axisLine: { onZero: false },
//     splitLine: { show: false },
//     min: 'dataMin',
//     max: 'dataMax'
//   },
//   yAxis: {
//     scale: true,
//     splitArea: {
//       show: true
//     }
//   },
//   dataZoom: [
//     {
//       type: 'inside',
//       start: 50,
//       end: 100
//     },
//     {
//       show: true,
//       type: 'slider',
//       top: '90%',
//       start: 50,
//       end: 100
//     }
//   ],
//   series: [
//     {
//       name: '日K',
//       type: 'candlestick',
//       data: data0.values,
//       itemStyle: {
//         color: upColor,
//         color0: downColor,
//         borderColor: upBorderColor,
//         borderColor0: downBorderColor
//       },
//       markPoint: {
//         label: {
//           formatter: function (param: any) {
//             return param != null ? Math.round(param.value) + '' : '';
//           }
//         },
//         data: [
//           {
//             name: 'Mark',
//             coord: ['2013/5/31', 2300],
//             value: 2300,
//             itemStyle: {
//               color: 'rgb(41,60,85)'
//             }
//           },
//           {
//             name: 'highest value',
//             type: 'max',
//             valueDim: 'highest'
//           },
//           {
//             name: 'lowest value',
//             type: 'min',
//             valueDim: 'lowest'
//           },
//           {
//             name: 'average value on close',
//             type: 'average',
//             valueDim: 'close'
//           }
//         ],
//         tooltip: {
//           formatter: function (param: any) {
//             return param.name + '<br>' + (param.data.coord || '');
//           }
//         }
//       },
//       markLine: {
//         symbol: ['none', 'none'],
//         data: [
//           [
//             {
//               name: 'from lowest to highest',
//               type: 'min',
//               valueDim: 'lowest',
//               symbol: 'circle',
//               symbolSize: 10,
//               label: {
//                 show: false
//               },
//               emphasis: {
//                 label: {
//                   show: false
//                 }
//               }
//             },
//             {
//               type: 'max',
//               valueDim: 'highest',
//               symbol: 'circle',
//               symbolSize: 10,
//               label: {
//                 show: false
//               },
//               emphasis: {
//                 label: {
//                   show: false
//                 }
//               }
//             }
//           ],
//           {
//             name: 'min line on close',
//             type: 'min',
//             valueDim: 'close'
//           },
//           {
//             name: 'max line on close',
//             type: 'max',
//             valueDim: 'close'
//           }
//         ]
//       }
//     },
//     {
//       name: 'MA5',
//       type: 'line',
//       data: calculateMA(5),
//       smooth: true,
//       lineStyle: {
//         opacity: 0.5
//       }
//     },
//     {
//       name: 'MA10',
//       type: 'line',
//       data: calculateMA(10),
//       smooth: true,
//       lineStyle: {
//         opacity: 0.5
//       }
//     },
//     {
//       name: 'MA20',
//       type: 'line',
//       data: calculateMA(20),
//       smooth: true,
//       lineStyle: {
//         opacity: 0.5
//       }
//     },
//     {
//       name: 'MA30',
//       type: 'line',
//       data: calculateMA(30),
//       smooth: true,
//       lineStyle: {
//         opacity: 0.5
//       }
//     }
//   ]
// };

//option && myChart.setOption(option);

export default{
  name:'',
  data(){
    return{

    }
  },
  mounted(){
    this.drawLine()
  },
  methods:{
    drawLine(){
      let myCharts = this.$echarts.init(this.$refs.myChartsDom)
      myCharts.setOption({
        title: {
    text: '上证指数',
    left: 0
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    name:"日K"
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: data0.categoryData,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 50,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      top: '90%',
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: data0.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      markPoint: {
        label: {
          formatter: function (param: any) {
            return param != null ? Math.round(param.value) + '' : '';
          }
        },
        data: [
          {
            name: 'Mark',
            coord: ['2013/5/31', 2300],
            value: 2300,
            itemStyle: {
              color: 'rgb(41,60,85)'
            }
          },
          {
            name: 'highest value',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: 'lowest value',
            type: 'min',
            valueDim: 'lowest'
          },
          {
            name: 'average value on close',
            type: 'average',
            valueDim: 'close'
          }
        ],
        tooltip: {
          formatter: function (param: any) {
            return param.name + '<br>' + (param.data.coord || '');
          }
        }
      },
      markLine: {
        symbol: ['none', 'none'],
        data: [
          [
            {
              name: 'from lowest to highest',
              type: 'min',
              valueDim: 'lowest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              type: 'max',
              valueDim: 'highest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ],
          {
            name: 'min line on close',
            type: 'min',
            valueDim: 'close'
          },
          {
            name: 'max line on close',
            type: 'max',
            valueDim: 'close'
          }
        ]
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    }
  ]
      })
    }
  }
}

</script>


<template>
  <div id="myChart" ref="'myChartsDom'" style="width: 500px;height: 500px; box-sizing:border-box; line-height: 289px;">     
  </div>
</template>