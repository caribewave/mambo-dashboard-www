import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import './AddStyleComponent.scss';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui-icons/Done';
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';

class StyleEditionComponent extends Component {
  constructor(props) {
    super(props);

    if (this.props.edit) {
      this.state = Object.assign({"originalName": this.props.style.meta.name}, this.props.style.meta);
    } else {
      this.state = {
        label: "",
        type: "adsb",
        source: "",
        activated: false
      };
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    let sensor = {
      label: this.state.label,
      type: this.state.type,
      source: this.state.source,
      activated: this.state.activated
    };

    this.props.action(sensor);
    event.preventDefault();
  };

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
                    required
                    onChange={this.handleChange}
                    name="label"
                    label="Label"
                    value={this.state.label}
                    margin="normal"
                />
              </FormControl>
              <FormControl
                  className={"layer-add-input"}>
                <TextField
                    required
                    onChange={this.handleChange}
                    name="source"
                    label="Source"
                    value={this.state.source}
                    margin="normal"
                />
              </FormControl>
              <FormControl
                  className={"layer-add-input"}>
                <InputLabel htmlFor="type"> Type</InputLabel>
                <Select
                    value={this.state.type}
                    onChange={this.handleChange}
                >
                  <MenuItem value="adsb">ADSB</MenuItem>
                  <MenuItem value="mbtiles">Local MBTiles file</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                  className={"layer-add-input"}>
                <Switch
                    checked={this.state.activated}
                    onChange={() => {
                      this.setState({activated : !this.state.activated});
                    }}
                    color="primary"
                />
              </FormControl>
            </div>
            <div className={"add-layer-btn"}>
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
