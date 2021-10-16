import React, { useState } from "react";

import { Grid, TextField } from "@material-ui/core";

import { formatDate, initialPeriod, isInt } from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import AbbreviationInput from "../../components/Inputs/AbbreviationInput";
import ShelfInput from "../../components/Inputs/ShelfInput";
import RackInput from "../../components/Inputs/RackInput";
import NotesInput from "../../components/Inputs/NotesInput";
import ReferencePeriodInput from "../../components/Inputs/ReferencePeriodInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateFrequencySheet = () => {
	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [cpf, setCpf] = useState("");
	const [workerName, setWorkerName] = useState("");
	const [role, setRole] = useState("");
	const [workerClass, setWorkerClass] = useState("");
	const [workplace, setWorkplace] = useState("");
	const [district, setDistrict] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [notes, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState([
		formatDate(initialPeriod),
	]);

	const [cpfHelperText, setCpfHelperText] = useState("");
	const [workerNameHelperText, setWorkerNameHelperText] = useState("");
	const [roleHelperText, setRoleHelperText] = useState("");
	const [workplaceHelperText, setWorkplaceHelperText] = useState("");
	const [districtHelperText, setDistrictHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
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
		setAbbreviation("");
		setShelf("");
		setRack("");
		setNotes("");
		setReferencePeriod([formatDate(initialPeriod)]);
	};

	const onSubmit = () => {
		setLoading(true);

		if (cpf === "") {
			setCpfHelperText("Insira um CPF");
			setLoading(false);
			return "cpf error";
		}

		if (!isInt(cpf) || cpf.length !== 11) {
			setCpfHelperText("Insira um CPF válido");
			setLoading(false);
			return "cpf error";
		}

		if (workerName === "") {
			setWorkerNameHelperText("Insira o nome");
			setLoading(false);
			return "workerName error";
		}

		if (role === "") {
			setRoleHelperText("Insira um cargo");
			setLoading(false);
			return "role error";
		}

		if (workplace === "") {
			setWorkplaceHelperText("Insira uma lotação");
			setLoading(false);
			return "workplace error";
		}

		if (district === "") {
			setDistrictHelperText("Insira um município");
			setLoading(false);
			return "district error";
		}

		if (referencePeriod.length === 0) {
			setReferencePeriodHelperText(
				"Não é possível criar uma Folha de Frequências sem um Período de Referência."
			);
			setLoading(false);
			return "referencePeriod error";
		}

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.post("frequency-sheet/", {
						person_name: workerName,
						cpf,
						role,
						category: workerClass,
						workplace,
						municipal_area: district,
						reference_period: referencePeriod,
						notes,
						process_number: senderProcessNumber,
						abbreviation_id: abbreviation.id,
						shelf_id: shelf.id,
						rack_id: rack.id,
					})
					.then(() => onSuccess())
					.catch(() => connectionError());
			})
			.catch(() => {});

		return "post done";
	};

	return (
		<CardContainer title="Folha de Frequências" spacing={1}>
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

			<Grid item xs={12} sm={12} md={6}>
				<TextField
					fullWidth
					id="cpf"
					label="CPF*"
					value={cpf}
					onChange={handleCpfChange}
					error={cpfHelperText !== ""}
					helperText={cpfHelperText}
					inputProps={{ maxLength: 11 }}
				/>
			</Grid>

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

			<Grid item xs={12} sm={12} md={12}>
				<TextField
					fullWidth
					id="role"
					label="Cargo*"
					value={role}
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
					value={workplace}
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

			<ReferencePeriodInput
				referencePeriod={referencePeriod}
				setReferencePeriod={setReferencePeriod}
				setReferencePeriodHelperText={setReferencePeriodHelperText}
				referencePeriodHelperText={referencePeriodHelperText}
			/>

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
