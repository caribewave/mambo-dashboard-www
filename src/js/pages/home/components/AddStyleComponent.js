import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import './AddStyleComponent.scss';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui-icons/Done';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormControlLabel, FormGroup} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

class AddStyleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "My Layer",
      type: "proxy",
      source: "http://your.tile.server/{z}/{x}/{y}.png",
      retina: false,
      vector: false
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
    console.log("handlechange");
    if (event.target.name === "isVector") {
      if (event.target.value) {
        this.setState({vector: true, retina: false});
      } else {
        this.setState({vector: false });
      }
      return;
    }
    if (event.target.name === "isRetina") {
      console.log(event.target);
      this.setState({retina: event.target.checked});
    }
  };


  render() {
    return (
      <form className={"addLayer"}>
        <TextField
          id="source"
          label="Layer source"
          value={this.state.source}
          onChange={this.handleUrlChange}
          margin="normal"
        />

        <FormControl>
          <InputLabel htmlFor="vector-picker">Source type</InputLabel>
          <Select
            value={this.state.vector}
            onChange={this.handleOptionChange}
            inputProps={{
              id: 'vector-picker',
              name: 'isVector',
            }}
          >
            <MenuItem value={true}>Vector</MenuItem>
            <MenuItem value={false}>Raster</MenuItem>
          </Select>
        </FormControl>

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.retina}
                disabled={this.state.vector}
                onChange={this.handleOptionChange}
                name="isRetina"
              />
            }
            label="Retina"
          />
        </FormGroup>

        <Button aria-label="Add" color="primary" variant="fab" onClick={this.handleSubmit}>
          <DoneIcon/>
        </Button>
      </form>
    );
  }
}

export default injectIntl(AddStyleComponent);
