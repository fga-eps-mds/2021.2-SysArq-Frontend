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
	const [unityName, setUnityName] = useState("");
	const [unityAbbreviation, setUnityAbbreviation] = useState("");
	const [administrativeBond, setAdiministrativeBond] = useState("");
	const [bondAbbreviation, setBondAbbreviation] = useState("");
	const [unityType, setUnityType] = useState("");
	const [county, setCounty] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [note, setNote] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post("http://0.0.0.0:8002/unity/", {
				unityName: name_of_unity,
				unityAbbreviation: unity_abbreviation,
				administrativeBond: administrative_bond,
				unityType: type_of_unity,
				municipality,
				telephoneNumber: telephoneNUmber,
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
				type="unityName"
				value={documentSubject}
				label="Nome da unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeDocumentSubject}
				type="unityAbbreviation"
				value={documentSubject}
				label="Sigla da unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="administrativeBond"
				value={temporality}
				placeholder="Vinculo administrativo"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="unityType"
				value={temporality}
				placeholder="Tipo de unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="county"
				value={temporality}
				placeholder="Município"
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
				type="telephoneNumber"
				value={temporality}
				placeholder="Número do telefone"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="note"
				value={temporality}
				placeholder="Observações"
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
