import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
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
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
