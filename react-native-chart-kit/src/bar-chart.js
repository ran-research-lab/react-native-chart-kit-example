import React from 'react'
import { View } from 'react-native'
import {
  Svg,
  Rect,
  G
} from 'react-native-svg'
import AbstractChart from './abstract-chart'

const barWidth = 32

// 
// RIO: These are BARS in the barchart
// 
class BarChart extends AbstractChart {
  renderBars = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    console.log("DATA: " + JSON.stringify(data) );
    return data.map((x, i) => {
      const barWidth = height / 4 * 3 * ((x) / this.calcScaler(data))
      const barHeight = (height-paddingTop)/(data.length + 2);
      return (
        <Rect
          key={Math.random()}
          y={(paddingTop + (i * (barHeight * 1.1)))}
          x={paddingRight * 1.2} 
          height={barHeight}
          width={barWidth}

          fill='red'//"url(#fillShadowGradient)"
        />)
    })
  }

  renderBarTops = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return data.map((x, i) => {
      const barHeight = height / 4 * 3 * ((x - Math.min(...data)) / this.calcScaler(data))
      return (
        <Rect
          key={Math.random()}
          x={(paddingRight + (i * (width - paddingRight) / data.length)) + (barWidth / 2)}
          y={(((height / 4 * 3) - barHeight) + paddingTop)}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />)
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = 64
    const { width, height, data, style = {} } = this.props
    const { borderRadius = 0 } = style
    const config = {
      width,
      height
    }
    return (
      <View style={style}>
        <Svg
          height={height}
          width={width}
        >
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"/>
            <G>
          {this.renderHorizontalLines({
            ...config,
            count: 4,
            paddingTop
          })}</G>
          {/* <G>
          {this.renderHorizontalLabels({
            ...config,
            count: 4,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          </G> */}
          <G>
          {this.renderVerticalLabels({
            ...config,
            labels: data.labels,
            paddingRight,
            paddingTop,
            horizontalOffset: barWidth
          })}
          </G>
          <G>
          {this.renderBars({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          </G>
          {/* <G>
          {this.renderBarTops({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight
          })}
          </G> */}
        </Svg>
      </View>
    )
  }
}

export default BarChart
