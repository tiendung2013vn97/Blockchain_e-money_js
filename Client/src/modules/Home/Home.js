import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button, TextField, Select, MenuItem } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InfoIcon from '@material-ui/icons/Info';
import InstagramIcon from '@material-ui/icons/Instagram';
import { yellow } from '@material-ui/core/colors';
import "./Home.scss"
import VoteChain from "../../assets/imgs/votechain.png"
import Carousel from 'react-material-ui-carousel'
import Slide1 from "../../assets/imgs/slide1.jpg"
import Slide2 from "../../assets/imgs/slide2.jpg"
import Slide3 from "../../assets/imgs/slide3.jpg"
import ReactModal from "react-modal"

const loginStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

const createAccountStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

class Home extends Component {

  //constructor
  constructor(props) {
    super(props);

    this.state = {
      showLoginModal: false,
      showCreateAccountModal: false,
      gender: "Male"
    };

    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.handleOpenCreateAccountModal = this.handleOpenCreateAccountModal.bind(this);
    this.handleCloseCreateAccountModal = this.handleCloseCreateAccountModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)

  
  }


  handleOpenLoginModal() {
    this.setState({ ...this.state, showLoginModal: true });
  }

  handleCloseLoginModal() {
    this.setState({ ...this.state, showLoginModal: false });
  }

  handleLogin() {
    let userId = document.getElementById("userid").value.trim()
    let privateKey = document.getElementById("private-key").value
    // privateKey=JSON.stringify(privateKey)
    this.props.login({ userId, privateKey })
    // this.setState({ ...this.state, showLoginModal: false });
  }

  handleOpenCreateAccountModal() {
    this.setState({ ...this.state, showCreateAccountModal: true });
  }

  handleCreateAccount() {
    let userId = document.getElementById("c-userid").value
    let name = document.getElementById("c-name").value
    let age = document.getElementById("c-age").value
    let gender = document.getElementById("c-gender").textContent
    this.props.createAccount({ userId, name, age, gender })
  }

  handleCloseCreateAccountModal() {
    this.setState({ ...this.state, showCreateAccountModal: false });
  }

  handleGenderChange(event) {
    this.setState({ ...this.state, gender: event.target.value })
  }

  clearFormLogin() {
    // document.getElementById("userid").value = ''
    // document.getElementById("private-key").value = ''
  }

  clearFormCreateAccount() {
    // document.getElementById("c-userid").value = ''
    // document.getElementById("c-name").value = ''
  }
  //render
  render() {
    var items = [
      Slide1, Slide2, Slide3
    ]
    return (
      <div id="home">
        <Grid container style={{ fontSize: "25px", marginTop: 20 }}>
          <Grid item xs={4}>
            {/* <img src={VoteChain} alt="no image" style={{width:180,height:40}}/> */}
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={4}>
                <InfoIcon />
                <a href="#" className="about ref">About us</a>

              </Grid>
              <Grid item xs={4}>
                <FacebookIcon color="primary" />
                <a href="#" className="facebook ref">Facebook</a>

              </Grid>
              <Grid item xs={4}>
                <InstagramIcon color="secondary" />
                <a href="#" className="instagram ref">Instagram</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} >
            <Button style={{ float: "right" }} variant="contained" color="primary" onClick={this.handleOpenLoginModal}>
              Login
            </Button>
          </Grid>
        </Grid>

        <Grid container style={{ fontSize: "18px", marginTop: 50, textAlign: "left", paddingLeft: 100 }}>
          <Grid item xs={3}>
            <h1 style={{ fontStyle: "italic" }}>
              Voting Network
            </h1>
            <br />
            <div>
              The network helps you <b>vote</b>.
              <br />
              <b>Trustworthy </b>and <b>public</b> with everyone!
            </div>

            <Button variant="contained" color="primary" className="create-account-btn" onClick={this.handleOpenCreateAccountModal}>
              Create a FREE account !
            </Button>
          </Grid>
          <Grid item xs={7} >
            <Carousel >
              {
                items.map((item, i) => <img style={{ width: "100%", height: 460, borderRadius: "5px" }} src={item} />)
              }
            </Carousel>
          </Grid>
        </Grid>


        <ReactModal
          isOpen={this.state.showLoginModal}
          style={loginStyles}
        >
          <form className="login-form" noValidate autoComplete="off">
            <TextField required={true} className="form-item" id="userid" label="User ID" />
            <br />
            <TextField required={true} className="form-item" id="private-key" label="Private key" multiline={true} />
            <br />
            <div>
              <Button style={{ marginTop: 20, float: "left" }} variant="contained" color="secondary" onClick={this.handleCloseLoginModal}>Close</Button>
              <Button style={{ marginTop: 20, float: "right" }} variant="contained" color="primary" onClick={this.handleLogin} >Login</Button>
            </div>

          </form>
        </ReactModal>


        <ReactModal
          isOpen={this.state.showCreateAccountModal}
          style={createAccountStyles}
        >
          <form className="create-account-form" noValidate autoComplete="off">
            <TextField required={true} className="form-item" id="c-userid" label="User ID" />
            <br />
            <TextField required={true} className="form-item" id="c-name" label="Name" />
            <br />
            <TextField required={true} className="form-item" id="c-age" label="Age" type="number" />
            <br />

            <span style={{ marginRight: 10 }}>Gender: </span>
            <Select
              labelId="gender"
              id="c-gender"
              value={this.state.gender}
              onChange={this.handleGenderChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>

            <div>
              <Button style={{ marginTop: 20, float: "left" }} variant="contained" color="secondary" onClick={this.handleCloseCreateAccountModal}>Close</Button>
              <Button style={{ marginTop: 20, float: "right" }} variant="contained" color="primary" onClick={this.handleCreateAccount} >Create</Button>
            </div>

          </form>
        </ReactModal>

      </div>
    );

  }

}

export default Home;