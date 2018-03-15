import Dialog, {DialogTitle} from 'material-ui/Dialog';
import './SensorManager.scss';
import React, {Component} from 'react';
import SensorManagerComponent from '../components/SensorManagerComponent';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import AddSensorComponent from '../components/AddSensorComponent';
import {
  activateSensor,
  createSensor,
  deleteSensor,
  editSensor,
  loadAllSensors,
  openSensorManagerPopin
} from "../../../actions/sensor";

class SensorManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdition: false,
      sensorEdit: null,
      showForm: false
    };
  }

  handleClose = () => {
    this.props.openSensorManagerPopin(false);
    this.setState({isEdition: false, sensorEdit: null, showForm: false});
  };

  componentDidMount() {
  }

  onSensorActivate = (label, activated) => {
    this.props.activateSensor(label, activated);
  };

  onSensorDelete = (label) => {
    this.props.deleteSensor(label);
  };

  changeForCreate = () => {
    this.setState({isEdition: false, sensorEdit: null, showForm: true});

  };


  changeForEdit = (sensor) => {
    this.setState({isEdition: true, sensorEdit: sensor, showForm: true});
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
                onSensorDelete={this.onSensorDelete}
                changeForCreate={this.changeForCreate}
                changeForEdit={this.changeForEdit}
            />
            {
              this.state.showForm ? <AddSensorComponent
                  action={this.state.isEdition ? this.props.editSensor : this.props.createSensor}
                  edit={this.state.isEdition} sensor={this.state.sensorEdit}/> : null
            }
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
  deleteSensor,
  editSensor,
  createSensor
};

export default connect(mapStateToProps, actions)(SensorManager)