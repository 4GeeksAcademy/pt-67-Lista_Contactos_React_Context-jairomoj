import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);

	const params = useParams();

	useEffect(() => {
		if (params.theid != 'a')
			actions.getContact(parseInt(params.theid));

		if (store.contact) {
			setName(store.contact.name);
			setEmail(store.contact.email);
			setPhone(store.contact.phone);
			setAddress(store.contact.address);
		  }
	}, []);

	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ phone, setPhone ] = useState("");
	const [ address, setAddress ] = useState("");

	const handleName = (e) => {
		setName(e.target.value);
	}

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}

	const handlePhone = (e) => {
		setPhone(e.target.value);
	}

	const handleAddress = (e) => {
		setAddress(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (params.theid != 'a')
			actions.editAContact(parseInt(params.theid), name, phone, email, address);
		else
			actions.addAContact(name, phone, email, address);
	}

	return (
		<div>

			<div className="container mt-5">
				<h1>Add a new contact</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label">Full Name</label>
						<input type="text" className="form-control" name="name" value={name} onChange={handleName} required />
					</div>
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input type="email" className="form-control" name="email" value={email} onChange={handleEmail} required />
					</div>
					<div className="mb-3">
						<label className="form-label">Phone</label>
						<input type="tel" className="form-control" name="phone" value={phone} onChange={handlePhone} required />
					</div>
					<div className="mb-3">
						<label className="form-label">Address</label>
						<input type="text" className="form-control" name="address" value={address} onChange={handleAddress} required />
					</div>
					<div className="d-block">
						<button type="submit" className="btn btn-primary btn-block w-100">
							Save
						</button>
						<Link to="/" className="ms-2">
							or get back to contacts
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
