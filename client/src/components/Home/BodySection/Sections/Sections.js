import React, { Component } from "react";
import { connect } from "react-redux";
import logo_b1 from '../../../../asserts/img/s1.png';
import logo_b2 from '../../../../asserts/img/s3.png';
import logo_b3 from '../../../../asserts/img/s2.png';

import {withRouter} from 'react-router-dom';
class Sections extends Component {

	handleComponentChange=(e,pathName)=>{
        this.props.history.push({pathname:pathName})
    }

    render() {
		const {isAuthenticated }=this.props.auth
		
        return (
        <React.Fragment>
			{(isAuthenticated && this.props.auth.user.isAdmin )?
			(
				<section className="blog-area section-gap" id="blog">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 single-blog" onClick={(e)=> this.handleComponentChange(e,"/transfer-land")}>
								<div className="thumb">
									<img className="img-fluid" src={logo_b1} alt=""/>
								</div>
								<div className="desc">
									<h4>Transfer Owned Land</h4>
									<p>
										Here You can transfer land owned by you to any of the member of blockchain.
									</p>

								</div>
							</div>
							<div className="col-lg-4 single-blog" onClick={(e)=> this.handleComponentChange(e,"/lands")}>
								<div className="thumb">
									<img className="img-fluid" src={logo_b2} alt=""/>
								</div>
								<div className="desc">
									<h4>View and Create New Lands</h4>
									<p>
										Here you can Create new Lands, and Manage the Lands owned by you.
									</p>

								</div>
							</div>
							<div className="col-lg-4 single-blog" onClick={(e)=> this.handleComponentChange(e,"/users")}>
								<div className="thumb">
									<img className="img-fluid" src={logo_b3} alt=""/>
								</div>
								<div className="desc">
									<h4>Create and Manage User</h4>
									<p>
										Here you can create and manage the users of the blockchain.
									</p>

								</div>
							</div>
						</div>
					</div>
				</section>
			):(
				<section className="blog-area section-gap" id="blog">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 single-blog" onClick={(e)=> this.handleComponentChange(e,"/transfer-land")}>
								<div className="thumb">
									<img className="img-fluid" src={logo_b1} alt=""/>
								</div>
								<div className="desc">
									<h4>Transfer Owned Land</h4>
									<p>
										Here You can transfer land owned by you to any of the member of blockchain.
									</p>

								</div>
							</div>
							<div className="col-lg-6 single-blog" onClick={(e)=> this.handleComponentChange(e,"/lands")}>
								<div className="thumb">
									<img className="img-fluid" src={logo_b2} alt=""/>
								</div>
								<div className="desc">
									<h4>View Lands</h4>
									<p>
										Here you can view Lands owned by you.
									</p>

								</div>
							</div>
						</div>
					</div>
				</section>
			)
			}
           
		</React.Fragment>
		// <h1>hello</h1>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
export default connect(mapStateToProps,{})(withRouter(Sections));