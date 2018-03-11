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


class StylePickerComponent extends Component {

  static propTypes = {
    styles: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    selectedStyle: PROPS_TYPE_STYLE,
    onStyleSelected: PropTypes.func,
    onStyleCreate: PropTypes.func,
    onStyleEdit: PropTypes.func,
    onStyleDelete: PropTypes.func
  };

  btnTapped = (style) => {
    this.props.onStyleSelected(style);
  };

  render() {
    const styleElements = this.props.styles.map((style, i) =>
      (
        <Card className="style-card" key={i} onClick={() => {
          this.btnTapped(style);
        }}>
          <CardContent
            className={"style-card-container " + (this.props.selectedStyle && this.props.selectedStyle.name === style.name ? "style-selected" : "style-unselected")}>
            <div className="style-image">
              <div className="image-wrapper">
                <img src="http://localhost:8081/maps/osm/6/33/22.png"/>
              </div>
              <div className="image-unselected-overlay"/>
            </div>
            <div className="style-data">
              <Typography variant="headline" component="h3">
                {style.label}
              </Typography>
              <Typography component="span">
                Source : {"" + style.source}<br/>
                Type   : {"" + style.type}<br/>
                Proxy  : {"" + style.proxy}<br/>
                Vector : {"" + style.vector}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Edit style" onClick={() => {
              this.props.onStyleEdit(style);
            }}>
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="Delete style" onClick={() => {
              this.props.onStyleDelete(style);
            }}>
              <DeleteIcon/>
            </IconButton>
          </CardActions>
        </Card>
      )
    );

    return (
      <div className={"style-grid"}>
        {styleElements}
        <Card className="style-card" key={999} onClick={
          this.props.onStyleCreate}>
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
