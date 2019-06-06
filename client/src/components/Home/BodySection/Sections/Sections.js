import React, { Component } from "react";
import logo_b1 from '../../../../asserts/img/s1.png';
import logo_b4 from '../../../../asserts/img/b4.jpg';
import logo_b2 from '../../../../asserts/img/s3.png';
import logo_b3 from '../../../../asserts/img/s2.png';
import logo_b5 from '../../../../asserts/img/b5.jpg';
import logo_b6 from '../../../../asserts/img/b6.jpg';


class Sections extends Component {

    render() {
        return (
        <React.Fragment>
           <section className="blog-area section-gap" id="blog">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b1} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>Transfer Owned Land</h4></a>
									<p>
										Here You can transfer land owned by you to any of the member of blockchain.
									</p>

								</div>
							</div>
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b2} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>View and Create New Lands</h4></a>
									<p>
										Here you can Create new Lands, and Manage the Lands owned by you.
									</p>

								</div>
							</div>
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b3} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>Create and Manage User</h4></a>
									<p>
										Here you can create and manage the users of the blockchain.
									</p>

								</div>
							</div>
						</div>
					</div>
				</section>
        </React.Fragment>
        );
    }
}
export default Sections;
