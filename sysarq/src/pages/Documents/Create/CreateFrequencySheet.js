import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { KeyboardDatePicker } from "@material-ui/pickers";

import {
	Grid,
	CircularProgress,
	TextField,
} from "@material-ui/core";

import {
	// formatDateName,
	formatDate,
	isDateNotValid,
	axiosProfileError,
	getUniqueFieldValues,
	getPublicWorkers,
	autocompl,
	getUnits,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";
import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import DocumentTypeInput from "../../components/Inputs/DocumentTypeInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";
import DataTable from "../../components/DataTable";
import AutoComplete from '../../components/AutoComplete'

const CreateFrequencySheet = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [publicWorkerDetail, setPublicWorkerDetail] = useState("");
	const [typeDetail, setTypeDetail] = useState("");
	const [workplaceWorkerDetail, setWorkplaceWorkerDetail] = useState("");

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [workplaceWorkers, setWorkplaceWorkers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [workerClasses, setWorkerClasses] = useState([]);
	const [districts, setDistricts] = useState([]);

	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [workplaceWorker, setWorkplaceWorker] = useState(null);
	const [roleWorker, setRole] = useState(null);
	const [workerClass, setWorkerClass] = useState(null);
	const [district, setDistrict] = useState(null);

	const [referencePeriod, setReferencePeriod] = useState(null);

	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [type, setType] = useState(null);
	const [notesLocal, setNotes] = useState("");

	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");
	const [roleHelperText, setRoleHelperText] = useState("");
	const [districtHelperText, setDistrictHelperText] = useState("");
	const [workplaceWorkerHelperText, setWorkplaceWorkerHelperText] =
		useState("");

	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [typeHelperText, setTypeHelperText] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(detail);

	const monthMap = {
		"01": "jan",
		"02": "fev",
		"03": "mar",
		"04": "abr",
		"05": "mai",
		"06": "jun",
		"07": "jul",
		"08": "ago",
		"09": "set",
		10: "out",
		11: "nov",
		12: "dez",
	};

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

	const handleWorkplaceWorkerChange = (event, newValue) => {
		setWorkplaceWorkerHelperText("");
		setWorkplaceWorker(newValue);
	};

	const handleRoleChange = (event, newValue) => {
		setRoleHelperText("");
		setRole(newValue);
	};

	const handleWorkerClassChange = (event, newValue) => setWorkerClass(newValue);

	const handleDistrictChange = (event, newValue) => {
		setDistrictHelperText("");
		setDistrict(newValue);
	};

	const handleReferencePeriodChange = (date) => {
		setReferencePeriodHelperText("");
		setReferencePeriod(date);
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

	const clear = () => {
		setPublicWorkerInput("");
		setPublicWorker(undefined);
		setSenderProcessNumber("");
		setRole(null);
		setWorkerClass(null);
		setWorkplaceWorker(null);
		setDistrict(null);
		setNotes("");
		setReferencePeriod(null);
		setType(null);
	};

	const onSuccess = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Documento cadastrado!");
		clear();
		window.location.reload();
	};

	const onSubmit = () => {
		setLoading(true);
		if (!publicWorker) {
			setPublicWorkerHelperText("Selecione um nome");
			setLoading(false);
			return "workerName error";
		}

		if (!roleWorker) {
			setRoleHelperText("Insira um cargo");
			setLoading(false);
			return "role error";
		}

		if (!district) {
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

		if (!workplaceWorker) {
			setWorkplaceWorkerHelperText("Selecione uma unidade");
			setLoading(false);
			return "senderUnit error";
		}

		if (!type) {
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
							workplace: workplaceWorker.id,
							municipal_area: district,
							reference_period: formatDate(referencePeriod),
							notes: notesLocal,
							process_number: senderProcessNumber,
							document_name_id: type.id,
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

	const publicWorkerOptions = publicWorkers.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tkr", res.data.refresh);
				localStorage.setItem("tk", res.data.access);

				getPublicWorkers(setPublicWorkers, connectionError);

				if (detail) {
					setLoading(true);

					axiosArchives
						.get(`frequency-sheet/${params.id}/`, {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((responseFrequencySheet) => {
							setTypeDetail(responseFrequencySheet.data.document_name_name);

							setPublicWorkerDetail(
								`${responseFrequencySheet.data.person_name}, ${maskBr.cpf(
									responseFrequencySheet.data.cpf
								)}`
							);

							setRole(responseFrequencySheet.data.role);
							setDistrict(responseFrequencySheet.data.municipal_area);
							setReferencePeriod(responseFrequencySheet.data.reference_period);
							setWorkplaceWorkerDetail(
								responseFrequencySheet.data.workplace_name
							);
							setWorkerClass(
								responseFrequencySheet.data.category
									? responseFrequencySheet.data.category
									: "-"
							);

							setSenderProcessNumber(
								responseFrequencySheet.data.process_number
									? responseFrequencySheet.data.process_number
									: "-"
							);

							setNotes(
								responseFrequencySheet.data.notes
									? responseFrequencySheet.data.notes
									: "-"
							);

							setLoading(false);
						})
						.catch(() => connectionError());
				}

				axiosArchives
					.get('frequency-sheet/', {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						getUniqueFieldValues(response.data, 'role', setRoles);
						getUniqueFieldValues(response.data, 'category', setWorkerClasses);
						getUniqueFieldValues(response.data, 'municipal_area', setDistricts);
					})
					.catch(() => connectionError());

				axiosArchives
					.get("unity/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setWorkplaceWorkers(response.data))
					.catch(() => connectionError());
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});

		getUnits(setWorkplaceWorkers, connectionError);
	}, []);

	return (
		<>
			<CardContainer title="Folha de Frequências" spacing={1}>
				{detail ? <DocumentsDetail /> : ""}

				{detail && loading ? (
					<CircularProgress style={{ margin: "auto" }} />
				) : (
					<>
						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
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

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									label="Cargo"
									value={roleWorker}
									inputProps={{ maxLength: 100, readOnly: true}}
									multiline
								/>
								) : (
								<AutoComplete 
									value={roleWorker}
									handleValueChange={handleRoleChange}
									options={roles}
									optionsLabel={(option) => `${option}`}
									label="Cargo*"
									helperText={roleHelperText}
									freeField
								/>
								)
							}
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									id="workerClass"
									label="Classe"
									value={workerClass}
									inputProps={{ maxLength: 100, readOnly: true}}
									multiline
								/>
							) : (
								<AutoComplete
									value={workerClass}
									handleValueChange={handleWorkerClassChange}
									options={workerClasses}
									optionsLabel={(option) => `${option}`}
									label="Classe"
									helperText=""
									freeField
								/>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									id="workplaceWorker"
									label="Lotação*"
									value={workplaceWorkerDetail}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<AutoComplete
									value={workplaceWorker}
									handleValueChange={handleWorkplaceWorkerChange}
									options={workplaceWorkers}
									optionsLabel={(option) => `${option.unity_name}`}
									propertyCheck='unity_name'
									sortProperty='unity_name'
									label="Lotação*"
									helperText={workplaceWorkerHelperText}	
								/>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									id="district"
									label="Município"
									value={district}
									inputProps={{ maxLength: 100, readOnly: true}}
									multiline
								/>
							) : (
								<AutoComplete
									value={district}
									handleValueChange={handleDistrictChange}
									options={districts}
									optionsLabel={(option) => `${option}`}
									label="Município*"
									helperText={districtHelperText}
									freeField
								/>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
							{detail ? (
								<TextField
									fullWidth
									variant="outlined"
									id="referencePeriodDate"
									label="Período de Frequência"
									value={
										referencePeriod
											? `${
													monthMap[referencePeriod.substring(5, 7)]
											  }/${referencePeriod.substring(0, 4)}`
											: ""
									}
									inputProps={{ readOnly: true }}
								/>
							) : (
								<KeyboardDatePicker
									inputVariant="outlined"
									style={{ width: "100%" }}
									id="period-date-picker-dialog"
									label="Período de Frequência*"
									format="MMM/yyyy"
									value={referencePeriod}
									onChange={handleReferencePeriodChange}
									openTo="month"
									views={["month", "year"]}
									okLabel="Confirmar"
									cancelLabel="Cancelar"
									error={referencePeriodHelperText !== ""}
									helperText={referencePeriodHelperText}
								/>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
							<TextField
								fullWidth
								variant="outlined"
								id="sender-process-number"
								label="Número do Processo Encaminhador"
								value={senderProcessNumber}
								onChange={handleSenderProcessNumberChange}
								inputProps={{ maxLength: 20, readOnly: detail }}
							/>
						</Grid>

						<DocumentTypeInput
							isDetailPage={detail}
							documentTypeDetail={typeDetail}
							setHelperText={setTypeHelperText}
							set={setType}
							connectionError={connectionError}
							documentType={type}
							documentTypeHelperText={typeHelperText}
						/>

						<NotesInput
							isDetailPage={detail}
							set={setNotes}
							notes={notesLocal}
						/>
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

			<div style={{ marginBottom: "100px" }}>
				<DataTable title="Folhas de Frequência" url="frequency-sheet/" />
			</div>
		</>
	);
};

CreateFrequencySheet.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencySheet;
