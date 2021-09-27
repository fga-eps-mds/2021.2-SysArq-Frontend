import React, { useState, useEffect } from "react";

import {
	makeStyles,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Typography,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import TimelapseIcon from "@material-ui/icons/Timelapse";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { initialDate, initialPeriod, isDateNotValid } from "../../../support";

import { axiosArchives } from "../../../Api";

import DocumentsContainer from "../../components/Container/DocumentsContainer";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import AbbreviationInput from "../../components/Inputs/AbbreviationInput";
import ShelfInput from "../../components/Inputs/ShelfInput";
import RackInput from "../../components/Inputs/RackInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert"; //

import "date-fns";

const useStyles = makeStyles((theme) => ({
	referencePeriodTitle: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(1),

		width: "100%",
		textAlign: "left",

		color: "#787878",
		fontSize: "15px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},

	chips: {
		display: "flex",
		justifyContent: "left",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
}));

const CreateFrequencyRelation = () => {
	const classes = useStyles();

	const [documentTypes, setDocumentTypes] = useState([]);
	const [units, setUnits] = useState([]);

	const [number, setNumber] = useState("");
	const [processNumber, setProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(initialDate);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [notes, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState([initialPeriod]);

	const [numberHelperText, setNumberHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [documentTypeHelperText, setDocumentTypeHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [openNewPeriodDialog, setOpenNewPeriodDialog] = useState(false);
	const [period, setPeriod] = useState(initialPeriod);
	const [periodHelperText, setPeriodHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleNumberChange = (event) => {
		setNumberHelperText("");
		setNumber(event.target.value);
	};

	const handleReceivedDateChange = (date) => {
		setReceivedDateHelperText("");
		setReceivedDate(date);
	};

	const handleDocumentTypeChange = (event) => {
		setDocumentTypeHelperText("");
		setDocumentType(event.target.value);
	};

	const handleOpenNewPeriodDialog = () => setOpenNewPeriodDialog(true);

	const handleCloseNewPeriodDialog = () => setOpenNewPeriodDialog(false);

	const handlePeriodChange = (date) => {
		setPeriodHelperText("");
		setPeriod(date);
	};

	const handleConfirmNewPeriodDialog = () => {
		if (isDateNotValid(period, setPeriodHelperText, "period", "required")) {
			return "period error";
		}

		const periodList = referencePeriod;
		const formattedPeriod = period.toISOString().substring(0, 10);
		
		if (periodList.indexOf(period) !== -1){ 
			setPeriodHelperText("Período já adicionado")
			return "period already added error";
		}

		periodList.push(period)
		setReferencePeriod(periodList);

		setOpenNewPeriodDialog(false);
		return "added period";
	};

	const handleDelete = (period1) => {
		console.log(period1 === referencePeriod[0]);
		console.log(referencePeriod);
		setReferencePeriod([]);

		setReferencePeriodHelperText("");
		console.log(referencePeriodHelperText);
	};

	// const handleReferenceChange = (date) => {
	// 	setReferenceHelperText("");
	// 	setReference(date);
	// };

	const handleAlertClose = () => setOpenAlert(false);

	const connectionError = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const onSubmit = () => {
		setLoading(true);

		if (number === "") {
			setNumberHelperText("Insira o número");
			setLoading(false);
			return "number error";
		}

		if (processNumber === "") {
			setProcessNumberHelperText("Insira o número do processo");
			setLoading(false);
			return "processNumber error";
		}

		if (
			isDateNotValid(
				receivedDate,
				"recebimento",
				setReceivedDateHelperText,
				"required"
			)
		) {
			setLoading(false);
			return "noticeDate error";
		}

		if (documentType === "") {
			setDocumentTypeHelperText("Selecione um tipo de documento");
			setLoading(false);
			return "documentType error";
		}

		if (senderUnit === "") {
			setSenderUnitHelperText("Selecione uma unidade");
			setLoading(false);
			return "senderUnit error";
		}

		// if (referencePeriod === []) {
			//
		// 	setLoading(false);
		// 	return "referencePeriod error";
		// }

		// axiosArchives
		// 	.post("administrative-process/", {
		// 		notice_date: noticeDate.toISOString().substring(0, 10),
		// 		archiving_date: archivingDate.toISOString().substring(0, 10),
		// 		reference_month_year:
		// 			reference !== null ? reference.toISOString().substring(0, 10) : null,
		// 		process_number: processNumber,
		// 		cpf_cnpj: personRegistry,
		// 		interested,
		// 		subject_id: subject.id,
		// 		dest_unity_id: destinationUnit.id,
		// 		sender_unity: senderUnit.id,
		// 		sender_user: senderWorker,
		// 		abbreviation_id: abbreviation.id,
		// 		shelf_id: shelf.id,
		// 		rack_id: rack.id,
		// 		is_filed: isStatusFiled(status),
		// 		is_eliminated: status === "Eliminado",
		// 		unity_id: unarchiveDestinationUnit.id,
		// 		send_date:
		// 			unarchiveDate !== null
		// 				? unarchiveDate.toISOString().substring(0, 10)
		// 				: null,
		// 		administrative_process_number: unarchiveProcessNumber,
		// 		notes,
		// 		filer_user: "filer_user", //
		// 	})
		// 	.then(() => onSuccess())
		// 	.catch(() => connectionError());

		return "post done";
	};

	useEffect(() => {
		axiosArchives
			.get("document-type/")
			.then((response) => setDocumentTypes(response.data))
			// .catch(() => connectionError());

		axiosArchives
			.get("unity/")
			.then((response) => setUnits(response.data))
			// .catch(() => connectionError());
	}, []);

	return (
		<DocumentsContainer title="Relação de Frequências" spacing={1}>
			<Grid item xs={12} sm={12} md={4}>
				<TextField
					fullWidth
					id="number"
					label="Número*"
					value={number}
					onChange={handleNumberChange}
					error={numberHelperText !== ""}
					helperText={numberHelperText}
					inputProps={{ maxLength: 20 }}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<NumberProcessInput
					setHelperText={setProcessNumberHelperText}
					set={setProcessNumber}
					number={processNumber}
					helperText={processNumberHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<KeyboardDatePicker
					clearable
					clearLabel="Limpar"
					showTodayButton
					okLabel="Confirmar"
					cancelLabel=""
					style={{ width: "100%" }}
					id="received-date-picker-dialog"
					label="Data de Recebimento*"
					format="dd/MM/yyyy"
					todayLabel="Hoje"
					value={receivedDate}
					onChange={handleReceivedDateChange}
					KeyboardButtonProps={{
						"aria-label": "change received date",
					}}
					DialogProps
					error={receivedDateHelperText !== ""}
					helperText={receivedDateHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<FormControl fullWidth error={documentTypeHelperText !== ""}>
					<InputLabel id="select-documentType-label">
						Tipo de Documento*
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-documentType-label"
						id="select-documentType"
						value={documentType}
						onChange={handleDocumentTypeChange}
						renderValue={(value) => `${value.document_name}`}
					>
						<MenuItem key={0} value="">
							<em>Nenhum</em>
						</MenuItem>

						{documentTypes.map((documentTypeOption) => (
							<MenuItem key={documentTypeOption.id} value={documentTypeOption}>
								{documentTypeOption.document_name}
							</MenuItem>
						))}
					</Select>
					{documentTypeHelperText ? (
						<FormHelperText>{documentTypeHelperText}</FormHelperText>
					) : (
						""
					)}
				</FormControl>
			</Grid>

			<SenderUnitInput
				setHelperText={setSenderUnitHelperText}
				set={setSenderUnit}
				senderUnit={senderUnit}
				units={units}
				senderUnitHelperText={senderUnitHelperText}
			/>

			<AbbreviationInput
				abbreviation={abbreviation}
				set={setAbbreviation}
				connectionError={connectionError}
			/>

			<ShelfInput
				shelf={shelf}
				set={setShelf}
				connectionError={connectionError}
			/>

			<RackInput rack={rack} set={setRack} connectionError={connectionError} />

			<NotesInput set={setNotes} notes={notes} />

			<Grid item xs={12} sm={12} md={12}>
				<Typography className={classes.referencePeriodTitle}>
					Período de Referência
				</Typography>
				<div className={classes.chips}>
					{referencePeriod.map((period1) => (
						<Chip
							icon={<TimelapseIcon />}
							label={`${period1.getMonth() + 1}/${period1.getFullYear()}`}
							color="secondary"
							// onDelete={() => null}
						/>
					))}
					<Chip
						label="Adicionar"
						icon={<AddCircleIcon />}
						color="primary"
						onClick={handleOpenNewPeriodDialog}
						clickable
					/>
				</div>
			</Grid>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewPeriodDialog}
				onClose={handleCloseNewPeriodDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Novo</DialogTitle>
				<DialogContent>
					<KeyboardDatePicker
						okLabel="Confirmar"
						cancelLabel="Cancelar"
						style={{ width: "100%" }}
						id="period-date-picker-dialog"
						openTo="year"
						views={["year", "month"]}
						label="Período"
						format="MM/yyyy"
						value={period}
						// onChange={handlePeriodChange}
						error={periodHelperText !== ""}
						helperText={periodHelperText}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNewPeriodDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleCloseNewPeriodDialog} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>

			<DocumentsCreate loading={loading} onSubmit={onSubmit} />

			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</DocumentsContainer>
	);
};

export default CreateFrequencyRelation;
