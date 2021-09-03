import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "./pages/Home";
import FieldsRegister from "./pages/FieldsRegister";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/fields-register">Cadastro de Campos</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/fields-register">
					<FieldsRegister />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
