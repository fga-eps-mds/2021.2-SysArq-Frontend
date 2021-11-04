import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { Grid, CircularProgress, TextField } from "@material-ui/core";

import {
	formatDate,
	initialPeriod,
	isDateNotValid,
	axiosProfileError,
	getPublicWorkers,
	autocompl,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";
import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import DocumentTypeInput from "../../components/Inputs/DocumentTypeInput";
import NotesInput from "../../components/Inputs/NotesInput";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateFrequencySheet = ({ detail }) => {
	const params = useParams();

	const [typeDetail, setTypeDetail] = useState("");

	const [publicWorkers, setPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);

	const [publicWorkerInput, setPublicWorkerInput] = useState("");

	const [publicWorker, setPublicWorker] = useState(publicWorkers.id);
	const [roleWorker, setRole] = useState("");
	const [workerClass, setWorkerClass] = useState("");
	const [workplaceWorker, setWorkplace] = useState("");
	const [district, setDistrict] = useState("");

	const [referencePeriod, setReferencePeriod] = useState(
		detail ? "" : initialPeriod
	);

	const [senderProcessNumber, setSenderProcessNumber] = useState("");
	const [type, setType] = useState("");
	const [notesLocal, setNotes] = useState("");

	const [publicWorkerHelperText, setPublicWorkerHelperText] = useState("");
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
							axiosArchives
								.get(
									`document-type/${responseFrequencySheet.data.document_type_id}/`,
									{
										headers: {
											Authorization: `JWT ${localStorage.getItem("tk")}`,
										},
									}
								)
								.then((response) => {
									setType(response.data);
								})
								.catch(() => connectionError());

							setTypeDetail(responseFrequencySheet.data.document_type_name);

							setPublicWorker(responseFrequencySheet.data.person_name);
							setRole(responseFrequencySheet.data.role);
							setWorkplace(responseFrequencySheet.data.workplace);
							setDistrict(responseFrequencySheet.data.municipal_area);
							setReferencePeriod(responseFrequencySheet.data.reference_period);

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
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
	}, []);

	return (
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
								id="publicWorker"
								label="Servidor"
								value={publicWorker}
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
							id="workerClass"
							label="Classe"
							value={workerClass}
							onChange={handleWorkerClassChange}
							inputProps={{ maxLength: 100, readOnly: detail }}
							multiline
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<TextField
							fullWidth
							id="workplace"
							label={detail ? "Lotação" : "Lotação*"}
							value={workplaceWorker}
							onChange={handleWorkplaceChange}
							error={workplaceHelperText !== ""}
							helperText={workplaceHelperText}
							inputProps={{ maxLength: 100, readOnly: detail }}
							multiline
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<TextField
							fullWidth
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
								id="referencePeriodDate"
								label="Período de Referência"
								value={
									referencePeriod
										? `${referencePeriod.substring(
												5,
												7
										  )}/${referencePeriod.substring(0, 4)}`
										: ""
								}
								inputProps={{ readOnly: true }}
							/>
						) : (
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
						)}
					</Grid>

					<Grid item xs={12} sm={12} md={6}>
						<TextField
							fullWidth
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

					<NotesInput isDetailPage={detail} set={setNotes} notes={notesLocal} />
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
	);
};

CreateFrequencySheet.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencySheet;
