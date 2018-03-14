import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import './StylePickerComponent.scss';
import {Card, CardActions, CardContent, IconButton, Switch, Typography} from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/edit';


class SensorManagerComponent extends Component {

  render() {
    const sensorElements = this.props.sensors.map((sensor, i) => (
        <Card key={i} className="style-card">
          <CardContent className="style-card-container">
            <div className="style-data">
              <Typography variant="headline" component="h3">
                {sensor.label}
              </Typography>
              <Typography component="span">
                Source : {sensor.source}<br/>
                Type : {sensor.type}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Edit style">
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="Delete sensor" onClick={() => {
              this.props.onSensorDelete(sensor.label)
            }}>
              <DeleteIcon/>
            </IconButton>
            <Switch
                checked={sensor.activated}
                onChange={() => {
                  this.props.onSensorActivate(sensor.label, !sensor.activated)
                }}
                color="primary"
            />
          </CardActions>
        </Card>
    ));
    return (
        <div className={"style-grid"}>
          {sensorElements}
          <Card className="style-card" key={999} onClick={
            this.props.changeForCreate}>
            <CardContent
                className={"card-add-style"}>
              <Typography variant="headline" component="h2">
                Ajouter un sensor
              </Typography>
            </CardContent>
          </Card>
        </div>);
  };
}

export default injectIntl(SensorManagerComponent);
