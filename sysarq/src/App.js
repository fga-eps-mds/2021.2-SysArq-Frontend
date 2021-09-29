import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import Footer from "./pages/components/Footer";

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
import Login from "./pages/Login/index";
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
				<Route exact path="/login">
					<Login />
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
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
