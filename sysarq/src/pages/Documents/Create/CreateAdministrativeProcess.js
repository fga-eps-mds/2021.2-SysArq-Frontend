import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import {
	makeStyles,
	Grid,
	CircularProgress,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Typography,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import {
	initialDate,
	isDateNotValid,
	formatDate,
	axiosProfileError,
	getUniqueFieldValues,
	getPublicWorkers,
	senderWorker,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";
import AutoComplete from "../../components/AutoComplete";

import "date-fns";
import DataTable from "../../components/DataTable";

const useStyles = makeStyles(() => ({
	sectionTitle: {
		width: "100%",
		textAlign: "left",
		color: "#1f3541",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	boxAB: {
		marginBottom: "16px",
	},
}));

const isStatusFiled = (status) => {
	if (status === "Arquivado") {
		return true;
	}
	if (status === "Desarquivado") {
		return false;
	}
	return null;
};

const CreateAdministrativeProcess = ({ detail }) => {
	const classes = useStyles();
	const params = detail ? useParams() : "";

	const [subjectDetail, setSubjectDetail] = useState("");
	const [senderUnitDetail, setSenderUnitDetail] = useState("");
	const [publicWorkerDetail, setPublicWorkerDetail] = useState("");
	const [shelfDetail, setShelfDetail] = useState("");
	const [rackDetail, setRackDetail] = useState("");
	const [fileLocationDetail, setFileLocationDetail] = useState("");
	const [boxAbbreviationDetail, setBoxAbbreviationDetail] = useState("");
	const [unarchiveDestinationUnitDetail, setUnarchiveDestinationUnitDetail] =
		useState("");

	const [subjects, setSubjects] = useState([]);
	const [units, setUnits] = useState([]);
	const [shelfs, setShelfs] = useState([]);
	const [racks, setRacks] = useState([]);
	const [fileLocations, setFileLocations] = useState([]);
	const [boxAbbreviations, setBoxAbbreviations] = useState([]);
	const [interestedPersonOptions, setInterestedPersonOptions] = useState([]);

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);

	const [publicWorker, setPublicWorker] = useState("");
	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [noticeDate, setNoticeDate] = useState(null);
	const [archivingDate, setArchivingDate] = useState(null);
	const [reference, setReference] = useState(null);
	const [processNumber, setProcessNumber] = useState("");
	const [interestedPerson, setInterested] = useState("");
	const [subject, setSubject] = useState(null);
	const [senderUnit, setSenderUnit] = useState(null);
	const [shelf, setShelf] = useState(null);
	const [rack, setRack] = useState(null);
	const [fileLocation, setFileLocation] = useState(null);
	const [boxAbbreviation, setBoxAbbreviation] = useState(null);
	const [boxNumber, setBoxNumber] = useState("");
	const [boxYear, setBoxYear] = useState("");
	const [status, setStatus] = useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(null);
	const [notesLocal, setNotes] = useState("");

	const [noticeDateHelperText, setNoticeDateHelperText] = useState("");
	const [archivingDateHelperText, setArchivingDateHelperText] = useState("");
	const [referenceHelperText, setReferenceHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [interestedHelperText, setInterestedHelperText] = useState("");
	const [subjectHelperText, setSubjectHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [statusHelperText, setStatusHelperText] = useState("");
	const [unarchiveDateHelperText, setUnarchiveDateHelperText] = useState("");
	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");
	const [boxAbbreviationHelperText, setBoxAbbreviationHelperText] =
		useState("");
	const [boxNumberHelperText, setBoxNumberHelperText] = useState("");
	const [boxYearHelperText, setBoxYearHelperText] = useState("");

	const [shelfHelperText, setShelfHelperText] = useState("");
	const [rackHelperText, setRackHelperText] = useState("");
	const [fileLocationHelperText, setFileLocationHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");
	const [editId, setEditId] = useState(null);

	const [loading, setLoading] = useState(detail);

	const [senderId, setSenderId] = useState(0);

	const handlePublicWorkerChange = (value) => {
		setPublicWorkerHelperText("");
		if (!value) {
			setPublicWorker(undefined);
			return;
		}
		setPublicWorker(value);
	};

	const handleShelfChange = (event, newValue) => {
		setShelfHelperText("");
		setShelf(newValue);
	};

	const handleRackChange = (event, newValue) => {
		setRackHelperText("");
		setRack(newValue);
	};

	const handleFileLocationChange = (event, newValue) => {
		setFileLocationHelperText("");
		setFileLocation(newValue);
	};

	const handleNoticeDateChange = (date) => {
		setNoticeDateHelperText("");
		setNoticeDate(date);
	};

	const handleArchivingDateChange = (date) => {
		setArchivingDateHelperText("");
		setArchivingDate(date);
	};

	const handleReferenceChange = (date) => {
		setReferenceHelperText("");
		setReference(date);
	};

	const handleInterestedChange = (event, newValue) => {
		setInterestedHelperText("");
		setInterested(newValue);
	};

	const handleSubjectChange = (event, newValue) => {
		setSubjectHelperText("");
		setSubject(newValue);
	};

	const handleStatusChange = (event) => {
		setStatusHelperText("");
		setStatus(event.target.value);
	};

	const handleUnarchiveDestinationUnit = (event) =>
		setUnarchiveDestinationUnit(event.target.value);

	const handleUnarchiveProcessNumberChange = (event) =>
		setUnarchiveProcessNumber(event.target.value);

	const handleUnarchiveDateChange = (date) => {
		setUnarchiveDateHelperText("");
		setUnarchiveDate(date);
	};

	const handleAlertClose = () => setOpenAlert(false);

	const connectionError = (value) => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		if (value === 400) {
			setAlertHelperText("N° do Processo já existe");
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página."
			);
		}
	};

	const clear = () => {
		setNoticeDate(null);
		setArchivingDate(null);
		setReference(null);
		setProcessNumber("");
		setInterested("");
		setSubject(null);
		setSenderUnit(null);
		setPublicWorkerInput("");
		setPublicWorker(undefined);

		setShelf(null);
		setRack(null);
		setFileLocation(null);

		setBoxAbbreviation(null);
		setBoxYear("");
		setBoxNumber("");

		setStatus("");
		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
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
					.delete(`administrative-process/${editId}/`, {
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
				new Date(noticeDate),
				setNoticeDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "noticeDate error";
		}

		if (interestedPerson === "") {
			setInterestedHelperText("Insira um interessado");
			setLoading(false);
			return "interested error";
		}

		if (!subject) {
			setSubjectHelperText("Selecione um nome de documento");
			setLoading(false);
			return "subject error";
		}

		if (
			isDateNotValid(
				new Date(archivingDate),
				setArchivingDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "archivingDate error";
		}

		if (isDateNotValid(new Date(reference), setReferenceHelperText)) {
			setLoading(false);
			return "reference error";
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
		const verb = editId ? axiosArchives.put : axiosArchives.post;
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				verb(
					`administrative-process/${editId ? `${editId}/` : ""}`,
					{
						notice_date: formatDate(noticeDate),
						archiving_date: formatDate(archivingDate),
						reference_month_year:
							reference !== null ? formatDate(reference) : null,
						process_number: processNumber,
						interested: interestedPerson,
						document_name_id: subject.id,
						file_location_id: fileLocation ? fileLocation.id : "",
						shelf_id: shelf ? shelf.id : "",
						rack_id: rack ? rack.id : "",
						box_abbreviation_id: boxAbbreviation ? boxAbbreviation.id : "",
						box_number: boxNumber,
						box_year: parseInt(boxYear, 10),
						sender_unity: senderUnit.id,
						sender_user: publicWorker !== undefined ? publicWorker.id : null,
						is_filed: isStatusFiled(status),
						is_eliminated: status === "Eliminado",
						unity_id:
							status === "Desarquivado" ? unarchiveDestinationUnit.id : "",
						send_date:
							unarchiveDate !== null && status === "Desarquivado"
								? formatDate(unarchiveDate)
								: null,
						administrative_process_number:
							status === "Desarquivado" ? unarchiveProcessNumber : "",
						notes: notesLocal,
						filer_user: "filer_user",
						temporality_date:
							parseInt(subject.temporality, 10) +
							parseInt(new Date(archivingDate)?.getFullYear(), 10),
					},
					{
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						...(editId && { "Content-Type": "application/json" }),
					}
				)
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
						.get(`administrative-process/${params.id}/`, {
							headers: {
								Authorization: `JWT ${localStorage.getItem("tk")}`,
							},
						})
						.then((responseAdministrative) => {
							setEditId(responseAdministrative.data.id);
							axiosArchives
								.get(
									`document-name/${responseAdministrative.data.document_name_id}/`,
									{
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									}
								)
								.then((response) => {
									setSubject(response.data);
									setSubjectDetail(response.data.document_name);
								})
								.catch(() => connectionError());

							axiosArchives
								.get(`unity/${responseAdministrative.data.sender_unity}/`, {
									headers: {
										Authorization: `JWT ${localStorage.getItem("tk")}`,
									},
								})
								.then((response) => {
									setSenderUnit(response.data);
									setSenderUnitDetail(response.data.unity_name);
								})
								.catch(() => connectionError());

							if (responseAdministrative.data.shelf_id) {
								axiosArchives
									.get(`shelf/${responseAdministrative.data.shelf_id}/`, {
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									})
									.then((response) => {
										setShelf(response.data);
										setShelfDetail(response.data.number);
									})
									.catch(() => connectionError());
							} else {
								setShelfDetail("-");
							}

							if (responseAdministrative.data.rack_id) {
								axiosArchives
									.get(`rack/${responseAdministrative.data.rack_id}/`, {
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									})
									.then((response) => {
										setRack(response.data);
										setRackDetail(response.data.number);
									})
									.catch(() => connectionError());
							} else {
								setRackDetail("-");
							}

							if (responseAdministrative.data.file_location_id) {
								axiosArchives
									.get(
										`file-location/${responseAdministrative.data.file_location_id}/`,
										{
											headers: {
												Authorization: `JWT ${localStorage.getItem("tk")}`,
											},
										}
									)
									.then((response) => {
										setFileLocation(response.data);
										setFileLocationDetail(response.data.file);
									})
									.catch(() => connectionError());
							} else {
								setFileLocationDetail("-");
							}

							if (responseAdministrative.data.box_abbreviation_id) {
								axiosArchives
									.get(
										`box-abbreviation/${responseAdministrative.data.box_abbreviation_id}/`,
										{
											headers: {
												Authorization: `JWT ${localStorage.getItem("tk")}`,
											},
										}
									)
									.then((response) => {
										setBoxAbbreviation(response.data);
										setBoxAbbreviationDetail(response.data.abbreviation);
									})
									.catch(() => connectionError());
							} else {
								setBoxAbbreviationDetail("-");
							}

							axiosArchives
								.get(
									`public-worker/${responseAdministrative.data.sender_user}/`,
									{
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									}
								)
								.then((response) => {
									setPublicWorker(response.data);
									setPublicWorkerDetail(
										`${response.data.name}, ${maskBr.cpf(response.data.cpf)}`
									);
								})
								.catch(() => connectionError());

							setSenderId(responseAdministrative.data.sender_user);

							if (
								!responseAdministrative.data.is_eliminated &&
								!responseAdministrative.data.is_filed &&
								responseAdministrative.data.unity_id
							) {
								axiosArchives
									.get(`unity/${responseAdministrative.data.unity_id}/`, {
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

							if (responseAdministrative.data.is_eliminated) {
								setStatus("Eliminado");
							} else if (responseAdministrative.data.is_filed) {
								setStatus("Arquivado");
							} else {
								setStatus("Desarquivado");

								setUnarchiveProcessNumber(
									responseAdministrative.data.administrative_process_number
										? responseAdministrative.data.administrative_process_number
										: "-"
								);

								setUnarchiveDate(
									responseAdministrative.data.send_date
										? responseAdministrative.data.send_date
										: "-"
								);
							}

							setReference(
								responseAdministrative.data.reference_month_year
									? responseAdministrative.data.reference_month_year
									: "-"
							);

							setProcessNumber(responseAdministrative.data.process_number);
							setNoticeDate(responseAdministrative.data.notice_date);
							setInterested(responseAdministrative.data.interested);
							setArchivingDate(responseAdministrative.data.archiving_date);

							setBoxNumber(responseAdministrative.data.box_number);
							setBoxYear(responseAdministrative.data.box_year);

							setNotes(
								responseAdministrative.data.notes
									? responseAdministrative.data.notes
									: "-"
							);

							setLoading(false);
						})
						.catch(() => connectionError());
				}

				axiosArchives
					.get("administrative-process/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						getUniqueFieldValues(
							response.data,
							"interested",
							setInterestedPersonOptions
						);
					})
					.catch(() => connectionError());

				axiosArchives
					.get("document-name/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						setSubjects(response.data);
					})
					.catch(() => connectionError());

				axiosArchives
					.get("unity/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setUnits(response.data))
					.catch(() => connectionError());

				axiosArchives
					.get("shelf/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setShelfs(response.data))
					.catch(() => connectionError());

				axiosArchives
					.get("rack/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setRacks(response.data))
					.catch(() => connectionError());

				axiosArchives
					.get("file-location/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setFileLocations(response.data))
					.catch(() => connectionError());

				axiosArchives
					.get("box-abbreviation/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setBoxAbbreviations(response.data))
					.catch(() => connectionError());

				getPublicWorkers(setPublicWorkers, connectionError);
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
	}, []);

	const publicWorkerOptions = publicWorkers.map((option) => {
		const firstLetter = option.name[0].toUpperCase();

		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	return (
		<>
			<CardContainer title="Processo Administrativo" spacing={1}>
				{detail ? (
					<DocumentsDetail onDelete={onDelete} onUpdate={onSubmit} />
				) : (
					""
				)}

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
							<KeyboardDatePicker
								inputVariant="outlined"
								okLabel="Confirmar"
								cancelLabel="Cancelar"
								style={{ width: "100%" }}
								id="notice-date-picker-dialog"
								label="Data de Autuação*"
								format="dd/MM/yyyy"
								value={noticeDate}
								onChange={handleNoticeDateChange}
								KeyboardButtonProps={{
									"aria-label": "change notice date",
								}}
								error={noticeDateHelperText !== ""}
								helperText={noticeDateHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<AutoComplete
								value={interestedPerson}
								handleValueChange={handleInterestedChange}
								options={interestedPersonOptions}
								optionsLabel={(option) => option}
								label="Interessado*"
								helperText={interestedHelperText}
								freeField
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<AutoComplete
								value={subject}
								handleValueChange={handleSubjectChange}
								options={subjects}
								optionsLabel={(option) => `${option.document_name}`}
								propertyCheck="document_name"
								sortProperty="document_name"
								label="Nome do Documento*"
								helperText={subjectHelperText}
							/>
						</Grid>

						<SenderUnitInput
							setHelperText={setSenderUnitHelperText}
							set={setSenderUnit}
							senderUnit={senderUnit}
							units={units}
							senderUnitHelperText={senderUnitHelperText}
						/>

						<Grid item xs={12} sm={12} md={12}>
							<KeyboardDatePicker
								inputVariant="outlined"
								okLabel="Confirmar"
								cancelLabel="Cancelar"
								style={{ width: "100%" }}
								id="archiving-date-picker-dialog"
								label="Data de Arquivamento*"
								format="dd/MM/yyyy"
								value={archivingDate}
								onChange={handleArchivingDateChange}
								KeyboardButtonProps={{
									"aria-label": "change archiving date",
								}}
								error={archivingDateHelperText !== ""}
								helperText={archivingDateHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{senderWorker(
								publicWorkers.find((el) => el.id === senderId),
								publicWorkerInput,
								handlePublicWorkerChange,
								setPublicWorkerInput,
								publicWorkerOptions,
								publicWorkerHelperText
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<KeyboardDatePicker
								inputVariant="outlined"
								okLabel="Confirmar"
								cancelLabel="Cancelar"
								style={{ width: "100%" }}
								id="reference-date-picker-dialog"
								openTo="year"
								views={["year", "month"]}
								label="Referência (AC4)"
								format="MM/yyyy"
								value={reference}
								onChange={handleReferenceChange}
								error={referenceHelperText !== ""}
								helperText={referenceHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={8}>
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
						</Grid>

						{status === "Desarquivado" ? (
							<>
								<Grid item xs={12} sm={12} md={12}>
									<FormControl fullWidth variant="outlined">
										<InputLabel id="select-unarchiveDestinationUnit-label">
											Unid. Destino do Desarquivamento
										</InputLabel>
										<Select
											style={{ textAlign: "left" }}
											labelId="select-unarchiveDestinationUnit-label"
											label="Unid. Destino do Desarquivamento"
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
								</Grid>

								<Grid item xs={12} sm={12} md={6}>
									<TextField
										fullWidth
										variant="outlined"
										id="unarchiveProcessNumber"
										label="Nº do Processo do Desarquivamento"
										value={unarchiveProcessNumber}
										onChange={handleUnarchiveProcessNumberChange}
										inputProps={{ maxLength: 15 }}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6}>
									<KeyboardDatePicker
										inputVariant="outlined"
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
								</Grid>
							</>
						) : (
							""
						)}

						<Grid item xs={12} sm={12} md={12}>
							<Typography className={classes.sectionTitle}>
								Caixa de Arquivamento:
							</Typography>
						</Grid>

						<Grid className={classes.boxAB} item xs={12} sm={12} md={4}>
							<AutoComplete
								value={boxAbbreviation}
								handleValueChange={(event, newValue) => {
									setBoxAbbreviationHelperText("");
									setBoxAbbreviation(newValue);
								}}
								options={boxAbbreviations}
								optionsLabel={(option) => `${option.abbreviation}`}
								propertyCheck="abbreviation"
								sortProperty="abbreviation"
								label="Sigla da Caixa"
								helperText={boxAbbreviationHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<TextField
								fullWidth
								variant="outlined"
								label="Número da Caixa"
								value={boxNumber}
								onChange={(event) => {
									setBoxNumber(event.target.value);
									setBoxNumberHelperText("");
								}}
								type="number"
								error={boxNumberHelperText !== ""}
								helperText={boxNumberHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<TextField
								fullWidth
								variant="outlined"
								label="Ano da Caixa"
								value={boxYear}
								onChange={(event) => {
									setBoxYear(event.target.value);
									setBoxYearHelperText("");
								}}
								type="number"
								error={boxYearHelperText !== ""}
								helperText={boxYearHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<Typography className={classes.sectionTitle}>
								Localização do Arquivo:
							</Typography>
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<AutoComplete
								value={shelf}
								handleValueChange={handleShelfChange}
								options={shelfs}
								optionsLabel={(option) => `${option.number}`}
								propertyCheck="number"
								sortProperty="number"
								label="Estante"
								helperText={shelfHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<AutoComplete
								value={rack}
								handleValueChange={handleRackChange}
								options={racks}
								optionsLabel={(option) => `${option.number}`}
								propertyCheck="number"
								sortProperty="number"
								label="Prateleira"
								helperText={rackHelperText}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							<AutoComplete
								value={fileLocation}
								handleValueChange={handleFileLocationChange}
								options={fileLocations}
								optionsLabel={(option) => `${option.file}`}
								propertyCheck="file"
								sortProperty="file"
								label="Localidade"
								helperText={fileLocationHelperText}
							/>
						</Grid>

						<NotesInput set={setNotes} notes={notesLocal} />
					</>
				)}

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
					<DataTable
						title="Processo Administrativo"
						url="administrative-process/"
					/>
				</div>
			) : (
				""
			)}
		</>
	);
};

CreateAdministrativeProcess.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateAdministrativeProcess;
