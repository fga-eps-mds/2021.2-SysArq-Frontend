import React, { useState, useEffect } from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";

import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";

import {
	formatDate,
	initialPeriod,
	isInt,
	isDateNotValid,
	axiosProfileError,
} from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateFrequencySheet = () => {
	const [types, setTypes] = useState([]);
	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [cpfWorker, setCpf] = useState("");
	const [workerName, setWorkerName] = useState("");
	const [roleWorker, setRole] = useState("");
	const [workerClass, setWorkerClass] = useState("");
	const [workplaceWorker, setWorkplace] = useState("");
	const [district, setDistrict] = useState("");
	const [notesLocal, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState(initialPeriod);
	const [type, setType] = useState("");

	const [cpfHelperText, setCpfHelperText] = useState("");
	const [workerNameHelperText, setWorkerNameHelperText] = useState("");
	const [roleHelperText, setRoleHelperText] = useState("");
	const [workplaceHelperText, setWorkplaceHelperText] = useState("");
	const [districtHelperText, setDistrictHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");
	const [typeHelperText, setTypeHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSenderProcessNumberChange = (event) =>
		setSenderProcessNumber(event.target.value);

	const handleCpfChange = (event) => {
		setCpfHelperText("");
		setCpf(event.target.value);
	};

	const handleWorkerNameChange = (event) => {
		setWorkerNameHelperText("");
		setWorkerName(event.target.value);
	};

	const handleRoleChange = (event) => {
		setRoleHelperText("");
		setRole(event.target.value);
	};

	const handleWorkerClassChange = (event) => setWorkerClass(event.target.value);

	const handleWorkplaceChange = (event) => {
		setWorkplaceHelperText("");
		setWorkplace(event.target.value);
	};

	const handleDistrictChange = (event) => {
		setDistrictHelperText("");
		setDistrict(event.target.value);
	};

	const handleReferencePeriodChange = (date) => {
		setReferencePeriodHelperText("");
		setReferencePeriod(date);
	};

	const handleTypeChange = (event) => {
		setTypeHelperText("");
		setType(event.target.value);
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

		setSenderProcessNumber("");
		setCpf("");
		setWorkerName("");
		setRole("");
		setWorkerClass("");
		setWorkplace("");
		setDistrict("");
		setNotes("");
		setReferencePeriod(initialPeriod);
		setType("");
	};

	const onSubmit = () => {
		setLoading(true);

		if (workerName === "") {
			setWorkerNameHelperText("Insira o nome");
			setLoading(false);
			return "workerName error";
		}

		if (cpfWorker === "") {
			setCpfHelperText("Insira um CPF");
			setLoading(false);
			return "cpf error";
		}

		if (!isInt(cpfWorker) || cpfWorker.length !== 11) {
			setCpfHelperText("Insira um CPF válido");
			setLoading(false);
			return "cpf error";
		}

		if (roleWorker === "") {
			setRoleHelperText("Insira um cargo");
			setLoading(false);
			return "role error";
		}

		if (workplaceWorker === "") {
			setWorkplaceHelperText("Insira uma lotação");
			setLoading(false);
			return "workplace error";
		}

		if (district === "") {
			setDistrictHelperText("Insira um município");
			setLoading(false);
			return "district error";
		}

		if (
			isDateNotValid(
				referencePeriod,
				setReferencePeriodHelperText,
				"period",
				"required"
			)
		) {
			setLoading(false);
			return "reference error";
		}

		if (type === "") {
			setTypeHelperText("Selecione um tipo");
			setLoading(false);
			return "type error";
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
						"frequency-sheet/",
						{
							person_name: workerName,
							cpf: cpfWorker,
							role: roleWorker,
							category: workerClass,
							workplace: workplaceWorker,
							municipal_area: district,
							reference_period: formatDate(referencePeriod),
							notes: notesLocal,
							process_number: senderProcessNumber,
							document_type_id: type.id,
							temporality_date:
								parseInt(type.temporality, 10) +
								parseInt(referencePeriod.getFullYear(), 10),
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
					.get("document-type/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setTypes(response.data))
					.catch(() => connectionError());
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
	});

	return (
		<CardContainer title="Folha de Frequências" spacing={1}>
			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="workerName"
					label="Nome do Servidor*"
					value={workerName}
					onChange={handleWorkerNameChange}
					error={workerNameHelperText !== ""}
					helperText={workerNameHelperText}
					inputProps={{ maxLength: 150 }}
					multiline
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={4}>
				<TextField
					fullWidth
					id="cpf"
					label="CPF*"
					value={cpfWorker}
					onChange={handleCpfChange}
					error={cpfHelperText !== ""}
					helperText={cpfHelperText}
					inputProps={{ maxLength: 11 }}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={8}>
				<TextField
					fullWidth
					id="role"
					label="Cargo*"
					value={roleWorker}
					onChange={handleRoleChange}
					error={roleHelperText !== ""}
					helperText={roleHelperText}
					inputProps={{ maxLength: 100 }}
					multiline
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="workerClass"
					label="Classe"
					value={workerClass}
					onChange={handleWorkerClassChange}
					inputProps={{ maxLength: 100 }}
					multiline
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="workplace"
					label="Lotação*"
					value={workplaceWorker}
					onChange={handleWorkplaceChange}
					error={workplaceHelperText !== ""}
					helperText={workplaceHelperText}
					inputProps={{ maxLength: 100 }}
					multiline
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="district"
					label="Município*"
					value={district}
					onChange={handleDistrictChange}
					error={districtHelperText !== ""}
					helperText={districtHelperText}
					inputProps={{ maxLength: 100 }}
					multiline
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={6}>
				<KeyboardDatePicker
					style={{ width: "100%" }}
					id="period-date-picker-dialog"
					label="Período de Referencia*"
					format="MM/yyyy"
					value={referencePeriod}
					onChange={handleReferencePeriodChange}
					openTo="month"
					views={["month", "year"]}
					okLabel="Confirmar"
					cancelLabel="Cancelar"
					error={referencePeriodHelperText !== ""}
					helperText={referencePeriodHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={6}>
				<TextField
					fullWidth
					id="sender-process-number"
					label="Número do Processo Encaminhador"
					value={senderProcessNumber}
					onChange={handleSenderProcessNumberChange}
					inputProps={{ maxLength: 20 }}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={12}>
				<FormControl fullWidth error={typeHelperText !== ""}>
					<InputLabel id="select-type-label">Tipo do Documento*</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-type-label"
						id="select-type"
						value={type}
						onChange={handleTypeChange}
						renderValue={(value) => `${value.document_name}`}
					>
						<MenuItem key={0} value="">
							<em>Nenhum</em>
						</MenuItem>

						{types.map((typeOption) => (
							<MenuItem key={typeOption.id} value={typeOption}>
								{typeOption.document_name}
							</MenuItem>
						))}
					</Select>
					{typeHelperText ? (
						<FormHelperText>{typeHelperText}</FormHelperText>
					) : (
						""
					)}
				</FormControl>
			</Grid>

			<NotesInput set={setNotes} notes={notesLocal} />

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

export default CreateFrequencySheet;
