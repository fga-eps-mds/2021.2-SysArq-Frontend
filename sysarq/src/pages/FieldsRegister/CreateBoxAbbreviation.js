import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = `${process.env.REACT_APP_URL_API}box-abbreviation`;
const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateBoxAbbreviation() {
	const [number, setNumber] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [name, setName] = useState("");
	const [year, setBondYear] = useState("");

	const classes = useStyles();

	const onClick = () => {
		axios
			.post(hostApi, {
				number,
				abbreviation,
				name,
				year,
			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeNumber = (event) => {
		setNumber(event.target.value);
	};

	const onChangeAbrevviation = (event) => {
		setAbbreviation(event.target.value);
	};

	const onChangeName = (event) => {
		setName(event.target.value);
	};

	const onChangeYear = (event) => {
		setBondYear(event.target.value);
	};

	return (
		<div>
			<h1>Sigla da Caixa</h1>
			<TextField
				id="numero-da-caixa-input"
				className={classes.fields}
				onChange={onChangeNumber}
				type="number"
				value={number}
				label="Número da caixa"
				variant="filled"
			/>
			<TextField
				id="sigla-da-caixa-input"
				className={classes.fields}
				onChange={onChangeAbrevviation}
				type="abbreviation"
				value={abbreviation}
				label="Sigla da caixa"
				variant="filled"
			/>
			<TextField
				id="nome-completo-input"
				className={classes.fields}
				onChange={onChangeName}
				type="name"
				value={name}
				label="Nome completo"
				variant="filled"
			/>
			<TextField
				id="ano-input"
				className={classes.fields}
				onChange={onChangeYear}
				type="year"
				value={year}
				label="Ano"
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
