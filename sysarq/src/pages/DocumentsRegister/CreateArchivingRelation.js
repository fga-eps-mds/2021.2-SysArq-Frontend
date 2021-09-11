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

export default function CreateArchivingRelation() {
	const [processNumber, setProcessNumber] = useState(0);
	const [documentType, setDocumentType] = useState("");
	const [documentNumber, setDocumentNumber] = useState(0);
	const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [receiptDate, setReceiptDate] = useState("");
    const [workerRecieved, setWorkerRecieved] = useState("");
    const [numberBoxReceived, setNumberBoxReceived] = useState(0);
    const [originBox, setOriginBox] = useState("");
    const [subjects, setSubjects] = useState("");
    const [dates, setDates] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfeNumber, setShelfeNumber] = useState(0);
    const [shelfpNumber, setShelfpNumber] = useState(0);
    const [notes, setNotes] = useState("");
    const [documentAttach, setDocumentAttach] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				process_number: processNumber,
				document_type: documentType,
				document_number: documentNumber,
				unity_forwarded_for_archiving: unityForwardedArchiving,
                receipt_date: receiptDate,
                worker_who_recieved_box: workerRecieved,
                number_of_boxes_received_for_archiving: numberBoxReceived,
                origin_box: originBox,
                subjects,
                dates,
				box_abbreviation: boxAbbreviation,
				shelfe_number: shelfeNumber,
				shelfp_number: shelfpNumber,
				notes,
                document_to_attach: documentAttach,
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

    const onChangeReceiptDate = (event) => {
		setReceiptDate(event.target.value);
	};

	const onChangeWorkerRecieved = (event) => {
		setWorkerRecieved(event.target.value);
	};

    const onChangeNumberBoxReceived = (event) => {
		setNumberBoxReceived(event.target.value);
	};

    const onChangeOriginBox = (event) => {
		setOriginBox(event.target.value);
	};

    const onChangeSubjects = (event) => {
		setSubjects(event.target.value);
	};

    const onChangeDates = (event) => {
		setDates(event.target.value);
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

    const onChangeDocumentAttach = (event) => {
		setDocumentAttach(event.target.value);
	};

	return (
		<div>
			<h1>Relação de Arquivamento</h1>
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
				id="data-recebimento-input"
				className={classes.fields}
				onChange={onChangeReceiptDate}
				type="receipt_date"
				value={receiptDate}
				label="Data de recebimento"
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
				id="numero-caixas-recebidas-input"
				className={classes.fields}
				onChange={onChangeNumberBoxReceived}
				type="number_of_boxes_received_for_archiving"
				value={numberBoxReceived}
				label="Número de Caixas recebidas para arquivamento"
				variant="filled"
			/>

            <TextField
				id="origem-caixa-input"
				className={classes.fields}
				onChange={onChangeOriginBox}
				type="origin_box"
				value={originBox}
				label="Origem da caixa"
				variant="filled"
			/>
            <TextField
				id="assuntos-input"
				className={classes.fields}
				onChange={onChangeSubjects}
				type="subjects"
				value={subjects}
				label="Assuntos"
				variant="filled"
			/>
            <TextField
				id="datas-input"
				className={classes.fields}
				onChange={onChangeDates}
				type="dates"
				value={dates}
				label="Datas"
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
            <TextField
				id="capa-impressao-input"
				className={classes.fields}
				onChange={onChangeDocumentAttach}
				type="document_to_attach"
				value={documentAttach}
				label="Capa de rosto para impressão"
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