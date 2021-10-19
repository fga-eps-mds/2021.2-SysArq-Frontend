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

import {
	initialDate,
	isInt,
	isDateNotValid,
	formatDate,
	logout,
} from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import NumberInput from "../../components/Inputs/NumberInput";
import NumberProcessInput from "../../components/Inputs/NumberProcessInput";

import CommonSet from "../../components/CommonSet/CommonSet";

import SpecialLabels from "../../components/SpecialLabels";

import ChipsContainer from "../../components/Container/ChipsContainer";
import AddChip from "../../components/AddChip";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateArchivingRelation = () => {
	const [units, setUnits] = useState([]);

	const [numberOfBoxes, setNumberOfBoxes] = useState(0);
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

	const [numberOfBoxesHelperText, setNumberOfBoxesHelperText] = useState("");
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
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleNumberOfBoxesChange = (event) => {
		setNumberOfBoxesHelperText("");
		setNumberOfBoxes(event.target.value);
	};

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

		setNumberOfBoxes("");
		setNumber("");
		setProcessNumber("");
		setReceivedDate(initialDate);
		setDocumentType("");
		setSenderUnit("");
		setAbbreviation("");
		setShelf("");
		setRack("");
		setNotes("");
		setOriginBoxes([]);
		setNewOriginBoxNumber("");
		setNewOriginBoxYear("");
		setNewOriginBoxSubject("");
		setNewOriginBoxSubjectDate(initialDate);
	};

	const onSubmit = () => {
		setLoading(true);

		if (numberOfBoxes !== "" && parseInt(numberOfBoxes, 10) < 0) {
			setNumberOfBoxesHelperText("Insira um número válido");
			setLoading(false);
			return "numberOfBoxes error";
		}

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

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.post("archival-relation/", {
						box_list: originBoxes,
						process_number: processNumber,
						sender_unity: senderUnit.id,
						notes,
						number,
						received_date: formatDate(receivedDate),
						number_of_boxes: numberOfBoxes === "" ? 0 : numberOfBoxes,
						document_url: "", //
						cover_sheet: "", //
						filer_user: "filer_user", //
						abbreviation_id:
							abbreviation.id === undefined ? "" : abbreviation.id,
						shelf_id: shelf.id === undefined ? "" : shelf.id,
						rack_id: rack.id === undefined ? "" : rack.id, //
						document_type_id: documentType.id,
					})
					.then(() => onSuccess())
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) logout();
				else connectionError();
			});

		return "post done";
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
					.get("unity/")
					.then((response) => setUnits(response.data))
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) logout();
				else connectionError();
			});
	}, []);

	return (
		<CardContainer title="Relação de Arquivamento" spacing={1}>
			<Grid item xs={12} sm={6} md={2}>
				<TextField
					fullWidth
					id="numberOfBoxes"
					label="Nº de Caixas"
					type="number"
					value={numberOfBoxes}
					onChange={handleNumberOfBoxesChange}
					inputProps={{ maxLength: 20 }}
					error={numberOfBoxesHelperText !== ""}
					helperText={numberOfBoxesHelperText}
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

			<CommonSet
				setReceivedDateHelperText={setReceivedDateHelperText}
				setReceivedDate={setReceivedDate}
				receivedDate={receivedDate}
				receivedDateHelperText={receivedDateHelperText}
				setDocumentTypeHelperText={setDocumentTypeHelperText}
				setDocumentType={setDocumentType}
				connectionError={connectionError}
				documentType={documentType}
				documentTypeHelperText={documentTypeHelperText}
				setSenderUnitHelperText={setSenderUnitHelperText}
				setSenderUnit={setSenderUnit}
				senderUnit={senderUnit}
				units={units}
				senderUnitHelperText={senderUnitHelperText}
				abbreviation={abbreviation}
				setAbbreviation={setAbbreviation}
				shelf={shelf}
				setShelf={setShelf}
				rack={rack}
				setRack={setRack}
				setNotes={setNotes}
				notes={notes}
			/>

			<Grid item xs={12} sm={12} md={12}>
				<SpecialLabels label="Caixas de Origem" />

				{originBoxes.map((originBoxAdded, originBoxIndex) => (
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
											{originBoxAdded.subjects_list.map(
												(subject, subjectIndex) => (
													<TableRow key={subject.name}>
														<TableCell>{subject.name}</TableCell>
														<TableCell>
															<ChipsContainer
																justifyContent="left"
																marginTop="0%"
															>
																{subject.dates.map((addedDate) => (
																	<Chip
																		icon={<TimelapseIcon />}
																		label={`${addedDate.substring(
																			8,
																			10
																		)}/${addedDate.substring(
																			5,
																			7
																		)}/${addedDate.substring(0, 4)}`}
																		color="secondary"
																		deleteIcon={
																			<CancelIcon data-testid="delete" />
																		}
																		onDelete={() =>
																			handleDeleteOriginBoxSubjectDate(
																				originBoxIndex,
																				subjectIndex,
																				addedDate
																			)
																		}
																	/>
																))}

																<AddChip
																	label="Adicionar Data"
																	onClick={() =>
																		handleOpenNewOriginBoxSubjectDateDialog(
																			originBoxIndex,
																			subjectIndex
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
																		handleDeleteOriginBoxSubject(
																			originBoxIndex,
																			subjectIndex
																		)
																	}
																/>
															</ChipsContainer>
														</TableCell>
													</TableRow>
												)
											)}
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
											onClick={() => handleDeleteOriginBox(originBoxIndex)}
											clickable
										/>
									</ChipsContainer>
									<ChipsContainer justifyContent="right" marginTop="0.5%">
										<Chip
											label="Adicionar Assunto"
											icon={<AddCircleIcon />}
											color="primary"
											onClick={() =>
												handleOpenNewOriginBoxSubjectDialog(originBoxIndex)
											}
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
		</CardContainer>
	);
};

export default CreateArchivingRelation;
