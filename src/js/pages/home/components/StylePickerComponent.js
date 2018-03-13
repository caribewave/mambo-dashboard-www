import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';
import './StylePickerComponent.scss';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/edit';
import Switch from 'material-ui/Switch';


class StylePickerComponent extends Component {

  static propTypes = {
    layers: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    onLayerSelected: PropTypes.func,
    onLayerCreate: PropTypes.func,
    onLayerEdit: PropTypes.func,
    onLayerDelete: PropTypes.func,
    onLayerShow: PropTypes.func
  };

  btnTapped = (style) => {
    this.props.onLayerSelected(style);
  };

  render() {
    const styleElements = this.props.layers.map((style, i) =>
      (
        <Card className="style-card" key={i} onClick={() => {
          this.btnTapped(style);
        }}>
          <CardContent
            className={"style-card-container " + (style.meta.display ? "style-selected" : "style-unselected")}>
            <div className="style-image">
              <div className="image-wrapper">
                <img src="http://localhost:8081/maps/osm/6/33/22.png"/>
              </div>
              <div className="image-unselected-overlay"/>
            </div>
            <div className="style-data">
              <Typography variant="headline" component="h3">
                {style.meta.label}
              </Typography>
              <Typography component="span">
                Source : {"" + style.meta.source}<br/>
                Type : {"" + style.meta.type}<br/>
                Proxy : {"" + style.meta.proxy}<br/>
                Vector : {"" + style.meta.vector}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Edit style" onClick={() => {
              this.props.onLayerEdit(style);
            }}>
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="Delete style" onClick={() => {
              this.props.onLayerDelete(style.meta.name);
            }}>
              <DeleteIcon/>
            </IconButton>
            <Switch
                checked={style.meta.display}
                onChange={() => {this.props.onLayerShow(style.meta.name, !style.meta.display)}}
                color="primary"
            />
          </CardActions>
        </Card>
      )
    );

    return (
      <div className={"style-grid"}>
        {styleElements}
        <Card className="style-card" key={999} onClick={
          this.props.onLayerCreate}>
          <CardContent
            className={"card-add-style"}>
            <Typography variant="headline" component="h2">
              Ajouter un style
            </Typography>
          </CardContent>
        </Card>
      </div>);
  };
}

export default injectIntl(StylePickerComponent);
