import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BodySection from './BodySection/BodySection'
class Home extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
        <React.Fragment>
            <div className="App">
                <Header/>
                    <BodySection/>
                <Footer/>
            </div>   
        </React.Fragment>
        );
    }
}

export default withRouter (Home);
