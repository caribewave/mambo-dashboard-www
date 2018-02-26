import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';


class StylePickerComponent extends Component {

  static propTypes = {
    styles: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    selectedStyle: PROPS_TYPE_STYLE,
    onStyleSelected: PropTypes.func,
  };

  btnTapped = (style) => {
    this.props.onStyleSelected(style);
  };

  render() {
    const styleElements = this.props.styles.map((style, i) =>
      (
        <div className="style" key={i}
             style={{
               width: 100, height: 50, backgroundColor: 'grey', textAlign: 'center', marginTop: 10
             }}
             onClick={() => {
               this.btnTapped(style);
             }}
        >{this.props.selectedStyle && this.props.selectedStyle.text === style.text ? style.text + "x" : style.text} </div>)
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'space-between', marginTop: '30px'
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'space-between', marginTop: '30px'
          }}
        >
          {styleElements}
        </div>
      </div>);

  };
}

export default injectIntl(StylePickerComponent);
