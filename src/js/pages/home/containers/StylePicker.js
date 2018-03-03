import {changeMapStyle} from '../../../actions/style';

import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import {connect} from 'react-redux';
import {PROPS_TYPE_STYLE} from "../constants";

class StylePicker extends Component {

  //todo call to get styles when they are in server


  render() {
    return (
      <StylePickerComponent
        styles={this.props.styles}
        selectedStyle={this.props.selectedStyle}
        onStyleSelected={this.props.changeMapStyle}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  styles: state.style.styles,
  selectedStyle: state.style.selectedStyle,
});

const actions = {changeMapStyle};

export default connect(mapStateToProps, actions)(StylePicker)