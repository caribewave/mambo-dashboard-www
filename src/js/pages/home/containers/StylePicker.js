import {changeMapStyle} from '../../../actions/style';
import {loadLayers} from '../../../actions/style';
import {createStyle} from '../../../actions/style';
import {toggleMapStyle} from '../../../actions/style';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import AddStyleComponent from '../components/AddStyleComponent';
import {connect} from 'react-redux';

class StylePicker extends Component {

  componentDidMount() {
    this.props.loadLayers();
  }

  handleClose = () => {
    this.props.toggleMapStyle(false);
  };


  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Set map style</DialogTitle>
          <div>
            <StylePickerComponent
              styles={this.props.styles}
              selectedStyle={this.props.selectedStyle}
              onStyleSelected={this.props.changeMapStyle}
            />
            <AddStyleComponent onStyleCreated={this.props.createStyle}/>
          </div>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  styles: state.style.styles,
  open: state.style.popupOpen,
  selectedStyle: state.style.selectedStyle,
});

const actions = {changeMapStyle, loadLayers, createStyle, toggleMapStyle};

export default connect(mapStateToProps, actions)(StylePicker)