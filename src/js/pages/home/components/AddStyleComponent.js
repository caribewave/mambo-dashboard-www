import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';
import './AddStyleComponent.scss';

class AddStyleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "name": "My Layer",
        "type": "proxy",
        "source": "http://your.tile.server/{z}/{x}/{y}.png",
        "retina": false,
        "vector": false
    };
  }

  static propTypes = {
    onStyleCreated: PropTypes.func,
  };

  handleSubmit = (event) => {
      let style = {
          "name": this.state.name.normalize('NFD').replace(/[\u0300-\u036f\s]/g, ""),
          "label": this.state.name,
          "type": "proxy", // TODO support more formats!
          "source": this.state.source,
          "retina": this.state.retina,
          "vector": this.state.vector
      };
    this.props.onStyleCreated(style);
    event.preventDefault();
  };

  handleUrlChange = (event) => {
    this.setState({source: event.target.value});
  };

  handleOptionChange = (event) => {
    switch (event.target.value) {
      case "vector":
        this.setState({vector: true, retina: false});
        break;
      case "raster":
        this.setState({vector: false});
        break;
      case "retina":
          this.setState({retina: true});
          break;
    }
  };


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add Layer:
          <input type="text" value={this.state.source} onChange={this.handleUrlChange}/>
        </label>
        <div className="layer-type-container">
          <div className="layer-type">
              <label>
                  <input type="radio" value="vector"
                         checked={this.state.vector}
                         onChange={this.handleOptionChange}/>
                  Vector
              </label>
          </div>
            <div className="layer-type">
                <label>
                    <input type="radio" value="raster"
                           checked={!this.state.vector}
                           onChange={this.handleOptionChange}/>
                    Raster
                </label>
            </div>
            <div className="layer-type">
                <label>
                    <input type="checkbox"
                           value="retina"
                           checked={this.state.retina}
                           disabled={this.state.vector}
                           onChange={this.handleOptionChange}/>
                    Retina
                </label>
            </div>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default injectIntl(AddStyleComponent);
