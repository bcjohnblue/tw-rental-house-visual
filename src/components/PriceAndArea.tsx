import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Data } from '../interface';

type Props = {
  data: Data[];
};
const ABC: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(ref.current);

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {},
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            formatter: (value: string) => {
              const newLabel = value
                .split('')
                .map((word) => word + '\n')
                .join('');
              return newLabel;
            },
            lineHeight: 16
          }
        },
        {
          type: 'category',
          show: false
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '價格'
        },
        {
          type: 'value',
          name: '坪數',
          max: 60,
          min: 0,
          interval: 10,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      dataset: {
        dimensions: ['sub_region', 'monthly_price', 'floor_ping'],
        source: props.data
      },
      series: [
        {
          type: 'bar',
          name: '平均價格',
          barWidth: '40%',
          itemStyle: {
            color: '#729FD4'
          }
        },
        {
          type: 'scatter',
          name: '平均坪數',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: 'black'
          },
          markPoint: {
            data: [
              ...props.data.map((d) => ({
                name: d.sub_region,
                value: d.floor_ping,
                xAxis: d.sub_region,
                yAxis: d.floor_ping + 1.8,
                symbol: 'rect',
                symbolSize: [40, 25],
                itemStyle: {
                  color: 'transparent',
                  // borderColor: 'black',
                  borderWidth: 1,
                  borderCap: 'round'
                },
                label: {
                  color: 'black',
                  fontSize: 16
                }
              }))
            ]
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, [ref]);

  return (
    <div id="main" ref={ref} style={{ width: '1000px', height: '400px' }}></div>
  );
};

export default ABC;
