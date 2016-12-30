import React from 'react';

import ControllerSignal from '../../controller/signals';

export default class JobRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initailState(props);
  }

  componentWillMount() {
    ControllerSignal.NavMainGroupSectionSelect.add(this.checkedChangeBySection);
  }

  componentWillUnmount() {
    ControllerSignal.NavMainGroupSectionSelect.remove(this.checkedChangeBySection);
  }

  initailState(props) {
    return {checked: props.checked || false}
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

  render() {
    const {name, number} = this.props;
    return (
      <div>
        <input type="checkbox"  checked={this.state.checked} onClick={this.changeCheckedState.bind(this)}></input>
        <span className='job-row-name'>{name}</span>
        <span>{number}</span>
      </div>
    )
  }
}
