import React, { Component } from 'react';

class UserTest extends Component {
  render() {
    return (
      <div>
       <button className='delete-button' onClick={() => window.alert("YOU CLICKED THIS") } >
        Click ME!
      </button>
      </div>
    );
  }
}

export default UserTest;
