import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Paper, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";

const useStyles = makeStyles((theme) => ({
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
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),

		margin: "auto",
		textAlign: "center",
	},
}));

export default function CreateBoxAbbreviation() {
	const classes = useStyles();
	const [boxNumber, setBoxNumber] = useState("");
	const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [boxName, setBoxName] = useState("");
	const [boxYear, setBoxYear] = useState("");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);

	const [yearHelperText, setYearHelperText] = useState("");

	const [yearError, setYearError] = useState(false);

	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const onClick = () => {
		if (parseInt(boxYear, 10) < 1900) {
			setYearError(true);
			setYearHelperText("Ano inválido");
			return "Erro";
		}
		axiosArchives
			.post(`box-abbreviation/`, {
				number: boxNumber,
				abbreviation: boxAbbreviation,
				name: boxName,
				year: boxYear,
			})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {
				handleShowError();
				setTimeout(handleCloseError, 3000);
			});
		setYearError(false);
		setYearHelperText("");
		return null;
	};

	const fields = [
		{
			type: "number",
			placeholder: "Número da caixa",
			setValue: setBoxNumber,
			value: boxNumber,
			helperText: "",
			error: false,
			setHelperText: () => {
				"";
			},
			setError: () => {
				"";
			},
		},
		{
			type: "text",
			placeholder: "Sigla da caixa",
			setValue: setBoxAbbreviation,
			value: boxAbbreviation,
			helperText: "",
			error: false,
			setHelperText: () => {
				"";
			},
			setError: () => {
				"";
			},
		},
		{
			type: "text",
			placeholder: "Nome completo",
			setValue: setBoxName,
			value: boxName,
			helperText: "",
			error: false,
			setHelperText: () => {
				"";
			},
			setError: () => {
				"";
			},
		},
		{
			type: "number",
			placeholder: "Ano",
			setValue: setBoxYear,
			value: boxYear,
			helperText: yearHelperText,
			error: yearError,
			setHelperText: setYearHelperText,
			setError: setYearError,
		},
	];

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar caixa";

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
								const input = (
									<Grid item xs={12} sm={12} md={12} key={key.toString()}>
										<TextField
											id={item.placeholder}
											label={item.placeholder}
											type={item.type}
											value={item.value}
											onChange={(event) => {
												item.setValue(event.target.value);
												item.setHelperText("");
												item.setError(false);
											}}
											className={classes.input}
											helperText={item.helperText}
											error={item.error}
											inputProps={{ maxLength: "100" }}
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
