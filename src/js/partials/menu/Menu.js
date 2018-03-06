import React, {Component} from 'react';
import './Menu.scss';
import {FormattedMessage, injectIntl} from 'react-intl';
import IconButton from 'material-ui/IconButton';
import MaterialMenu, {MenuItem} from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import {ListItemText} from 'material-ui/List';
import {connect} from "react-redux";
import {toggleMapStyle} from '../../actions/style';


const options = [
  {label: "lbl.home"},
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

  openItem = event => {
    this.setState({anchorEl: null});
    this.props.toggleMapStyle(true);
  };

  render() {
    const {anchorEl} = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon/>
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
            <MenuItem key={i} onClick={this.openItem}>
              <ListItemText primary={<FormattedMessage id={option.label}/>}/>
            </MenuItem>
          ))}
        </MaterialMenu>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const actions = {toggleMapStyle};

export default connect(mapStateToProps, actions)(Menu)