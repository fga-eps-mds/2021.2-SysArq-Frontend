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

export default function CreateShelf() {
	const [numberE, setNumberE] = useState(0);
	const [numberP, setNumberP] = useState(0);
	const classes = useStyles();

	const onClick = () => {
		axios
			.post("http://0.0.0.0:8002/shelfE/", {
				shelfe: numberE,
				shelfp: numberP,
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
				number: numberP,
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

	const onChangeNumberE = (event) => {
		setNumberE(event.target.value);
	};

	const onChangeNumberP = (event) => {
		setNumberP(event.target.value);
	};

	return (
		<div>
			<h1>Estante e Prateleira</h1>
			<TextField
				className={classes.fields}
				onChange={onChangeNumberE}
				type="shelfE"
				value={numberE}
				label="Estante"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeNumberP}
				type="shelfP"
				value={numberP}
				label="Prateleira"
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
