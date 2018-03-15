import {changeMapLayers, deleteLayer, uploadMBTiles} from '../../actions/style';
import {loadLayers} from '../../actions/style';
import {openLayersEditionPopup, showLayer} from '../../actions/style';
import {openMapLayersPopup} from '../../actions/style';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './LayerSettingsDialog.scss';
import React, {Component} from 'react';
import LayerSettingsComponent from './LayerSettingsComponent';
import LayerEditionDialog from './LayerEditionDialog';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import { CircularProgress } from 'material-ui/Progress';

class LayerSettingsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
  }

  componentDidMount() {
    this.props.loadLayers();
  }

  handleClose = () => {
    this.props.openMapLayersPopup(false);
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open || false} maxWidth={false} className="layer-settings-dialog">
        <DialogTitle id="layer-settings-dialog__title">
          <FormattedMessage id="lbl.layerSettings.Title"/>
        </DialogTitle>
        <div>
          <LayerSettingsComponent
            layers={this.props.layers}
            onLayerSelectionChanged={this.props.changeMapStyle}
            onLayerEdit={(layer) => this.props.openLayersEditionPopup(true,layer)}
            onLayerCreate={() => this.props.openLayersEditionPopup(true)}
            onLayerDelete={this.props.deleteLayer}
            onLayerShow={this.props.showLayer}
          />
          <LayerEditionDialog/>
        </div>
        <CircularProgress size={48} className={this.props.loading ? "layer-settings-dialog__progress" : "layer-settings-dialog__progress layer-settings-dialog__hidden"} />
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  layers: state.style.layers,
  open: state.style.popupOpen,
  selectedLayer: state.style.selectedLayer,
  loading: state.style.loading
});

const actions = {
  changeMapLayers,
  openLayersEditionPopup,
  deleteLayer,
  loadLayers,
  openMapLayersPopup, 
  uploadMBTiles,
  showLayer
};

export default connect(mapStateToProps, actions)(LayerSettingsDialog)