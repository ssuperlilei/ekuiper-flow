import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';
import * as time from 'd3-time';
import { range, last } from 'lodash';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

const MyResponsiveLine = () => {
  const date = new Date();
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  const initData = range(100).map((i) => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 10 + Math.round(Math.random() * 20),
  }));
  const [data, setData] = useState(initData);
  const next = async () => {
    const res = await axios.get(`${apiConfig.url}/rules/ekuiper_flow_rule/status`);
    if (res.data.sink_mqtt_0_output_data !== '') {
      const sinkData = JSON.parse(res.data.sink_mqtt_0_output_data);
      console.log('y-axis', sinkData[0]['butterworth']);
      console.log('x-axis', sinkData[0]['timestamp']);
    }
    const _data = data.slice(1);
    _data.push({
      x: time.timeMinute.offset(last(data).x, 30),
      y: 10 + Math.round(Math.random() * 20),
    });
    setData(_data);
  };
  useEffect(() => {
    const interval = setInterval(next, 1000);
    return () => clearInterval(interval);
  }, [data]);
  return (
    <ResponsiveLine
      margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
      data={[{ id: 'lienData', data }]}
      xScale={{ type: 'time', format: 'native' }}
      yScale={{ type: 'linear', max: 50 }}
      axisTop={{
        format: '%H:%M',
        tickValues: 'every 4 hours',
      }}
      axisBottom={{
        format: '%H:%M',
        tickValues: 'every 4 hours',
        legend: '',
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
      enableSlices={'y'}
      useMesh={true}
      theme={{
        fontSize: '14px',
        textColor: '#fff',
        axis: { ticks: { text: { fontSize: 14 } } },
        grid: { line: { stroke: '#555b69', strokeDasharray: '1 2' } },
      }}
    />
  );
};

const LineChart = () => {
  const styles = {
    height: '400px',
    width: '800px',
  };
  return (
    <div id="line-chart" style={styles}>
      <MyResponsiveLine></MyResponsiveLine>
    </div>
  );
};

export default LineChart;
