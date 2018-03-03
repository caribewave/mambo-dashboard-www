import {changeMapStyle} from '../../../actions/style';
import {loadLayers} from '../../../actions/style';

import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import {connect} from 'react-redux';

class StylePicker extends Component {

  componentDidMount() {
    this.props.loadLayers();
  }

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

const actions = {changeMapStyle, loadLayers};

export default connect(mapStateToProps, actions)(StylePicker)