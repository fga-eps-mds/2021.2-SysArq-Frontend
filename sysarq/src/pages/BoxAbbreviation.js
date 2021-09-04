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
	const [number, setNumber] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [name, setName] = useState("");
	const [year, setBondYear] = useState("");
	const classes = useStyles();

	const onClick = () => {
		axios
			.post("http://0.0.0.0:8002/box_abbreviation/", {
				number,
				abbreviation,
				name,
				year,
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
				type="number"
				value={documentSubject}
				label="Número da caixa"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeDocumentSubject}
				type="abbreviation"
				value={documentSubject}
				label="Sigla da caixa"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="name"
				value={temporality}
				placeholder="Nome completo"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="year"
				value={temporality}
				placeholder="Ano"
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
