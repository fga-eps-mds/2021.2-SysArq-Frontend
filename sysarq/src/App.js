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
import Login from "./pages/Login/index";
import PrivateRoute from "./Routes/privateRoute";
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
				<PrivateRoute exact path="/">
					<Home />
				</PrivateRoute>
				<Route exact path="/login">
					<Login />
				</Route>
				<PrivateRoute exact={false} path="/fields-register">
					<PrivateRoute exact path="/fields-register">
						<FieldsRegister />
					</PrivateRoute>
					<PrivateRoute exact={false} path="/fields-register/document-subject">
						<PrivateRoute exact path="/fields-register/document-subject">
							<DocumentSubject />
						</PrivateRoute>
						<PrivateRoute
							exact={false}
							path="/fields-register/document-subject/create"
						>
							<CreateDocumentSubject />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute exact={false} path="/fields-register/box-abbreviation">
						<PrivateRoute exact path="/fields-register/box-abbreviation">
							<BoxAbbreviation />
						</PrivateRoute>
						<PrivateRoute
							exact={false}
							path="/fields-register/box-abbreviation/create"
						>
							<CreateBoxAbbreviation />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute exact={false} path="/fields-register/unity">
						<PrivateRoute exact path="/fields-register/unity">
							<Unity />
						</PrivateRoute>
						<PrivateRoute exact={false} path="/fields-register/unity/create">
							<CreateUnity />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute exact={false} path="/fields-register/document-type">
						<PrivateRoute exact path="/fields-register/document-type">
							<DocumentType />
						</PrivateRoute>
						<PrivateRoute
							exact={false}
							path="/fields-register/document-type/create"
						>
							<CreateDocumentType />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute exact={false} path="/fields-register/shelf">
						<PrivateRoute exact path="/fields-register/shelf">
							<Shelf />
						</PrivateRoute>
						<PrivateRoute exact={false} path="/fields-register/shelf/create">
							<CreateShelf />
						</PrivateRoute>
					</PrivateRoute>
				</PrivateRoute>
				<PrivateRoute path="/documents">
					<PrivateRoute exact path="/documents">
						<Documents />
					</PrivateRoute>
					<PrivateRoute path="/documents/administrative-process">
						<PrivateRoute exact path="/documents/administrative-process">
							<CreateAdministrativeProcess />
						</PrivateRoute>
						<PrivateRoute path="/documents/administrative-process/create">
							<CreateAdministrativeProcess />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute path="/documents/frequency-relation">
						<PrivateRoute exact path="/documents/frequency-relation">
							<CreateFrequencyRelation />
						</PrivateRoute>
						<PrivateRoute path="/documents/frequency-relation/create">
							<CreateFrequencyRelation />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute path="/documents/archiving-relation">
						<PrivateRoute exact path="/documents/archiving-relation">
							<CreateArchivingRelation />
						</PrivateRoute>
						<PrivateRoute path="/documents/archiving-relation/create">
							<CreateArchivingRelation />
						</PrivateRoute>
					</PrivateRoute>
					<PrivateRoute path="/documents/frequency-sheet">
						<PrivateRoute exact path="/documents/frequency-sheet">
							<CreateFrequencySheet />
						</PrivateRoute>
						<PrivateRoute path="/documents/frequency-sheet/create">
							<CreateFrequencySheet />
						</PrivateRoute>
					</PrivateRoute>
				</PrivateRoute>
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
