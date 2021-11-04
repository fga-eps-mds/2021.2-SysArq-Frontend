import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

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

const CreateFrequencyRelation = ({ detail }) => {
	const params = detail ? useParams() : "";

	const [units, setUnits] = useState([]);

	const [processNumber, setProcessNumber] = useState("");
	const [documentDate, setDocumentDate] = useState(initialDate);
	const [receivedDate, setReceivedDate] = useState(initialDate);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [notesLocal, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState([
		formatDate(initialPeriod),
	]);

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

	const [loading, setLoading] = useState(false);

	const [isDisabled, setIsDisabled] = useState(false);

	const url = window.location.href;
	const params = useParams();

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
		if(url.includes("view")) {
			setIsDisabled(true);
		
			axiosProfile
			.post(`api/token/refresh/`,{
				refresh: localStorage.getItem("tkr")
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
				.get(`frequency-relation/${params.id}/`, { headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } })
				.then((response) => {
					console.log("Resp: ", response);
					setProcessNumber(response.data.process_number);
					setDocumentDate(response.data.document_date);
					setReceivedDate(response.data.received_date);
					setDocumentType(response.data.document_type_id);
					setNotes(response.data.notes);
					setReferencePeriod(response.data.reference_period);
					
					if(response.status === 200) {
						axiosArchives
						.get("unity/", {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((responseUnity) => {
							setUnits(responseUnity.data);
							
							responseUnity.data.forEach(unity => {
								if(unity.id === response.data.sender_unity) {
									setSenderUnit(unity);
								}
							})
						})
						.catch(() => connectionError());
					}

				})
				.catch(() => connectionError());
			})
			
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
		}
	}, [])

	useEffect(() => {
		getUnits(setUnits, connectionError);
	}, []);

	return (
		<CardContainer title="Relação de Frequências" spacing={1}>
			<Grid item xs={12} sm={6} md={4}>
				<NumberProcessInput
					setHelperText={setProcessNumberHelperText}
					set={setProcessNumber}
					number={processNumber}
					helperText={processNumberHelperText}
					isDisabled={isDisabled}
				/>
			</Grid>

			<CommonSet
				isDisabled={isDisabled}
				units={units}
				documentDate={documentDate}
				setDocumentDate={setDocumentDate}
				receivedDate={receivedDate}
				setReceivedDate={setReceivedDate}
				documentType={documentType}
				setDocumentType={setDocumentType}
				senderUnit={senderUnit}
				setSenderUnit={setSenderUnit}
				notes={notesLocal}
				setNotes={setNotes}
				setDocumentDateHelperText={setDocumentDateHelperText}
				documentDateHelperText={documentDateHelperText}
				setReceivedDateHelperText={setReceivedDateHelperText}
				receivedDateHelperText={receivedDateHelperText}
				documentTypeHelperText={documentTypeHelperText}
				setDocumentTypeHelperText={setDocumentTypeHelperText}
				senderUnitHelperText={senderUnitHelperText}
				setSenderUnitHelperText={setSenderUnitHelperText}
				connectionError={connectionError}
			/>

			<ReferencePeriodInput
				referencePeriod={referencePeriod}
				setReferencePeriod={setReferencePeriod}
				setReferencePeriodHelperText={setReferencePeriodHelperText}
				referencePeriodHelperText={referencePeriodHelperText}
				isDetailPage={detail}
			/>

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

CreateFrequencyRelation.propTypes = {
	detail: PropTypes.bool.isRequired,
};

export default CreateFrequencyRelation;
