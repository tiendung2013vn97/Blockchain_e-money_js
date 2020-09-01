import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper, Card, CardContent, Divider, Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import "./VoteList.scss"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReactModal from "react-modal"
import CreateVoteContainer from "../Create/container-voteCreate"

const createVoteStyles = {
  content: {
    top: '350px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden'
  }
}

class VoteList extends Component {

  //constructor
  constructor(props) {
    super(props);

    this.state = {
      openCreateVote: false
    }

    this.handleCloseCreateModal = this.handleCloseCreateModal.bind(this)
    this.handleCreateVote = this.handleCreateVote.bind(this)
  }

  //render
  render() {

    const votes = this.props.votes
    let createVotePanel = []
    createVotePanel.push(
      <Grid item xs={4} className="card-create-vote-container" >
        <Card className="card-vote" style={{ width: "90%" }} onClick={this.openCreateVote.bind(this)}>
          <CardContent>

            <div className="create-vote-text">Create new vote</div>
            <AddSharpIcon className="plus-icon" />

          </CardContent>

        </Card>
      </Grid>
    )

    let votePanels = []
    votePanels.push(createVotePanel)
    votes.forEach(vote => {
      let fDate = new Date(vote.vote.fromDate), tDate = new Date(vote.vote.toDate)

      let status;
      let progressColor;
      if (vote.vote.toDate <= Date.now()) { status = "Finished"; progressColor = "green"; }
      if (vote.vote.toDate > Date.now() & vote.vote.fromDate < Date.now()) {
        status = "In progress"; progressColor = "orange";
      }
      if (vote.vote.fromDate > Date.now()) { status = "Not start"; progressColor = "grey"; }

      votePanels.push(
        <Grid item xs={4} className="card-vote-container" >
          <Link to={"/votes/" + vote.vote.voteId} style={{ textDecoration: "none" }}>
            <Card className="card-vote" style={{ width: "90%" }}>
              <CardContent className="card-content">
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={3} className="small-account-container">
                        <AccountCircleIcon style={{ fontSize: 50, color: "green" }} />
                      </Grid>
                      <Grid item xs={9}>
                        <span className="label"> Topic:</span>
                        <span className="label-text"> {vote.vote.topic}</span>
                        <div className="min-date"> From: {formatDate(fDate)}</div>
                        <div className="min-date"> To: {formatDate(tDate)}</div>
                        <div className="status min-date">
                          <span style={{ marginRight: "5px" }}>Status:</span>
                          <span style={{ color: progressColor }}>{status}</span>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 10, marginLeft: "5%" }} >
                      <div className="content-label">Content:</div>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 10 }} className="content">
                      {vote.vote.content}
                    </Grid>

                  </Grid>
                </Grid>
              </CardContent>
              <div className="view-detail">
                <VisibilityIcon className="eye-icon" />
              View Detail</div>
            </Card>
          </Link>
        </Grid>
      )
    })



    // votePanels.push(createVotePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    // votePanels.push(votePanel)
    return (
      <div>
        <Paper id="search-box" >

          <InputBase
            placeholder="Search your votes..."
            id="search-text-box"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" aria-label="search" onClick={this.onClickSearch.bind(this)} >
            <SearchIcon />
          </IconButton>

          <Button id="btn-refresh" onClick={this.onClickSearch.bind(this)}>
            <RefreshIcon />
          </Button>


        </Paper>

        <Grid container id="votes-container">
          {votePanels}
        </Grid>

        <ReactModal
          isOpen={this.state.openCreateVote}
          style={createVoteStyles}
        >
          <CreateVoteContainer
            handleCreateVote={this.handleCreateVote}
            handleCloseCreateModal={this.handleCloseCreateModal}
          />

        </ReactModal>

      </div>
    );

  }

  onClickSearch() {
    let text = document.getElementById("search-text-box")
    this.props.getVotes(text.value)
  }

  openCreateVote() {
    this.setState({ ...this.state, openCreateVote: true })
  }

  handleCloseCreateModal() {
    this.setState({ ...this.state, openCreateVote: false })
  }

  handleCreateVote(vote) {
    this.props.createVote(vote)
    this.setState({ ...this.state, openCreateVote: false })
  }

}

const formatDate = (d) => {
  let date = ("0" + d.getDate())
  date = date.slice(date.length - 2, date.length)

  let month = ("0" + (d.getMonth() + 1))
  month = month.slice(month.length - 2, month.length)

  let yeer = d.getFullYear()
  let hour = ("0" + d.getHours())
  hour = hour.slice(hour.length - 2, hour.length)

  let minute = ("0" + d.getMinutes())
  minute = minute.slice(minute.length - 2, minute.length)

  let second = ("0" + d.getSeconds())
  second = second.slice(second.length - 2, second.length)

  return `${date}/${month}/${yeer} ${hour}:${minute}:${second}`
}

export default VoteList;