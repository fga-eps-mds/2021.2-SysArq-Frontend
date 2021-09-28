import React, { useState, useEffect } from "react";

import {
	makeStyles,
	Grid,
	Typography,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import Alert from "@material-ui/lab/Alert";

import TimelapseIcon from "@material-ui/icons/Timelapse";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import {
	initialDate,
	formatDate,
	initialPeriod,
	isDateNotValid,
} from "../../../support";

import { axiosArchives } from "../../../Api";

import DocumentsContainer from "../../components/Container/DocumentsContainer";

import NumberInput from "../../components/Inputs/NumberInput";
import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import ReceivedDateInput from "../../components/Inputs/ReceivedDateInput";
import DocumentTypeInput from "../../components/Inputs/DocumentTypeInput";
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
	const [referencePeriod, setReferencePeriod] = useState([
		formatDate(initialPeriod),
	]);

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

	const handleOpenNewPeriodDialog = () => setOpenNewPeriodDialog(true);

	const handleCloseNewPeriodDialog = () => setOpenNewPeriodDialog(false);

	const handlePeriodChange = (date) => {
		setPeriodHelperText("");
		setPeriod(date);
	};

	const handleAddNewPeriodDialog = () => {
		if (isDateNotValid(period, setPeriodHelperText, "period", "required")) {
			return "period error";
		}

		const periodList = referencePeriod;
		const formattedPeriod = formatDate(period);

		if (periodList.indexOf(formattedPeriod) !== -1) {
			setPeriodHelperText("Período já adicionado");
			return "period already added error";
		}

		periodList.push(formattedPeriod);
		setReferencePeriod(periodList);
		setReferencePeriodHelperText("");

		setOpenNewPeriodDialog(false);
		return "added period";
	};

	const handleDeletePeriod = (deletedPeriod) => {
		const periodList = referencePeriod;
		const newPeriodList = periodList.filter((item) => item !== deletedPeriod);

		setReferencePeriod(newPeriodList);
	};

	const handleAlertClose = () => setOpenAlert(false);

	const connectionError = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const onSuccess = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Documento cadastrado!");

		setNumber("");
		setProcessNumber("");
		setReceivedDate(initialDate);
		setDocumentType("");
		setSenderUnit("");
		setAbbreviation("");
		setShelf("");
		setRack("");
		setNotes("");
		setReferencePeriod([formatDate(initialPeriod)]);
		setPeriod(initialDate);
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
				setReceivedDateHelperText,
				"date",
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

		if (referencePeriod.length === 0) {
			setReferencePeriodHelperText(
				"Não é possível criar uma Relação de Frequências sem um Período de Referência."
			);
			setLoading(false);
			return "referencePeriod error";
		}

		axiosArchives
			.post("frequency-relation/", {
				process_number: processNumber,
				notes,
				filer_user: "filer_user",
				number,
				received_date: formatDate(receivedDate),
				reference_period: referencePeriod,
				sender_unity: senderUnit.id,
				abbreviation_id: abbreviation.id,
				shelf_id: shelf.id,
				rack_id: rack.id,
				document_type_id: documentType.id,
			})
			.then(() => onSuccess())
			.catch(() => connectionError());

		return "post done";
	};

	useEffect(() => {
		axiosArchives
			.get("unity/")
			.then((response) => setUnits(response.data))
			.catch(() => connectionError());
	}, []);

	return (
		<DocumentsContainer title="Relação de Frequências" spacing={1}>
			<Grid item xs={12} sm={12} md={4}>
				<NumberInput
					setHelperText={setNumberHelperText}
					set={setNumber}
					number={number}
					helperText={numberHelperText}
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
				<ReceivedDateInput
					setHelperText={setReceivedDateHelperText}
					set={setReceivedDate}
					receivedDate={receivedDate}
					helperText={receivedDateHelperText}
				/>
			</Grid>

			<DocumentTypeInput
				setHelperText={setDocumentTypeHelperText}
				set={setDocumentType}
				connectionError={connectionError}
				documentType={documentType}
				documentTypeHelperText={documentTypeHelperText}
			/>

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

				{referencePeriodHelperText !== "" ? (
					<Alert styles={{ width: "100%" }} severity="error">
						{referencePeriodHelperText}
					</Alert>
				) : (
					""
				)}

				<div className={classes.chips}>
					{referencePeriod.map((addedPeriod) => (
						<Chip
							icon={<TimelapseIcon />}
							label={`${addedPeriod.substring(5, 7)}/${addedPeriod.substring(
								0,
								4
							)}`}
							color="secondary"
							deleteIcon={<CancelIcon data-testid="delete" />}
							onDelete={() => handleDeletePeriod(addedPeriod)}
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
				aria-labelledby="newPeriod-dialog-title"
			>
				<DialogTitle id="newPeriod-dialog-title">Novo</DialogTitle>
				<DialogContent>
					<KeyboardDatePicker
						style={{ width: "100%" }}
						id="period-date-picker-dialog"
						label="Período"
						format="MM/yyyy"
						value={period}
						onChange={handlePeriodChange}
						openTo="month"
						views={["month", "year"]}
						okLabel="Confirmar"
						cancelLabel="Cancelar"
						error={periodHelperText !== ""}
						helperText={periodHelperText}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNewPeriodDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleAddNewPeriodDialog} color="primary">
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
