import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import {
	Grid,
	CircularProgress,
	TextField,
	Typography,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TableContainer,
	Paper,
	InputLabel,
	Select,
	MenuItem,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	FormHelperText
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
	axiosProfileError,
	getUnits,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";
import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import ReceivedDateInput from "../../components/Inputs/ReceivedDateInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";

import SpecialLabels from "../../components/SpecialLabels";

import ChipsContainer from "../../components/Container/ChipsContainer";
import AddChip from "../../components/AddChip";

import ShelfInput from "../../components/Inputs/ShelfInput";
import RackInput from "../../components/Inputs/RackInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";
import DataTable from "../../components/DataTable";

const isStatusFiled = (status) => {
	if (status === "Arquivado") {
		return true;
	}
	if (status === "Desarquivado") {
		return false;
	}
	return null;
}

const CreateBoxArchiving = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [senderUnitDetail, setSenderUnitDetail] = useState("");

	const [shelfDetail, setShelfDetail] = useState("");
	const [rackDetail, setRackDetail] = useState("");
	const [unarchiveDestinationUnitDetail, setUnarchiveDestinationUnitDetail] = useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(detail ? "" : initialDate);
	const [unarchiveDateHelperText, setUnarchiveDateHelperText] = useState("");


	const [units, setUnits] = useState([]);

	const [processNumber, setProcessNumber] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(detail ? "" : null);
	const [senderUnit, setSenderUnit] = useState("");
	const [box, setBox] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [notes, setNotes] = useState("");
	const [originBox, setOriginBox] = useState({});
	// const [file, setFile] = useState("");

	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [statusHelperText, setStatusHelperText] = useState("");
	const [status, setStatus] = useState("");



	const [openNewOriginBoxDialog, setOpenNewOriginBoxDialog] = useState(false);

	const [newOriginBoxNumber, setNewOriginBoxNumber] = useState("");
	const [newOriginBoxNumberHelperText, setNewOriginBoxNumberHelperText] =
		useState("");

	const [newOriginBoxYear, setNewOriginBoxYear] = useState("");
	const [newOriginBoxYearHelperText, setNewOriginBoxYearHelperText] =
		useState("");

	const [openNewOriginBoxSubjectDialog, setOpenNewOriginBoxSubjectDialog] =
		useState(false);

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

	const [loading, setLoading] = useState(detail);
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

	const handleUnarchiveDateChange = (date) => {
		setUnarchiveDateHelperText("");
		setUnarchiveDate(date);
	};

	const handleUnarchiveDestinationUnit = (event) =>
		setUnarchiveDestinationUnit(event.target.value);

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

		const newOriginBox = {
			number: newOriginBoxNumber,
			year: newOriginBoxYear,
			subjects_list: [],
		};

		setOriginBox(newOriginBox);
		setOpenNewOriginBoxDialog(false);

		return "added originBox";
	};

	const handleDeleteOriginBox = () => setOriginBox({});

	const handleOpenNewOriginBoxSubjectDialog = () =>
		setOpenNewOriginBoxSubjectDialog(true);

	const handleCloseNewOriginBoxSubjectDialog = () =>
		setOpenNewOriginBoxSubjectDialog(false);

	const handleNewOriginBoxSubjectChange = (event) => {
		setNewOriginBoxSubjectHelperText("");
		setNewOriginBoxSubject(event.target.value);
	};

	const handleAddNewOriginBoxSubject = () => {
		if (newOriginBoxSubject === "") {
			setNewOriginBoxSubjectHelperText("Insira um assunto");
			return "newOriginBoxSubject error";
		}

		const newOriginBox = originBox;

		newOriginBox.subjects_list.push({
			name: newOriginBoxSubject,
			dates: [],
		});

		setOriginBox(newOriginBox);
		setOpenNewOriginBoxSubjectDialog(false);

		return "added originBoxSubject";
	};

	const handleDeleteOriginBoxSubject = (originBoxSubjectIndex) => {
		originBox.subjects_list.splice(originBoxSubjectIndex, 1);

		const newOriginBox = {
			number: originBox.number,
			year: originBox.year,
			subjects_list: originBox.subjects_list,
		};

		setOriginBox(newOriginBox);
	};

	const handleOpenNewOriginBoxSubjectDateDialog = (originBoxSubjectIndex) => {
		setSelectedOriginBoxSubjectIndex(originBoxSubjectIndex);
		setOpenNewOriginBoxSubjectDateDialog(true);
	};

	const handleUnarchiveProcessNumberChange = (event) =>
		setUnarchiveProcessNumber(event.target.value);

	const handleCloseNewOriginBoxSubjectDateDialog = () => {
		setSelectedOriginBoxSubjectIndex(-1);
		setOpenNewOriginBoxSubjectDateDialog(false);
	};

	const handleNewOriginBoxSubjectDateChange = (date) => {
		setNewOriginBoxSubjectDateHelperText("");
		setNewOriginBoxSubjectDate(date);
	};

	const handleStatusChange = (event) => {
		setStatusHelperText("");
		setStatus(event.target.value);
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

		const newOriginBox = originBox;
		const formattedDate = formatDate(newOriginBoxSubjectDate);

		if (
			newOriginBox.subjects_list[selectedOriginBoxSubjectIndex].dates.indexOf(
				formattedDate
			) !== -1
		) {
			setNewOriginBoxSubjectDateHelperText("Data já adicionada");
			return "newOriginBoxSubjectDate already added error";
		}

		newOriginBox.subjects_list[selectedOriginBoxSubjectIndex].dates.push(
			formattedDate
		);

		setOriginBox(newOriginBox);
		setOpenNewOriginBoxSubjectDateDialog(false);

		return "added newOriginBoxSubjectDate";
	};

	const handleDeleteOriginBoxSubjectDate = (
		originBoxSubjectIndex,
		deletedOriginBoxSubjectDate
	) => {
		const originBoxSubjectDates =
			originBox.subjects_list[originBoxSubjectIndex].dates;

		originBox.subjects_list[originBoxSubjectIndex].dates =
			originBoxSubjectDates.filter(
				(item) => item !== deletedOriginBoxSubjectDate
			);

		// Changes the reference for the screen to be updated
		const newOriginBox = {
			number: originBox.number,
			year: originBox.year,
			subjects_list: originBox.subjects_list,
		};

		setOriginBox(newOriginBox);
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

		setProcessNumber("");
		setReceivedDate(initialDate);
		setSenderUnit("");

		setOriginBox({});
		setNewOriginBoxNumber("");
		setNewOriginBoxYear("");
		setNewOriginBoxSubject("");
		setNewOriginBoxSubjectDate(initialDate);

		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
		setStatus("");
		setBox("");
		setShelf("");
		setRack("");
		setNotes("");
		window.location.reload();
	};

	const onSubmit = () => {
		setLoading(true);

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

		if (senderUnit === "") {
			setSenderUnitHelperText("Selecione uma unidade");
			setLoading(false);
			return "senderUnit error";
		}

		if (status === "") {
			setStatusHelperText("Selecione um status");
			setLoading(false);
			return "status error";
		}

		if (
			status === "Desarquivado" &&
			isDateNotValid(unarchiveDate, setUnarchiveDateHelperText, "date")
		) {
			setLoading(false);
			return "unarchiveDate error";
		}

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.post(
						"box-archiving/",
						{
							origin_box_id: originBox,
							process_number: processNumber,
							sender_unity: senderUnit.id,
							notes,
							received_date: formatDate(receivedDate),
							document_url: "", //
							cover_sheet: "", //
							filer_user: "filer_user", //
							is_filed: isStatusFiled(status),
							is_eliminated: status === "Eliminado",
							unity_id:
								status === "Desarquivado" ? unarchiveDestinationUnit.id: "",
							send_date:
								unarchiveDate !== null && status === "Desarquivado"
									? formatDate(unarchiveDate)
									: null,
							box_process_number:
								status === "Desarquivado" ? unarchiveProcessNumber : "",
							abbreviation_id: box.id === undefined ? "" : box.id,
							shelf_id: shelf.id === undefined ? "" : shelf.id,
							rack_id: rack.id === undefined ? "" : rack.id, //
							document_names: []
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } }
					)
					.then(() => onSuccess())
					.catch(() => connectionError());
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
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

					if (detail) {
						setLoading(true);

						axiosArchives
						.get(`box-archiving/${params.id}`, {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((responseBoxArchiving) => {
							axiosArchives
								.get(`unity/${responseBoxArchiving.data.sender_unity}/`, {
									headers: {
										Authorization: `JWT ${localStorage.getItem("tk")}`,
									},
								})
								.then((response) => {
									setSenderUnit(response.data);
									setSenderUnitDetail(response.data.unity_name);
								})
								.catch(() => connectionError());

							setShelfDetail(
								responseBoxArchiving.data.shelf_number
									? responseBoxArchiving.data.shelf_number
									: "-"
							);
							setRackDetail(
								responseBoxArchiving.data.rack_number
									? responseBoxArchiving.data.rack_number
									: "-"
							);

							// TO-DO: Coesão nos nomes de variáveis da caixa de origem

							if (responseBoxArchiving.data.origin_box_id) {
								const subjectsListDetail = [];

								responseBoxArchiving.data.origin_box.subject_list.map(
									(subject) =>
										subjectsListDetail.push({
											name: subject.name,
											dates: subject.date,
										})
								);

								const originBoxDetail = {
									number: responseBoxArchiving.data.origin_box.number,
									year: responseBoxArchiving.data.origin_box.year,
									subjects_list: subjectsListDetail,
								};

								setOriginBox(originBoxDetail);
							}

							if (
								!responseBoxArchiving.data.is_eliminated &&
								!responseBoxArchiving.data.is_filed &&
								responseBoxArchiving.data.unity_id
							) {
								axiosArchives
									.get(`unity/${responseBoxArchiving.data.unity_id}/`,{
										headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
									})
									.then((response) => {
										setUnarchiveDestinationUnit(response.data);
										setUnarchiveDestinationUnitDetail(response.data.unity_name)
									})
									.catch(() => connectionError());
							} else {
								setUnarchiveDestinationUnitDetail("-");
							}

							if (responseBoxArchiving.data.is_eliminated) {
								setStatus("Eliminado");
							} else if (responseBoxArchiving.data.is_filed) {
								setStatus("Arquivado")
							} else {
								setStatus("Desarquivado");

								setUnarchiveProcessNumber(
									responseBoxArchiving.data.box_process_number
										? responseBoxArchiving.data.box_process_number
										: "-"
								);

								setUnarchiveDate(
									responseBoxArchiving.data.send_date
										? responseBoxArchiving.data.send_date
										: "-"
								);
							}

							setProcessNumber(responseBoxArchiving.data.process_number);
							setReceivedDate(responseBoxArchiving.data.received_date);
							
							setNotes(
								responseBoxArchiving.data.notes
									? responseBoxArchiving.data.notes
									: "-"
							);

							setLoading(false);
						})
						.catch(() => connectionError());
					}
				})
				.catch((error) => {
					axiosProfileError(error, connectionError);
				});

		getUnits(setUnits, connectionError);
	}, []);

	return (
		<>
			<CardContainer title="Arquivamento de Caixas" spacing={1}>
				{detail ? <DocumentsDetail /> : ""}

				{detail && loading ? (
					<CircularProgress style={{ margin: "auto" }} />
				) : (
					<>
						<Grid item xs={12} sm={6} md={6}>
							<NumberProcessInput
								setHelperText={setProcessNumberHelperText}
								set={setProcessNumber}
								number={processNumber}
								helperText={processNumberHelperText}
								isDetailPage={detail}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<ReceivedDateInput
								isDetailPage={detail}
								setHelperText={setReceivedDateHelperText}
								set={setReceivedDate}
								receivedDate={receivedDate}
								helperText={receivedDateHelperText}
							/>
						</Grid>

						<SenderUnitInput
							isDetailPage={detail}
							senderUnitDetail={senderUnitDetail}
							setHelperText={setSenderUnitHelperText}
							set={setSenderUnit}
							senderUnit={senderUnit}
							units={units}
							senderUnitHelperText={senderUnitHelperText}
						/>

						<Grid item xs={12} sm={12} md={12}>
							<SpecialLabels label="Caixa de Origem" />

							{originBox.number !== undefined ? (
								<Accordion>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography>
											{originBox.number}/{originBox.year}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<div style={{ width: "100%" }}>
											<TableContainer
												style={{ width: "100%" }}
												component={Paper}
											>
												<Table size="small">
													<TableHead>
														<TableRow>
															<TableCell>Assunto</TableCell>
															<TableCell>Datas</TableCell>
															{detail ? "" : <TableCell>{}</TableCell>}
														</TableRow>
													</TableHead>
													<TableBody>
														{originBox.subjects_list.map(
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
																					onDelete={
																						detail
																							? false
																							: () =>
																									handleDeleteOriginBoxSubjectDate(
																										subjectIndex,
																										addedDate
																									)
																					}
																				/>
																			))}

																			{detail ? (
																				""
																			) : (
																				<AddChip
																					label="Adicionar Data"
																					onClick={() =>
																						handleOpenNewOriginBoxSubjectDateDialog(
																							subjectIndex
																						)
																					}
																				/>
																			)}
																		</ChipsContainer>
																	</TableCell>
																	{detail ? (
																		""
																	) : (
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
																							subjectIndex
																						)
																					}
																				/>
																			</ChipsContainer>
																		</TableCell>
																	)}
																</TableRow>
															)
														)}
													</TableBody>
												</Table>
											</TableContainer>

											{detail ? (
												""
											) : (
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<ChipsContainer
														justifyContent="left"
														marginTop="0.5%"
													>
														<Chip
															variant="outlined"
															color="secondary"
															label="Excluir Caixa de Origem"
															icon={<DeleteForeverRoundedIcon />}
															onClick={() => handleDeleteOriginBox()}
															clickable
														/>
													</ChipsContainer>
													<ChipsContainer
														justifyContent="right"
														marginTop="0.5%"
													>
														<Chip
															label="Adicionar Assunto"
															icon={<AddCircleIcon />}
															color="primary"
															onClick={() =>
																handleOpenNewOriginBoxSubjectDialog()
															}
															clickable
														/>
													</ChipsContainer>
												</div>
											)}
										</div>
									</AccordionDetails>
								</Accordion>
							) : (
								<ChipsContainer justifyContent="left" marginTop="0%">
									{detail ? (
										<Chip label="Não cadastrada" />
									) : (
										<AddChip
											label="Adicionar Caixa de Origem"
											onClick={handleOpenNewOriginBoxDialog}
										/>
									)}
								</ChipsContainer>
							)}
						</Grid>

						<ShelfInput
							set={setShelf}
							connectionError={connectionError}
							isDetailPage={detail}
							shelfDetail={shelfDetail}
							shelf={shelf}
						/>

						<RackInput
							set={setRack}
							connectionError={connectionError}
							isDetailPage={detail}
							rackDetail={rackDetail}
							rack={rack}
						/>

						<NotesInput set={setNotes} notes={notes} isDetailPage={detail} />
					</>
				)}

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
						
				<Grid item xs={12} sm={12} md={12}>
					{detail ? (
						<TextField
							fullWidth
							id="status"
							label="Status"
							value={status}
							inputProps={{ readOnly: true }}
						/>
					) : (
						<FormControl fullWidth error={statusHelperText !== ""}>
							<InputLabel id="select-status-label">Status*</InputLabel>
							<Select
								style={{ textAlign: "left" }}
								labelId="select-status-label"
								id="select-status"
								value={status}
								onChange={handleStatusChange}
								renderValue={(value) => `${value}`}
							>
							<MenuItem value="">
								<em>Nenhum</em>
							</MenuItem>
							<MenuItem value="Arquivado">Arquivado</MenuItem>
							<MenuItem value="Eliminado">Eliminado</MenuItem>
							<MenuItem value="Desarquivado">Desarquivado</MenuItem>
							</Select>
							{statusHelperText ? (
								<FormHelperText>{statusHelperText}</FormHelperText>
							) : (
								""
							)}
						</FormControl>
					)}
				</Grid>

				{status === "Desarquivado" ? (
							<>
								<Grid item xs={12} sm={12} md={12}>
									{detail ? (
										<TextField
											fullWidth
											id="unarchiveDestinationUnit"
											label="Unid. Destino do Desarquivamento"
											value={unarchiveDestinationUnitDetail}
											inputProps={{ readOnly: true }}
										/>
									) : (
										<FormControl fullWidth>
											<InputLabel id="select-unarchiveDestinationUnit-label">
												Unid. Destino do Desarquivamento
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-unarchiveDestinationUnit-label"
												id="select-unarchiveDestinationUnit"
												value={unarchiveDestinationUnit}
												onChange={handleUnarchiveDestinationUnit}
												renderValue={(value) => `${value.unity_name}`}
											>
												<MenuItem key={0} value="">
													<em>Nenhuma</em>
												</MenuItem>

												{units.map((unarchiveDestinationUnitOption) => (
													<MenuItem
														id={unarchiveDestinationUnitOption.id}
														value={unarchiveDestinationUnitOption}
													>
														{unarchiveDestinationUnitOption.unity_name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</Grid>

								<Grid item xs={12} sm={12} md={6}>
									<TextField
										fullWidth
										id="unarchiveProcessNumber"
										label="Nº do Processo do Desarquivamento"
										value={unarchiveProcessNumber}
										onChange={handleUnarchiveProcessNumberChange}
										inputProps={{ maxLength: 15, readOnly: detail }}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6}>
									{detail ? (
										<TextField
											fullWidth
											id="unarchiveDate"
											label="Data de Desarquivamento"
											value={
												unarchiveDate !== "-"
													? `${unarchiveDate.substring(
															8,
															10
													  )}/${unarchiveDate.substring(
															5,
															7
													  )}/${unarchiveDate.substring(0, 4)}`
													: unarchiveDate
											}
											inputProps={{ readOnly: true }}
										/>
									) : (
										<KeyboardDatePicker
											okLabel="Confirmar"
											cancelLabel="Cancelar"
											style={{ width: "100%" }}
											id="unarchive-date-picker-dialog"
											label="Data de Desarquivamento"
											format="dd/MM/yyyy"
											value={unarchiveDate}
											onChange={handleUnarchiveDateChange}
											KeyboardButtonProps={{
												"aria-label": "change unarchive date",
											}}
											error={unarchiveDateHelperText !== ""}
											helperText={unarchiveDateHelperText}
										/>
									)}
								</Grid>
							</>
						) : (
							""
						)}

				<DocumentsCreate
					isDetailPage={detail}
					loading={loading}
					onSubmit={onSubmit}
				/>

				<PopUpAlert
					open={openAlert}
					handleClose={handleAlertClose}
					severity={severityAlert}
					helperText={alertHelperText}
				/>
			</CardContainer>

			<div style={{ marginBottom: "100px" }}>
				<DataTable title="Arquivamento de Caixas" url="box-archiving/" />
			</div>
		</>
	);
};

CreateBoxArchiving.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateBoxArchiving;