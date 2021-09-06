import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = process.env.REACT_APP_URL_API_DOCUMENT_SUBJECT;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateDocumentSubject() {
	const [documentSubject, setDocumentSubject] = useState("");
	const [temporality, setTemporality] = useState(0);
	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				subject_name: documentSubject,
				temporality,
			})
			.then(() => {})
			.catch(() => {});
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
				type="document_subject"
				value={documentSubject}
				label="Assunto do documento"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTemporality}
				type="temporality"
				value={temporality}
				placeholder="Temporalidade"
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
