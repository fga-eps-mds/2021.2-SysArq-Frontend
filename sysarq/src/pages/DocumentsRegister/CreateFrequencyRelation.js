import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = `${process.env.REACT_APP_URL_API}frequency_relation`;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateFrequencyRelation() {
	const [processNumber, setProcessNumber] = useState(0);
	const [documentType, setDocumentType] = useState("");
	const [documentNumber, setDocumentNumber] = useState(0);
	const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [timeCourse, setTimeCourse] = useState("");
	const [workerRecieved, setWorkerRecieved] = useState("");
	const [receiptDate, setReceiptDate] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfeNumber, setShelfeNumber] = useState(0);
    const [shelfpNumber, setShelfpNumber] = useState(0);
    const [notes, setNotes] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				process_number: processNumber,
				document_type: documentType,
				document_number: documentNumber,
				unity_forwarded_for_archiving: unityForwardedArchiving,
				time_course: timeCourse,
				worker_who_recieved_frequencies: workerRecieved,
				receipt_date: receiptDate,
				box_abbreviation: boxAbbreviation,
				shelfe_number: shelfeNumber,
				shelfp_number: shelfpNumber,
				notes,
			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeProcessNumber = (event) => {
		setProcessNumber(event.target.value);
	};

	const onChangeDocumentType = (event) => {
		setDocumentType(event.target.value);
	};

	const onChangeDocumentNumber = (event) => {
		setDocumentNumber(event.target.value);
	};

	const onChangeUnityForwardedArchiving = (event) => {
		setUnityForwardedArchiving(event.target.value);
	};

	const onChangeTimeCourse = (event) => {
		setTimeCourse(event.target.value);
	};

	const onChangeWorkerRecieved = (event) => {
		setWorkerRecieved(event.target.value);
	};

	const onChangeReceiptDate = (event) => {
		setReceiptDate(event.target.value);
	};
	

    const onChangeBoxAbbreviation = (event) => {
		setBoxAbbreviation(event.target.value);
	};

    const onChangeShelfeNumber = (event) => {
		setShelfeNumber(event.target.value);
	};

    const onChangeShelfpNumber = (event) => {
		setShelfpNumber(event.target.value);
	};

    const onChangeNotes = (event) => {
		setNotes(event.target.value);
	};

	return (
		<div>
			<h1>Relação de Frequências</h1>
			<TextField
				id="numero-do-processo-input"
				className={classes.fields}
				onChange={onChangeProcessNumber}
				type="process_number"
				value={processNumber}
				label="Número do Processo"
				variant="filled"
			/>
			<TextField
				id="tipo-documento-input"
				className={classes.fields}
				onChange={onChangeDocumentType}
				type="document_type"
				value={documentType}
				label="Tipo de Documento"
				variant="filled"
			/>
			<TextField
				id="numero-documento-input"
				className={classes.fields}
				onChange={onChangeDocumentNumber}
				type="document_number"
				value={documentNumber}
				label="Numero do Documento"
				variant="filled"
			/>
			<TextField
				id="unidade-encaminhou-para-arquivamento-input"
				className={classes.fields}
				onChange={onChangeUnityForwardedArchiving}
				type="unity_forwarded_for_archiving"
				value={unityForwardedArchiving}
				label="Órgão/Unidade de destino"
				variant="filled"
			/>
			<TextField
				id="periodo-input"
				className={classes.fields}
				onChange={onChangeTimeCourse}
				type="time_course"
				value={timeCourse}
				label="Periodo"
				variant="filled"
			/>
			<TextField
				id="servidor-recebeu-input"
				className={classes.fields}
				onChange={onChangeWorkerRecieved}
				type="worker_who_recieved_frequencies"
				value={workerRecieved}
				label="Recebedor das frequencias"
				variant="filled"
			/>

			<TextField
				id="data-recebimento-input"
				className={classes.fields}
				onChange={onChangeReceiptDate}
				type="receipt_date"
				value={receiptDate}
				label="Data de recebimento"
				variant="filled"
			/>
			<TextField
				id="sigla-caixa-input"
				className={classes.fields}
				onChange={onChangeBoxAbbreviation}
				type="box_abbreviation"
				value={boxAbbreviation}
				label="Sigla da caixa"
				variant="filled"
			/>
			
            <TextField
				id="estante-input"
				className={classes.fields}
				onChange={onChangeShelfeNumber}
				type="shelfe_number"
				value={shelfeNumber}
				label="Estante"
				variant="filled"
			/>
            <TextField
				id="prateleira-input"
				className={classes.fields}
				onChange={onChangeShelfpNumber}
				type="shelfp_number"
				value={shelfpNumber}
				label="Prateleira"
				variant="filled"
			/>
            <TextField
				id="notes-input"
				className={classes.fields}
				onChange={onChangeNotes}
				type="notes"
				value={notes}
				label="Observações"
				variant="filled"
			/>      

			<Button
				data-testid="click"
				onClick={onClick}
				style={{ marginTop: "20px" }}
				variant="contained"
				color="primary"
			>
				Salvar
			</Button>
		</div>
	);
}