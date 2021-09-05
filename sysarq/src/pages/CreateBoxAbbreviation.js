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

export default function CreateBoxAbbreviation() {
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
				className={classes.fields}
				onChange={onChangeNumber}
				type="number"
				value={number}
				label="Número da caixa"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeAbrevviation}
				type="abbreviation"
				value={abbreviation}
				label="Sigla da caixa"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeName}
				type="name"
				value={name}
				placeholder="Nome completo"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeYear}
				type="year"
				value={year}
				placeholder="Ano"
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
