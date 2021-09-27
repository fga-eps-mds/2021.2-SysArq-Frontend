import React, { useState, useEffect } from "react";

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
} from "../../../support";

import { axiosArchives } from "../../../Api";

import DocumentsContainer from "../../components/Container/DocumentsContainer";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import SenderUnitInput from "../../components/Inputs/SenderUnitInput";
import AbbreviationInput from "../../components/Inputs/AbbreviationInput";
import ShelfInput from "../../components/Inputs/ShelfInput";
import RackInput from "../../components/Inputs/RackInput";
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

	const [noticeDate, setNoticeDate] = useState(initialDate);
	const [archivingDate, setArchivingDate] = useState(initialDate);
	const [reference, setReference] = useState(initialPeriod);
	const [processNumber, setProcessNumber] = useState("");
	const [personRegistry, setPersonRegistry] = useState("");
	const [interested, setInterested] = useState("");
	const [subject, setSubject] = useState("");
	const [destinationUnit, setDestinationUnit] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [senderWorker, setSenderWorker] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [status, setStatus] = useState("");
	const [unarchiveDestinationUnit, setUnarchiveDestinationUnit] = useState("");
	const [unarchiveProcessNumber, setUnarchiveProcessNumber] = useState("");
	const [unarchiveDate, setUnarchiveDate] = useState(initialDate);
	const [notes, setNotes] = useState("");

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

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

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

	const handleSenderWorkerChange = (event) =>
		setSenderWorker(event.target.value);

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
		setSenderWorker("");
		setAbbreviation("");
		setShelf("");
		setRack("");
		setStatus("");
		setUnarchiveDestinationUnit("");
		setUnarchiveProcessNumber("");
		setUnarchiveDate(initialDate);
		setNotes("");
	};

	const onSubmit = () => {
		setLoading(true);

		if (
			isDateNotValid(noticeDate, setNoticeDateHelperText, "date", "required")
		) {
			setLoading(false);
			return "noticeDate error";
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

		if (processNumber === "") {
			setProcessNumberHelperText("Insira o número do processo");
			setLoading(false);
			return "processNumber error";
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

		if (interested === "") {
			setInterestedHelperText("Insira um interessado");
			setLoading(false);
			return "interested error";
		}

		if (subject === "") {
			setSubjectHelperText("Selecione um assunto");
			setLoading(false);
			return "subject error";
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

		axiosArchives
			.post("administrative-process/", {
				notice_date: formatDate(noticeDate),
				archiving_date: formatDate(archivingDate),
				reference_month_year: reference !== null ? formatDate(reference) : null,
				process_number: processNumber,
				cpf_cnpj: personRegistry,
				interested,
				subject_id: subject.id,
				dest_unity_id: destinationUnit.id,
				sender_unity: senderUnit.id,
				sender_user: senderWorker,
				abbreviation_id: abbreviation.id,
				shelf_id: shelf.id,
				rack_id: rack.id,
				is_filed: isStatusFiled(status),
				is_eliminated: status === "Eliminado",
				unity_id: unarchiveDestinationUnit.id,
				send_date: unarchiveDate !== null ? formatDate(unarchiveDate) : null,
				administrative_process_number: unarchiveProcessNumber,
				notes,
				filer_user: "filer_user", //
			})
			.then(() => onSuccess())
			.catch(() => connectionError());

		return "post done";
	};

	useEffect(() => {
		axiosArchives
			.get("document-subject/")
			.then((response) => setSubjects(response.data))
			.catch(() => connectionError());

		axiosArchives
			.get("unity/")
			.then((response) => setUnits(response.data))
			.catch(() => connectionError());
	}, []);

	return (
		<DocumentsContainer title="Processo Administrativo" spacing={1}>
			<Grid item xs={12} sm={6} md={4}>
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
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
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
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
				<NumberProcessInput
					setHelperText={setProcessNumberHelperText}
					set={setProcessNumber}
					number={processNumber}
					helperText={processNumberHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
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
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="interested"
					label="Interessado*"
					value={interested}
					onChange={handleInterestedChange}
					error={interestedHelperText !== ""}
					helperText={interestedHelperText}
					multiline
					inputProps={{ maxLength: 150 }}
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

			<Grid item xs={12} sm={12} md={12}>
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

			<SenderUnitInput
				setHelperText={setSenderUnitHelperText}
				set={setSenderUnit}
				senderUnit={senderUnit}
				units={units}
				senderUnitHelperText={senderUnitHelperText}
			/>

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="sender-worker"
					label="Servidor que Encaminhou"
					value={senderWorker}
					onChange={handleSenderWorkerChange}
					multiline
					inputProps={{ maxLength: 150 }}
				/>
			</Grid>

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

			<Grid item xs={12} sm={12} md={12}>
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
						/>
					</Grid>
				</>
			) : (
				""
			)}

			<NotesInput set={setNotes} notes={notes} />

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

export default CreateAdministrativeProcess;
