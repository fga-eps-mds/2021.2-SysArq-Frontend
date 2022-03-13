import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { Grid, CircularProgress } from "@material-ui/core";

import {
	initialDate,
	formatDate,
	initialPeriod,
	isDateNotValid,
	axiosProfileError,
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

	const [units, setUnits] = useState([]);

	const [processNumber, setProcessNumber] = useState("");
	const [documentDate, setDocumentDate] = useState(detail ? "" : initialDate);
	const [receivedDate, setReceivedDate] = useState(detail ? "" : initialDate);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [notesLocal, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState(
		detail ? [] : [formatDate(initialPeriod)]
	);

	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [documentDateHelperText, setDocumentDateHelperText] = useState("");
	const [documentTypeHelperText, setDocumentTypeHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(detail);

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

		setProcessNumber("");
		setReceivedDate(initialDate);
		setDocumentDate(initialDate);
		setDocumentType("");
		setSenderUnit("");
		setNotes("");
		setReferencePeriod([formatDate(initialPeriod)]);
	};

	const onSubmit = () => {
		setLoading(true);

		if (processNumber === "") {
			setProcessNumberHelperText("Insira o número do processo");
			setLoading(false);
			return "processNumber error";
		}

		if (
			isDateNotValid(
				documentDate,
				setDocumentDateHelperText,
				"date",
				"required"
			)
		) {
			setLoading(false);
			return "documentDate error";
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
			setDocumentTypeHelperText("Selecione um tipo de documento");
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
							document_date: formatDate(documentDate),
							received_date: formatDate(receivedDate),
							reference_period: referencePeriod,
							sender_unity: senderUnit.id,
							document_type_id: documentType.id,
							temporality_date:
								parseInt(documentType.temporality, 10) +
								parseInt(documentDate.getFullYear(), 10),
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
							// axiosArchives
							// 	.get(
							// 		`document-type/${responseFrequencyRelation.data.document_type_id}/`,
							// 		{
							// 			headers: {
							// 				Authorization: `JWT ${localStorage.getItem("tk")}`,
							// 			},
							// 		}
							// 	)
							// 	.then((response) => {
							// 		setDocumentType(response.data);
							// 	})
							// 	.catch(() => connectionError());

							// axiosArchives
							// 	.get(`unity/${responseFrequencyRelation.data.sender_unity}/`, {
							// 		headers: {
							// 			Authorization: `JWT ${localStorage.getItem("tk")}`,
							// 		},
							// 	})
							// 	.then((response) => {
							// 		setSenderUnit(response.data);
							// 	})
							// 	.catch(() => connectionError());

							setDocumentTypeDetail(
								responseFrequencyRelation.data.document_type_name
							);
							setSenderUnitDetail(
								responseFrequencyRelation.data.sender_unity_name
							);

							setProcessNumber(responseFrequencyRelation.data.process_number);
							setDocumentDate(responseFrequencyRelation.data.document_date);
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
	}, []);

	return (
		<>
		<CardContainer title="Relação de Frequências" spacing={1}>
			{detail ? <DocumentsDetail /> : ""}

			{detail && loading ? (
				<CircularProgress style={{ margin: "auto" }} />
			) : (
				<>
					<Grid item xs={12} sm={6} md={4}>
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
						setDocumentDateHelperText={setDocumentDateHelperText}
						setDocumentDate={setDocumentDate}
						documentDate={documentDate}
						documentDateHelperText={documentDateHelperText}
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
		
		<div style={{marginBottom: "100px"}}>
				<DataTable title="Relação de Frequências" url="frequency-relation/" />
		</div>

		</>
	);
};

CreateFrequencyRelation.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencyRelation;
