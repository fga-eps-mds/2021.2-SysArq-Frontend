import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApiShelfE = process.env.REACT_APP_URL_API_SHELF_E
const hostApiShelfP = process.env. REACT_APP_URL_API_SHELF_P

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
			.post(hostApiShelfE, {
				shelfe: numberE,
				shelfp: numberP,
			})
			.then(() => {
			})
			.catch(() => {
			})

		axios
			.post(hostApiShelfP, {
				number: numberP,
			})
			.then(() => {
			})
			.catch(() => {
			})
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
