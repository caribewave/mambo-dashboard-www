import {changeMapLayers, editLayer, uploadMBTiles} from '../../actions/style';
import {createLayer} from '../../actions/style';
import {PROPS_TYPE_STYLE} from "../home/constants";
import PropTypes from 'prop-types';
import {openLayersEditionPopup} from '../../actions/style';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import './LayerEditionDialog.scss';
import React, {Component} from 'react';
import LayerEditionComponent from './LayerEditionComponent';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

class LayerEditionDialog extends Component {
  
  constructor(props) {
    super(props);
  }
  
  handleClose = () => {
    this.props.openLayersEditionPopup(false);
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} maxWidth={false} className="layer-edition-dialog">
        <DialogTitle id="layer-edition-dialog__title">
          <FormattedMessage id={this.props.editMode === 'edit' ? "lbl.layerEdition.EditTitle" : "lbl.layerEdition.CreateTitle"}/>
        </DialogTitle>
        <LayerEditionComponent 
            action={(this.props.editMode === 'edit') ? this.props.editLayer : this.props.createLayer} 
            secondaryAction={this.props.uploadMBTiles} 
            closeAction={() => this.props.openLayersEditionPopup(false)}
            edit={this.props.editMode === 'edit'}
            layer={this.props.layerToEdit}
        />
        <div className={this.props.errorMessage ? "layer-edition-dialog__error" : "layer-edition-dialog__error layer-edition-dialog__hidden"}>
          <FormattedMessage id={(this.props.errorMessage && this.props.errorMessage.message) ? "lbl.layerEdition.error." + this.props.errorMessage.message : "lbl.error.unknown"}/>
        </div>
        <CircularProgress size={48} className={this.props.loading ? "layer-edition-dialog__progress" : "layer-edition-dialog__progress layer-edition-dialog__hidden"} />
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  open: state.style.editPopupOpen,
  editMode: state.style.editMode,
  layerToEdit: state.style.layerToEdit,
  loading: state.style.loading,
  errorMessage: state.style.layerEditionError
});

const actions = {
  changeMapLayers,
  editLayer,
  createLayer,
  openLayersEditionPopup, 
  uploadMBTiles
};

export default connect(mapStateToProps, actions)(LayerEditionDialog)