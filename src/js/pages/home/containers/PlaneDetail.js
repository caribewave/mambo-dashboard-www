import Card, {CardContent} from 'material-ui/Card';
import React, {Component} from 'react';
import './PlaneDetail.scss';
import {connect} from 'react-redux';
import moment from 'moment';
import {openMapLayersPopup} from "../../../actions/mapData";
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import SpeedChartComponent from '../components/SpeedChartComponent';

class PlaneDetail extends Component {

  onPlaneDeselect = () => {
    this.props.openMapLayersPopup();
  };

  render() {
    return (
      this.props.selectedGeom && this.props.selectedGeom[0]
        ?
        <div className="plane-detail-panel">
          <Card className="plane-detail-container">
            <CardContent>
              <div className="close-detail">
                <IconButton aria-label="Delete" className="close-detail">
                  <ClearIcon onClick={
                    this.onPlaneDeselect
                  }/>
                </IconButton>
              </div>
              Avion : {this.props.selectedGeom[0].hex}<br/><br/>
              Flight : {this.props.selectedGeom[0].flight}<br/>
              Altitude : {this.props.selectedGeom[0].altitude}<br/>
              category: {this.props.selectedGeom[0].category}<br/>
              hex : {this.props.selectedGeom[0].hex}<br/>
              Latitude : {this.props.selectedGeom[0].location.coordinates[0]}<br/>
              Longitude : {this.props.selectedGeom[0].location.coordinates[1]}<br/>
              Messages : {this.props.selectedGeom[0].messages}<br/>
              Seen : {this.props.selectedGeom[0].seen}<br/>
              Seen_pos : {this.props.selectedGeom[0].seen_pos}<br/>
              Speed : {this.props.selectedGeom[0].speed}<br/>
              Squawk : {this.props.selectedGeom[0].squawk}<br/>

              {this.props.aircraftInfo ?
                <span>
              regid : {this.props.aircraftInfo.regid}<br/>
              mdl : {this.props.aircraftInfo.mdl}<br/>
              type : {this.props.aircraftInfo.type}<br/>
              last update : {moment(this.props.selectedGeom[0].updated_at).fromNow()}<br/>
              </span>
                : null}
              Vert_rate : {this.props.selectedGeom[0].vert_rate}<br/>
              <SpeedChartComponent planePoints={this.props.selectedGeom}/>
            </CardContent>
          </Card>
        </div>
        :
        null
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedGeom: state.mapData.selectedGeom.data,
  aircraftInfo: state.mapData.selectedGeom.aircraftInfo
});

const actions = {openMapLayersPopup};

export default connect(mapStateToProps, actions)(PlaneDetail)