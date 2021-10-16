import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import {
	FormControl,
	Grid,
	Container,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";

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

export default function CreateShelf() {
	const classes = useStyles();

	const [type, setType] = useState("Estante");
	const [numberE, setNumberE] = useState("");
	const [numberP, setNumberP] = useState("");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const [shelfHelperText, setShelfHelperText] = useState("");
	const [shelfNumberError, setShelfNumberError] = useState(false);

	const [rackHelperText, setRackHelperText] = useState("");
	const [rackNumberError, setRackNumberError] = useState(false);

	const handleValueChange = (event) => {
		setType(event.target.value);
	};

	const onClick = () => {
		if (numberE === "" && type === "Estante") {
			setShelfNumberError(true);
			setShelfHelperText("Estante não pode ser vazia");
			return "Erro";
		}
		if (numberP === "" && type === "Prateleira") {
			setRackNumberError(true);
			setRackHelperText("Prateleira não pode ser vazia");
			return "Erro";
		}
		if (type === "Estante") {
			axiosProfile
				.post(`api/token/refresh/`, {
					refresh: localStorage.getItem("tkr"),
				})
				.then((res) => {
					localStorage.setItem("tk", res.data.access);
					localStorage.setItem("tkr", res.data.refresh);
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
				})
				.catch(() => {});
		} else {
			axiosProfile
				.post(`api/token/refresh/`, {
					refresh: localStorage.getItem("tkr"),
				})
				.then((res) => {
					localStorage.setItem("tk", res.data.access);
					localStorage.setItem("tkr", res.data.refresh);
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
				})
				.catch(() => {});
		}
		setShelfNumberError(false);
		setShelfHelperText("");

		setRackNumberError(false);
		setRackHelperText("");

		return null;
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
					<Container className="container">
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={12} key={1}>
								<FormControl fullWidth>
									<InputLabel id="select-shelf-rack-label">
										Selecione
									</InputLabel>
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
							</Grid>
							{type === "Estante" ? (
								<Grid item xs={12} sm={12} md={12} key={2}>
									<TextField
										id="Estante"
										label="Número da estante"
										type="number"
										onChange={(event) => {
											setNumberE(event.target.value);
											setShelfNumberError(false);
											setShelfHelperText("");
										}}
										className={classes.input}
										helperText={shelfHelperText}
										error={shelfNumberError}
									/>
								</Grid>
							) : (
								<Grid item xs={12} sm={12} md={12}>
									<TextField
										key={1}
										id="Prateleira"
										label="Número da prateleira"
										type="number"
										onChange={(event) => {
											setNumberP(event.target.value);
											setRackNumberError(false);
											setRackHelperText("");
										}}
										className={classes.input}
										helperText={rackHelperText}
										error={rackNumberError}
									/>
								</Grid>
							)}
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
