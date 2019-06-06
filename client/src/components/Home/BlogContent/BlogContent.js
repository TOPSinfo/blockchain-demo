import React, { Component } from "react";
import logo_b1 from '../../../asserts/img/b1.jpg';
import logo_b4 from '../../../asserts/img/b4.jpg';
import logo_b2 from '../../../asserts/img/b2.jpg';
import logo_b3 from '../../../asserts/img/b3.jpg';
import logo_b5 from '../../../asserts/img/b5.jpg';
import logo_b6 from '../../../asserts/img/b6.jpg';


class BlogContent extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
        <React.Fragment>
           <section className="blog-area section-gap" id="blog">
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="menu-content pb-60 col-lg-8">
								<div className="title text-center">
									<h1 className="mb-10">Latest Posts from our Blog</h1>
									<p>Who are in extremely love with eco friendly system.</p>
								</div>
							</div>
						</div>						
						<div className="row">
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b1} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>Portable Fashion for women</h4></a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</p>
									<div className="user d-flex flex-row">
										<div>
											<img className="img-fluid" src={logo_b4} alt=""/>
										</div>
										<div className="meta">
											<h6>Belle Beck</h6>
											<p>January 18th, 2018 at 17.21 </p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b2} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>Portable Fashion for women</h4></a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</p>
									<div className="user d-flex flex-row">
										<div>
											<img className="img-fluid" src={logo_b5} alt=""/>
										</div>
										<div className="meta">
											<h6>Harriet Barrett</h6>
											<p>January 18th, 2018 at 17.21 </p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 single-blog">
								<div className="thumb">
									<img className="img-fluid" src={logo_b3} alt=""/>
								</div>
								<div className="desc">
									<a href="#"><h4>Portable Fashion for women</h4></a>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</p>
									<div className="user d-flex flex-row">
										<div>
											<img className="img-fluid" src={logo_b6} alt=""/>
										</div>
										<div className="meta">
											<h6>Fannie Simmons</h6>
											<p>January 18th, 2018 at 17.21 </p>
										</div>
									</div>
								</div>
							</div>														
						</div>
					</div>	
				</section>
        </React.Fragment>
        );
    }
}
export default BlogContent;
