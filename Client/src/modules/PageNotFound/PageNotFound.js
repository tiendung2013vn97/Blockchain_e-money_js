import './PageNotFound.scss'
import React, { Component } from 'react'
import BackgroundHome from '../../assets/imgs/bg1.jpg'

class PageNotFound extends Component{

    render(){
        return (
            <div id='page-not-found'>
                <div id="text-404">ERROR:404 Page Not Found</div> 
            <img src={BackgroundHome} alt="" id="img-page-not-found"/>
            </div>
        )
    }
}

export default PageNotFound;