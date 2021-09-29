import React from "react";
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
import PrivateRoute from "./Routes/privateRoute";
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
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
