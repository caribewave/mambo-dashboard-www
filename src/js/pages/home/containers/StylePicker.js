import {changeMapStyle, editMapStyle, deleteMapStyle} from '../../../actions/style';
import {loadLayers} from '../../../actions/style';
import {createStyle} from '../../../actions/style';
import {openMapStylePopup} from '../../../actions/style';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './StylePicker.scss';
import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import AddStyleComponent from '../components/AddStyleComponent';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

class StylePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdition: false,
      styleEdit: null,
      showForm: false
    };
  }

  componentDidMount() {
    this.props.loadLayers();
  }

  handleClose = () => {
    this.props.openMapStylePopup(false);
  };

  changeForEdition = (style) => {
    this.setState({isEdition: true, styleEdit: style, showForm: true});
  };

  changeForCreation = () => {
    this.setState({isEdition: false, styleEdit: null, showForm: true});
  };


  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} maxWidth={false}>
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="lbl.stylePickerTitle"/>
        </DialogTitle>
        <div>
          <StylePickerComponent
            styles={this.props.styles}
            selectedStyle={this.props.selectedStyle}
            onStyleSelected={this.props.changeMapStyle}
            onStyleEdit={this.changeForEdition}
            onStyleCreate={this.changeForCreation}
            onStyleDelete={this.props.deleteMapStyle}
          />
          {
            this.state.showForm ? <AddStyleComponent onStyleCreated={this.props.createStyle}/> : null
          }
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

const actions = {
  changeMapStyle,
  editMapStyle,
  deleteMapStyle,
  loadLayers,
  createStyle,
  openMapStylePopup
};

export default connect(mapStateToProps, actions)(StylePicker)