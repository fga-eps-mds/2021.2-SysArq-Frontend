import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Paper, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";

const useStyles = makeStyles({
	input: {
		width: "100%",
		height: 36,
		marginBottom: "1rem",
		maxWidth: 908,
	},
	inputDate: {
		width: "100%",
		height: 36,
		marginTop: "2rem",
		marginBottom: "2rem",
		maxWidth: 908,
	},
});

export default function CreateDocumentType() {
	const classes = useStyles();

	const [documentName, setDocumentName] = useState("");
	const [temporalityValue, setTemporality] = useState("2021-01-01");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const onClick = () => {
		axiosArchives
			.post(`document-type/`, {
				document_name: documentName,
				temporality: temporalityValue,
			})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {
				handleShowError();
				setTimeout(handleCloseError, 3000);
			});
	};

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Nome do documento",
			setValue: setDocumentName,
			value: documentName,
			helperText: "",
			error: false,
			setHelperText: () => { "" },
			setError: () => { "" }
		},
		{
			type: "date",
			placeholder: "Temporalidade",
			setValue: setTemporality,
			value: temporalityValue,
			helperText: "",
			error: false,
			setHelperText: () => { "" },
			setError: () => { "" }
		},
	]);

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar tipo do documento";

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? (
				<Alert severity="error">Erro de conexão!</Alert>
			) : (
				""
			)}
			<Paper className="form-cadastro-container" elevation={10}>
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
				<div className="inputs-container">
					<Container className="container">
						<Grid container spacing={2}>
							{fields.map((item, key) => {
								const input =
									item.type !== "date" ? (
										<Grid item xs={12} sm={12} md={12} key={key.toString()}>
											<TextField
												id={item.placeholder}
												label={item.placeholder}
												type={item.type}
												value={item.value}
												onChange={(event) => {
													item.setValue(event.target.value)
													item.setHelperText("")
													item.setError(false)
												}} 
												className={classes.input}
												inputProps={{ maxLength: "100" }}
											/>
										</Grid>
									) : (
											<Grid item xs={12} sm={12} md={12} key={key.toString()}>
											<TextField
												id={item.placeholder}
												label={item.placeholder}
												type={item.type}
												value={item.value}
												onChange={(event) => {
													item.setValue(event.target.value)
													item.setHelperText("")
													item.setError(false)
												}} 
												className={classes.inputDate}
											/>
										</Grid>
									);
								return input;
							})}
						</Grid>
					</Container>
				</div>
				<button data-testid="click" type="button" onClick={onClick}>
					CADASTRAR
				</button>
			</Paper>
		</div>
	);
}
