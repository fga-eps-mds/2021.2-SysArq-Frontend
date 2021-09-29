import React, { useState, useEffect } from "react";

import {
	Grid,
	TextField,
	Typography,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import CloseIcon from "@material-ui/icons/Close";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import CancelIcon from "@material-ui/icons/Cancel";

import { KeyboardDatePicker } from "@material-ui/pickers";

// import { DropzoneDialog } from "material-ui-dropzone";

import {
	initialDate,
	isInt,
	isDateNotValid,
	formatDate,
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

import SpecialLabels from "../../components/SpecialLabels";

import ChipsContainer from "../../components/Container/ChipsContainer";
import AddChip from "../../components/AddChip";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateArchivingRelation = () => {
	const [units, setUnits] = useState([]);

	const [numberOfBoxes, setNumberOfBoxes] = useState("");
	const [number, setNumber] = useState("");
	const [processNumber, setProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(initialDate);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [notes, setNotes] = useState("");
	const [originBoxes, setOriginBoxes] = useState([]);
	// const [file, setFile] = useState("");

	const [numberHelperText, setNumberHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [documentTypeHelperText, setDocumentTypeHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");

	const [openNewOriginBoxDialog, setOpenNewOriginBoxDialog] = useState(false);

	const [newOriginBoxNumber, setNewOriginBoxNumber] = useState("");
	const [newOriginBoxNumberHelperText, setNewOriginBoxNumberHelperText] =
		useState("");

	const [newOriginBoxYear, setNewOriginBoxYear] = useState("");
	const [newOriginBoxYearHelperText, setNewOriginBoxYearHelperText] =
		useState("");

	const [openNewOriginBoxSubjectDialog, setOpenNewOriginBoxSubjectDialog] =
		useState(false);

	const [selectedOriginBoxIndex, setSelectedOriginBoxIndex] = useState(-1);

	const [newOriginBoxSubject, setNewOriginBoxSubject] = useState("");
	const [newOriginBoxSubjectHelperText, setNewOriginBoxSubjectHelperText] =
		useState("");

	const [
		openNewOriginBoxSubjectDateDialog,
		setOpenNewOriginBoxSubjectDateDialog,
	] = useState(false);

	const [selectedOriginBoxSubjectIndex, setSelectedOriginBoxSubjectIndex] =
		useState(-1);

	const [newOriginBoxSubjectDate, setNewOriginBoxSubjectDate] =
		useState(initialDate);
	const [
		newOriginBoxSubjectDateHelperText,
		setNewOriginBoxSubjectDateHelperText,
	] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleNumberOfBoxesChange = (event) =>
		setNumberOfBoxes(event.target.value);

	const handleOpenNewOriginBoxDialog = () => setOpenNewOriginBoxDialog(true);

	const handleCloseNewOriginBoxDialog = () => setOpenNewOriginBoxDialog(false);

	const handleNewOriginBoxNumberChange = (event) => {
		setNewOriginBoxNumberHelperText("");
		setNewOriginBoxNumber(event.target.value);
	};

	const handleNewOriginBoxYearChange = (event) => {
		setNewOriginBoxYearHelperText("");
		setNewOriginBoxYear(event.target.value);
	};

	const handleAddNewOriginBox = () => {
		if (newOriginBoxNumber === "") {
			setNewOriginBoxNumberHelperText("Insira um número");
			return "newOriginBoxNumber error";
		}

		if (newOriginBoxYear === "") {
			setNewOriginBoxYearHelperText("Insira um ano");
			return "newOriginBoxYear required error";
		}

		if (!isInt(newOriginBoxYear) || parseInt(newOriginBoxYear, 10) < 1900) {
			setNewOriginBoxYearHelperText("Insira um ano válido");
			return "newOriginBoxYear content error";
		}

		const originBoxesList = originBoxes;

		const newOriginBox = {
			number: newOriginBoxNumber,
			year: newOriginBoxYear,
			subjects_list: [],
		};

		originBoxesList.push(newOriginBox);
		setOriginBoxes(originBoxesList);

		setOpenNewOriginBoxDialog(false);
		return "added originBox";
	};

	const handleDeleteOriginBox = (originBoxIndex) => {
		const newOriginBoxesList = [];

		for (let i = 0; i < originBoxes.length; i += 1) {
			if (i !== originBoxIndex) {
				newOriginBoxesList.push(originBoxes[i]);
			}
		}

		setOriginBoxes(newOriginBoxesList);
	};

	const handleOpenNewOriginBoxSubjectDialog = (originBoxIndex) => {
		setSelectedOriginBoxIndex(originBoxIndex);
		setOpenNewOriginBoxSubjectDialog(true);
	};

	const handleCloseNewOriginBoxSubjectDialog = () => {
		setSelectedOriginBoxIndex(-1);
		setOpenNewOriginBoxSubjectDialog(false);
	};

	const handleNewOriginBoxSubjectChange = (event) => {
		setNewOriginBoxSubjectHelperText("");
		setNewOriginBoxSubject(event.target.value);
	};

	const handleAddNewOriginBoxSubject = () => {
		if (newOriginBoxSubject === "") {
			setNewOriginBoxSubjectHelperText("Insira um assunto");
			return "newOriginBoxSubject error";
		}

		const originBoxesList = originBoxes;

		originBoxesList[selectedOriginBoxIndex].subjects_list.push({
			name: newOriginBoxSubject,
			dates: [],
		});

		setOriginBoxes(originBoxesList);
		setOpenNewOriginBoxSubjectDialog(false);

		return "added originBoxSubject";
	};

	const handleDeleteOriginBoxSubject = (
		originBoxIndex,
		originBoxSubjectIndex
	) => {
		const newOriginBoxesList = [];

		for (let i = 0; i < originBoxes.length; i += 1) {
			if (i === originBoxIndex) {
				originBoxes[i].subjects_list.splice(originBoxSubjectIndex, 1);
				newOriginBoxesList.push(originBoxes[i]);
			} else {
				newOriginBoxesList.push(originBoxes[i]);
			}
		}

		setOriginBoxes(newOriginBoxesList);
	};

	const handleOpenNewOriginBoxSubjectDateDialog = (
		originBoxIndex,
		originBoxSubjectIndex
	) => {
		setSelectedOriginBoxIndex(originBoxIndex);
		setSelectedOriginBoxSubjectIndex(originBoxSubjectIndex);
		setOpenNewOriginBoxSubjectDateDialog(true);
	};

	const handleCloseNewOriginBoxSubjectDateDialog = () => {
		setSelectedOriginBoxIndex(-1);
		setSelectedOriginBoxSubjectIndex(-1);
		setOpenNewOriginBoxSubjectDateDialog(false);
	};

	const handleNewOriginBoxSubjectDateChange = (date) => {
		setNewOriginBoxSubjectDateHelperText("");
		setNewOriginBoxSubjectDate(date);
	};

	const handleAddNewOriginBoxSubjectDate = () => {
		if (
			isDateNotValid(
				newOriginBoxSubjectDate,
				setNewOriginBoxSubjectDateHelperText,
				"date",
				"required"
			)
		) {
			return "newOriginBoxSubjectDate error";
		}

		const originBoxesList = originBoxes;
		const formattedDate = formatDate(newOriginBoxSubjectDate);

		if (
			originBoxesList[selectedOriginBoxIndex].subjects_list[
				selectedOriginBoxSubjectIndex
			].dates.indexOf(formattedDate) !== -1
		) {
			setNewOriginBoxSubjectDateHelperText("Data já adicionada");
			return "newOriginBoxSubjectDate already added error";
		}

		originBoxesList[selectedOriginBoxIndex].subjects_list[
			selectedOriginBoxSubjectIndex
		].dates.push(formattedDate);

		setOriginBoxes(originBoxesList);

		setOpenNewOriginBoxSubjectDateDialog(false);
		return "added newOriginBoxSubjectDate";
	};

	const handleDeleteOriginBoxSubjectDate = (
		originBoxIndex,
		originBoxSubjectIndex,
		deletedOriginBoxSubjectDate
	) => {
		const originBoxesList = originBoxes;

		// Changes the reference for the screen to be updated
		const newOriginBoxesList = [];

		for (let i = 0; i < originBoxesList.length; i += 1) {
			if (i === originBoxIndex) {
				const originBoxSubjectDates =
					originBoxesList[i].subjects_list[originBoxSubjectIndex].dates;

				originBoxesList[i].subjects_list[originBoxSubjectIndex].dates =
					originBoxSubjectDates.filter(
						(item) => item !== deletedOriginBoxSubjectDate
					);

				newOriginBoxesList.push(originBoxesList[i]);
			} else {
				newOriginBoxesList.push(originBoxesList[i]);
			}
		}

		setOriginBoxes(newOriginBoxesList);
	};

	const handleAlertClose = () => setOpenAlert(false); //

	const connectionError = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const onSubmit = () => {
		console.log("SUBMIT");
	};

	useEffect(() => {
		axiosArchives
			.get("unity/")
			.then((response) => setUnits(response.data))
			.catch(() => connectionError());
	}, []);

	return (
		<DocumentsContainer title="Relação de Arquivamento" spacing={1}>
			<Grid item xs={12} sm={6} md={2}>
				<TextField
					fullWidth
					id="numberOfBoxes"
					label="Nº de Caixas"
					value={numberOfBoxes}
					onChange={handleNumberOfBoxesChange}
					inputProps={{ maxLength: 20 }}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={3}>
				<NumberInput
					setHelperText={setNumberHelperText}
					set={setNumber}
					number={number}
					helperText={numberHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={3}>
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
				<SpecialLabels label="Caixas de Origem" />

				{originBoxes.map((originBoxAdded, index) => (
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>
								{originBoxAdded.number}/{originBoxAdded.year}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div style={{ width: "100%" }}>
								<TableContainer style={{ width: "100%" }} component={Paper}>
									<Table size="small">
										<TableHead>
											<TableRow>
												<TableCell>Assunto</TableCell>
												<TableCell>Datas</TableCell>
												<TableCell>{}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{originBoxAdded.subjects_list.map((row, index1) => (
												<TableRow key={row.name}>
													<TableCell>{row.name}</TableCell>
													<TableCell>
														<ChipsContainer
															justifyContent="left"
															marginTop="0%"
														>
															{row.dates.map((addedPeriod) => (
																<Chip
																	icon={<TimelapseIcon />}
																	label={`${addedPeriod}`}
																	color="secondary"
																	deleteIcon={
																		<CancelIcon data-testid="delete" />
																	}
																	onDelete={() =>
																		handleDeleteOriginBoxSubjectDate(
																			index,
																			index1,
																			addedPeriod
																		)
																	}
																/>
															))}

															<AddChip
																label="Adicionar Data"
																onClick={() =>
																	handleOpenNewOriginBoxSubjectDateDialog(
																		index,
																		index1
																	)
																}
															/>
														</ChipsContainer>
													</TableCell>
													<TableCell>
														<ChipsContainer
															justifyContent="right"
															marginTop="0%"
														>
															<Chip
																variant="outlined"
																label="Excluir"
																icon={<CloseIcon />}
																color="secondary"
																clickable
																onClick={() =>
																	handleDeleteOriginBoxSubject(index, index1)
																}
															/>
														</ChipsContainer>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>

								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<ChipsContainer justifyContent="left" marginTop="0.5%">
										<Chip
											variant="outlined"
											color="secondary"
											label="Excluir Caixa de Origem"
											icon={<DeleteForeverRoundedIcon />}
											onClick={() => handleDeleteOriginBox(index)}
											clickable
										/>
									</ChipsContainer>
									<ChipsContainer justifyContent="right" marginTop="0.5%">
										<Chip
											label="Adicionar Assunto"
											icon={<AddCircleIcon />}
											color="primary"
											onClick={() => handleOpenNewOriginBoxSubjectDialog(index)}
											clickable
										/>
									</ChipsContainer>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
				))}

				{originBoxes.length ? (
					<ChipsContainer justifyContent="right" marginTop="0.5%">
						<AddChip label="Adicionar" onClick={handleOpenNewOriginBoxDialog} />
					</ChipsContainer>
				) : (
					<ChipsContainer justifyContent="left" marginTop="0%">
						<AddChip label="Adicionar" onClick={handleOpenNewOriginBoxDialog} />
					</ChipsContainer>
				)}
			</Grid>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewOriginBoxDialog}
				onClose={handleCloseNewOriginBoxDialog}
				aria-labelledby="newOriginBox-dialog-title"
			>
				<DialogTitle id="newOriginBox-dialog-title">
					Nova Caixa de Origem
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						id="newOriginBoxNumber"
						label="Número da Caixa*"
						value={newOriginBoxNumber}
						onChange={handleNewOriginBoxNumberChange}
						error={newOriginBoxNumberHelperText !== ""}
						helperText={newOriginBoxNumberHelperText}
						inputProps={{ maxLength: 20 }}
					/>
					<TextField
						fullWidth
						margin="normal"
						id="newOriginBoxYear"
						label="Ano*"
						value={newOriginBoxYear}
						onChange={handleNewOriginBoxYearChange}
						error={newOriginBoxYearHelperText !== ""}
						helperText={newOriginBoxYearHelperText}
						inputProps={{ maxLength: 4 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNewOriginBoxDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleAddNewOriginBox} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewOriginBoxSubjectDialog}
				onClose={handleCloseNewOriginBoxSubjectDialog}
				aria-labelledby="newOriginBoxSubject-dialog-title"
			>
				<DialogTitle id="newOriginBoxSubject-dialog-title">
					Novo Assunto
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						id="newOriginBoxSubject"
						label="Assunto*"
						value={newOriginBoxSubject}
						onChange={handleNewOriginBoxSubjectChange}
						error={newOriginBoxSubjectHelperText !== ""}
						helperText={newOriginBoxSubjectHelperText}
						inputProps={{ maxLength: 100 }}
						multiline
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseNewOriginBoxSubjectDialog}
						color="primary"
					>
						Cancelar
					</Button>
					<Button onClick={handleAddNewOriginBoxSubject} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewOriginBoxSubjectDateDialog}
				onClose={handleCloseNewOriginBoxSubjectDateDialog}
				aria-labelledby="newOriginBoxSubjectDate-dialog-title"
			>
				<DialogTitle id="newOriginBoxSubjectDate-dialog-title">
					Nova Data
				</DialogTitle>
				<DialogContent>
					<KeyboardDatePicker
						style={{ width: "100%" }}
						id="newOriginBoxSubject-date-picker-dialog"
						label="Data*"
						format="dd/MM/yyyy"
						value={newOriginBoxSubjectDate}
						onChange={handleNewOriginBoxSubjectDateChange}
						okLabel="Confirmar"
						cancelLabel=""
						clearable
						clearLabel="Limpar"
						showTodayButton
						todayLabel="Hoje"
						KeyboardButtonProps={{
							"aria-label": "change newOriginBoxSubject date",
						}}
						error={newOriginBoxSubjectDateHelperText !== ""}
						helperText={newOriginBoxSubjectDateHelperText}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseNewOriginBoxSubjectDateDialog}
						color="primary"
					>
						Cancelar
					</Button>
					<Button onClick={handleAddNewOriginBoxSubjectDate} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>

			{/* <DropzoneDialog
				// <Button onClick={() => setOpen(true)}>Abrir</Button>
				dropzoneClass={{ color: "#fff" }}
				dropzoneParagraphClass={{ text: { color: "#fff" } }}
				filesLimit={1}
				dialogTitle="Anexar Documento Externo"
				cancelButtonText="CANCELAR"
				submitButtonText="CONFIRMAR"
				showFileNamesInPreview
				dropzoneText="Arraste e Solte seu Arquivo ou Clique"
				// open={open}
				// onSave={() => setOpen(false)}
				acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
				showPreviews={false}
				maxFileSize={5000000}
				// onClose={() => setOpen(false)}
				// onChange={() => setOpen(false)}
				getFileLimitExceedMessage={() => "Alo"}
				getFileAddedMessage={(rejected) => `${rejected}Alo`}
				getFileRemovedMessage
				getDropRejectMessage
			/> */}

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

export default CreateArchivingRelation;

// Adicionar Caixa de Origem

// Número e Ano da Caixa de Origem

// Assunto -> Suas Datas

// Assunto -> Suas Datas

// Quantidade de caixas box recebidas para arquivamento

// Sigla da caixa - Estante - Prateleira

// Observação

// Capa de rosto da caixa para impressão - 12 (Desabilitado)

// Anexar documento externo (pdf, jpeg)

// caixa de origem (Número e ano) tem que ter opção para preencher muitos itens

// Assuntos (por caixa de origem) tem que ter opção para preencher muitos itens

// Data (dos assuntos por caixa de origem) tem que ter opção para preencher muitos itens
