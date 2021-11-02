import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
	Grid,
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
	isInt,
	formatDate,
	axiosProfileError,
	getPublicWorkers,
	autocompl,
} from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

import "date-fns";

const isPersonRegistryLengthValid = (registryLength) =>
	registryLength === 11 || registryLength === 15;

const isStatusFiled = (status) => {
	if (status === "Arquivado") {
		return true;
	}
	if (status === "Desarquivado") {
		return false;
	}
	return null;
};

const CreateAdministrativeProcess = () => {
	const [subjects, setSubjects] = useState([]);
	const [units, setUnits] = useState([]);

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [noticeDate, setNoticeDate] = useState(initialDate);
	const [archivingDate, setArchivingDate] = useState(initialDate);
	const [reference, setReference] = useState(initialPeriod);
	const [processNumber, setProcessNumber] = useState("");
	const [personRegistry, setPersonRegistry] = useState("");
	const [interestedPerson, setInterested] = useState("");
	const [subject, setSubject] = useState("");
	const [destinationUnit, setDestinationUnit] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [status, setStatus] = useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(initialDate);
	const [notesLocal, setNotes] = useState("");

	const [noticeDateHelperText, setNoticeDateHelperText] = useState("");
	const [archivingDateHelperText, setArchivingDateHelperText] = useState("");
	const [referenceHelperText, setReferenceHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [personRegistryHelperText, setPersonRegistryHelperText] = useState("");
	const [interestedHelperText, setInterestedHelperText] = useState("");
	const [subjectHelperText, setSubjectHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [statusHelperText, setStatusHelperText] = useState("");
	const [unarchiveDateHelperText, setUnarchiveDateHelperText] = useState("");
	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handlePublicWorkerChange = (value) => {
		setPublicWorkerHelperText("");
		if (!value) {
			setPublicWorker(undefined);
			return;
		}
		setPublicWorker(value);
	};

	const [isDisabled, setIsDisabled] = useState(false);

	const url = window.location.href;
	const params = useParams();
	
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

	const handlePersonRegistryChange = (event) => {
		setPersonRegistryHelperText("");
		setPersonRegistry(event.target.value);
	};

	const handleInterestedChange = (event) => {
		setInterestedHelperText("");
		setInterested(event.target.value);
	};

	const handleSubjectChange = (event) => {
		setSubjectHelperText("");
		setSubject(event.target.value);
	};

	const handleDestinationUnitChange = (event) =>
		setDestinationUnit(event.target.value);

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
		setPersonRegistry("");
		setInterested("");
		setSubject("");
		setDestinationUnit("");
		setSenderUnit("");
		setPublicWorkerInput("");
		setPublicWorker(undefined);

		setStatus("");
		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
		setNotes("");
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

		if (personRegistry !== "") {
			if (!isInt(personRegistry)) {
				setPersonRegistryHelperText("Insira somente números");
				setLoading(false);
				return "personRegistry content error";
			}
			if (!isPersonRegistryLengthValid(personRegistry.length)) {
				setPersonRegistryHelperText("Insira um CPF/CNPJ válido");
				setLoading(false);
				return "personRegistry length error";
			}
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
							cpf_cnpj: personRegistry,
							interested: interestedPerson,
							subject_id: subject.id,
							dest_unity_id: destinationUnit.id,
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
				axiosArchives
					.get("document-subject/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => { 
						setSubjects(response.data);

						if(url.includes("view")) {
							setIsDisabled(true);
						}

						if(url.includes("view")) {
							axiosArchives
							.get(`administrative-process/${params.id}/`, { headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } })
							.then((responseAdministrative => {
								console.log("Resp: ", responseAdministrative);
								setProcessNumber(responseAdministrative.data.process_number);
								setNoticeDate(responseAdministrative.data.notice_date);
								setInterested(responseAdministrative.data.interested);
								setPersonRegistry(responseAdministrative.data.cpf_cnpj);
								setSubject(responseAdministrative.data.subject_id);
								setArchivingDate(responseAdministrative.data.archiving_date);
								setSenderWorker(responseAdministrative.data.sender_user);
								setReference(responseAdministrative.data.reference_month_year);
								setNotes(responseAdministrative.data.notes);

								response.data.forEach(subjectOption =>{
									if(subjectOption.id === responseAdministrative.data.subject_id) {
										setSubject(subjectOption);
									}
								})

								if(responseAdministrative.data.is_filed) {
									setStatus("Arquivado");
								} else {
									setStatus("Desarquivado");
									// setUnarchiveDestinationUnit(responseAdministrative.data.unity_id);
									setUnarchiveProcessNumber(responseAdministrative.data.administrative_process_number);
									setUnarchiveDate(responseAdministrative.data.send_date);
								}

								if(responseAdministrative.data.is_eliminated) {
									setStatus("Eliminado");
								}

								if(responseAdministrative.status === 200) {
									axiosArchives
										.get("unity/", {
											headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
										})
										.then((responseUnity) => {
											setUnits(responseUnity.data);
											responseUnity.data.forEach(unity => {
												if(unity.id === responseAdministrative.data.dest_unity_id) {
													setDestinationUnit(unity);
												}
												
												if(unity.id === responseAdministrative.data.sender_unity) {
													setSenderUnit(unity);
												}
												
												// if(unity.id === responseAdministrative.data.send_date) {
												// 	setUnarchiveDate(unity);
												// }
											})
										})
										.catch(() => connectionError());
								}
							}))
						}
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
		<CardContainer title="Processo Administrativo" spacing={1}>
			<Grid item xs={12} sm={6} md={6}>
				<NumberProcessInput
					setHelperText={setProcessNumberHelperText}
					set={setProcessNumber}
					number={processNumber}
					helperText={processNumberHelperText}
					isDisabled={isDisabled}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
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
					disabled={isDisabled}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={8}>
				<TextField
					fullWidth
					id="interested"
					label="Interessado*"
					value={interestedPerson}
					onChange={handleInterestedChange}
					error={interestedHelperText !== ""}
					helperText={interestedHelperText}
					multiline
					inputProps={{ maxLength: 150 }}
					disabled={isDisabled}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={4}>
				<TextField
					fullWidth
					id="cpf-cpnj"
					label="CPF/CNPJ"
					placeholder="Somente números"
					value={personRegistry}
					onChange={handlePersonRegistryChange}
					error={personRegistryHelperText !== ""}
					helperText={personRegistryHelperText}
					inputProps={{ maxLength: 15 }}
					disabled={isDisabled}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
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
						disabled={isDisabled}
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
			</Grid>

			<Grid item xs={12} sm={12} md={8}>
				<FormControl fullWidth>
					<InputLabel id="select-destinationUnit-label">
						Unidade de Destino
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-destinationUnit-label"
						id="select-destinationUnit"
						value={destinationUnit}
						onChange={handleDestinationUnitChange}
						renderValue={(value) => `${value.unity_name}`}
						disabled={isDisabled}
					>
						<MenuItem key={0} value="">
							<em>Nenhuma</em>
						</MenuItem>

						{units.map((destUnitOption) => (
							<MenuItem id={destUnitOption.id} value={destUnitOption}>
								{destUnitOption.unity_name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} sm={12} md={4}>
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
					disabled={isDisabled}
				/>
			</Grid>
			<SenderUnitInput
				setHelperText={setSenderUnitHelperText}
				set={setSenderUnit}
				senderUnit={senderUnit}
				units={units}
				senderUnitHelperText={senderUnitHelperText}
				isDisabled={isDisabled}
			/>

			<Grid item xs={12} sm={12} md={12}>
				{autocompl(
					publicWorkers,
					publicWorkerInput,
					handlePublicWorkerChange,
					setPublicWorkerInput,
					publicWorkerOptions,
					publicWorkerHelperText
				)}
			</Grid>

			<Grid item xs={12} sm={12} md={4}>
				<KeyboardDatePicker
					okLabel="Confirmar"
					cancelLabel="Cancelar"
					style={{ width: "100%" }}
					id="reference-date-picker-dialog"
					openTo="year"
					views={["year", "month"]}
					label="Referência"
					format="MM/yyyy"
					value={reference}
					onChange={handleReferenceChange}
					error={referenceHelperText !== ""}
					helperText={referenceHelperText}
					disabled={isDisabled}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={8}>
				<FormControl fullWidth error={statusHelperText !== ""}>
					<InputLabel id="select-status-label">Status*</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-status-label"
						id="select-status"
						value={status}
						onChange={handleStatusChange}
						renderValue={(value) => `${value}`}
						disabled={isDisabled}
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
								disabled={isDisabled}
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
							id="unarchiveProcessNumber"
							label="Nº do Processo do Desarquivamento"
							value={unarchiveProcessNumber}
							onChange={handleUnarchiveProcessNumberChange}
							inputProps={{ maxLength: 15 }}
							disabled={isDisabled}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
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
							disabled={isDisabled}
						/>
					</Grid>
				</>
			) : (
				""
			)}

			<NotesInput set={setNotes} notes={notesLocal} isDisabled={isDisabled} />

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

export default CreateAdministrativeProcess;
