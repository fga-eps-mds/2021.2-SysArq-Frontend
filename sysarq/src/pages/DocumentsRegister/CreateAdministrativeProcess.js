import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = `${process.env.REACT_APP_URL_API}administrative_process`;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState(0);
	const [bookedDate, setBookedDate] = useState("");
	const [interested, setInterested] = useState("");
	const [cpfCnpj, setCpfCnpj] = useState(0);
	const [subject, setSubject] = useState("");
	const [destinationUnity, setDestinationUnity] = useState("");
    const [referenceDate, setReferenceDate] = useState("");
    const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [forwardedBy, setForwardedBy] = useState("");
    const [archivingDate, setArchivingDate] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
    const [shelfeNumber, setShelfeNumber] = useState(0);
    const [shelfpNumber, setShelfpNumber] = useState(0);
    const [workerRegistered, setWorkerRegistered] = useState(0);
    const [status, setStatus] = useState(true);
    const [notes, setNotes] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				process_number: processNumber,
				booked_date: bookedDate,
				interested,
				cpf_cnpj: cpfCnpj,
				subject,
				destination_unity: destinationUnity,
				reference_date: referenceDate,
				unity_forwarded_for_archiving: unityForwardedArchiving,
				forwarded_by: forwardedBy,
				archiving_date: archivingDate,
				box_abbreviation: boxAbbreviation,
				shelfe_number: shelfeNumber,
				shelfp_number: shelfpNumber,
				worker_who_registered: workerRegistered,
				status,
				notes,

			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeProcessNumber = (event) => {
		setProcessNumber(event.target.value);
	};

	const onChangeBookedDate = (event) => {
		setBookedDate(event.target.value);
	};

	const onChangeInterested = (event) => {
		setInterested(event.target.value);
	};

	const onChangeCpfCnpj = (event) => {
		setCpfCnpj(event.target.value);
	};

	const onChangeSubject = (event) => {
		setSubject(event.target.value);
	};

	const onChangeDestinationUnity = (event) => {
		setDestinationUnity(event.target.value);
	};

    const onChangeReferenceDate = (event) => {
		setReferenceDate(event.target.value);
	};

    const onChangeUnityForwardedArchiving = (event) => {
		setUnityForwardedArchiving(event.target.value);
	};

    const onChangeForwardedBy = (event) => {
		setForwardedBy(event.target.value);
	};
    
    const onChangeArchivingDate = (event) => {
		setArchivingDate(event.target.value);
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

    const onChangeWorkerRegistered = (event) => {
		setWorkerRegistered(event.target.value);
	};

    const onChangeStatus = (event) => {
		setStatus(event.target.value);
	};

    const onChangeNotes = (event) => {
		setNotes(event.target.value);
	};

	return (
		<div>
			<h1>Processo Administrativo</h1>
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
				id="data-de-autuacao-input"
				className={classes.fields}
				onChange={onChangeBookedDate}
				type="booked_date"
				value={bookedDate}
				label="Data de autuação"
				variant="filled"
			/>
			<TextField
				id="interessado-input"
				className={classes.fields}
				onChange={onChangeInterested}
				type="interested"
				value={interested}
				label="Interesseado"
				variant="filled"
			/>
			<TextField
				id="cpf-cnpj-input"
				className={classes.fields}
				onChange={onChangeCpfCnpj}
				type="cpf_cnpj"
				value={cpfCnpj}
				label="Cpf/Cnpj"
				variant="filled"
			/>
			<TextField
				id="assunto-input"
				className={classes.fields}
				onChange={onChangeSubject}
				type="subject"
				value={subject}
				label="Assunto"
				variant="filled"
			/>
			<TextField
				id="unidade-destino-input"
				className={classes.fields}
				onChange={onChangeDestinationUnity}
				type="destination_unity"
				value={destinationUnity}
				label="órgão/Unidade de destino"
				variant="filled"
			/>
			<TextField
				id="data-de-referencia-input"
				className={classes.fields}
				onChange={onChangeReferenceDate}
				type="reference_date"
				value={referenceDate}
				label="Data de referência"
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
				id="servidor-que-encaminhou-arquivamento-input"
				className={classes.fields}
				onChange={onChangeForwardedBy}
				type="forwarded_by"
				value={forwardedBy}
				label="Servidor que encaminhou para arquivamento"
				variant="filled"
			/>
            <TextField
				id="data-de-arquivamento-input"
				className={classes.fields}
				onChange={onChangeArchivingDate}
				type="archiving_date"
				value={archivingDate}
				label="Data de arquivamento"
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
				id="servidor-que-registrou-input"
				className={classes.fields}
				onChange={onChangeWorkerRegistered}
				type="worker_who_registered"
				value={workerRegistered}
				label="Servidor que efetuou o registro"
				variant="filled"
			/>
            <TextField
				id="status-input"
				className={classes.fields}
				onChange={onChangeStatus}
				type="status"
				value={status}
				label="Status"
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