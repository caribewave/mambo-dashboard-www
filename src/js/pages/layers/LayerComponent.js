import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../home/constants";
import PropTypes from 'prop-types';
import './LayerSettingsComponent.scss';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import Switch from 'material-ui/Switch';

class LayerComponent extends Component {

  static propTypes = {
    onLayerCreate: PropTypes.func,
    onLayerEdit: PropTypes.func,
    onLayerDelete: PropTypes.func,
    onLayerShow: PropTypes.func
  };

  render() {
    return <Card className="style-card" key={this.props.key}>
              <CardContent
                  className={"style-card-container " + (this.props.style.meta.display ? "style-selected" : "style-unselected")}>
                <div className="style-image">
                  <div className="image-wrapper">
                    <img src={"images/" + (this.props.style.meta.type === 'proxy' ? 'proxy.jpg' : 'database.jpg')}/>
                  </div>
                  <div className="image-unselected-overlay"/>
                </div>
                <div className="style-data">
                  <Typography variant="headline" component="h3">
                    {this.props.style.meta.label}
                  </Typography>
                  <Typography component="span">
                    Type : {"" + this.props.style.meta.type}
                  </Typography>
                </div>
              </CardContent>
              <CardActions disableActionSpacing>
                <IconButton aria-label="Edit style" onClick={() => {
                  this.props.onLayerEdit(this.props.style);
                }}>
                  <EditIcon/>
                </IconButton>
                <IconButton aria-label="Delete style" onClick={() => {
                  this.props.onLayerDelete(this.props.style.meta.name);
                }}>
                  <DeleteIcon/>
                </IconButton>
                <Switch
                    checked={this.props.style.meta.display}
                    onChange={() => {this.props.onLayerShow(this.props.style.meta.name, !this.props.style.meta.display)}}
                    color="primary"
                />
              </CardActions>
            </Card>
  };
}

export default injectIntl(LayerComponent);
