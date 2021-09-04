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
	const [numberE, setNumberE] = useState("");
	const [numberP, setNumberP] = useState(0);
	const classes = useStyles();

	const onClick = () => {
		axios
			.post("http://0.0.0.0:8002/shelfE/", {
				numberE: number,
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
		axios
			.post("http://0.0.0.0:8002/shelfP/", {
				numberP: number,
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

	const onChangeDocumentName = (event) => {
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
				type="shelfE"
				value={documentSubject}
				label="Estante"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="shelfP"
				value={temporality}
				placeholder="Prateleira"
				variant="filled"
			/>
			<Button
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
