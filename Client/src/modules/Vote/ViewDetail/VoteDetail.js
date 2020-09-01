import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./VoteDetail.scss"
import { Grid, Button, TextField, Select, MenuItem, Card, Paper } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MaleIcon from '../../../assets/imgs/male.png'
import FemaleIcon from '../../../assets/imgs/female.png'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ListIcon from '../../../assets/imgs/list.png'


class VoteDetail extends Component {

  //constructor
  constructor(props) {
    super(props);

    this.state = {
      optionId: -1
    }
  }

  //render
  render() {
    const vote = this.props.vote

    let vote404Html = []
    vote404Html.push(
      <div>This vote doesn't exist!</div>
    )

    let voteDetailHtml = []
    let status = "Not start";
    let progressColor = "grey"
    let allowVote = false
    let userId = JSON.parse(localStorage.getItem("user")).userId
    if (vote) {
      let totalVoted = 0;
      let optionVoted = -1;

      allowVote = vote.vote.voters == "all" ? true : (vote.vote.voters.includes(userId) ? true : false)
      vote.vote.options.forEach(option => {
        totalVoted += option.voted.length
        if (option.voted.map(v => v.userId).includes(userId)) {
          optionVoted = option.id; allowVote = false
        }
      })

      if (vote.vote.toDate <= Date.now()) { status = "Finished"; progressColor = "green"; allowVote = false }
      if (vote.vote.toDate > Date.now() & vote.vote.fromDate < Date.now()) {
        status = "In progress"; progressColor = "orange";
      }

      if (vote.vote.fromDate > Date.now()) { status = "Not start"; progressColor = "grey"; allowVote = false }
      let voter = vote.vote.voters == "all" ? "All" : vote.vote.voters.join("; ")

      let optionsHtml = [];



      vote.vote.options.forEach(option => {
        let length = option.voted.length / (totalVoted + 1) * 400 + 2 + "px";

        optionsHtml.push(
          <div>
            <FormControlLabel value={option.id} control={<Radio />} label={option.text} disabled={!allowVote} />
            <div className="chart" style={{ width: length }}></div> <span className="voted-people"> {option.voted.length} people</span>
          </div>

        )
      })

      if (this.state.optionId != -1) { optionVoted = this.state.optionId }



      voteDetailHtml.push(
        <div>
          <Grid container>
            <Grid item xs={3} >
              <div className="host-container">
                {vote.host.gender == "Male" ?
                  <img src={MaleIcon} className="img-host" /> :
                  <img src={FemaleIcon} className="img-host" />}

                <div className="host-content">
                  <div>
                    <span className="label">Host:</span>
                    {vote.host.name}
                  </div>
                  <div>
                    <span className="label">UserId:</span>
                    {vote.host.userId}
                  </div>
                  <div>
                    <span className="label">Age:</span>
                    {vote.host.age}
                  </div>
                  <div>
                    <span className="label">Gender:</span>
                    {vote.host.gender}
                  </div>
                </div>
              </div>

            </Grid>
            <Grid item xs={9}>
              <Paper elevation={3} className="row">
                <Grid container>
                  <Grid item xs={3} className="title">
                    Topic:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    {vote.vote.topic}
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={3} className="row">
                <Grid container>
                  <Grid item xs={3} className="title">
                    Status:
              </Grid>
                  <Grid item xs={9} className="row-content" style={{ backgroundColor: progressColor, fontWeight: 500, color: "white", fontStyle: "italic" }}>
                    {status}
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={3} className="row" >
                <Grid container>
                  <Grid item xs={3} className="title">
                    From date:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    {new Date(vote.vote.fromDate).toString()}
                  </Grid>
                </Grid>
              </Paper>


              <Paper elevation={3} className="row" >
                <Grid container>
                  <Grid item xs={3} className="title">
                    To date:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    {new Date(vote.vote.toDate).toString()}
                  </Grid>
                </Grid>
              </Paper>


              <Paper elevation={3} className="row" >
                <Grid container>
                  <Grid item xs={3} className="title">
                    Content:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    {vote.vote.content}
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={3} className="row" >
                <Grid container>
                  <Grid item xs={3} className="title">
                    Who can vote:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    {voter}
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={3} className="row option-container" >
                <Grid container>
                  <Grid item xs={3} className="title">
                    Voting result:
              </Grid>
                  <Grid item xs={9} className="row-content">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Options</FormLabel>
                      <RadioGroup aria-label="gender" name="gender1" value={optionVoted} onChange={this.handleOptionChange.bind(this)}>
                        {optionsHtml}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>

              {allowVote &&
                <div>
                  <TextField required={true} className="form-item" id="private-key" label="Private key" multiline={true} style={{ width: "100%" }} />
                  <div style={{ width: "100%" }}>
                    <Button color="primary" variant="contained" onClick={this.onClickVote.bind(this)} style={{ marginTop: "10px" }}>
                      Vote
                    </Button>
                  </div>
                </div>}


            </Grid>
          </Grid>

        </div>

      )
    }

    return (
      <div className="vote-detail-container">
        {vote ? voteDetailHtml : vote404Html}

        <Link to="/votes">
        <Button className='btn-go-list'>
          <img src={ListIcon}></img>
        </Button>
        </Link>
      </div>
    );

  }

  handleOptionChange(event) {
    this.setState({
      ...this.state,
      optionId: +event.target.value
    })
  }

  onClickVote() {
    let privateKey = document.getElementById("private-key").value
    let optionId = this.state.optionId;
    if (optionId == -1) { this.props.showAlertNotify("Please choose a option before submit!"); return }
    if (!privateKey.trim()) { this.props.showAlertNotify("Private key is required!"); return }
    let vote = {
      optionId,
      voteId: this.props.vote.vote.voteId,
      voteTime: Date.now()
    }

    this.props.elect(vote, privateKey)
  }


}

export default VoteDetail;