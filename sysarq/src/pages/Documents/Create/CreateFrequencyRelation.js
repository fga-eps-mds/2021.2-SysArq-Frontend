import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { Grid, CircularProgress } from "@material-ui/core";

import {
	formatDate,
	isDateNotValid,
	axiosProfileError,
	getPublicWorkers,
	getUnits,
} from "../../../support";

import { axiosProfile, axiosArchives } from "../../../Api";

import CardContainer from "../../components/Container/CardContainer";

import DocumentsDetail from "../../components/Actions/DocumentsDetail";

import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import ReferencePeriodInput from "../../components/Inputs/ReferencePeriodInput";

import CommonSet from "../../components/CommonSet/CommonSet";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";
import DataTable from "../../components/DataTable";

const CreateFrequencyRelation = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [documentTypeDetail, setDocumentTypeDetail] = useState("");
	const [senderUnitDetail, setSenderUnitDetail] = useState("");
	const [senderPublicWorkerDetail, setSenderPublicWorkerDetail] = useState("");
	const [receiverPublicWorkerDetail, setReceiverPublicWorkerDetail] = useState("");

	const [senderPublicWorkerInput, setSenderPublicWorkerInput] = useState("");
	const [receiverPublicWorkerInput, setReceiverPublicWorkerInput] = useState("");

	const [units, setUnits] = useState([]);
	const [senderPublicWorkers, setSenderPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);
	const [receiverPublicWorkers, setReceiverPublicWorkers] = useState([
		{ id: 1, name: "inexiste", cpf: "55555555555" },
	]);

	const [senderPublicWorker, setSenderPublicWorker] = useState(senderPublicWorkers.id);
	const [receiverPublicWorker, setReceiverPublicWorker] = useState(receiverPublicWorkers.id);
	const [processNumber, setProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(null);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [notesLocal, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState(
		detail ? [] : []
	);
	
	const [senderPublicWorkerHelperText, setSenderPublicWorkerHelperText] = useState("");
	const [receiverPublicWorkerHelperText, setReceiverPublicWorkerHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [documentTypeHelperText, setDocumentTypeHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(detail);

	const handleAlertClose = () => setOpenAlert(false);
	
	const handleSenderPublicWorkerChange = (value) => {
		setSenderPublicWorkerHelperText("");
		if (!value) {
			setSenderPublicWorker(undefined);
			return;
		}
		setSenderPublicWorker(value);
	};
	const handleReceiverPublicWorkerChange = (value) => {
		setReceiverPublicWorkerHelperText("");
		if (!value) {
			setReceiverPublicWorker(undefined);
			return;
		}
		setReceiverPublicWorker(value);
	};

	const connectionError = (value) => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("error");

		if (value === 400) {
			setAlertHelperText("O N° de processo já existe")
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página."
			);
		}
	};

	const onSuccess = () => {
		setLoading(false);

		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Documento cadastrado!");

		setProcessNumber("");
		setReceivedDate(null);
		setDocumentType("");
		setSenderUnit("");
		setSenderPublicWorkerInput("");
		setSenderPublicWorker(undefined);
		setReceiverPublicWorkerInput("");
		setReceiverPublicWorker(undefined);
		setNotes("");
		setReferencePeriod([]);
		window.location.reload();
	};

	const onSubmit = () => {
		setLoading(true);

		if (processNumber === "") {
			setProcessNumberHelperText("Insira o número do processo");
			setLoading(false);
			return "processNumber error";
		}
		if (!senderPublicWorker) {
			setSenderPublicWorkerHelperText("Selecione um nome");
			setLoading(false);
			return "workerName error";
		}
		if (!receiverPublicWorker) {
			setReceiverPublicWorkerHelperText("Selecione um nome");
			setLoading(false);
			return "workerName error";
		}
		if (
			isDateNotValid(
				receivedDate,
				setReceivedDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "noticeDate error";
		}

		if (documentType === "") {
			setDocumentTypeHelperText("Selecione um nome do documento");
			setLoading(false);
			return "documentType error";
		}

		if (senderUnit === "") {
			setSenderUnitHelperText("Selecione uma unidade");
			setLoading(false);
			return "senderUnit error";
		}

		if (referencePeriod.length === 0) {
			setReferencePeriodHelperText(
				"Não é possível criar uma Relação de Frequências sem um Período de Referência."
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
					.post(
						"frequency-relation/",
						{
							process_number: processNumber,
							notes: notesLocal,
							filer_user: "filer_user",
							received_date: formatDate(receivedDate),
							reference_period: referencePeriod,
							sender_unity: senderUnit.id,
							sender_id: senderPublicWorker.id,
							sender_cpf: senderPublicWorker.cpf,
							receiver_id: receiverPublicWorker.id,
							receiver_cpf: receiverPublicWorker.cpf,
							document_name_id: documentType.id,
							temporality_date: 
								parseInt(documentType.temporality, 10) +
								parseInt(receivedDate.getFullYear(), 10),
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } }
					)
					.then(() => onSuccess())
					.catch((err) => {
						if (err.response.status === 401) {
							axiosProfileError(err);
							return false;
						}
						connectionError(err.response.status);
						return false;
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});

		return "post done";
	};

	const senderPublicWorkerOptions = senderPublicWorkers.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	const receiverPublicWorkerOptions = receiverPublicWorkers.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	useEffect(() => {
		if (detail) {
			setLoading(true);

			axiosProfile
				.post(`api/token/refresh/`, {
					refresh: localStorage.getItem("tkr"),
				})
				.then((res) => {
					localStorage.setItem("tk", res.data.access);
					localStorage.setItem("tkr", res.data.refresh);

					axiosArchives
						.get(`frequency-relation/${params.id}/`, {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((responseFrequencyRelation) => {

							setDocumentTypeDetail(
								responseFrequencyRelation.data.document_name_name
							);
							setSenderUnitDetail(
								responseFrequencyRelation.data.sender_unity_name
							);
							setSenderPublicWorkerDetail(
								`${responseFrequencyRelation.data.sender_name}, ${maskBr.cpf(
									responseFrequencyRelation.data.sender_cpf
								)}`
							);
							setReceiverPublicWorkerDetail(
								`${responseFrequencyRelation.data.receiver_name}, ${maskBr.cpf(
									responseFrequencyRelation.data.receiver_cpf
								)}`
							);

							setProcessNumber(responseFrequencyRelation.data.process_number);
							setReceivedDate(responseFrequencyRelation.data.received_date);

							setNotes(
								responseFrequencyRelation.data.notes
									? responseFrequencyRelation.data.notes
									: "-"
							);

							setReferencePeriod(
								responseFrequencyRelation.data.reference_period
							);

							setLoading(false);
						})
						.catch(() => connectionError());
				})
				.catch((error) => {
					axiosProfileError(error, connectionError);
				});
		}

		getUnits(setUnits, connectionError);
		getPublicWorkers(setSenderPublicWorkers, connectionError);
		getPublicWorkers(setReceiverPublicWorkers, connectionError);
	}, []);

	return (
		<>
			<CardContainer title="Relação de Frequências" spacing={1}>
				{detail ? <DocumentsDetail /> : ""}

				{detail && loading ? (
					<CircularProgress style={{ margin: "auto" }} />
				) : (
					<>
						<Grid item xs={12} sm={6} md={8}>
							<NumberProcessInput
								setHelperText={setProcessNumberHelperText}
								set={setProcessNumber}
								number={processNumber}
								helperText={processNumberHelperText}
								isDetailPage={detail}
							/>
						</Grid>

						<CommonSet
							isDetailPage={detail}
							setReceivedDateHelperText={setReceivedDateHelperText}
							setReceivedDate={setReceivedDate}
							receivedDate={receivedDate}
							receivedDateHelperText={receivedDateHelperText}
							documentTypeDetail={documentTypeDetail}
							setDocumentTypeHelperText={setDocumentTypeHelperText}
							setDocumentType={setDocumentType}
							connectionError={connectionError}
							documentType={documentType}
							documentTypeHelperText={documentTypeHelperText}
							senderUnitDetail={senderUnitDetail}
							setSenderUnitHelperText={setSenderUnitHelperText}
							setSenderUnit={setSenderUnit}
							senderUnit={senderUnit}
							units={units}
							senderUnitHelperText={senderUnitHelperText}
							senderPublicWorkers={senderPublicWorkers}
							senderPublicWorkerInput={senderPublicWorkerInput}
							handleSenderPublicWorkerChange={handleSenderPublicWorkerChange}
							setSenderPublicWorkerInput={setSenderPublicWorkerInput}
							senderPublicWorkerOptions={senderPublicWorkerOptions}
							senderPublicWorkerHelperText={senderPublicWorkerHelperText}
							senderPublicWorkerDetail={senderPublicWorkerDetail}
							receiverPublicWorkers={receiverPublicWorkers}
							receiverPublicWorkerInput={receiverPublicWorkerInput}
							handleReceiverPublicWorkerChange={handleReceiverPublicWorkerChange}
							setReceiverPublicWorkerInput={setReceiverPublicWorkerInput}
							receiverPublicWorkerOptions={receiverPublicWorkerOptions}
							receiverPublicWorkerHelperText={receiverPublicWorkerHelperText}
							receiverPublicWorkerDetail={receiverPublicWorkerDetail}
							setNotes={setNotes}
							notes={notesLocal}
						/>
						
						<ReferencePeriodInput
							referencePeriod={referencePeriod}
							setReferencePeriod={setReferencePeriod}
							setReferencePeriodHelperText={setReferencePeriodHelperText}
							referencePeriodHelperText={referencePeriodHelperText}
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
				<DataTable title="Relação de Frequências" url="frequency-relation/" />
			</div>
		</>
	);
};

CreateFrequencyRelation.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencyRelation;
