import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = process.env.REACT_APP_URL_API_DOCUMENT_TYPE;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateDocumentType() {
	const [documentName, setDocumentName] = useState("");
	const [temporality, setTemporality] = useState(0);
	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				document_name: documentName,
				temporality,
			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeDocumentName = (event) => {
		setDocumentName(event.target.value);
	};

	const onChangeTemporality = (event) => {
		setTemporality(event.target.value);
	};

	return (
		<div>
			<h1>Tipo de Documento</h1>
			<TextField
				id="nome-do-documento-input"
				className={classes.fields}
				onChange={onChangeDocumentName}
				type="document_name"
				value={documentName}
				label="Nome do Documento"
				variant="filled"
			/>
			<TextField
				id="temporalidade-input"
				className={classes.fields}
				onChange={onChangeTemporality}
				type="number"
				value={temporality}
				label="Temporalidade"
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
