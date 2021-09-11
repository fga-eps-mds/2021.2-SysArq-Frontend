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

export default function CreateFrequencyDocument() {
	const [workerName, setWorkerName] = useState(0);
	const [cpf, setCpf] = useState(0);
	const [workload, setWorkload] = useState(0);
	const [workerClass, setWorkerClass] = useState("");
    const [timeCourse, setTimeCourse] = useState("");
	const [capacity, setCapacity] = useState("");
	const [municipality, setMunicipality] = useState("");
    const [processNumberSentFrequency, setProcessNumberSentFrequency] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfeNumber, setShelfeNumber] = useState(0);
    const [shelfpNumber, setShelfpNumber] = useState(0);
    const [notes, setNotes] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				worker_name: workerName,
				cpf,
				workload,
				worker_class: workerClass,
				time_course: timeCourse,
				capacity,
				municipality,
				process_number_that_sent_frequency: processNumberSentFrequency,
                box_abbreviation: boxAbbreviation,
				shelfe_number: shelfeNumber,
				shelfp_number: shelfpNumber,
				notes,
			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeWorkerName = (event) => {
		setWorkerName(event.target.value);
	};

	const onChangeCpf = (event) => {
		setCpf(event.target.value);
	};

	const onChangeWorkload = (event) => {
		setWorkload(event.target.value);
	};

	const onChangeWorkerClass = (event) => {
		setWorkerClass(event.target.value);
	};

	const onChangeTimeCourse = (event) => {
		setTimeCourse(event.target.value);
	};

	const onChangeCapacity = (event) => {
		setCapacity(event.target.value);
	};

	const onChangeMunicipality = (event) => {
		setMunicipality(event.target.value);
	};
    const onChangeProcessNumberSentFrequency = (event) => {
		setProcessNumberSentFrequency(event.target.value);
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
			<h1>Folha de Frequências</h1>
			<TextField
				id="nome-servidor-input"
				className={classes.fields}
				onChange={onChangeWorkerName}
				type="worker_name"
				value={workerName}
				label="Nome do servidor"
				variant="filled"
			/>
			<TextField
				id="cpf-input"
				className={classes.fields}
				onChange={onChangeCpf}
				type="cpf"
				value={cpf}
				label="Cpf"
				variant="filled"
			/>
			<TextField
				id="cargo-input"
				className={classes.fields}
				onChange={onChangeWorkload}
				type="workload"
				value={workload}
				label="Cargo"
				variant="filled"
			/>
			<TextField
				id="classe-input"
				className={classes.fields}
				onChange={onChangeWorkerClass}
				type="worker_class"
				value={workerClass}
				label="Classe"
				variant="filled"
			/>
            <TextField
				id="data-recebimento-input"
				className={classes.fields}
				onChange={onChangeTimeCourse}
				type="time_course"
				value={timeCourse}
				label="Período"
				variant="filled"
			/>
			<TextField
				id="lotacao-input"
				className={classes.fields}
				onChange={onChangeCapacity}
				type="capacity"
				value={capacity}
				label="Lotação"
				variant="filled"
			/>
			<TextField
				id="municipio-input"
				className={classes.fields}
				onChange={onChangeMunicipality}
				type="municipality"
				value={municipality}
				label="Município"
				variant="filled"
			/>
            <TextField
				id="process-number-sent-frequency-input"
				className={classes.fields}
				onChange={onChangeProcessNumberSentFrequency}
				type="process_number_that_sent_frequency"
				value={processNumberSentFrequency}
				label="Número do processo que enviou a frequência"
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