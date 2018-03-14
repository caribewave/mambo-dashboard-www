import Card, {CardContent} from 'material-ui/Card';
import React, {Component} from 'react';
import './PlaneDetail.scss';
import {connect} from 'react-redux';
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
      this.props.selectedPlane && this.props.selectedPlane[0]
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
              Avion : {this.props.selectedPlane[0].hex}<br/><br/>
              Altitude : {this.props.selectedPlane[0].altitude}<br/>
              category: {this.props.selectedPlane[0].altitude}<br/>
              hex : {this.props.selectedPlane[0].altitude}<br/>
              Position :<br/>
                  Latitude  : {this.props.selectedPlane[0].location.coordinates[0]}<br/>
                  Longitude : {this.props.selectedPlane[0].location.coordinates[1]}<br/>
              Messages  : {this.props.selectedPlane[0].messages}<br/>
              Seen : {this.props.selectedPlane[0].seen}<br/>
              Seen_pos : {this.props.selectedPlane[0].seen_pos}<br/>
              Speed : {this.props.selectedPlane[0].speed}<br/>
              Squawk : {this.props.selectedPlane[0].squawk}<br/>
              Update : <br/>
              {this.props.selectedPlane[0].updated_at}<br/>
              Vert_rate : {this.props.selectedPlane[0].vert_rate}<br/>
              <SpeedChartComponent/>
            </CardContent>
          </Card>
        </div>
        :
        null
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedPlane: state.mapData.selectedPlane
});

const actions = {openMapLayersPopup};

export default connect(mapStateToProps, actions)(PlaneDetail)