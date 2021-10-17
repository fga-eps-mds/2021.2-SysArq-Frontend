import React from "react";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login/index";

import PrivateRoute from "./routes/privateRoute";

import Search from "./pages/Search";
import SearchList from "./pages/SearchList";

import FieldsRegister from "./pages/FieldsRegister/FieldsRegister";
import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";
import CreateDocumentSubject from "./pages/FieldsRegister/CreateDocumentSubject";
import BoxAbbreviation from "./pages/FieldsRegister/BoxAbbreviation";
import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";
import Unity from "./pages/FieldsRegister/Unity";
import CreateUnity from "./pages/FieldsRegister/CreateUnity";
import DocumentType from "./pages/FieldsRegister/DocumentType";
import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import Shelf from "./pages/FieldsRegister/Shelf";
import CreateShelf from "./pages/FieldsRegister/CreateShelf";

import Documents from "./pages/Documents";
import CreateAdministrativeProcess from "./pages/Documents/Create/CreateAdministrativeProcess";
import CreateFrequencyRelation from "./pages/Documents/Create/CreateFrequencyRelation";
import CreateFrequencySheet from "./pages/Documents/Create/CreateFrequencySheet";
import CreateArchivingRelation from "./pages/Documents/Create/CreateArchivingRelation";

import "./App.css";

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: "#1f3541",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>

					<PrivateRoute exact path="/">
						<Search />
					</PrivateRoute>
					<PrivateRoute exact path="/search">
						<Search />
					</PrivateRoute>
					<PrivateRoute exact={false} path="/search/list/:field/:content">
						<SearchList />
					</PrivateRoute>

					<Route path="/fields-register">
						<PrivateRoute exact path="/fields-register">
							<FieldsRegister />
						</PrivateRoute>

						<Route path="/fields-register/document-subject">
							<PrivateRoute exact path="/fields-register/document-subject">
								<DocumentSubject />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/fields-register/document-subject/create"
							>
								<CreateDocumentSubject />
							</PrivateRoute>
						</Route>

						<Route path="/fields-register/box-abbreviation">
							<PrivateRoute exact path="/fields-register/box-abbreviation">
								<BoxAbbreviation />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/fields-register/box-abbreviation/create"
							>
								<CreateBoxAbbreviation />
							</PrivateRoute>
						</Route>

						<Route path="/fields-register/unity">
							<PrivateRoute exact path="/fields-register/unity">
								<Unity />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields-register/unity/create">
								<CreateUnity />
							</PrivateRoute>
						</Route>

						<Route path="/fields-register/document-type">
							<PrivateRoute exact path="/fields-register/document-type">
								<DocumentType />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/fields-register/document-type/create"
							>
								<CreateDocumentType />
							</PrivateRoute>
						</Route>

						<Route path="/fields-register/shelf">
							<PrivateRoute exact path="/fields-register/shelf">
								<Shelf />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields-register/shelf/create">
								<CreateShelf />
							</PrivateRoute>
						</Route>
					</Route>

					<Route path="/documents">
						<PrivateRoute exact path="/documents">
							<Documents />
						</PrivateRoute>

						<Route path="/documents/administrative-process">
							<PrivateRoute exact path="/documents/administrative-process">
								<CreateAdministrativeProcess />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/documents/administrative-process/create"
							>
								<CreateAdministrativeProcess />
							</PrivateRoute>
						</Route>

						<Route path="/documents/frequency-relation">
							<PrivateRoute exact path="/documents/frequency-relation">
								<CreateFrequencyRelation />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/documents/frequency-relation/create"
							>
								<CreateFrequencyRelation />
							</PrivateRoute>
						</Route>

						<Route path="/documents/archiving-relation">
							<PrivateRoute exact path="/documents/archiving-relation">
								<CreateArchivingRelation />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/documents/archiving-relation/create"
							>
								<CreateArchivingRelation />
							</PrivateRoute>
						</Route>

						<Route path="/documents/frequency-sheet">
							<PrivateRoute exact path="/documents/frequency-sheet">
								<CreateFrequencySheet />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/documents/frequency-sheet/create"
							>
								<CreateFrequencySheet />
							</PrivateRoute>
						</Route>
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
