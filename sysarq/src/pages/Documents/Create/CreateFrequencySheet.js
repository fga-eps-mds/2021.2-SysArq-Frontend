import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { KeyboardDatePicker } from "@material-ui/pickers";

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

import {
	// formatDateName,
	formatDate,
	isDateNotValid,
	axiosProfileError,
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

const CreateFrequencySheet = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [publicWorkerDetail, setPublicWorkerDetail] = useState("");
	const [typeDetail, setTypeDetail] = useState("");
	const [workplaceWorkerDetail, setWorkplaceWorkerDetail] = useState("");

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [workplaceWorkers, setWorkplaceWorkers] = useState([]);

	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [workplaceWorker, setWorkplaceWorker] = useState("");
	const [roleWorker, setRole] = useState("");
	const [workerClass, setWorkerClass] = useState("");
	const [district, setDistrict] = useState("");

	const [referencePeriod, setReferencePeriod] = useState(null);

	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [type, setType] = useState("");
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

	const handleWorkplaceWorkerChange = (event) => {
		setWorkplaceWorkerHelperText("");
		setWorkplaceWorker(event.target.value);
	};

	const handleRoleChange = (event) => {
		setRoleHelperText("");
		setRole(event.target.value);
	};

	const handleWorkerClassChange = (event) => setWorkerClass(event.target.value);

	const handleDistrictChange = (event) => {
		setDistrictHelperText("");
		setDistrict(event.target.value);
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
		setWorkplaceWorker("");
		setDistrict("");
		setNotes("");
		setReferencePeriod(null);
		setType("");
		window.location.reload();
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

		if (workplaceWorker === "") {
			setWorkplaceWorkerHelperText("Selecione uma unidade");
			setLoading(false);
			return "senderUnit error";
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
							<TextField
								fullWidth
								variant="outlined"
								id="role"
								label={detail ? "Cargo" : "Cargo*"}
								value={roleWorker}
								onChange={handleRoleChange}
								error={roleHelperText !== ""}
								helperText={roleHelperText}
								inputProps={{ maxLength: 100, readOnly: detail }}
								multiline
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<TextField
								fullWidth
								variant="outlined"
								id="workerClass"
								label="Classe"
								value={workerClass}
								onChange={handleWorkerClassChange}
								inputProps={{ maxLength: 100, readOnly: detail }}
								multiline
							/>
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
								<FormControl
									fullWidth
									variant="outlined"
									error={workplaceWorkerHelperText !== ""}
								>
									<InputLabel id="select-workplaceWorker-label">
										Lotação*
									</InputLabel>
									<Select
										style={{ textAlign: "left" }}
										labelId="select-workplaceWorker-label"
										label="Lotação*"
										id="select-workplaceWorker"
										value={workplaceWorker}
										onChange={handleWorkplaceWorkerChange}
										renderValue={(value) => `${value.unity_name}`}
									>
										<MenuItem key={0} value="">
											<em>Nenhuma</em>
										</MenuItem>

										{workplaceWorkers.map((workplaceWorkerOption) => (
											<MenuItem
												key={workplaceWorkerOption.id}
												value={workplaceWorkerOption}
											>
												{workplaceWorkerOption.unity_name}
											</MenuItem>
										))}
									</Select>
									{workplaceWorkerHelperText ? (
										<FormHelperText>{workplaceWorkerHelperText}</FormHelperText>
									) : (
										""
									)}
								</FormControl>
							)}
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<TextField
								fullWidth
								variant="outlined"
								id="district"
								label={detail ? "Município" : "Município*"}
								value={district}
								onChange={handleDistrictChange}
								error={districtHelperText !== ""}
								helperText={districtHelperText}
								inputProps={{ maxLength: 100, readOnly: detail }}
								multiline
							/>
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
