import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import './AddStyleComponent.scss';
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

class StyleEditionComponent extends Component {
  constructor(props) {
    super(props);

    if (this.props.edit) {
      this.state = Object.assign({"originalName": this.props.style.meta.name}, this.props.style.meta);
    } else {
      this.state = {
        label: "My Layer",
        name: "my-layer",
        type: "proxy",
        source: "http://your.tile.server/{z}/{x}/{y}.png",
        retina: false,
        vector: false
      };
    }
  }

  static propTypes = {
    action: PropTypes.func.isRequired,
    secondaryAction: PropTypes.func.isRequired,
    edit: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  handleSubmit = (event) => {
    let style = {
      meta: {
        "name": this.state.name.normalize('NFD').replace(/[\u0300-\u036f\s]/g, ""),
        "label": this.state.name,
        "type": this.state.type,
        "source": this.state.type === "proxy" ? this.state.source : null,
        "retina": this.state.retina,
        "vector": this.state.vector
      }
    };
    this.props.action(style).then(() => {
      this.props.secondaryAction(style.meta.name, this.state.mbtiles);
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
          className={"layer-upload-btn"}>
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
              style={{ display: 'none' }}
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
          className={"layer-add-source"}>
        <TextField
            name="source"
            label="Layer source"
            value={this.state.source}
            onChange={this.handleChange}
            margin="normal"/>
      </FormControl>,
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
          className={"layer-add-input"}
          label="Retina"
      />
    ]
  }

  render() {
    return (
        <form className={"form-add-layer"}>
          <Typography variant="headline" component="h2">
            Create a layer
          </Typography>
          <div className={"form-add-layer-input-container"}>
            <div className={"style-row"}>
              <FormControl
                  className={"layer-add-input"}>
                <TextField
                    name="label"
                    label="Label"
                    value={this.state.label}
                    onChange={this.handleChange}
                    margin="normal"
                />
              </FormControl>
              <FormControl
                  className={"layer-add-input"}>
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
                  className={"layer-add-input"}>
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
            <div className={"style-row"}>
              {(this.state.type === "proxy") && this.renderProxyType()}
              {(this.state.type === "mbtiles") && this.renderMBTilesType()}
            </div>
            <div className={"add-layer-submit-btn"}>
              <Button aria-label="Add" color="primary" variant="fab" onClick={this.handleSubmit}>
                <DoneIcon/>
              </Button>
            </div>
          </div>
        </form>
    );
  }
}

export default injectIntl(StyleEditionComponent);
