import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import './LayerEditionComponent.scss';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui-icons/Done';
import FileUpload from 'material-ui-icons/FileUpload';
import {InputLabel} from 'material-ui/Input';
import {FormControl, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

class LayerEditionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = this.computeDefaultForm(this.props);
  }

  computeDefaultForm(props) {
    let defaultForm;
    if (props.edit && props.layer) {
      defaultForm = Object.assign({"originalName": props.layer.meta.name}, props.layer.meta);
    } else {
      defaultForm = {
        label: "My Layer",
        name: "my-layer",
        type: "proxy",
        source: "http://your.tile.server/{z}/{x}/{y}.png",
        retina: false,
        vector: false
      };
    }
    return defaultForm;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.layer !== this.props.layer) {
      this.setState(this.computeDefaultForm(newProps));
    }
  }

  static propTypes = {
    action: PropTypes.func.isRequired,
    secondaryAction: PropTypes.func.isRequired,
    edit: PropTypes.bool.isRequired,
    layer: PropTypes.object,
    closeAction: PropTypes.func.isRequired
  };

  handleSubmit = (event) => {
    let layer = {
      meta: {
        "name": this.state.name.normalize('NFD').replace(/[\u0300-\u036f\s]/g, ""),
        "label": this.state.label,
        "type": this.state.type,
        "source": this.state.type === "proxy" ? this.state.source : null,
        "retina": this.state.retina,
        "vector": this.state.vector
      }
    };
    this.props.action(layer).then((result) => {
      if (layer.meta.type === "mbtiles") {
        this.props.secondaryAction(layer.meta.name, this.state.mbtiles).then((result) => {
          this.props.closeAction();
        });  
      } else {
        this.props.closeAction();
      }
    });
    event.preventDefault();
  };

  handleChange = (event) => {
    switch (event.target.name) {
      case "name":
      case "label":
      case "type":
        this.setState({[event.target.name]: event.target.value});
        break;
      case "source":
        this.setState({
          ["" + event.target.name]: event.target.value
        });
        break;
      case "vector":
        if (event.target.value === "true") {
          this.setState({vector: true, retina: false});
        } else {
          this.setState({vector: false});
        }
        break;
      case "retina":
        this.setState({retina: event.target.checked});
        break;
    }
  };

  openFileDialog = () => {
    let fileUploadDom = document.getElementById("mbtiles-upload-button");
    fileUploadDom.click();
  };

  renderMBTilesType = () => {
    return [
      <FormControl
          key="vector"
          className={"layer-add-input"}>
        <InputLabel htmlFor="is-vector">Source type</InputLabel>
        <Select
            value={"" + this.state.vector}
            onChange={this.handleChange}
            inputProps={{
              id: 'is-vector',
              name: 'vector',
            }}>
          <MenuItem value="true">Vector</MenuItem>
          <MenuItem value="false">Raster</MenuItem>
        </Select>
      </FormControl>,
      <div
          key="upload"
          className={"layer-edition-component__upload-btn"}>
        <Button variant="raised"
                color="default"
                onClick={this.openFileDialog}
                key="upload">
          Upload
          <FileUpload/>
          <input
              id="mbtiles-upload-button"
              name="mbtiles"
              onChange={e => this.setState({mbtiles: e.target.files[0]})}
              style={{display: 'none'}}
              type="file"
          />
        </Button>
      </div>

    ];
  };

  renderProxyType() {
    return [
      <FormControl
          key="source"
          className={"layer-edition-component__source"}>
        <TextField
            name="source"
            label="Layer source"
            value={this.state.source}
            onChange={this.handleChange}
            margin="normal"/>
      </FormControl>,
      <FormControl
          key="vector"
          className={"layer-edition-component__input"}>
        <InputLabel htmlFor="is-vector">Source type</InputLabel>
        <Select
            value={"" + this.state.vector}
            onChange={this.handleChange}
            inputProps={{
              id: 'is-vector',
              name: 'vector',
            }}>
          <MenuItem value="true">Vector</MenuItem>
          <MenuItem value="false">Raster</MenuItem>
        </Select>
      </FormControl>,
      <FormControlLabel
          key="retina"
          control={
            <Checkbox
                checked={this.state.retina}
                disabled={this.state.vector}
                onChange={this.handleChange}
                id="is-retina"
                name="retina"
            />}
          className={"layer-edition-component__input"}
          label="Retina"
      />
    ]
  }

  render() {
    return (
        <div className="layer-edition-component">
          <form>
            <div className={"layer-edition-component__input-container"}>
              <div className={"layer-edition-component__style-row"}>
                <FormControl
                    className={"layer-edition-component__input"}>
                  <TextField
                      name="label"
                      label="Label"
                      value={this.state.label}
                      onChange={this.handleChange}
                      margin="normal"
                  />
                </FormControl>
                <FormControl
                    className={"layer-edition-component__input"}>
                  <TextField
                      name="name"
                      label="Name"
                      disabled={this.props.edit}
                      value={this.state.name}
                      onChange={this.handleChange}
                      margin="normal"
                  />
                </FormControl>
                <FormControl
                    className={"layer-edition-component__input"}>
                  <InputLabel htmlFor="source-type">Source type</InputLabel>
                  <Select
                      value={this.state.type}
                      onChange={this.handleChange}
                      inputProps={{
                        id: 'source-type',
                        name: 'type',
                      }}>
                    <MenuItem value="proxy">Tile Proxy</MenuItem>
                    <MenuItem value="mbtiles">Local MBTiles file</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={"layer-edition-component__style-row"}>
                {(this.state.type === "proxy") && this.renderProxyType()}
                {(this.state.type === "mbtiles") && this.renderMBTilesType()}
              </div>
              <div className={"layer-edition-component__submit-btn"}>
                <Button aria-label="Add" color="primary" variant="fab" onClick={this.handleSubmit}>
                  <DoneIcon/>
                </Button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default injectIntl(LayerEditionComponent);
