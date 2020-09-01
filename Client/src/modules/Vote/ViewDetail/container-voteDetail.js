import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios"
import { showAlertNotify, showSuccessNotify, showFailNotify } from '../../Notify/action-notify'
import VoteDetail from './VoteDetail'
import config from "../../../config";
import { pending } from '../../Home/action-home'

class VoteDetailContainer extends Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            vote: null,
            voteId: this.props.match.params.id
        }

        this.elect = this.elect.bind(this)

    }
    componentDidMount() {
        this.getVote(this.state.voteId)
    }

    //render
    render() {
        return (
            <VoteDetail voteId={this.props.match.params.id} vote={this.state.vote} showAlertNotify={this.props.showAlertNotify} elect={this.elect} />
        );
    }

    elect(vote, privateKey) {
        this.props.pending(true)
        const api = axios.create({ baseURL: config.URL });

        let postBody = {
            userId: JSON.parse(localStorage.getItem("user")).userId,
            vote,
            privateKey
        }

        let thiz = this
        api
            .post("api/votes/elect", postBody)
            .then(res => {
                console.log(res);
                if (res.data.status === "fail") {
                    switch (res.data.code) {
                        default: {
                            this.props.showFailNotify(res.data.msg);
                            break;
                        }
                    }

                    thiz.props.pending(false)

                    return;
                }

                setTimeout(() => {
                    thiz.getVote(vote.voteId)
                    thiz.props.pending(false)
                    thiz.props.showSuccessNotify("Voted successfully!")
                }, 500)

            })
            .catch(err => {
                this.props.pending(false)
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            })
    }


    getVote(voteId) {
        const api = axios.create({ baseURL: config.URL });

        api
            .get("api/votes/" + encodeURIComponent(voteId))
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

                this.setState({ ...this.state, vote: res.data.result })

            })
            .catch(err => {
                this.props.showAlertNotify("An error has happened when login:\n" + err);
            });

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

        pending(state) {
            return dispatch(pending(state));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VoteDetailContainer);