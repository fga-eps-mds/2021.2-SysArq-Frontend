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

import ReferencePeriodInput from "../components/Inputs/ReferencePeriodInput";

import PopUpAlert from "../components/PopUpAlert";

import { axiosProfile, axiosArchives } from "../../Api";

import { axiosProfileError, getPublicWorkers, autocompl } from "../../support";
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
	const [senderUnit, setSenderUnit] = useState("");
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
	const handleDocumentNameChange = (name) => {
		setDocumentName(name);
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

	const clear = () => {
		setPublicWorkerHelperText("");
		setSenderUnit("");
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
		localStorage.setItem("url", "report/");
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

	const onlyPermanents = false;

	console.log(publicWorker);

	return (
		<Container maxWidth="md" className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<Typography className={classes.title}>Relatório</Typography>

				<FormControl
					fullwidth
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
						<MenuItem value="Assuntos">Assuntos cadastradas</MenuItem>
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
						fullwidth
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
							<MenuItem value="AD">Arquivado</MenuItem>
							<MenuItem value="AL">Desarquivado</MenuItem>
							<MenuItem value="VI">Eliminado</MenuItem>
						</Select>
						{statusHelperText && (
							<FormHelperText>Defina o o status dos documentos</FormHelperText>
						)}
					</FormControl>
				) : (
					""
				)}
				{reportType === "Processos Administrativos" ||
				reportType === "Relações de Frequências" ? (
					<Grid
						container
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "-5px",
							marginBottom: "15px",
						}}
					>
						<Grid item xs={12} sm={6}>
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
						<div style={{ marginRight: "284px", fontWeight: "bold" }}>
							<Typography className={classes.sectionTitle}>
								Data de Arquivamento:
							</Typography>
						</div>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container spacing={2}>
								<Grid item xs={6} sm={4}>
									<KeyboardDatePicker
										okLabel="Confirmar"
										cancelLabel="Cancelar"
										style={{ width: "69%", marginLeft: "77%" }}
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
								<div style={{ marginTop: "25px", marginLeft: "144px" }}>
									até
								</div>
								<Grid item xs={6} sm={4}>
									<KeyboardDatePicker
										okLabel="Confirmar"
										cancelLabel="Cancelar"
										style={{ width: "69%", marginRight: "73px" }}
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

				{reportType === "Temporalidade" ? (
					<>
						<FormControl fullWidth error={documentNameHelperText !== ""}>
							<InputLabel
								id="select-document_name-label"
								style={{ marginLeft: "25%" }}
							>
								Nome do Documento
							</InputLabel>
							<Select
								style={{ textAlign: "center", width: "50%", marginLeft: "25%" }}
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
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container spacing={2}>
								<Grid item xs={6} sm={4}>
									<KeyboardDatePicker
										okLabel="Confirmar"
										cancelLabel="Cancelar"
										style={{ width: "75%", marginLeft: "77%" }}
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
										style={{ width: "75%", marginLeft: "53%" }}
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
						<FormControlLabel
							style={{ marginTop: "2%" }}
							control={<Checkbox {...onlyPermanents} />}
							label="Mostrar apenas com temporalidade permanente"
						/>
					</>
				) : (
					""
				)}
				{reportType === "Folha de Frequências" ? (
					<Grid container style={{ display: "flex", justifyContent: "center" }}>
						<Grid item xs={12} sm={6}>
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
		</Container>
	);
};

export default Report;
