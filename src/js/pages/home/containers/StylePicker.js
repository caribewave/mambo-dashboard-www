import {changeMapStyle, editLayer, deleteLayer, uploadMBTiles} from '../../../actions/style';
import {loadLayers} from '../../../actions/style';
import {createLayer, showLayer} from '../../../actions/style';
import {openMapLayersPopup} from '../../../actions/style';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './StylePicker.scss';
import React, {Component} from 'react';
import StylePickerComponent from '../components/StylePickerComponent';
import LayerEditionComponent from '../components/AddStyleComponent';
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
    this.props.openMapLayersPopup(false);
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
            layers={this.props.layers}
            onLayerSelectionChanged={this.props.changeMapStyle}
            onLayerEdit={this.changeForEdition}
            onLayerCreate={this.changeForCreation}
            onLayerDelete={this.props.deleteLayer}
            onLayerShow={this.props.showLayer}
          />
          {
            this.state.showForm ? <LayerEditionComponent action={this.state.isEdition ? this.props.editLayer : this.props.createLayer} secondaryAction={this.props.uploadMBTiles} edit={this.state.isEdition} style={this.state.styleEdit}/> : null
          }
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  layers: state.style.layers,
  open: state.style.popupOpen,
  selectedStyle: state.style.selectedStyle,
});

const actions = {
  changeMapStyle,
  editLayer,
  deleteLayer,
  loadLayers,
  createLayer,
  openMapLayersPopup, 
  uploadMBTiles,
  showLayer
};

export default connect(mapStateToProps, actions)(StylePicker)