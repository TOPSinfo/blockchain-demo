import React, { Component } from "react";
import Header from '../Header/Header';

import BodySection from './BodySection/BodySection'
class Home extends Component {

    render() {
        return (
        <React.Fragment>
            <div className="App">
                <Header/>
                <BodySection/>
            </div>
        </React.Fragment>
        );
    }
}
export default Home;
