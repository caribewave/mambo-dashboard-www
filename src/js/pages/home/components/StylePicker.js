import React, {Component} from 'react';
import { injectIntl} from 'react-intl';
import {STYLE} from "../constants";


const Style = ({style}) => {
  return (<a href="#" className="style" >{style.text}</a>);
};

const StyleList = ({styles}) => {
  // Map through the todos
  const styleElement = styles.map((style) => {
    return (<Style style={style} />)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{styleElement}</div>);
};

class StylePicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyleList
        styles={STYLE}
      />
    );
  }
}

export default injectIntl(StylePicker);
