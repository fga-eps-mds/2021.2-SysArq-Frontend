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
import DataTable from "../../components/DataTable";
import FieldsCreate from "../../components/Actions/FieldsCreate";

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

	const [fileLocation, setFileLocation] = useState("");
	const [fileLocationHelperText, setFileLocationHelperText] = useState("");
	const [fileLocationNumberError, setFileLocationNumberError] = useState("");

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

	const handleRequestError = (value, valueType) => {
		setOpenAlert(true);
		setSeverityAlert("error");
		if (value === 400) {
			setAlertHelperText(`${valueType} já cadastrada`);
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página"
			);
		}
	};

	const handleValueChange = (event) => {
		setType(event.target.value);
		setNumberE("");
		setNumberP("");
		setFileLocation("");
	};

	const clear = () => {
		setNumberE("");
		setNumberP("");
		setFileLocation("");
	};

	const onSuccess = () => {
		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText(`${type} cadastrada!`);
		clear();
		window.location.reload();
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
		if (fileLocation === "" && type === "Localidade") {
			setFileLocationNumberError(true);
			setFileLocationHelperText("Localidade não pode ser vazia");
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
							onSuccess();
						})
						.catch((err) => {
							if (err.response.status === 401) {
								axiosProfileError(err);
								return false;
							}
							handleRequestError(err.response.status, type);
							return false;
						});
				} else if (type === "Prateleira") {
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
							onSuccess();
						})
						.catch((err) => {
							if (err.response.status === 401) {
								axiosProfileError(err);
								return false;
							}
							handleRequestError(err.response.status, type);
							return false;
						});
				} else {
					axiosArchives
						.post(
							`file-location/`,
							{
								file: fileLocation,
							},
							{
								headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
							}
						)
						.then(() => {
							onSuccess();
						})
						.catch((err) => {
							if (err.response.status === 401) {
								axiosProfileError(err);
								return false;
							}
							handleRequestError(err.response.status, type);
							return false;
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

		setFileLocationNumberError(false);
		setFileLocationHelperText("");

		return null;
	};

	function menuDocumentsDropIn() {
		switch (type) {
			case "Estante":
				return (
					<Grid item xs={12} sm={12} md={12} key={2}>
						<TextField
							id="Estante"
							label="Número da estante*"
							type="number"
							value={numberE}
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
				);

			case "Prateleira":
				return (
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							key={1}
							id="Prateleira"
							label="Número da prateleira*"
							type="number"
							value={numberP}
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
				);

			case "Localidade":
				return (
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							key={1}
							id="Localidade"
							label="Localidade do Arquivo*"
							type="text"
							value={fileLocation}
							onChange={(event) => {
								setFileLocation(event.target.value);
								setFileLocationNumberError(false);
								setFileLocationHelperText("");
							}}
							className={classes.input}
							helperText={fileLocationHelperText}
							error={fileLocationNumberError}
						/>
					</Grid>
				);
			default:
				break;
		}

		return null;
	}

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Localização do Arquivo";

	useEffect(() => {
		setType(urlType === "shelf" ? "Estante" : "Localidade");
	}, []);

	return (
		<>
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
											<MenuItem key={2} value="Localidade">
												Localidade do Arquivo
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								{
									// ! Não mexe
									menuDocumentsDropIn()
								}
							</Grid>
						</Container>
					</div>
					<FieldsCreate onSubmit={onClick} clearFunc={clear} />
				</Paper>
				<PopUpAlert
					open={openAlert}
					handleClose={handleAlertClose}
					severity={severityAlert}
					helperText={alertHelperText}
				/>
			</div>

			<div
				style={{
					display: "flex",
					marginLeft: "10px",
					marginRight: "10px",
					marginBottom: "100px",
				}}
			>
				<DataTable title="Estante" url="shelf/" />
				<div style={{ width: "25px" }} />
				<DataTable title="Prateleira" url="rack/" />
				<div style={{ width: "25px" }} />
				<DataTable title="Localidade" url="file-location/" />
			</div>
		</>
	);
}

CreateShelfOrRack.propTypes = {
	urlType: PropTypes.string.isRequired,
};
