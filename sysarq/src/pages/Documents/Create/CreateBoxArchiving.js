/* eslint-disable */
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
	FormHelperText,
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
	arrayMes,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";
import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import ReceivedDateInput from "../../components/Inputs/ReceivedDateInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import DocumentInput from "../../components/Inputs/DocumentInput";

import SpecialLabels from "../../components/SpecialLabels";

import ChipsContainer from "../../components/Container/ChipsContainer";
import AddChip from "../../components/AddChip";

import ShelfInput from "../../components/Inputs/ShelfInput";
import RackInput from "../../components/Inputs/RackInput";
import FileLocationInput from "../../components/Inputs/FileLocationInput";
import NotesInput from "../../components/Inputs/NotesInput";
import BoxesNotesInput from "../../components/Inputs/BoxNotesInput";

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
};

const CreateBoxArchiving = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [senderUnitDetail, setSenderUnitDetail] = useState("");

	const [shelfDetail, setShelfDetail] = useState("");
	const [rackDetail, setRackDetail] = useState("");
	const [fileLocationDetail, setFileLocationDetail] = useState("");
	const [documentDetail, setDocumentDetail] = useState("");
	const [unarchiveDestinationUnitDetail, setUnarchiveDestinationUnitDetail] =
		useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(detail ? "" : null);
	const [unarchiveDateHelperText, setUnarchiveDateHelperText] = useState("");

	const [units, setUnits] = useState([]);

	const [processNumber, setProcessNumber] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(detail ? "" : null);
	const [senderUnit, setSenderUnit] = useState(null);
	const [notes, setNotes] = useState("");
	const [originBox, setOriginBox] = useState([{}]);

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

	useEffect(() => console.log(originBox), [originBox]);

	const [editId, setEditId] = useState(null);

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
			id: getNextId(),
			number: newOriginBoxNumber,
			year: newOriginBoxYear,
			subjects_list: [],
		};

		setOriginBox((prev) => [...prev, newOriginBox]);
		setOpenNewOriginBoxDialog(false);

		return "added originBox";
	};

	useEffect(() => {
		originBox.filter((b) => b.id === undefined);
	}, [originBox]);

	const [currentBox, setCurrentBox] = useState({});

	const handleOpenNewOriginBoxSubjectDialog = (box) => {
		setOpenNewOriginBoxSubjectDialog(true);
		setCurrentBox(box);
	};

	const handleCloseNewOriginBoxSubjectDialog = () =>
		setOpenNewOriginBoxSubjectDialog(false);

	const handleNewOriginBoxSubjectChange = (event) => {
		setNewOriginBoxSubjectHelperText("");
		setNewOriginBoxSubject(event.target.value);
	};

	const [senderUnitId, setSenderUnitId] = useState(0);

	const handleAddNewOriginBoxSubject = (b) => {
		if (newOriginBoxSubject === "") {
			setNewOriginBoxSubjectHelperText("Insira um assunto");
			return "newOriginBoxSubject error";
		}

		setOriginBox((prev) =>
			prev.map((box) =>
				box.id === b.id
					? {
							...box,
							subjects_list: [
								...(box.subjects_list ?? []),
								{ document_name_id: newOriginBoxSubject, dates: [] },
							],
					  }
					: box
			)
		);
		setOpenNewOriginBoxSubjectDialog(false);

		return "added originBoxSubject";
	};

	const handleDeleteOriginBoxSubject = (box, originBoxSubjectIndex) => {
		const newBox = {
			...box,
			subjects_list: box.subjects_list.filter(
				(_, index) => index !== originBoxSubjectIndex
			),
		};
		setOriginBox((prev) => prev.map((b) => (b.id === box.id ? newBox : b)));
	};

	const handleOpenNewOriginBoxSubjectDateDialog = (
		box,
		originBoxSubjectIndex
	) => {
		setSelectedOriginBoxSubjectIndex(originBoxSubjectIndex);
		setCurrentBox(box);
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

	const handleAddNewOriginBoxSubjectDate = (box, subjectIndex) => {
		if (
			isDateNotValid(
				new Date(newOriginBoxSubjectDate),
				setNewOriginBoxSubjectDateHelperText,
				"date",
				"required"
			)
		) {
			return "newOriginBoxSubjectDate error";
		}

		const formattedDate = formatDate(new Date(newOriginBoxSubjectDate));

		if (
			box.subjects_list[selectedOriginBoxSubjectIndex].dates.indexOf(
				formattedDate
			) != -1
		) {
			setNewOriginBoxSubjectDateHelperText("Data já adicionada");
			return "newOriginBoxSubjectDate already added error";
		}

		const newBox = {
			...box,
			subjects_list: box.subjects_list.map((s, i) =>
				i === selectedOriginBoxSubjectIndex
					? { ...s, dates: [...s.dates, formattedDate] }
					: s
			),
		};
		setOriginBox((prev) => prev.map((b) => (b.id === box.id ? newBox : b)));

		setOpenNewOriginBoxSubjectDateDialog(false);

		return "added newOriginBoxSubjectDate";
	};

	const handleDeleteOriginBoxSubjectDate = (
		box,
		originBoxSubjectIndex,
		deletedOriginBoxSubjectDate
	) => {
		const newDates = box.subjects_list[originBoxSubjectIndex].dates.filter(
			(date) => date !== deletedOriginBoxSubjectDate
		);
		const newBox = box;
		newBox.subjects_list[originBoxSubjectIndex].dates = newDates;

		setOriginBox((prev) => prev.map((b) => (b.id === box.id ? newBox : b)));
	};

	const handleAlertClose = () => setOpenAlert(false);

	const connectionError = (value) => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		if (value === 400) {
			setAlertHelperText("O N° do processo já existe");
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página"
			);
		}
	};

	const clear = () => {
		setProcessNumber("");
		setReceivedDate(null);
		setSenderUnit(null);

		setOriginBox([{}]);
		setNewOriginBoxNumber("");
		setNewOriginBoxYear("");
		setNewOriginBoxSubject("");
		setNewOriginBoxSubjectDate(initialDate);

		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
		setStatus("");
		setNotes("");
	};

	const onSuccess = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Documento cadastrado!");
		clear();
		window.location.reload();
	};

	const onDelete = () => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.delete(`box-archiving/${editId}`, {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then(() => {
						window.close();
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
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
				new Date(receivedDate),
				setReceivedDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "noticeDate error";
		}

		if (!senderUnit) {
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
			isDateNotValid(
				new Date(unarchiveDate),
				setUnarchiveDateHelperText,
				"date"
			)
		) {
			setLoading(false);
			return "unarchiveDate error";
		}

		const formattedOriginBoxes = originBox
			.filter((b) => b.id !== undefined)
			.map((b) => ({
				box_notes: b.box_notes ? b.box_notes : "",
				year: b.year,
				number: b.number,
				shelf_id: b.shelf ? b.shelf.id : "",
				rack_id: b.rack ? b.rack.id : "",
				file_location_id: b.file_location ? b.file_location.id : "",
				subjects_list: b.subjects_list.map((d) => ({
					document_name_id: d.document_name_id.id,
					year: d.dates.map((date) => parseInt(date.split("-")[0], 10)),
					month: d.dates.map(
						(date) => arrayMes[parseInt(date.split("-"), 10) - 1]
					),
				})),
			}));

		const payload = {
			process_number: processNumber,
			sender_unity: senderUnit.id,
			notes: notes,
			received_date: formatDate(new Date(receivedDate)),
			document_url: "",
			cover_sheet: "",
			filer_user: "",
			origin_boxes: formattedOriginBoxes,
			is_filed: isStatusFiled(status),
			is_eliminated: status === "Eliminado",
			unity_id: status === "Desarquivado" ? unarchiveDestinationUnit.id : "",
			send_date:
				unarchiveDate !== null && status === "Desarquivado"
					? formatDate(new Date(unarchiveDate))
					: null,
			box_process_number:
				status === "Desarquivado" ? unarchiveProcessNumber : "",
		};

		const verb = editId ? axiosArchives.put : axiosArchives.post;

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				// TO-DO
				verb(`box-archiving/${editId ?? ""}`, payload, {
					headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
				})
					.then(() => onSuccess())
					.catch((err) => {
						if (err.response.status === 401) {
							axiosProfileError(err);
							return false;
						}
						connectionError(err.response.status);
						return false;
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});

		return "post done";
	};

	const [id, setId] = useState(1);

	const getNextId = () => {
		setId((i) => i + 1);
		return id - 1;
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
							setEditId(responseBoxArchiving.data.id);

							setSenderUnitDetail(responseBoxArchiving.data.sender_unity_name);

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

							setFileLocationDetail(
								responseBoxArchiving.data.file_location_file
									? responseBoxArchiving.data.file_location_file
									: "-"
							);

							setDocumentDetail(
								responseBoxArchiving.data.document_name
									? responseBoxArchiving.data.document_name
									: "-"
							);

							setProcessNumber(responseBoxArchiving.data.process_number);
							setReceivedDate(responseBoxArchiving.data.received_date);

							setNotes(
								responseBoxArchiving.data.notes
									? responseBoxArchiving.data.notes
									: "-"
							);

							setSenderUnitId(responseBoxArchiving.data.sender_unity);

							setOriginBox(
								responseBoxArchiving.data.origin_boxes.map((b) => ({
									...b,
									id: getNextId(),
									subjects_list: b.subject_list.map((s) => ({
										...s,
										dates: s.year.map((y) => y.toString()),
										document_name_id: { document_name: s.document_name },
									})),
								}))
							);

							setOriginBox((prev) =>
								prev.map((b) => {
									if (b.shelf_id) {
										axiosArchives
											.get(`/shelf/${b.shelf_id}/`, {
												headers: {
													Authorization: `JWT ${localStorage.getItem("tk")}`,
												},
											})
											.then((res) => (b.shelf = res.data))
											.catch(connectionError);
									}

									if (b.rack_id) {
										axiosArchives
											.get(`/rack/${b.rack_id}/`, {
												headers: {
													Authorization: `JWT ${localStorage.getItem("tk")}`,
												},
											})
											.then((res) => (b.rack = res.data))
											.catch(connectionError);
									}

									if (b.file_location_id) {
										axiosArchives
											.get(`/file-location/${b.file_location_id}/`, {
												headers: {
													Authorization: `JWT ${localStorage.getItem("tk")}`,
												},
											})
											.then((res) => (b.file_location = res.data))
											.catch(connectionError);
									}

									return b;
								})
							);

							axiosArchives
								.get(`unity/${responseBoxArchiving.data.sender_unity}/`, {
									headers: {
										Authorization: `JWT ${localStorage.getItem("tk")}`,
									},
								})
								.then((response) => setSenderUnit(response.data));

							if (
								!responseBoxArchiving.data.is_eliminated &&
								!responseBoxArchiving.data.is_filed &&
								responseBoxArchiving.data.unity_id
							) {
								axiosArchives
									.get(`unity/${responseBoxArchiving.data.unity_id}/`, {
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									})
									.then((response) => {
										setUnarchiveDestinationUnit(response.data);
										setUnarchiveDestinationUnitDetail(response.data.unity_name);
									})
									.catch(() => connectionError());
							} else {
								setUnarchiveDestinationUnitDetail("-");
							}

							if (responseBoxArchiving.data.is_eliminated) {
								setStatus("Eliminado");
							} else if (responseBoxArchiving.data.is_filed) {
								setStatus("Arquivado");
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

	useEffect(() => {
		console.log(senderUnit);
	}, [senderUnit]);

	return (
		<>
			<CardContainer title="Arquivamento de Caixas" spacing={1}>
				{detail ? <DocumentsDetail onDelete={onDelete} /> : ""}

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
							<SpecialLabels label="Caixa(s) para Arquivamento" />

							{originBox
								.filter((box) => box.id !== undefined)
								.map((box) => (
									<Accordion>
										<AccordionSummary expandIcon={<ExpandMoreIcon />}>
											<Typography>
												{box.number}/{box.year}
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
																<TableCell>Nome do Documento</TableCell>
																<TableCell>Datas do Documento</TableCell>
																{detail ? "" : <TableCell>{}</TableCell>}
															</TableRow>
														</TableHead>
														<TableBody>
															{box.subjects_list.map(
																(subject, subjectIndex) => (
																	<TableRow
																		key={subject.document_name_id.document_name}
																	>
																		<TableCell>
																			{subject.document_name_id.document_name}
																		</TableCell>
																		<TableCell>
																			<ChipsContainer
																				justifyContent="left"
																				marginTop="0%"
																			>
																				{subject.dates.map((addedDate) => (
																					<Chip
																						icon={<TimelapseIcon />}
																						label={`${addedDate.substring(
																							0,
																							4
																						)}`}
																						color="secondary"
																						deleteIcon={
																							<CancelIcon data-testid="delete" />
																						}
																						onDelete={
																							detail
																								? false
																								: () =>
																										handleDeleteOriginBoxSubjectDate(
																											box,
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
																								box,
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
																								box,
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
																onClick={() =>
																	setOriginBox((prev) =>
																		prev.filter((b) => b.id !== box.id)
																	)
																}
																clickable
															/>
														</ChipsContainer>
														<ChipsContainer
															justifyContent="right"
															marginTop="0.5%"
														>
															<Chip
																label="Adicionar Documento"
																icon={<AddCircleIcon />}
																color="primary"
																onClick={() =>
																	handleOpenNewOriginBoxSubjectDialog(box)
																}
																clickable
															/>
														</ChipsContainer>
													</div>
												)}
											</div>
										</AccordionDetails>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												marginBottom: 20,
												marginLeft: 20,
												marginRight: 20,
											}}
										>
											<FileLocationInput
												set={(value) =>
													setOriginBox(
														originBox.map((b) =>
															b.id === box.id
																? { ...b, file_location: value }
																: b
														)
													)
												}
												connectionError={connectionError}
												isDetailPage={detail}
												fileLocationDetail={box.file_location}
												fileLocation={box.file_location}
											/>

											<ShelfInput
												set={(value) =>
													setOriginBox(
														originBox.map((b) =>
															b.id === box.id ? { ...b, shelf: value } : b
														)
													)
												}
												connectionError={connectionError}
												isDetailPage={detail}
												shelfDetail={box.shelf}
												shelf={box.shelf}
											/>

											<RackInput
												set={(value) =>
													setOriginBox(
														originBox.map((b) =>
															b.id === box.id ? { ...b, rack: value } : b
														)
													)
												}
												connectionError={connectionError}
												isDetailPage={detail}
												rackDetail={box.rack}
												rack={box.rack}
											/>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												marginBottom: 20,
												marginLeft: 20,
												marginRight: 20,
											}}
										>
											<BoxesNotesInput
												set={(value) =>
													setOriginBox(
														originBox.map((b) =>
															b.id === box.id ? { ...b, box_notes: value } : b
														)
													)
												}
												boxnotes={box?.box_notes ?? "-"}
												isDetailPage={detail}
											/>
										</div>
									</Accordion>
								))}

							<ChipsContainer justifyContent="left" marginTop="0%">
								{!detail && (
									<AddChip
										label="Adicionar Caixa para Arquivamento"
										onClick={handleOpenNewOriginBoxDialog}
									/>
								)}
							</ChipsContainer>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									id="status"
									label="Status"
									value={status}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<FormControl
									fullWidth
									variant="outlined"
									error={statusHelperText !== ""}
								>
									<InputLabel id="select-status-label">Status*</InputLabel>
									<Select
										style={{ textAlign: "left" }}
										labelId="select-status-label"
										label="Status*"
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
											variant="outlined"
											value={unarchiveDestinationUnitDetail}
											inputProps={{ readOnly: true }}
										/>
									) : (
										<FormControl fullWidth variant="outlined">
											<InputLabel id="select-unarchiveDestinationUnit-label">
												Unid. Destino do Desarquivamento
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-unarchiveDestinationUnit-label"
												id="select-unarchiveDestinationUnit"
												label="Unid. Destino do Desarquivamento"
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
										variant="outlined"
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
											variant="outlined"
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
											inputVariant="outlined"
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
							variant="outlined"
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
							variant="outlined"
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
						Novo Documento
					</DialogTitle>
					<DialogContent>
						<DocumentInput
							set={setNewOriginBoxSubject}
							connectionError={connectionError}
							isDetailPage={detail}
							documentDetail={documentDetail}
							document={newOriginBoxSubject}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleCloseNewOriginBoxSubjectDialog}
							color="primary"
						>
							Cancelar
						</Button>
						<Button
							onClick={() => handleAddNewOriginBoxSubject(currentBox)}
							color="primary"
						>
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
							format="yyyy"
							value={newOriginBoxSubjectDate}
							onChange={handleNewOriginBoxSubjectDateChange}
							okLabel="Confirmar"
							openTo="year"
							views={["year"]}
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
						<Button
							onClick={() => handleAddNewOriginBoxSubjectDate(currentBox)}
							color="primary"
						>
							Confirmar
						</Button>
					</DialogActions>
				</Dialog>

				<DocumentsCreate
					isDetailPage={detail}
					loading={loading}
					onSubmit={onSubmit}
					clearFunc={clear}
				/>

				<PopUpAlert
					open={openAlert}
					handleClose={handleAlertClose}
					severity={severityAlert}
					helperText={alertHelperText}
				/>
			</CardContainer>

			{!detail ? (
				<div style={{ marginBottom: "100px" }}>
					<DataTable title="Arquivamento de Caixas" url="box-archiving/" />
				</div>
			) : (
				""
			)}
		</>
	);
};

CreateBoxArchiving.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateBoxArchiving;
