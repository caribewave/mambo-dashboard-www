import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';
import './StylePickerComponent.scss';
import Card, {CardContent, CardMedia} from 'material-ui/Card';


class StylePickerComponent extends Component {

  static propTypes = {
    styles: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    selectedStyle: PROPS_TYPE_STYLE,
    onStyleSelected: PropTypes.func,
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
              {this.props.selectedStyle && style.label}
            </div>
          </CardContent>
        </Card>
      )
    );

    return (
      <div className={"style-grid"}>
        {styleElements}
      </div>);
  };
}

export default injectIntl(StylePickerComponent);
