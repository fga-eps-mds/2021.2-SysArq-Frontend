/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { Grid, CircularProgress, TextField } from "@material-ui/core";

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
import AutoComplete from "../../components/AutoComplete";

const CreateFrequencySheet = ({ detail }) => {
	const params = detail ? useParams() : "";

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
	const [editId, setEditId] = useState(null);

	const [loading, setLoading] = useState(detail);

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

	const onDelete = () => {
		axiosProfile
		.post(`api/token/refresh/`, {
			refresh: localStorage.getItem("tkr"),
		})
		.then((res) => {
			localStorage.setItem("tk", res.data.access);
			localStorage.setItem("tkr", res.data.refresh);

			axiosArchives
				.delete(`frequency-sheet/${editId}/`, {
					headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
				})
				.then(() => {
					window.close();
				})
		})
		.catch((error) => {
			axiosProfileError(error, connectionError);
		});
	}

	const onSubmit = () => {

		console.log({
			person_id: publicWorker,
			cpf: publicWorker,
			role: roleWorker,
			category: workerClass,
			workplace: workplaceWorker.id,
			municipal_area: district,
			reference_period: new Date(referencePeriod),
			notes: notesLocal,
			process_number: senderProcessNumber,
			document_name_id: type.id,
			temporality_date:
				parseInt(type.temporality, 10)
		})

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
				new Date(referencePeriod),
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

		const verb = editId ? axiosArchives.put : axiosArchives.post;
		console.log('editId :>> ', editId);

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				verb(
						`frequency-sheet/${editId ? `${editId}/` : ''}`,
						{
							person_id: publicWorker.id,
							cpf: publicWorker.cpf,
							role: roleWorker,
							category: workerClass,
							workplace: workplaceWorker.id,
							municipal_area: district,
							reference_period: formatDate(new Date(referencePeriod)),
							notes: notesLocal,
							process_number: senderProcessNumber,
							document_name_id: type.id,
							temporality_date:
								parseInt(type.temporality, 10) +
								parseInt(new Date(referencePeriod).getFullYear(), 10),
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						...(editId && {  "Content-Type": "application/json" }) 
					}
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

				axiosArchives
					.get("unity/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						setWorkplaceWorkers(response.data);
						if (detail) {
							setLoading(true);
		
							axiosArchives
								.get(`frequency-sheet/${params.id}/`, {
									headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
								})
								.then((responseFrequencySheet) => {
									setEditId(responseFrequencySheet.data.id);
									setType(responseFrequencySheet.data.document_name_name);
									
									const newPublicWorker = publicWorkers.find(p => p.cpf === responseFrequencySheet.data.cpf);
									if(newPublicWorker) setPublicWorker(newPublicWorker);
		
									setRole(responseFrequencySheet.data.role);
									setDistrict(responseFrequencySheet.data.municipal_area);
									setReferencePeriod(responseFrequencySheet.data.reference_period);
									setWorkerClass(
										responseFrequencySheet.data.category
											? responseFrequencySheet.data.category
											: "-"
									);

								const newWorkPlace = response.data.find(w => responseFrequencySheet.data.workplace_name === w.unity_name);
								if(newWorkPlace) setWorkplaceWorker(newWorkPlace);
		
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
					})
					.catch(() => connectionError());

				axiosArchives
					.get("frequency-sheet/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						getUniqueFieldValues(response.data, "role", setRoles);
						getUniqueFieldValues(response.data, "category", setWorkerClasses);
						getUniqueFieldValues(response.data, "municipal_area", setDistricts);
					})
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
				{detail ? <DocumentsDetail onDelete={onDelete} onUpdate={onSubmit} /> : ""}

				{detail && loading ? (
					<CircularProgress style={{ margin: "auto" }} />
				) : (
					<>
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

						<Grid item xs={12} sm={12} md={12}>
								<AutoComplete
									value={roleWorker}
									handleValueChange={handleRoleChange}
									options={roles}
									optionsLabel={(option) => `${option}`}
									label="Cargo*"
									helperText={roleHelperText}
									freeField
								/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
								<AutoComplete
									value={workerClass}
									handleValueChange={handleWorkerClassChange}
									options={workerClasses}
									optionsLabel={(option) => `${option}`}
									label="Classe"
									helperText=""
									freeField
								/>
						</Grid>
						<Grid item xs={12} sm={12} md={12}>
								<AutoComplete
									value={workplaceWorker}
									handleValueChange={handleWorkplaceWorkerChange}
									options={workplaceWorkers}
									optionsLabel={(option) => `${option.unity_name}`}
									propertyCheck="unity_name"
									sortProperty="unity_name"
									label="Lotação*"
									helperText={workplaceWorkerHelperText}
								/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
								<AutoComplete
									value={district}
									handleValueChange={handleDistrictChange}
									options={districts}
									optionsLabel={(option) => `${option}`}
									label="Município*"
									helperText={districtHelperText}
									freeField
								/>
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
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
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
							<TextField
								fullWidth
								variant="outlined"
								id="sender-process-number"
								label="Número do Processo Encaminhador"
								value={senderProcessNumber}
								onChange={handleSenderProcessNumberChange}
								inputProps={{ maxLength: 20 }}
							/>
						</Grid>

						<DocumentTypeInput
							setHelperText={setTypeHelperText}
							set={setType}
							connectionError={connectionError}
							documentType={type}
							documentTypeHelperText={typeHelperText}
						/>

						<NotesInput
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

			{!detail ? (
			<div style={{ marginBottom: "100px" }}>
				<DataTable title="Folhas de Frequência" url="frequency-sheet/" />
			</div>
			) : ("")}
		</>
	);
};

CreateFrequencySheet.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencySheet;
