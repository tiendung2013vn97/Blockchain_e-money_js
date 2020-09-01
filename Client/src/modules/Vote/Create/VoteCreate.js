import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./VoteCreate.scss"
import { Grid, Button, TextField, Select, MenuItem, Card } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

class VoteCreate extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      options: [{ id: 1, text: "" }]
    }
  }

  //render
  render() {

    let optionHtml = []
    const createOption = (optionId, text) => {
      return <TextField required={true} className="option-item" id={"option-" + optionId} label={"Option " + optionId} defaultValue={text} />
    }

    this.state.options.forEach(option => {
      optionHtml.push(
        createOption(option.id, option.text)
      )
    })


    return (
      <div>
        <form className="create-vote-form" noValidate autoComplete="off">
          <div className="form-container">
            <Grid container>
              <Grid item xs={12}>
                <TextField required={true} className="form-item" id="c-topic" label="Topic" />
              </Grid>
            </Grid>

            <TextField style={{ marginTop: "10px" }} required={true} className="form-item" id="c-content" label="Content" multiline={true} />

            <Grid container className="input-date-container">
              <Grid item xs={6}>
                <TextField
                  required={true}
                  id="c-from-date"
                  className="input-date"
                  label="From Date"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required={true}
                  id="c-to-date"
                  label="To Date"
                  className="input-date"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <TextField style={{ marginBottom: "20px" }} required={true} className="form-item" id="in-private-key" label="Private key" multiline={true} />
            <TextField style={{ marginBottom: "20px" }} required={true} className="form-item" id="in-voters" label="UserId who can vote this" />

            <div><b>Options:</b></div>
            {optionHtml}
            <div style={{ "marginTop": "20px" }}>
              <Button variant="outlined" onClick={this.addOption.bind(this)} ><AddIcon /></Button>
              {this.state.options.length > 1 && <Button variant="outlined" onClick={this.removeOption.bind(this)}  ><RemoveIcon /></Button>}
            </div>

          </div>


          {/* <TextField required={true} className="form-item" id="c-name" label="Name" />
          <br />
          <TextField required={true} className="form-item" id="c-age" label="Age" type="number" />
          <br /> */}


          <div className="btn-container">
            <Button id="btn-close" style={{ marginTop: 20, float: "left" }} variant="contained" color="secondary" onClick={this.close.bind(this)}>Close</Button>
            <Button id="btn-create" style={{ marginTop: 20, float: "right" }} variant="contained" color="primary" onClick={this.createVote.bind(this)} >Create</Button>
          </div>

        </form>
      </div >
    );

  }

  createVote() {
    let topic = document.getElementById("c-topic").value
    let fromDate = new Date(document.getElementById("c-from-date").value).getTime()
    let toDate = new Date(document.getElementById("c-to-date").value).getTime()
    let content = document.getElementById("c-content").value
    let privateKey = document.getElementById("in-private-key").value
    let voters = document.getElementById("in-voters").value
    let user = JSON.parse(localStorage.getItem("user"));
    if (!topic) this.props.showAlertNotify("Topic is required!")
    if (!fromDate) this.props.showAlertNotify("From date is required!")
    if (!toDate) this.props.showAlertNotify("To date is required!")
    if (!content) this.props.showAlertNotify("Content is required!")
    if (!privateKey) this.props.showAlertNotify("Private key is required!")
    if (!voters) this.props.showAlertNotify("Voters is required!")

    voters = voters.trim();
    if (voters.toLowerCase() !== "all") {
      voters = voters.split(/[;,]/).map(item => item.trim());
      if (!voters[voters.length - 1]) voters.pop();
    }


    let options = []
    this.state.options.forEach(op => {
      let optionAtId = document.getElementById("option-" + op.id)
      options.push({ id: op.id, text: optionAtId.value })
    })


    const vote = { vote: { topic, fromDate, toDate, content, options, voters }, userId: user.userId, privateKey }
    this.props.handleCreateVote(vote)
  }

  close() {
    this.setState({ ...this.state, options: [{ id: 1, text: "" }] })
    this.props.handleCloseCreateModal()
    this.setState({ ...this.state, options: [{ id: 1, text: "" }] })
  }

  addOption() {
    let options = this.state.options
    options.push({ id: options.length + 1, text: "" })
    this.setState({ ...this.state, options: [...options] })
  }

  removeOption() {
    let options = this.state.options
    options.pop()
    this.setState({ ...this.state, options: [...options] })
  }



}

export default VoteCreate;