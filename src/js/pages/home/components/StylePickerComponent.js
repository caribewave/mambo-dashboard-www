import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';
import './StylePickerComponent.scss';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import LayerComponent from './LayerComponent';

class StylePickerComponent extends Component {

  static propTypes = {
    layers: PropTypes.arrayOf(PROPS_TYPE_STYLE),
    onLayerCreate: PropTypes.func,
    onLayerEdit: PropTypes.func,
    onLayerDelete: PropTypes.func,
    onLayerShow: PropTypes.func
  };

  btnTapped = (style) => {
    //FIXME this.props.onLayerSelected(style);
  };

  render() {
    const styleElements = this.props.layers.map((style, i) =>
        (
            <LayerComponent
                style={style}
                key={i}
                onLayerEdit={this.props.onLayerEdit}
                onLayerCreate={this.props.onLayerCreate}
                onLayerDelete={this.props.onLayerDelete}
                onLayerShow={this.props.onLayerShow}
            />
        )
    );

    return (
        <div className={"style-grid"}>
          {styleElements}
          <Card className="style-card" key={999} onClick={
            this.props.onLayerCreate}>
            <CardContent
                className={"card-add-style"}>
              <div className={"add-layer-btn"}>
                <Button aria-label="Add" color="primary" variant="fab" onClick={this.handleSubmit}>
                  <AddIcon/>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>);
  };
}

export default injectIntl(StylePickerComponent);
