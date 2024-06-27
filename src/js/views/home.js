import React, { useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllContacts();
	}, []);

	return (
		<div className="container">
			<div className="d-flex justify-content-end mt-3">
				<Link type="button" className="btn btn-success" to={`/single/a`}>Add new contact</Link>
			</div>

			<div className="d-flex justify-content-center mb-3">
				<ul className="list-group" style={{ "list-style-type": "none" }}>
					{
						store?.contacts?.map((element, index) => {
							return (
								<li>
									<div className="card mb-1" style={{ "max-width": "540px" }}>
										<div className="row g-0">
											<div className="col-md-4">
												<img src="https://placehold.co/400" className="img-fluid rounded-start" alt="..." />
											</div>
											<div className="col-md-6">
												<div className="card-body">
													<h5 className="card-title">{element.name}</h5>
													<p className="card-text">{element.address}</p>
													<p className="card-text">{element.phone}</p>
													<p className="card-text">{element.email}</p>
												</div>
											</div>
											<div className="col-md-1">
												<Link key={element.id} className="btn" to={`/single/${element.id}`}>
													<i className="fas fa-pencil-alt me-2"></i>
												</Link>
											</div>
											<div className="col-md-1">

												<button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#exampleModal${element.id}`}>
													<i className="fas fa-trash-alt me-2"></i>
												</button>

												<div className="modal fade" id={`exampleModal${element.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
																<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
															</div>
															<div className="modal-body">
																If you delete this thing the entire universe will go down!
															</div>
															<div className="modal-footer">
																<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no!</button>
																<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => actions.deleteContact(element.id)}>Yes baby!</button>
															</div>
														</div>
													</div>
												</div>

											</div>
										</div>
									</div>
								</li>);
						})
					}
				</ul>
			</div>
		</div>
	);
}
