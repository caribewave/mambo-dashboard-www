import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {PROPS_TYPE_STYLE} from "../constants";
import PropTypes from 'prop-types';


class AddStyleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {layerUrl: 'https://', layerType: "vectorial"};
  }

  static propTypes = {
    onStyleCreated: PropTypes.func,
  };

  handleSubmit = (event) => {
    this.props.onStyleCreated({url: this.state.layerUrl, layerType: this.state.layerType});
    event.preventDefault();
  };

  handleUrlChange = (event) => {
    this.setState({layerUrl: event.target.value});
  };

  handleOptionChange = (event) => {
    this.setState({layerType: event.target.value});
  };


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Ajouter un layer:
          <input type="text" value={this.state.layerUrl} onChange={this.handleUrlChange}/>
          <div className="radio">
            <label>
              <input type="radio" value="vectorial"
                     checked={this.state.layerType === 'vectorial'}
                     onChange={this.handleOptionChange}/>
              Vecto
            </label>
          </div>
        </label>
        <div className="radio">
          <label>
            <input type="radio" value="raster"
                   checked={this.state.layerType === 'raster'}
                   onChange={this.handleOptionChange}/>
            Raster
          </label>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default injectIntl(AddStyleComponent);
