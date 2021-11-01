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

import Autocomplete from "@material-ui/lab/Autocomplete";

import {
	formatDate,
	initialPeriod,
	isDateNotValid,
	axiosProfileError,
	getPublicWorkers,
} from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateFrequencySheet = () => {
	const url = "document-type/";
	const [types, setTypes] = useState([]);
	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [publicWorkerInput, setPublicWorkerInput] = useState("");
	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [roleWorker, setRole] = useState("");
	const [workerClass, setWorkerClass] = useState("");
	const [workplaceWorker, setWorkplace] = useState("");
	const [district, setDistrict] = useState("");
	const [notesLocal, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState(initialPeriod);
	const [type, setType] = useState("");
	const [roleHelperText, setRoleHelperText] = useState("");
	const [workplaceHelperText, setWorkplaceHelperText] = useState("");
	const [districtHelperText, setDistrictHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");
	const [typeHelperText, setTypeHelperText] = useState("");
	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSenderProcessNumberChange = (event) =>
		setSenderProcessNumber(event.target.value);

	const handlePublicWorkerChange = (value) => {
		setPublicWorkerHelperText("");
		if (!value) {
			setPublicWorker(undefined);
			return;
		}
		setPublicWorker(value);
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

		setPublicWorkerInput("");
		setPublicWorker(undefined);
		setSenderProcessNumber("");
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
		if (!publicWorker) {
			setPublicWorkerHelperText("Selecione um nome");
			setLoading(false);
			return "workerName error";
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
							person_id: publicWorker.id,
							cpf: publicWorker.cpf,
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
			.then((r) => {
				localStorage.setItem("tkr", r.data.refresh);
				localStorage.setItem("tk", r.data.access);
				axiosArchives
					.get(url, {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setTypes(response.data))
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
		<CardContainer title="Folha de Frequências" spacing={1}>
			<Grid item xs={12} sm={12} md={12}>
				<Autocomplete
					id="workerName"
					data-testid="autocomplete"
					value={publicWorkers.name}
					onChange={(event, newValue) => {
						handlePublicWorkerChange(newValue);
					}}
					inputValue={publicWorkerInput}
					onInputChange={(event, newInputValue) => {
						setPublicWorkerInput(newInputValue);
					}}
					options={publicWorkerOptions.sort(
						(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
					)}
					groupBy={(option) => option.firstLetter}
					getOptionLabel={(option) => `${option.name}, ${option.cpf}`}
					getOptionSelected={(option, value) => option.name === value.name}
					autoHighlight
					ListboxProps={{ "data-testid": "list-box" }}
					renderInput={(params) => (
						<TextField
							// eslint-disable-next-line
							{...params}
							value={params.value}
							label="Nome, CPF*"
							error={publicWorkerHelperText !== ""}
							helperText={publicWorkerHelperText}
						/>
					)}
				/>
			</Grid>

			{/* <Grid item xs={12} sm={12} md={4}>
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
			</Grid> */}

			<Grid item xs={12} sm={12} md={12}>
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
