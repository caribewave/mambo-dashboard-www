import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import './SppedChartComponent.scss';
import {Brush, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {PROPS_POI, PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';
import moment from "moment";

class CustomTooltip extends Component {
  static propTypes = {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.number,
  };

  render() {
    const {active} = this.props;

    if (active) {
      const {payload, label} = this.props;
      return (
        <div className="custom-tooltip">
          <p className="time">altitude : {label}</p>
          <p className="speed">altitude : {payload[1].value}</p>
          <p className="altitude">altitude : {payload[2].value}</p>
        </div>
      );
    }

    return null;
  }
};


class SpeedChartComponent extends Component {
  static propTypes = {
    selectedPlane: PropTypes.arrayOf(PROPS_POI),
  };

  constructor(props) {
    super(props);
  };

  // options={chartOptions}
  render() {
    let data = [];

    const dateFormat = (time) => {
      return moment(time).format('HH:mm');
    };


    function tooltipContent(tooltipProps) {
      console.log(tooltipProps);
      return <div>items: {tooltipProps.payload.length}</div>
    }

    this.props.selectedPlane.forEach((point) => {
      let date = new Date(Date.parse(point.updated_at));
      data.unshift({
        time: date.getTime(),
        speed: point.speed,
        altitude: point.altitude,
      });
    });


    return (
      <div className="chart">
        <ComposedChart width={300} height={150} data={data} margin={{top: 10, right: 20, left: 0, bottom: 0}}>
          <XAxis dataKey="time" height={60} tickFormatter={dateFormat}/>
          <YAxis yAxisId="left"/>
          <YAxis yAxisId="right" orientation='right'/>
          <Tooltip />
          <Legend/>
          <CartesianGrid/>
          <Line yAxisId="left" type='linear' dataKey='speed' stroke='#41527D' strokeWidth={1}/>
          <Line yAxisId="right" type='linear' dataKey='altitude' stroke='#F70D1C' strokeWidth={1}/>
        </ComposedChart>
      </div>);
  }

}

export default injectIntl(SpeedChartComponent);
