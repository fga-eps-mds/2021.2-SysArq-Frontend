import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import {
	initialDate,
	formatDate,
	initialPeriod,
	isDateNotValid,
} from "../../../support";

import { axiosArchives, axiosProfile } from "../../../Api";

import DocumentsContainer from "../../components/Container/DocumentsContainer";

import NumberInput from "../../components/Inputs/NumberInput";
import NumberProcessInput from "../../components/Inputs/NumberProcessInput";
import ReferencePeriodInput from "../../components/Inputs/ReferencePeriodInput";

import CommonSet from "../../components/CommonSet/CommonSet";

import DocumentsCreate from "../../components/Actions/DocumentsCreate";
import PopUpAlert from "../../components/PopUpAlert";

const CreateFrequencyRelation = () => {
	const [units, setUnits] = useState([]);

	const [number, setNumber] = useState("");
	const [processNumber, setProcessNumber] = useState("");
	const [receivedDate, setReceivedDate] = useState(initialDate);
	const [documentType, setDocumentType] = useState("");
	const [senderUnit, setSenderUnit] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [shelf, setShelf] = useState("");
	const [rack, setRack] = useState("");
	const [notes, setNotes] = useState("");
	const [referencePeriod, setReferencePeriod] = useState([
		formatDate(initialPeriod),
	]);

	const [numberHelperText, setNumberHelperText] = useState("");
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");
	const [documentTypeHelperText, setDocumentTypeHelperText] = useState("");
	const [senderUnitHelperText, setSenderUnitHelperText] = useState("");
	const [referencePeriodHelperText, setReferencePeriodHelperText] =
		useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

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

		setNumber("");
		setProcessNumber("");
		setReceivedDate(initialDate);
		setDocumentType("");
		setSenderUnit("");
		setAbbreviation("");
		setShelf("");
		setRack("");
		setNotes("");
		setReferencePeriod([formatDate(initialPeriod)]);
	};

	const onSubmit = () => {
		setLoading(true);

		if (number === "") {
			setNumberHelperText("Insira o número");
			setLoading(false);
			return "number error";
		}

		if (processNumber === "") {
			setProcessNumberHelperText("Insira o número do processo");
			setLoading(false);
			return "processNumber error";
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
					.post("frequency-relation/", {
						process_number: processNumber,
						notes,
						filer_user: "filer_user",
						number,
						received_date: formatDate(receivedDate),
						reference_period: referencePeriod,
						sender_unity: senderUnit.id,
						abbreviation_id: abbreviation.id,
						shelf_id: shelf.id,
						rack_id: rack.id,
						document_type_id: documentType.id,
					})
					.then(() => onSuccess())
					.catch(() => connectionError());
			})
			.catch(() => { });


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
					.get("unity/")
					.then((response) => setUnits(response.data))
					.catch(() => connectionError());

			})
			.catch(() => { });
	}, []);

	return (
		<DocumentsContainer title="Relação de Frequências" spacing={1}>
			<Grid item xs={12} sm={12} md={4}>
				<NumberInput
					setHelperText={setNumberHelperText}
					set={setNumber}
					number={number}
					helperText={numberHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<NumberProcessInput
					setHelperText={setProcessNumberHelperText}
					set={setProcessNumber}
					number={processNumber}
					helperText={processNumberHelperText}
				/>
			</Grid>

			<CommonSet
				units={units}
				receivedDate={receivedDate}
				setReceivedDate={setReceivedDate}
				documentType={documentType}
				setDocumentType={setDocumentType}
				senderUnit={senderUnit}
				setSenderUnit={setSenderUnit}
				abbreviation={abbreviation}
				setAbbreviation={setAbbreviation}
				shelf={shelf}
				setShelf={setShelf}
				rack={rack}
				setRack={setRack}
				notes={notes}
				setNotes={setNotes}
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
			/>

			<DocumentsCreate loading={loading} onSubmit={onSubmit} />

			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</DocumentsContainer>
	);
};

export default CreateFrequencyRelation;
