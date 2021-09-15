import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
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
import AdministrativeProcess from "./pages/DocumentsRegister/AdministrativeProcess";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import DocumentsRegister from "./pages/DocumentsRegister/DocumentsRegister";
import CreateAdministrativeProcess from "./pages/DocumentsRegister/CreateAdministrativeProcess";
import CreateFrequencyRelation from "./pages/DocumentsRegister/CreateFrequencyRelation";
import FrequencyRelation from "./pages/DocumentsRegister/FrequencyRelation";
import FrequencyDocument from "./pages/DocumentsRegister/FrequencyDocument";
import CreateFrequencyDocument from "./pages/DocumentsRegister/CreateFrequencyDocument";
import CreateArchivingRelation from "./pages/DocumentsRegister/CreateArchivingRelation";
import ArchivingRelation from "./pages/DocumentsRegister/ArchivingRelation";



function App() {
	// const useStyles = makeStyles({
	// 	root: {
	// 	  width: 100,
	// 	},
	//   });
	  
		// const classes = useStyles();
	  
	return (
		<Router>
			<Header />
			<Switch>

				<Route exact path="/">
					<Home />
				</Route>
				
				<Route path="/documents-register">
					<Route exact path="/documents-register">
						<DocumentsRegister/>
					</Route>
					<Route path="/documents-register/administrative-process">
						<AdministrativeProcess/>
					</Route>
					<Route path="/documents-register/frequency-relation">
						<FrequencyRelation/>
					</Route>
					<Route path="/documents-register/frequency-document">
						<FrequencyDocument/>
					</Route>
					<Route path="/documents-register/archiving-relation">
						<ArchivingRelation/>
					</Route>
				</Route>
				<Route path="/create-archiving-relation">
					<CreateArchivingRelation/>
				</Route>
				<Route path="/create-frequency-document">
					<CreateFrequencyDocument/>
				</Route>
				<Route path="/create-frequency-relation">
					<CreateFrequencyRelation/>
				</Route>
				<Route path="/create-administrative-process">
					<CreateAdministrativeProcess/>
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
			<Footer/>
		</Router>
	);
}


/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
    </div>
  );
}
*/
export default App;
