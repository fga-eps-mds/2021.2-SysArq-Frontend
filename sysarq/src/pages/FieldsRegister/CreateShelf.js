import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";

export default function CreateShelf() {
	const useStyles = makeStyles({
		input: {
			width: "100%",
			height: 36,
			marginBottom: "1rem",
			maxWidth: 908,
			marginTop: "1rem",
		},
		inputDate: {
			width: "100%",
			height: 36,
			marginTop: "2rem",
			marginBottom: "2rem",
			maxWidth: 908,
		},
	});
	const classes = useStyles();

	const [type, setType] = useState("Estante");
	const [numberE, setNumberE] = useState(0);
	const [numberP, setNumberP] = useState(0);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const handleValueChange = (event) => {
		setType(event.target.value);
	};

	const onClick = () => {
		if (type === "Estante") {
			axiosArchives
				.post(`shelf/`, {
					number: numberE,
				})
				.then(() => {
					handleShow();
					setTimeout(handleClose, 3000);
				})
				.catch(() => {
					handleShowError();
					setTimeout(handleCloseError, 3000);
				});
		} else {
			axiosArchives
				.post(`rack/`, {
					number: numberP,
				})
				.then(() => {
					handleShow();
					setTimeout(handleClose, 3000);
				})
				.catch(() => {
					handleShowError();
					setTimeout(handleCloseError, 3000);
				});
		}
	};

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar estantes e prateleiras";

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
					<FormControl fullWidth>
						<InputLabel id="select-shelf-rack-label">Selecione</InputLabel>
						<Select
							style={{ textAlign: "left" }}
							labelId="select-shelf-rack-label"
							id="select-shelf"
							value={type}
							onChange={handleValueChange}
							renderValue={(value) => `${value}`}
						>
							<MenuItem key={0} value="Estante">
								Estante
							</MenuItem>
							<MenuItem key={1} value="Prateleira">
								Prateleira
							</MenuItem>
						</Select>
					</FormControl>
					{type === "Estante" ? (
						<TextField
							key={0}
							id="Estante"
							label="Número da estante"
							type="number"
							onChange={({ target }) => setNumberE(target.value)}
							className={classes.input}
						/>
					) : (
						<TextField
							key={1}
							id="Prateleira"
							label="Número da prateleira"
							type="number"
							onChange={({ target }) => setNumberP(target.value)}
							className={classes.input}
						/>
					)}
				</div>
				<button data-testid="click" type="button" onClick={onClick}>
					CADASTRAR
				</button>
			</Paper>
		</div>
	);
}
