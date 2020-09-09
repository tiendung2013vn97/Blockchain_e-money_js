import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import Wallet from './Wallet'
import config from "../../config";
import {
    showAlertNotify,
    showSuccessNotify,
    showFailNotify
} from "../Notify/action-notify";
import { updateBalance, updateHistory } from "./action-wallet";
import { pending } from "../Home/action-home";
import { withRouter } from 'react-router';

class HomeContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.getBalance = this.getBalance.bind(this);

        let user = localStorage.getItem("user")
        if (user) {
            this.getBalance()
            this.getHistory()
        }

    }

    //render
    render() {

        return (
            <Wallet
                wallet={this.props.wallet}
                getHistory={this.getHistory.bind(this)}
                getBalance={this.getBalance.bind(this)}
                sendMoney={this.sendMoney.bind(this)}
            />
        );
    }

    getBalance() {
        let userId = JSON.parse(localStorage.getItem("user")).userId
        const api = axios.create({ baseURL: config.URL });
        api
            .get("api/wallet/" + encodeURIComponent(userId))
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }
                    return;
                }


                this.props.updateBalance(res.data.result);

            })
            .catch(err => {
                this.props.showAlertNotify("An error has happened when get balance:\n" + err);
            });
    }

    getHistory() {
        let userId = JSON.parse(localStorage.getItem("user")).userId
        const api = axios.create({ baseURL: config.URL });
        api
            .get("api/wallet/history/" + encodeURIComponent(userId))
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }
                    return;
                }


                this.props.updateHistory(res.data.result);

            })
            .catch(err => {
                this.props.showAlertNotify("An error has happened when get history:\n" + err);
            });
    }

    sendMoney(privateKey, to, money) {
        let userId = JSON.parse(localStorage.getItem("user")).userId
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });
        api
            .post("api/wallet/", {
                userId, privateKey, to, money
            })
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

                this.props.pending(false)
                this.props.showSuccessNotify("Send money successfully!")
            })
            .catch(err => {
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when send money:\n" + err);
            });
    }



}

//map state to props
function mapStateToProps(state) {
    return {
        wallet: state.wallet
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

        updateBalance(user) {
            return dispatch(updateBalance(user));
        },

        updateHistory(user) {
            return dispatch(updateHistory(user));
        },

        pending(state) {
            return dispatch(pending(state));
        }
    };

};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));