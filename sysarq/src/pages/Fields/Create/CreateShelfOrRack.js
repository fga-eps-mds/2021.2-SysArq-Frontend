import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
import { axiosProfileError } from "../../../support";
import PopUpAlert from "../../components/PopUpAlert";

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

export default function CreateShelfOrRack({ urlType }) {
	const classes = useStyles();

	const [type, setType] = useState("Estante");
	const [numberE, setNumberE] = useState("");
	const [numberP, setNumberP] = useState("");

	const [shelfHelperText, setShelfHelperText] = useState("");
	const [shelfNumberError, setShelfNumberError] = useState(false);

	const [rackHelperText, setRackHelperText] = useState("");
	const [rackNumberError, setRackNumberError] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const connectionError = () => {
		setOpenAlert(true);
		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
		setSeverityAlert("error");
	};

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
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				if (type === "Estante") {
					axiosArchives
						.post(
							`shelf/`,
							{
								number: numberE,
							},
							{
								headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
							}
						)
						.then(() => {
							setOpenAlert(true);
							setSeverityAlert("success");
							setAlertHelperText("Estante cadastrada!");
						})
						.catch(() => {
							connectionError();
						});
				} else {
					axiosArchives
						.post(
							`rack/`,
							{
								number: numberP,
							},
							{
								headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
							}
						)
						.then(() => {
							setOpenAlert(true);
							setSeverityAlert("success");
							setAlertHelperText("Prateleira cadastrada!");
						})
						.catch(() => {
							connectionError();
						});
				}
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});

		setShelfNumberError(false);
		setShelfHelperText("");

		setRackNumberError(false);
		setRackHelperText("");

		return null;
	};

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar estantes e prateleiras";

	useEffect(() => {
		setType(urlType === "shelf" ? "Estante" : "Prateleira");
	}, []);

	return (
		<div className="create-form-container">
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
										label="Número da estante*"
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
										label="Número da prateleira*"
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
			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</div>
	);
}

CreateShelfOrRack.propTypes = {
	urlType: PropTypes.string.isRequired,
};
