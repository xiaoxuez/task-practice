import React from 'react';

import ControllerSignal from '../../controller/signals';

export default class JobRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initailState(props);
  }

  componentWillMount() {
    // when the group selected or deselected
    ControllerSignal.NavMainGroupSectionSelect.add(this.checkedChangeBySection);
    //when the group fold
    !this.props.section && ControllerSignal.NavMainGroupFolder.add(this.groupFoder);
  }

  componentWillUnmount() {
    ControllerSignal.NavMainGroupSectionSelect.remove(this.checkedChangeBySection);
    !this.props.section && ControllerSignal.NavMainGroupFolder.remove(this.groupFoder);
  }

  initailState(props) {
    return {
      checked: props.checked || false,
      folded: false,
    }
  }

  groupFoder = (folded, sectionId) => {
    if (this.props.sectionId === sectionId) {
      this.setState({folded: folded});
    }
  }

  checkedChangeBySection = (sectionId, checked) => {
    if (sectionId === -1) {
      this.setState({
        checked: false,
      })
    }else if (sectionId === this.props.sectionId) {
      this.setState({
        checked: checked,
      })
    }
  }

  changeCheckedState() {
    let checked = !this.state.checked;
    this.setState({
      checked: checked,
    })
    const {section, sectionId} = this.props;
    if (section) {
      ControllerSignal.NavMainGroupSectionSelect.dispatch(sectionId, checked);
    }
  }

  handerFolder() {
    let folded = this.state.folded ? false : true;
    this.setState({
      folded: folded,
    })
    ControllerSignal.NavMainGroupFolder.dispatch(folded, this.props.sectionId);
  }

  render() {
    const {name, number, section} = this.props;
    let rowStyle = section ? Style.rowStyleSection : (this.state.folded ? Style.disappare : Style.rowStyleRow);
    let nameStyle = section ? Style.nameStyleSection : null;
    let numberStyle = section ? Style.numberStyleSection : null;
    return (
      <div className='nav-main-row' style={rowStyle}>
        <input type='checkbox'  checked={this.state.checked} onClick={this.changeCheckedState.bind(this)}></input>
        <span className='job-row-name' style={nameStyle}>{name}</span>
        {section ? <a className='handler' onClick={this.handerFolder.bind(this)}>{this.state.folded ? '打开' : '收起'}</a> : null}
        <span className='job-row-number' style={numberStyle}>{number}</span>
      </div>
    )
  }
}

var Style = {
  rowStyleSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  rowStyleRow: {
    marginLeft: 20,
  },
  nameStyleSection: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600'
  },
  numberStyleSection: {
    borderRadius: 20,
    backgroundColor: '#405763',
  },
  disappare: {
    display: 'none',
  }
}
