import {changeMapStyle} from '../actions';
import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import {connect} from 'react-redux';

class StylePicker extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(style) {
    changeMapStyle(style)
  }

  render() {
    return (
      <StylePickerComponent
        styleSelected={this.style}
        onStyleSelected={this.onClick}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  style: state.style,
  onStyleSelected: ownProps.onStyleSelected
});


export default connect(mapStateToProps, {changeMapStyle})(StylePicker)