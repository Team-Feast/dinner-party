// import React, { Component } from 'react';

// class UserTest extends Component {
//   render() {
//     return (
//       <div>
//        <button className='delete-button' onClick={() => window.alert("YOU CLICKED THIS") } >
//         Click ME!
//       </button>
//       </div>
//     );
//   }
// }

// export default UserTest;

import React from 'react'
import {render} from 'react-dom'
import {toClass} from 'recompose'
import addDays from 'date-fns/add_days'
import DPDialog from 'material-ui/DatePicker'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



import {saveDate} from '../../store/user'



const Dialog = (props) => (
  <MuiThemeProvider>
    <div>
      <DPDialog
        id="dialog"
        ref={c => (window.elem = c)}
        style={{display: 'none'}}
        minDate={addDays(new Date(), 1)}
        onChange={(e, c) => props.saveDate(e,c)}
        defaultDate={addDays(new Date(), 1)}
        onDismiss={c => console.log('dismissed')}
      />;
      <button type="submit" onClick={() => window.elem.openDialog()}>
        Open
      </button>
    </div>
  </MuiThemeProvider>
)

const mapDispatch = dispatch => ({
  saveDate: (date, param2) => dispatch(saveDate(date, param2))
})

export default connect(null, mapDispatch)(Dialog)
