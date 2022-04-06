import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import {
	Grid,
	CircularProgress,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import {
	initialDate,
	initialPeriod,
	isDateNotValid,
	formatDate,
	axiosProfileError,
	getPublicWorkers,
	autocompl,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

import "date-fns";
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

const CreateAdministrativeProcess = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [subjectDetail, setSubjectDetail] = useState("");
	const [senderUnitDetail, setSenderUnitDetail] = useState("");
	const [publicWorkerDetail, setPublicWorkerDetail] = useState("");
	const [unarchiveDestinationUnitDetail, setUnarchiveDestinationUnitDetail] =
		useState("");

	const [subjects, setSubjects] = useState([]);
	const [units, setUnits] = useState([]);

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);

	const [publicWorker, setPublicWorker] = useState("");
	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [noticeDate, setNoticeDate] = useState(detail ? "" : initialDate);
	const [archivingDate, setArchivingDate] = useState(detail ? "" : initialDate);
	const [reference, setReference] = useState(detail ? "" : initialPeriod);
	const [processNumber, setProcessNumber] = useState("");
	const [interestedPerson, setInterested] = useState("");
	const [subject, setSubject] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [status, setStatus] = useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(detail ? "" : initialDate);
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

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(detail);

	const handlePublicWorkerChange = (value) => {
		setPublicWorkerHelperText("");
		if (!value) {
			setPublicWorker(undefined);
			return;
		}
		setPublicWorker(value);
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

	const handleInterestedChange = (event) => {
		setInterestedHelperText("");
		setInterested(event.target.value);
	};

	const handleSubjectChange = (event) => {
		setSubjectHelperText("");
		setSubject(event.target.value);
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

		setNoticeDate(initialDate);
		setArchivingDate(initialDate);
		setReference(initialDate);
		setProcessNumber("");
		setInterested("");
		setSubject("");
		setSenderUnit("");
		setPublicWorkerInput("");
		setPublicWorker(undefined);

		setStatus("");
		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
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
			isDateNotValid(noticeDate, setNoticeDateHelperText, "date", "required")
		) {
			setLoading(false);
			return "noticeDate error";
		}

		if (interestedPerson === "") {
			setInterestedHelperText("Insira um interessado");
			setLoading(false);
			return "interested error";
		}

		if (subject === "") {
			setSubjectHelperText("Selecione um assunto");
			setLoading(false);
			return "subject error";
		}

		if (
			isDateNotValid(
				archivingDate,
				setArchivingDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "archivingDate error";
		}

		if (isDateNotValid(reference, setReferenceHelperText)) {
			setLoading(false);
			return "reference error";
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
						"administrative-process/",
						{
							notice_date: formatDate(noticeDate),
							archiving_date: formatDate(archivingDate),
							reference_month_year:
								reference !== null ? formatDate(reference) : null,
							process_number: processNumber,
							interested: interestedPerson,
							subject_id: subject.id,
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
								parseInt(archivingDate.getFullYear(), 10),
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
						.get(`administrative-process/${params.id}/`, {
							headers: {
								Authorization: `JWT ${localStorage.getItem("tk")}`,
							},
						})
						.then((responseAdministrative) => {
							axiosArchives
								.get(
									`document-subject/${responseAdministrative.data.subject_id}/`,
									{
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									}
								)
								.then((response) => {
									setSubject(response.data);
									setSubjectDetail(response.data.subject_name);
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
					.get("document-subject/", {
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
							{detail ? (
								<TextField
									fullWidth
									id="noticeDate"
									label="Data de Autuação"
									value={
										noticeDate
											? `${noticeDate.substring(8, 10)}/${noticeDate.substring(
													5,
													7
											  )}/${noticeDate.substring(0, 4)}`
											: ""
									}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<KeyboardDatePicker
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
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<TextField
								fullWidth
								id="interested"
								label={detail ? "Interessado" : "Interessado*"}
								value={interestedPerson}
								onChange={handleInterestedChange}
								error={interestedHelperText !== ""}
								helperText={interestedHelperText}
								multiline
								inputProps={{ maxLength: 150, readOnly: detail }}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									id="destinationUnit"
									label="Assunto do Documento"
									value={subjectDetail}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<FormControl fullWidth error={subjectHelperText !== ""}>
									<InputLabel id="select-subject-label">
										Assunto do Documento*
									</InputLabel>
									<Select
										style={{ textAlign: "left" }}
										labelId="select-subject-label"
										id="select-subject"
										value={subject}
										onChange={handleSubjectChange}
										renderValue={(value) => `${value.subject_name}`}
									>
										<MenuItem key={0} value="">
											<em>Nenhum</em>
										</MenuItem>

										{subjects.map((subjectOption) => (
											<MenuItem key={subjectOption.id} value={subjectOption}>
												{subjectOption.subject_name}
											</MenuItem>
										))}
									</Select>
									{subjectHelperText ? (
										<FormHelperText>{subjectHelperText}</FormHelperText>
									) : (
										""
									)}
								</FormControl>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							{detail ? (
								<TextField
									fullWidth
									id="archivingDate"
									label="Data de Arquivamento"
									value={
										archivingDate
											? `${archivingDate.substring(
													8,
													10
											  )}/${archivingDate.substring(
													5,
													7
											  )}/${archivingDate.substring(0, 4)}`
											: ""
									}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<KeyboardDatePicker
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
							)}
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
							{detail ? (
								<TextField
									fullWidth
									id="publicWorker"
									label="Servidor"
									value={publicWorkerDetail}
									inputProps={{ readOnly: true }}
								/>
							) : (
								autocompl(
									publicWorkers,
									publicWorkerInput,
									handlePublicWorkerChange,
									setPublicWorkerInput,
									publicWorkerOptions,
									publicWorkerHelperText
								)
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={4}>
							{detail ? (
								<TextField
									fullWidth
									id="referenceDate"
									label="Referência (AC4)"
									value={
										reference !== "-"
											? `${reference.substring(5, 7)}/${reference.substring(
													0,
													4
											  )}`
											: reference
									}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<KeyboardDatePicker
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
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={8}>
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

						<NotesInput
							set={setNotes}
							notes={notesLocal}
							isDetailPage={detail}
						/>
					</>
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
				<DataTable
					title="Processo Administrativo"
					url="administrative-process/"
				/>
			</div>
		</>
	);
};

CreateAdministrativeProcess.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateAdministrativeProcess;
