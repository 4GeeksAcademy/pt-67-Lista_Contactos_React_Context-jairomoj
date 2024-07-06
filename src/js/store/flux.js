import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			slug: "jairomendespradela",

			contacts: [],

			contact: {}
		},
		actions: {
			createMyAgendaUser: async () => {
				const { slug } = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
						method: "POST",
						body: JSON.stringify(slug),
						headers: {
							"Content-Type": "application/json"
						}
					});

					const data = await response.json();

					alert("La agenda ha sido creada, refresque la pagina por favor");

				} catch (error) {
					alert("Hubo un error al crear la agenda: " + error);
					console.error(error);
				}

			},

			getAllContacts: async () => {
				const { createMyAgendaUser } = getActions();

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().slug}/contacts`);

					const data = await response.json();

					if (data.contacts)
						setStore({ ...getStore(), contacts: data.contacts });

					console.log("getAllContacts")
					console.log(response.ok)

					// Si agenda no existe, se crea una nueva con el valor de mi slug
					if (!response.ok) {
						createMyAgendaUser();
					}

				} catch (error) {
					alert("Hubo un error al recuperar los datos de la agenda: " + error);
					console.error(error);
				}
			},

			getContact: (id) => {
				const { contacts, contact } = getStore();
				let myContact = contacts.find(contact => contact.id === id);

				setStore({ ...getStore(), contact: myContact });

			},

			editAContact: async (id, name, phone, email, address) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().slug}/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(
							{
								"name": name,
								"phone": phone,
								"email": email,
								"address": address
							}
						),
						headers: {
							"Content-Type": "application/json"
						}
					});

					const data = response.json();

					alert("Contacto actualizado!");

					// Limpia el valor de contact después de haberlo actualizado en el servidor
					setStore({ ...getStore(), contact: {} });

				} catch (error) {
					alert("Hubo un error al editar el contacto: " + error);
					console.error(error);
				}
			},

			addAContact: async (name, phone, email, address) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().slug}/contacts`, {
						method: "POST",
						body: JSON.stringify(
							{
								"name": name,
								"phone": phone,
								"email": email,
								"address": address
							}
						),
						headers: {
							"Content-Type": "application/json"
						}
					});

					const data = response.json();

					alert("Contacto creado!");

				} catch (error) {
					alert("Hubo un error al editar el contacto: " + error);
					console.error(error);
				}
			},

			deleteContact: async (id) => {
				console.log("Delete");
				console.log(id);
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${getStore().slug}/contacts/${id}`, {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json"
						}
					});

					const data = response.json();

					getActions().getAllContacts();

				} catch (error) {
					alert("Hubo un error al editar el contacto " + error);
					console.error(error);
				}
			}
		}
	};
};

export default getState;
