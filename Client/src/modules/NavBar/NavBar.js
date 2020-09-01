import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import "./NavBar.scss"
import Popover from '@material-ui/core/Popover';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';



class NavBar extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        }
    }

    //render
    render() {
        let user = JSON.parse(localStorage.getItem("user"))
        let navBarHTML = []
        if (user) {
            let chars = user.name.split(" ")

            const open = Boolean(this.state.anchorEl);
            const id = open ? 'simple-popover' : undefined;
            navBarHTML.push(<div id="nav-bar-container">
                <Avatar id="name-icon" onClick={this.openUserPopup.bind(this)}>{chars[chars.length - 1][0]}</Avatar>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose.bind(this)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Button onClick={this.logOut.bind(this)}>Log out</Button>
                </Popover>


                
            </div>)
        }

        return (<div>
            {navBarHTML}
        </div>)
            ;
    }

    openUserPopup(event) {
        this.setState({ ...this.state, anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ ...this.state, anchorEl: null })
    }

    logOut() {
        localStorage.removeItem("user")
        this.setState({ ...this.state, anchorEl: null })
        this.props.history.push('/');
    }
}

export default withRouter(NavBar);