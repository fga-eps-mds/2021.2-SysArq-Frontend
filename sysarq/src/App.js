import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";

import Home from "./pages/Home";

import FieldsRegister from "./pages/FieldsRegister/FieldsRegister";
import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";
import BoxAbbreviation from "./pages/FieldsRegister/BoxAbbreviation";
import DocumentType from "./pages/FieldsRegister/DocumentType";
import Unity from "./pages/FieldsRegister/Unity";
import Shelf from "./pages/FieldsRegister/Shelf";
import CreateDocumentSubject from "./pages/FieldsRegister/CreateDocumentSubject";
import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";
import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import CreateUnity from "./pages/FieldsRegister/CreateUnity";
import CreateShelf from "./pages/FieldsRegister/CreateShelf";

import Documents from "./pages/Documents";
import CreateAdministrativeProcess from "./pages/Documents/Create/CreateAdministrativeProcess";
import CreateFrequencyRelation from "./pages/Documents/Create/CreateFrequencyRelation";
import CreateFrequencySheet from "./pages/Documents/Create/CreateFrequencySheet";
import CreateArchivingRelation from "./pages/Documents/Create/CreateArchivingRelation";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Header />
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
				</Route>

				<Route path="/documents">
					<Route exact path="/documents">
						<Documents />
					</Route>
					<Route path="/documents/administrative-process">
						<Route exact path="/documents/administrative-process">
							<CreateAdministrativeProcess />
						</Route>
						<Route path="/documents/administrative-process/create">
							<CreateAdministrativeProcess />
						</Route>
					</Route>
					<Route path="/documents/frequency-relation">
						<Route exact path="/documents/frequency-relation">
							<CreateFrequencyRelation />
						</Route>
						<Route path="/documents/frequency-relation/create">
							<CreateFrequencyRelation />
						</Route>
					</Route>
					<Route path="/documents/archiving-relation">
						<Route exact path="/documents/archiving-relation">
							<CreateArchivingRelation />
						</Route>
						<Route path="/documents/archiving-relation/create">
							<CreateArchivingRelation />
						</Route>
					</Route>
					<Route path="/documents/frequency-sheet">
						<Route exact path="/documents/frequency-sheet">
							<CreateFrequencySheet />
						</Route>
						<Route path="/documents/frequency-sheet/create">
							<CreateFrequencySheet />
						</Route>
					</Route>
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
