import React, { Component } from 'react';
import { range, last } from 'lodash';
import { ResponsiveLine } from '@nivo/line';
import * as time from 'd3-time';
import { timeFormat } from 'd3-time-format';

class RealTimeChart extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    this.state = {
      dataA: range(100).map((i) => ({
        x: time.timeMinute.offset(date, i * 30),
        y: 10 + Math.round(Math.random() * 20),
      })),
    };

    this.formatTime = timeFormat('%Y %b %d');
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.next();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  next() {
    const dataA = this.state.dataA.slice(1);
    dataA.push({
      x: time.timeMinute.offset(last(dataA).x, 30),
      y: 10 + Math.round(Math.random() * 20),
    });
    this.setState({ dataA });
  }

  render() {
    const { dataA } = this.state;

    const commonProperties = {
      margin: { top: 20, right: 20, bottom: 60, left: 80 },
      animate: true,
      enableSlices: 'x',
    };

    return (
      <ResponsiveLine
        {...commonProperties}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        data={[{ id: 'A', data: dataA }]}
        xScale={{ type: 'time', format: 'native' }}
        yScale={{ type: 'linear', max: 50 }}
        axisTop={{
          format: '%H:%M',
          tickValues: 'every 4 hours',
        }}
        axisBottom={{
          format: '%H:%M',
          tickValues: 'every 4 hours',
          legend: `${this.formatTime(dataA[0].x)} ——— ${this.formatTime(last(dataA).x)}`,
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisRight={{}}
        enablePoints={false}
        enableGridX={true}
        curve="monotoneX"
        animate={false}
        motionStiffness={120}
        motionDamping={50}
        isInteractive={false}
        enableSlices={false}
        useMesh={true}
        theme={{
          axis: { ticks: { text: { fontSize: 14 } } },
          grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
        }}
      />
    );
  }
}

export default RealTimeChart;
