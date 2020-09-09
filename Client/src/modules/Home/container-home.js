import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import Home from './Home'
import config from "../../config";
import {
    showAlertNotify,
    showSuccessNotify,
    showFailNotify
} from "../Notify/action-notify";
import { updateUser, pending } from "./action-home";
import { withRouter } from 'react-router';

class HomeContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.createAccount = this.createAccount.bind(this)
        this.child = React.createRef()

        if (localStorage.getItem("user")) {
            this.props.history.push('/votes');
        }

    }

    //render
    render() {

        return (
            <Home
                login={this.login}
                home={this.props.home}
                createAccount={this.createAccount}
                ref={this.child} />
        );
    }

    login(userLogin) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/user/login", userLogin)
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }
                    this.props.pending(false)
                    return;
                }

                this.child.current.handleCloseLoginModal();
                let user = res.data.result.user;
                this.props.updateUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("privateKey", userLogin.privateKey)
                this.props.pending(false)
                this.child.current.clearFormLogin()
                this.props.history.push("/wallet");

            })
            .catch(err => {
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            });
    }


    createAccount(userCreate) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/user", userCreate)
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }

                    this.props.pending(false)
                    return;
                }

                this.props.showSuccessNotify("Create account successfully!\nPlease keep your private-key below for later login:\n" + res.data.result.privateKey)
                this.child.current.handleCloseCreateAccountModal()
                this.props.pending(false)
                this.child.current.clearFormCreateAccount()

            })
            .catch(err => {
                console.log(err)
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            });
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
        //show alert dialog
        showAlertNotify(msg) {
            return dispatch(showAlertNotify(msg));
        },

        //show fail dialog
        showFailNotify(msg) {
            return dispatch(showFailNotify(msg));
        },

        //show alert dialog
        showSuccessNotify(msg) {
            return dispatch(showSuccessNotify(msg));
        },

        updateUser(user) {
            return dispatch(updateUser(user));
        },

        pending(state) {
            return dispatch(pending(state));
        }
    };

};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));