/* eslint-disable */
import React, { useState, useEffect } from "react";

import {
	Container,
	Paper,
	makeStyles,
	Typography,
	// TextField,
	// InputAdornment,
	InputLabel,
	// IconButton,
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
	Grid,
	Checkbox,
	FormControlLabel,

} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { useHistory } from "react-router-dom";

import SenderUnitInput from "../components/Inputs/SenderUnitInput";

import CardContainer from "../components/Container/CardContainer";

import ReferencePeriodInput from "../components/Inputs/ReferencePeriodInput";

import PopUpAlert from "../components/PopUpAlert";

import { axiosProfile, axiosArchives } from "../../Api";

import { axiosProfileError, getPublicWorkers, autocompl, formatDate } from "../../support";
// import DataTable from "../components/DataTable";

const useStyles = makeStyles((theme) => ({
	title: {
		paddingTop: theme.spacing(4),
		color: "#5289B5",
		fontSize: "30px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	container: {
		marginTop: theme.spacing(6),
		alignContents: "center",
		textAlign: "center",
		marginBottom: theme.spacing(6),
	},
	input: {
		textAlign: "center",
		minWidth: "300px",
		width: "50%",
	},
	paper: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	sectionTitle: {
		width: "100%",
		textAlign: "left",
		color: "#1f3541",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	button: {
		marginTop: "25px",
		marginBottom: "25px",
		padding: "1rem",
		border: "0",
		outline: "0",
		color: "#F6F6F6",
		fontWeight: "500",
		background: "#5289B5",
		fontSize: "1rem",
		letterSpacing: "1.25px",
		borderRadius: "4px",
		transition: "filter 0.4s",
		height: "50px",

		"&:hover": {
			filter: "brightness(0.9)",
		},
	},
}));

const Report = () => {
	const history = useHistory();
	const classes = useStyles();

	const handleChange = (helper, error, main, event) => {
		helper("");
		error(false);

		main(event.target.value);
	};

	const [reportType, setReportType] = useState("");
	const [reportTypeError, setReportTypeError] = useState("");
	const [reportTypeHelperText, setReportTypeHelperText] = useState("");

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [publicWorkerInput, setPublicWorkerInput] = useState("");
	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");
	const handlePublicWorkerChange = (value) => {
		setPublicWorkerHelperText("");
		if (!value) {
			setPublicWorker(undefined);
			return;
		}
		setPublicWorker(value);
	};

	const [units, setUnits] = useState([]);
	const [senderUnit, setSenderUnit] = useState(null);
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");

	const [initialDate, setInitialDate] = useState(null);
	const [initialDateHelperText, setInitialDateHelperText] = useState("");
	const handleInitialDateChange = (date) => {
		setInitialDateHelperText("");
		setInitialDate(date);
	};

	const [finalDate, setFinalDate] = useState(null);
	const [finalDateHelperText, setFinalDateHelperText] = useState("");
	const handleFinalDateChange = (date) => {
		setFinalDateHelperText("");
		setFinalDate(date);
	};

	const [status, setStatus] = useState("");
	const [statusError, setStatusError] = useState("");
	const [statusHelperText, setStatusHelperText] = useState("");
	const handleStatusChange = (event) =>
		handleChange(setStatusHelperText, setStatusError, setStatus, event);

	const [referencePeriod, setReferencePeriod] = useState([]);
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [documentNames, setDocumentNames] = useState([]);
	const [documentName, setDocumentName] = useState("");
	const [documentNameHelperText, setDocumentNameHelperText] = useState("");
	const handleDocumentNameChange = (event) => {
		setDocumentName(event.target.value);
		setDocumentNameHelperText("");
	};

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const connectionError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const handleRequestError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");
		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const publicWorkerOptions = publicWorkers.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	const [onlyPermanents, setOnlyPermanents] = useState(false);
	const handleOnlyPermanentsChange = (event) => {
		setOnlyPermanents(event.target.checked);
	};

	const clear = () => {
		setPublicWorkerHelperText("");
		setSenderUnit(null);
		setSenderUnitHelperText("");
		setInitialDate(null);
		setInitialDateHelperText("");
		setFinalDate(null);
		setFinalDateHelperText("");
		setStatus("");
		setStatusError("");
		setStatusHelperText("");
		setReferencePeriod([]);
		setReferencePeriodHelperText("");
		setDocumentName("");
		setDocumentNameHelperText("");
	};

	const handleReportTypeChange = (event) => {
		clear();
		handleChange(
			setReportTypeHelperText,
			setReportTypeError,
			setReportType,
			event
		);
	};

	const onClick = () => {
		let url;
		let char = "?";
		let docNameParam = "";
		let initialDateParam = "";
		let finalDateParam = "";
		let onlyPermanentsParam = "";
		let senderUnitParam = "";
		let publicWorkerParam = "";
		let referencePeriodParam = "";
		let statusParam = "";

		switch (reportType) {
			case "Temporalidade":

				if (documentName) {
					docNameParam = `${char}document_name_id=${documentName.id}`
					char = char === "?" ? "&" : char;
				}

				if (initialDate) {
					initialDateParam = `${char}initial_date=${formatDate(initialDate)}`;
					char = char === "?" ? "&" : char;
				}

				if (finalDate) {
					finalDateParam = `${char}final_date=${formatDate(finalDate)}`;
					char = char === "?" ? "&" : char;
				}

				if (onlyPermanents) {
					onlyPermanentsParam = `${char}only_permanents=${onlyPermanents}`;
				}

				url = `report/${docNameParam}${initialDateParam}${finalDateParam}${onlyPermanentsParam}`;
				break;
			case "Assuntos":
				url = "document-name/"
				break;
			case "Servidores":
				url = "public-worker/";
				break;
			case "Unidades":
				url = "unity/";
				break;
			case "Caixas":
				if (senderUnit) {
					senderUnitParam = `${char}sender_unity=${senderUnit.id}`;
				}
				url = `box-archiving-report/${senderUnitParam}`;
				break;
			case "Processos Administrativos":
				if (senderUnit) {
					senderUnitParam = `${char}sender_unity=${senderUnit.id}`;
					char = char === "?" ? "&" : char;
				}

				if (initialDate) {
					initialDateParam = `${char}initial_date=${formatDate(initialDate)}`;
					char = char === "?" ? "&" : char;
				}

				if (finalDate) {
					finalDateParam = `${char}final_date=${formatDate(finalDate)}`;
				}

				url = `administrative-process-report/${senderUnitParam}${initialDateParam}${finalDateParam}`;
				break;
			case "Relações de Frequências":
				if (senderUnit) {
					senderUnitParam = `${char}sender_unity=${senderUnit.id}`;
					char = char === "?" ? "&" : char;
				}

				if (referencePeriod.length) {
					referencePeriodParam = `${char}reference_period=${referencePeriod}`;
				}

				url = `frequency-relation-report/${senderUnitParam}${referencePeriodParam}`;
				break;
			case "Folha de Frequências":
				if (publicWorker) {
					publicWorkerParam = `${char}public_worker=${publicWorker.cpf}`;
				}
				url = `frequency-sheet-report/${publicWorkerParam}`;
				break;
			case "Status":
				if (status) {
					statusParam = `${char}status=${status}`;
				}
				url = `status-report/${statusParam}`;
				break;
			default:
				url = `report/`;

		}
		localStorage.setItem("url", url);
		return history.push("/report/result");
	};

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.get("document-name/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						setDocumentNames(response.data);
					})
					.catch(() => handleRequestError());

				axiosArchives
					.get("unity/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setUnits(response.data))
					.catch(() => connectionError());

				getPublicWorkers(setPublicWorkers, connectionError);
			})
			.catch((error) => axiosProfileError(error, connectionError));
	}, []);


	// console.log(publicWorker);

	return (
		<Container maxWidth="md" className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<Typography className={classes.title}>Relatório</Typography>

				<FormControl
					fullWidth
					error={reportTypeError}
					className={classes.input}
					margin="normal"
				>
					<InputLabel id="report-type-label">Tipo de relatório</InputLabel>
					<Select
						labelId="report-type-label"
						id="report-type"
						value={reportType}
						onChange={handleReportTypeChange}
					>
						<MenuItem value="Temporalidade">Temporalidade</MenuItem>
						<MenuItem value="Assuntos">Assuntos cadastrados</MenuItem>
						<MenuItem value="Servidores">Servidores cadastrados</MenuItem>
						<MenuItem value="Unidades">Unidades cadastradas</MenuItem>
						<MenuItem value="Caixas">Caixas cadastradas</MenuItem>
						<MenuItem value="Processos Administrativos">
							Processos Administrativos
						</MenuItem>
						<MenuItem value="Relações de Frequências">
							Relações de Frequências
						</MenuItem>
						<MenuItem value="Folha de Frequências">
							Folha de Frequências
						</MenuItem>
						<MenuItem value="Status">Status</MenuItem>
					</Select>
					{reportTypeHelperText && (
						<FormHelperText>Defina o tipo do relatório</FormHelperText>
					)}
				</FormControl>
				{reportType === "Status" ? (
					<FormControl
						fullWidth
						error={statusError}
						className={classes.input}
						margin="normal"
					>
						<InputLabel id="status-label">Status</InputLabel>
						<Select
							labelId="status-label"
							id="status"
							value={status}
							onChange={handleStatusChange}
						>
							<MenuItem value="arquivado">Arquivado</MenuItem>
							<MenuItem value="desarquivado">Desarquivado</MenuItem>
							<MenuItem value="eliminado">Eliminado</MenuItem>
						</Select>
						{statusHelperText && (
							<FormHelperText>Defina o o status dos documentos</FormHelperText>
						)}
					</FormControl>
				) : (
					""
				)}
				{reportType === "Processos Administrativos" ||
					reportType === "Relações de Frequências" ||
					reportType === "Caixas" ? (
					<Grid
						container
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "-5px",
							marginBottom: "15px",
						}}
					>
						<Grid item xs={8} sm={6}>
							<SenderUnitInput
								isDetailPage={false}
								senderUnitDetail={null}
								setHelperText={setSenderUnitHelperText}
								set={setSenderUnit}
								senderUnit={senderUnit}
								units={units}
								senderUnitHelperText={senderUnitHelperText}
							/>
						</Grid>
					</Grid>
				) : (
					""
				)}
				{reportType === "Processos Administrativos" ? (
					<>
						<Grid container spacing={2} justifyContent="center">
							{/* <Grid item xs={4} sm={9} md={12}>
								Data de Arquivamento:
							</Grid> */}
							<Grid item xs={8} sm={9} md={9}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid container spacing={2} justifyContent="center">
										<Grid item xs={6} sm={4}>
											<KeyboardDatePicker
												okLabel="Confirmar"
												cancelLabel="Cancelar"
												id="initial-date-picker-dialog"
												label=""
												format="dd/MM/yyyy"
												value={initialDate}
												onChange={handleInitialDateChange}
												KeyboardButtonProps={{
													"aria-label": "change initial date",
												}}
												error={initialDateHelperText !== ""}
												helperText={initialDateHelperText}
											/>
										</Grid>
										{/* <Grid item xs={8} sm={9} md={9}>
											até
										</Grid> */}
										<Grid item xs={6} sm={4}>
											<KeyboardDatePicker
												okLabel="Confirmar"
												cancelLabel="Cancelar"
												id="final-date-picker-dialog"
												label=""
												format="dd/MM/yyyy"
												value={finalDate}
												onChange={handleFinalDateChange}
												KeyboardButtonProps={{
													"aria-label": "change final date",
												}}
												error={finalDateHelperText !== ""}
												helperText={finalDateHelperText}
											/>
										</Grid>
									</Grid>
								</MuiPickersUtilsProvider>
							</Grid>
						</Grid>
					</>
				) : (
					""
				)}

				{reportType === "Relações de Frequências" ? (
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<ReferencePeriodInput
							referencePeriod={referencePeriod}
							setReferencePeriod={setReferencePeriod}
							setReferencePeriodHelperText={setReferencePeriodHelperText}
							referencePeriodHelperText={referencePeriodHelperText}
							isDetailPage={false}
						/>
					</MuiPickersUtilsProvider>
				) : (
					""
				)}

				{reportType === "Temporalidade" && (
					<>
						{/* <FormControl fullWidth error={documentNameHelperText !== ""}> */}
						{/* <CardContainer title="Temporalidade" spacing={1}> */}
						<Grid container spacing={2} justifyContent="center">
							{/* <Grid item xs={8} sm={9} md={9}> */}
							<Grid item xs={12} sm={12} md={12}>
								<FormControl
									fullWidth
									error={reportTypeError}
									className={classes.input}
								// margin="normal"
								>
									<InputLabel
										id="report-type-label"
									>
										Nome do Documento
									</InputLabel>

									<Select
										fullWidth
										labelId="select-document-name-label"
										id="select-document-name"
										value={documentName}
										onChange={handleDocumentNameChange}
										renderValue={(value) => `${value.document_name}`}
									>
										<MenuItem key={0} value="">
											<em>Nenhum</em>
										</MenuItem>
										{documentNames.map((subjectOption) => (
											<MenuItem key={subjectOption.id} value={subjectOption}>
												{subjectOption.document_name}
											</MenuItem>
										))}
									</Select>
									{documentNameHelperText ? (
										<FormHelperText>{documentNameHelperText}</FormHelperText>
									) : (
										""
									)}
								</FormControl>
							</Grid>
							<Grid item xs={8} sm={9} md={9}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid container spacing={2} justifyContent="center">
										<Grid item xs={6} sm={4}>
											<KeyboardDatePicker
												okLabel="Confirmar"
												cancelLabel="Cancelar"
												id="initial-date-picker-dialog"
												label="Data inicial"
												format="dd/MM/yyyy"
												value={initialDate}
												onChange={handleInitialDateChange}
												KeyboardButtonProps={{
													"aria-label": "change initial date",
												}}
												error={initialDateHelperText !== ""}
												helperText={initialDateHelperText}
											/>
										</Grid>
										<Grid item xs={6} sm={4}>
											<KeyboardDatePicker
												okLabel="Confirmar"
												cancelLabel="Cancelar"
												id="final-date-picker-dialog"
												label="Data final"
												format="dd/MM/yyyy"
												value={finalDate}
												onChange={handleFinalDateChange}
												KeyboardButtonProps={{
													"aria-label": "change final date",
												}}
												error={finalDateHelperText !== ""}
												helperText={finalDateHelperText}
											/>
										</Grid>
									</Grid>
								</MuiPickersUtilsProvider>
							</Grid>
							{/* </Grid> */}
							<Grid item xs={12} sm={12} md={12}>
								<FormControlLabel
									label="Mostrar apenas com temporalidade permanente"
									control={
										<Checkbox
											checked={onlyPermanents}
											onChange={handleOnlyPermanentsChange}
										/>
									}
								/>
							</Grid>
						</Grid>
						{/* </CardContainer> */}
						{/* </FormControl> */}
					</>)}

				{reportType === "Folha de Frequências" ? (
					<Grid container style={{ display: "flex", justifyContent: "center" }}>
						<Grid item xs={8} sm={6} md={6}>
							{autocompl(
								publicWorkers,
								publicWorkerInput,
								handlePublicWorkerChange,
								setPublicWorkerInput,
								publicWorkerOptions,
								publicWorkerHelperText
							)}
						</Grid>
					</Grid>
				) : (
					""
				)}

				<button
					type="button"
					variant="contained"
					onClick={onClick}
					className={classes.button}
				>
					GERAR RELATÓRIO
				</button>
			</Paper>

			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>

		</Container >
	);
};

export default Report;
