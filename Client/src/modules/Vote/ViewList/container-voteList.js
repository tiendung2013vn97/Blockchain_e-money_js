import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import VoteList from './VoteList'
import config from "../../../config";
import { updateVotes } from '../action-vote'

class VoteListContainer extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.getVotes = this.getVotes.bind(this)
        this.getVotes()

    }

    //render
    render() {

        return (
            <VoteList
                votes={this.props.votes}
                getVotes={this.getVotes.bind(this)}
            />
        );
    }

    getVotes(text) {
        const userId = JSON.parse(localStorage.getItem("user")).userId
        const api = axios.create({ baseURL: config.URL });
        if (text) {
            api
                .get("api/votes/by/text-search?text=" + encodeURIComponent(text))
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

                    this.props.updateVotes(res.data.result)
                })
                .catch(err => {
                    this.props.showAlertNotify("An error has happened when login:\n" + err);
                });
        } else {
            api
                .get("api/votes?userId=" + encodeURIComponent(userId))
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

                    this.props.updateVotes(res.data.result)
                })
                .catch(err => {
                    this.props.showAlertNotify("An error has happened when login:\n" + err);
                });
        }

    }

}

//map state to props
function mapStateToProps(state) {
    return {
        votes: state.vote.votes
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

        updateVotes(votes) {
            return dispatch(updateVotes(votes))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteListContainer);