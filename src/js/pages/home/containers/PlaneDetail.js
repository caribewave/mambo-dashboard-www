import Card, {CardContent} from 'material-ui/Card';
import React, {Component} from 'react';
import './PlaneDetail.scss';
import {connect} from 'react-redux';
import {selectPlane} from "../../../actions/mapData";
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';

class PlaneDetail extends Component {

  onPlaneDeselect = () => {
    this.props.selectPlane(null);
  };

  render() {
    return (
      this.props.selectedPlane
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
              detail POI : {this.props.selectedPlane && this.props.selectedPlane._id}
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

const actions = {selectPlane};

export default connect(mapStateToProps, actions)(PlaneDetail)