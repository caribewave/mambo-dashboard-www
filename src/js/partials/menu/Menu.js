import React, {Component} from 'react';
import './Menu.scss';
import {FormattedMessage, injectIntl} from 'react-intl';
import IconButton from 'material-ui/IconButton';
import MaterialMenu, {MenuItem} from 'material-ui/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
import {ListItemText} from 'material-ui/List';
import {connect} from "react-redux";
import {openSensorManagerPopin} from '../../actions/sensor';
import {openMapLayersPopup} from '../../actions/style';


const options = [
  {label: "lbl.map"},
  {label: "lbl.sensors"}
];

const ITEM_HEIGHT = 48;


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  openItem = (option) => {
    switch (option.label){
      case "lbl.map" :
        this.props.openMapStylePopup(true);
        this.setState({anchorEl: null});
        break;
      case "lbl.sensors" :
        this.props.openSensorManagerPopin(true);
        break;
    }
  };

  render() {
    const {anchorEl} = this.state;

    return (
      <div className="menu-wrapper">
        <div className="menu-btn">
        <IconButton
          id="menu-btn"
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <SettingsIcon/>
        </IconButton>

        <MaterialMenu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map((option, i) => (
            <MenuItem key={i} onClick={() => this.openItem(option)}>
              <ListItemText primary={<FormattedMessage id={option.label}/>}/>
            </MenuItem>
          ))}
        </MaterialMenu>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const actions = {openMapLayersPopup, openSensorManagerPopin};

export default connect(mapStateToProps, actions)(Menu)