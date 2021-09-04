import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React, { useState } from "react";

import axios from "axios";

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function Cadastro() {
	const [publicWorkerName, setpublicWorkerName] = useState("");
	const [cpf, setCpf] = useState("");
	const [office, setOffice] = useState("");
	const [classWorker, setClassWorker] = useState("");
	const [capacity, setCapacity] = useState("");
	const [county, setCounty] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post("http://0.0.0.0:8002/public_worker/", {
				publicWOrkerName: name,
				cpf,
				classWorker: class_worker,
				capacity,
				county,
			})
			.then((response) => {
				// eslint-disable-next-line
				console.log("RESPOSTA", response);
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log("ERROR", error.response);
			})
			.then(() => {});
	};

	const onChangeDocumentSubject = (event) => {
		setDocumentSubject(event.target.value);
	};

	const onChangeTemporality = (event) => {
		setTemporality(event.target.value);
	};

	return (
		<div>
			<h1>Assunto do Documento</h1>
			<TextField
				className={classes.fields}
				onChange={onChangeDocumentSubject}
				type="publicWorkerName"
				value={documentSubject}
				label="Nome do servidor"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="cpf"
				value={temporality}
				placeholder="CPF do servidor"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="office"
				value={temporality}
				placeholder="Cargo do servidor"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="classWorker"
				value={temporality}
				placeholder="Classe do servidor"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="capacity"
				value={temporality}
				placeholder="Lotaçao do servidor"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="county"
				value={temporality}
				placeholder="Município do servidor"
				variant="filled"
			/>

			<Button
				onClick={onClick}
				style={{ marginTop: "20px" }}
				variant="county"
				color="primary"
			>
				Salvar
			</Button>
		</div>
	);
}
