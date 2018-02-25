import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {STYLE} from "../constants";
import PropTypes from 'prop-types';


class StylePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.btnTapped = this.btnTapped.bind(this);
  }

  btnTapped(style) {
   this.props.onStyleSelected(style);
  }

  render() {
    const styleElement = STYLE.map((style, i) => {
      const self = this;
      return (<div className="style" key={i}
                   style={{
                     width: 100, height: 50, backgroundColor: 'grey', textAlign: 'center', marginTop: 10
                   }}
                   onClick={() => {
                     self.btnTapped({style});
                   }}
      >{style.text}</div>);
    });

    return (
      <div style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', marginTop: '30px'
      }}>
        <div style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between', marginTop: '30px'
        }}>{styleElement}</div>
      </div>);

  }
}

StylePickerComponent.propTypes = {
  onStyleSelected: PropTypes.func,
};

export default injectIntl(StylePickerComponent);
