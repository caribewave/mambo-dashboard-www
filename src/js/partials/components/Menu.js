import React, {Component} from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ExtensionIcon from 'material-ui-icons/Extension';
import WorkIcon from 'material-ui-icons/Work';
import PollIcon from 'material-ui-icons/Poll';
import DraftsIcon from 'material-ui-icons/Drafts';
import SchoolIcon from 'material-ui-icons/School';
import StarIcon from 'material-ui-icons/Star';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
        <nav id="menu">
          <IconButton onClick={this.handleToggle} children={<i className="material-icons">menu</i>}/>
          <Drawer open={this.state.open} onClose={this.handleClose}>
              <span
                  tabIndex={0}
                  role="button"
                  onClick={this.handleToggle}
                  onKeyDown={this.handleToggle}>
                 <div style={{width: 250}}>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <AccountCircleIcon/>
                      </ListItemIcon>
                      <Link to={"aboutme"}><ListItemText primary={<FormattedMessage id="lbl.home"/>}/></Link>
                    </ListItem>
                  </List>
                   <Divider/>
                   <List>
                    <ListItem button>
                      <ListItemIcon>
                        <WorkIcon/>
                      </ListItemIcon>
                      <Link to={"work"}><ListItemText primary={<FormattedMessage id="lbl.work"/>}/></Link>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <ExtensionIcon/>
                      </ListItemIcon>
                      <Link to={"projects"}><ListItemText primary={<FormattedMessage id="lbl.projects"/>}/></Link>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <PollIcon/>
                      </ListItemIcon>
                      <Link to={"skills"}><ListItemText primary={<FormattedMessage id="lbl.skills"/>}/></Link>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <SchoolIcon/>
                      </ListItemIcon>
                      <Link to={"education"}><ListItemText primary={<FormattedMessage id="lbl.education"/>}/></Link>
                    </ListItem>
                   </List>
                   <Divider/>
                   <List>
                    <ListItem button>
                      <ListItemIcon>
                        <StarIcon/>
                      </ListItemIcon>
                      <Link to={"hobbies"}><ListItemText primary={<FormattedMessage id="lbl.hobbies"/>}/></Link>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <DraftsIcon/>
                      </ListItemIcon>
                      <Link to={"contact"}><ListItemText primary={<FormattedMessage id="lbl.contact"/>}/></Link>
                    </ListItem>
                  </List>
                 </div>
              </span>
          </Drawer>
        </nav>
    );
  }
}

// TypeChecking for properties
Menu.propTypes = {
  text: PropTypes.string
};

export default injectIntl(Menu);
