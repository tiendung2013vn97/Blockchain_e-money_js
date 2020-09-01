import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Pending.scss'


class PendingContainer extends Component {

  //render
  render() {
    let display = this.props.home.pending ? "block" : "none"
    return (
      <div className='pending-container' style={{display}}>
        <div className="waiting-container">
          <div className="loader"></div>
          <div className="waiting-text">Waiting...</div>
        </div>

      </div>

    );
  }

}

//map state to props
function mapStateToProps(state) {
  return {
    home: state.home
  };

}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PendingContainer)