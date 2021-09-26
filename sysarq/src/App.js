import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "./pages/Home";
import FieldsRegister from "./pages/FieldsRegister/FieldsRegister";
import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";
import BoxAbbreviation from "./pages/FieldsRegister/BoxAbbreviation";
import PublicWorker from "./pages/FieldsRegister/PublicWorker";
import DocumentType from "./pages/FieldsRegister/DocumentType";
import Unity from "./pages/FieldsRegister/Unity";
import Shelf from "./pages/FieldsRegister/Shelf";
import Status from "./pages/FieldsRegister/Status";
import CreateDocumentSubject from "./pages/FieldsRegister/CreateDocumentSubject";
import CreateStatus from "./pages/FieldsRegister/CreateStatus";
import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";
import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import CreatePublicWorker from "./pages/FieldsRegister/CreatePublicWorker";
import CreateUnity from "./pages/FieldsRegister/CreateUnity";
import CreateShelf from "./pages/FieldsRegister/CreateShelf";

import Documents from "./pages/Documents";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import CreateAdministrativeProcess from "./pages/Documents/Create/CreateAdministrativeProcess";

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
					<Route exact path="/fields-register">
						<FieldsRegister />
					</Route>
					<Route path="/fields-register/document-subject">
						<Route exact path="/fields-register/document-subject">
							<DocumentSubject />
						</Route>
						<Route path="/fields-register/document-subject/create">
							<CreateDocumentSubject />
						</Route>
					</Route>
					<Route path="/fields-register/box-abbreviation">
						<Route exact path="/fields-register/box-abbreviation">
							<BoxAbbreviation />
						</Route>
						<Route path="/fields-register/box-abbreviation/create">
							<CreateBoxAbbreviation />
						</Route>
					</Route>
					<Route path="/fields-register/public-worker">
						<Route exact path="/fields-register/public-worker">
							<PublicWorker />
						</Route>
						<Route path="/fields-register/public-worker/create">
							<CreatePublicWorker />
						</Route>
					</Route>
					<Route path="/fields-register/unity">
						<Route exact path="/fields-register/unity">
							<Unity />
						</Route>
						<Route path="/fields-register/unity/create">
							<CreateUnity />
						</Route>
					</Route>
					<Route path="/fields-register/document-type">
						<Route exact path="/fields-register/document-type">
							<DocumentType />
						</Route>
						<Route path="/fields-register/document-type/create">
							<CreateDocumentType />
						</Route>
					</Route>
					<Route path="/fields-register/shelf">
						<Route exact path="/fields-register/shelf">
							<Shelf />
						</Route>
						<Route path="/fields-register/shelf/create">
							<CreateShelf />
						</Route>
					</Route>
					<Route path="/fields-register/status">
						<Route exact path="/fields-register/status">
							<Status />
						</Route>
						<Route path="/fields-register/status/create">
							<CreateStatus />
						</Route>
					</Route>
				</Route>

				<Route path="/documents">
					<Route exact path="/documents">
						<Documents />
					</Route>
					<Route path="/documents/administrative-process">
						<Route exact path="/documents/administrative-process">
							<Status />
						</Route>
						<Route path="/documents/administrative-process/create">
							<CreateAdministrativeProcess />
						</Route>
					</Route>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
