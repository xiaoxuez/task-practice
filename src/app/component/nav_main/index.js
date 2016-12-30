import React from 'react';


import NavList from '../../data/nav_main_data';
import JobRow from './job_row';
import ControllerSignal from '../../controller/signals';

export default class extends React.Component {

  clearSelected() {
    ControllerSignal.NavMainGroupSectionSelect.dispatch(-1);
  }

  render() {
    let renderChildRow = function(groups, target) {
      return(
        <ul>
          {groups.map((child, index) => {
            return (
              <li key={`nav main child ${index}`}><JobRow name={child.name} number={child.number} sectionId={target}/></li>
            )
          })}
        </ul>
      )
    }
    return (
      <div className='nav-main'>
        <div className='nav-main-title'>
          <h3>招聘职位</h3>
          <span className='title-clear' onClick={this.clearSelected.bind(this)}>清空</span>
        </div>
        <ul>
          {NavList.map((heading, index) => {
            return(
              <li key={`nav main heading ${index}`}><JobRow name={heading.name} number={heading.number} sectionId={index} section/>
                {heading.children ? renderChildRow(heading.children, index) : null}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
