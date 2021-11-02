import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { ptBR } from "@material-ui/core/locale";

import Login from "./pages/Login/index";

import PrivateRoute from "./routes/privateRoute";

import Search from "./pages/Search";
import SearchList from "./pages/SearchList";

import Fields from "./pages/Fields";
import DocumentSubject from "./pages/Fields/List/DocumentSubject";
import CreateDocumentSubject from "./pages/Fields/Create/CreateDocumentSubject";
import BoxAbbreviation from "./pages/Fields/List/BoxAbbreviation";
import CreateBoxAbbreviation from "./pages/Fields/Create/CreateBoxAbbreviation";
import Unity from "./pages/Fields/List/Unity";
import CreateUnity from "./pages/Fields/Create/CreateUnity";
import DocumentType from "./pages/Fields/List/DocumentType";
import CreateDocumentType from "./pages/Fields/Create/CreateDocumentType";
import Shelf from "./pages/Fields/List/Shelf";
import Rack from "./pages/Fields/List/Rack";
import CreateShelfOrRack from "./pages/Fields/Create/CreateShelfOrRack";
import CreatePublicWorker from "./pages/Fields/Create/CreatePublicWorker";
import PublicWorker from "./pages/Fields/List/PublicWorker";

import Documents from "./pages/Documents";
import CreateAdministrativeProcess from "./pages/Documents/Create/CreateAdministrativeProcess";
import CreateFrequencyRelation from "./pages/Documents/Create/CreateFrequencyRelation";
import CreateFrequencySheet from "./pages/Documents/Create/CreateFrequencySheet";
import CreateBoxArchiving from "./pages/Documents/Create/CreateBoxArchiving";

import "./App.css";

function App() {
	const theme = createTheme(
		{
			palette: {
				primary: {
					main: "#1f3541",
				},
				secondary: {
					main: "#5389b5",
				},
			},
		},
		ptBR
	);

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

					<Route path="/fields">
						<PrivateRoute exact path="/fields">
							<Fields />
						</PrivateRoute>

						<Route path="/fields/document-subject">
							<PrivateRoute exact path="/fields/document-subject">
								<DocumentSubject />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/fields/document-subject/create"
							>
								<CreateDocumentSubject />
							</PrivateRoute>
						</Route>

						<Route path="/fields/box-abbreviation">
							<PrivateRoute exact path="/fields/box-abbreviation">
								<BoxAbbreviation />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/fields/box-abbreviation/create"
							>
								<CreateBoxAbbreviation />
							</PrivateRoute>
						</Route>

						<Route path="/fields/unity">
							<PrivateRoute exact path="/fields/unity">
								<Unity />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields/unity/create">
								<CreateUnity />
							</PrivateRoute>
						</Route>

						<Route path="/fields/document-type">
							<PrivateRoute exact path="/fields/document-type">
								<DocumentType />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields/document-type/create">
								<CreateDocumentType />
							</PrivateRoute>
						</Route>

						<Route path="/fields/shelf">
							<PrivateRoute exact path="/fields/shelf">
								<Shelf />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields/shelf/create">
								<CreateShelfOrRack urlType="shelf" />
							</PrivateRoute>
						</Route>

						<Route path="/fields/rack">
							<PrivateRoute exact path="/fields/rack">
								<Rack />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields/rack/create">
								<CreateShelfOrRack urlType="rack" />
							</PrivateRoute>
						</Route>

						<Route path="/fields/public-worker">
							<PrivateRoute exact path="/fields/public-worker">
								<PublicWorker />
							</PrivateRoute>
							<PrivateRoute exact={false} path="/fields/public-worker/create">
								<CreatePublicWorker urlType="public-worker" />
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

							<PrivateRoute path="/documents/administrative-process/view/:id">
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

							<PrivateRoute path="/documents/frequency-relation/view/:id">
								<CreateFrequencyRelation />
							</PrivateRoute>
						</Route>

						<Route path="/documents/box-archiving">
							<PrivateRoute exact path="/documents/box-archiving">
								<CreateBoxArchiving />
							</PrivateRoute>

							<PrivateRoute
								exact={false}
								path="/documents/box-archiving/create"
							>
								<CreateBoxArchiving />
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

							<PrivateRoute path="/documents/frequency-sheet/view/:id">
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
