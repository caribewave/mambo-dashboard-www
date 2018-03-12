import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import './AddStyleComponent.scss';
import LineChart from "react-chartjs";


class SpeedChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [[1, 1], [2, 2]],
      type: "proxy",
      source: "http://your.tile.server/{z}/{x}/{y}.png",
      retina: false,
      vector: false
    };
  }

  // options={chartOptions}
  render() {
    return (null
    );
  }
}

//<LineChart data={this.props.chartData} />


export default injectIntl(SpeedChartComponent);
