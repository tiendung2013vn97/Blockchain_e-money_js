import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Grid, Button, TextField, Select, MenuItem, MenuList,
    ListItemIcon, Typography, Paper, Divider
} from '@material-ui/core'
import { Receipt, Send, PriorityHigh } from '@material-ui/icons';
import "./Wallet.scss"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CachedIcon from '@material-ui/icons/Cached';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

class Wallet extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.state = {
            menuIndex: 0
        }
        this.onClickMenu = this.onClickMenu.bind(this)

    }


    //render
    render() {
        let user = localStorage.getItem("user")
        let userId = "", name = "", age = "", gender = ""
        if (user) {
            user = JSON.parse(user);
            userId = user.userId
            name = user.name
            age = user.age
            gender = user.gender
        }

        let historyHTML = []
        this.props.wallet.history.forEach(block => {
            console.log(block)
            let age=millisecondsToStr(Date.now()-block.timestamp);

            historyHTML.push(
                <Grid container style={{ textAlign: "left" }}>
                    <Grid item xs={2} className="col">
                        <div className="col-content hash">{block.hash}</div>
                        </Grid>
                    <Grid item xs={2} className="col">  <div className="col-content">{block.index}</div></Grid>
                    <Grid item xs={2} className="col">  <div className="col-content">{age}</div></Grid>
                    <Grid item xs={2} className="col">  <div className="col-content">{block.user.userId}</div></Grid>
                    <Grid item xs={2} className="col">  <div className="col-content">{block.to}</div></Grid>
                    <Grid item xs={2} className="col">  <div className="col-content">{block.money+" ETH"}</div></Grid>
                </Grid>
            )
        })
        return (
            <div id="wallet">

                <Grid container >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} container className="main-wallet">
                        <Grid item xs={2} >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={this.state.menuIndex}
                                onChange={this.onClickMenu}
                                aria-label="Vertical tabs example"
                            >
                                <Tab label={<div>
                                    <Send style={{ float: "left" }} />Send
                                </div>} {...a11yProps(0)} />
                                <Tab label={<div>
                                    <Receipt style={{ float: "left" }} />Transaction
                                </div>} {...a11yProps(1)} />

                            </Tabs>

                        </Grid>
                        <Grid item xs={10}>
                            <TabPanel value={this.state.menuIndex} index={0}>
                                <Grid container>
                                    <Grid item xs={5}>
                                        <Paper style={{ backgroundColor: "#6F77E9" }}>
                                            <div className="title">Info</div>
                                            <Divider />
                                            <div className="user-info">
                                                <div>
                                                    UserId: <b>{userId}</b>
                                                </div>
                                                <div>
                                                    Name: <b>{name}</b>
                                                </div>
                                                <div>
                                                    Age: <b>{age}</b>
                                                </div>
                                                <div>
                                                    Gender: <b>{gender}</b>
                                                </div>
                                            </div>

                                        </Paper>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={5}>
                                        <Paper style={{ backgroundColor: "#547BF4" }}>
                                            <div className="title">   Balance</div>
                                            <Divider />
                                            <div className="user-info">
                                                {this.props.wallet.balance + " ETH"}
                                                <Button onClick={this.props.getBalance}>
                                                    <CachedIcon />
                                                </Button>
                                            </div>

                                        </Paper>
                                    </Grid>
                                </Grid>

                                <br /><br />
                                <Grid item xs={11}>
                                    <Paper className="send-money-container" noValidate autoComplete="off">
                                        <div style={{ backgroundColor: "#FF5722", color: "white", fontSize: "large" }}>
                                            Send
                                        </div>
                                        <TextField required={true} className="form-item" id="to" label="To" />
                                        <br />
                                        <TextField required={true} className="form-item" id="money" label="Money" type="number" />
                                        <br />
                                        <div>
                                            <Button style={{ marginTop: 20 }} variant="contained" color="secondary" onClick={this.sendMoney.bind(this)}><Send />Send money</Button>
                                        </div>

                                    </Paper>
                                </Grid>

                            </TabPanel>
                            <TabPanel value={this.state.menuIndex} index={1}>
                                <Grid container style={{ textAlign: "left" }}>
                                    <Grid item xs={2} className="col">TxHash</Grid>
                                    <Grid item xs={2} className="col">Block</Grid>
                                    <Grid item xs={2} className="col">Age</Grid>
                                    <Grid item xs={2} className="col">From</Grid>
                                    <Grid item xs={2} className="col">To</Grid>
                                    <Grid item xs={2} className="col">Value</Grid>
                                </Grid>
                                <Divider/>
                                {historyHTML}

                            </TabPanel> </Grid>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        );

    }

    onClickMenu(event, newValue) {
        this.setState({
            ...this.state,
            menuIndex: newValue
        })
    }

    sendMoney() {
        let to = document.getElementById("to").value
        let money = document.getElementById("money").value
        let privateKey = localStorage.getItem("privateKey")
        this.props.sendMoney(
            privateKey, to, money
        )
    }

}

function millisecondsToStr (milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second'; //'just now' //or other string you like;
}

export default Wallet;