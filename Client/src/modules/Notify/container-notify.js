import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notify from './Notify'
import { showAlertNotify, showSuccessNotify, closeNotify } from './action-notify'

class NotifyContainer extends Component {

  //render
  render() {
    return (
      <Notify
          msg={this.props.msg}
          typeNotify={this.props.typeNotify}
          showAlertNotify={this.props.showAlertNotify}
          showSuccessNotify={this.props.showSuccessNotify}
          closeNotify={this.props.closeNotify}
        />
    );
  }

}

//map state to props
function mapStateToProps(state) {
  return {
    msg: state.notify.msg,
    typeNotify: state.notify.typeNotify
  };

}

//map dispatch to props
function mapDispatchToProps(dispatch) {
  return {

    //show alert notify with message: msg
    showAlertNotify: (msg) => {
      return dispatch(showAlertNotify(msg));
    },

    //show successful notify with message: msg
    showSuccessNotify: (msg) => {
      return dispatch(showSuccessNotify(msg));
    },

    //close current notify
    closeNotify: () => {
      return dispatch(closeNotify());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NotifyContainer)