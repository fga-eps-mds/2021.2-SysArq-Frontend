import React, { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = process.env.REACT_APP_URL_API_UNITY;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateUnity() {
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
			.post(hostApi, {
				unity_name: unityName,
				unity_abbreviation: unityAbbreviation,
				administrative_bond: administrativeBond,
				bond_abbreviation: bondAbbreviation,
				type_of_unity: unityType,
				telephone_number: telephoneNumber,
				county,
			})
			.then(() => {})
			.catch(() => {});
	};

	const onChangeUnityName = (event) => {
		setUnityName(event.target.value);
	};

	const onChangeUnityAbbreviation = (event) => {
		setUnityAbbreviation(event.target.value);
	};

	const onChangeAdministrativeBond = (event) => {
		setAdiministrativeBond(event.target.value);
	};

	const onChangeBondAbbreviation = (event) => {
		setBondAbbreviation(event.target.value);
	};

	const onChangeUnityType = (event) => {
		setUnityType(event.target.value);
	};

	const onChangeCounty = (event) => {
		setCounty(event.target.value);
	};

	const onChangeTelephoneNumber = (event) => {
		setTelephoneNumber(event.target.value);
	};

	const onChangeNote = (event) => {
		setNote(event.target.value);
	};

	return (
		<div>
			<h1>Assunto do Documento</h1>
			<TextField
				className={classes.fields}
				onChange={onChangeUnityName}
				type="unity_name"
				value={unityName}
				label="Nome da unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeUnityAbbreviation}
				type="unity_abbreviation"
				value={unityAbbreviation}
				label="Sigla da unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeAdministrativeBond}
				type="administrative_bond"
				value={administrativeBond}
				placeholder="Vinculo administrativo"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeBondAbbreviation}
				type="bond_abbreviation"
				value={bondAbbreviation}
				placeholder="Sigla do Vínculo"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeUnityType}
				type="unityType"
				value={unityType}
				placeholder="Tipo de unidade"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeCounty}
				type="county"
				value={county}
				placeholder="Município"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeTelephoneNumber}
				type="telephone_number"
				value={telephoneNumber}
				placeholder="Número de Telefone"
				variant="filled"
			/>
			<TextField
				className={classes.fields}
				onChange={onChangeNote}
				type="note"
				value={note}
				placeholder="Observações"
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
