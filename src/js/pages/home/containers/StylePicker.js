import {changeMapStyle} from '../../../actions/style';
import {loadLayers} from '../../../actions/style';
import {createStyle} from '../../../actions/style';
import {openMapStylePopup} from '../../../actions/style';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './StylePicker.scss';
import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import AddStyleComponent from '../components/AddStyleComponent';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {FormattedMessage, injectIntl} from 'react-intl';

class StylePicker extends Component {

  componentDidMount() {
    this.props.loadLayers();
  }

  handleClose = () => {
    this.props.opneMapStyle(false);
  };


  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="lbl.stylePickerTitle"/>
        </DialogTitle>
        <div>
          <StylePickerComponent
            styles={this.props.styles}
            selectedStyle={this.props.selectedStyle}
            onStyleSelected={this.props.changeMapStyle}
          />
          <Button aria-label="Add" color="primary" variant="fab">
            <AddIcon onClick={
              this.onPlaneDeselect
            }/>
          </Button>
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

const actions = {changeMapStyle, loadLayers, createStyle, opneMapStyle: openMapStylePopup};

export default connect(mapStateToProps, actions)(StylePicker)