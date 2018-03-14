import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './StylePicker.scss';
import React, {Component} from 'react';
import SensorManagerComponent from '../components/SensorManagerComponent';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
  activateSensor,
  deleteSensor,
  loadAllSensors,
  openSensorManagerPopin
} from "../../../actions/sensor";

class SensorManager extends Component {

  constructor(props) {
    super(props);
  }

  handleClose = () => {
    this.props.openSensorManagerPopin(false);
  };

  componentDidMount() {
  }

  onSensorActivate = (label, activated) => {
    this.props.activateSensor(label, activated);
  };

  onDelete = (label) => {
    this.props.deleteSensor(label);
  };

  render() {
    return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                onEnter={this.props.loadAllSensors}
                open={this.props.open} maxWidth={false}>
          <DialogTitle id="simple-dialog-title">
            <FormattedMessage id="lbl.sensorManagerTitle"/>
          </DialogTitle>
          <div>
            <SensorManagerComponent
                sensors={this.props.sensors}
                onSensorActivate={this.onSensorActivate}
                onDelete = {this.onDelete}
            />
          </div>
        </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  open: state.sensor.popupOpen,
  sensors: state.sensor.sensors
});

const actions = {
  openSensorManagerPopin,
  loadAllSensors,
  activateSensor,
  deleteSensor
};

export default connect(mapStateToProps, actions)(SensorManager)