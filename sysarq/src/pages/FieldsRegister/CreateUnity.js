import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";


const hostApi = `${process.env.REACT_APP_URL_API}unity/`;

export default function CreateUnity() {
	const [unityName, setUnityName] = useState("");
	const [unityAbbreviation, setUnityAbbreviation] = useState("");
	const [administrativeBond, setAdiministrativeBond] = useState("");
	const [bondAbbreviation, setBondAbbreviation] = useState("");
	const [unityType, setUnityType] = useState("");
	const [municipality, setMunicipality] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [note, setNote] = useState("");


	const onSubmit = () => {
		axios
			.post(hostApi, {
				unity_name: unityName,
				unity_abbreviation: unityAbbreviation,
				administrative_bond: administrativeBond,
				bond_abbreviation: bondAbbreviation,
				type_of_unity: unityType,
				telephone_number: telephoneNumber,
				county: municipality,
				note,
			})
			.then(() => {})
			.catch(() => {});
	};

	const[fields] = useState([
		{
			type: "text",
			placeholder: "Nome da Unidade:",
			setState: setUnityName,
		},
		{
			type: "text",
			placeholder: "Sigla da Unidade:",
			setState: setUnityAbbreviation,
		},
		{
			type: "text",
			placeholder: "Vínculo administrativo:",
			setState: setAdiministrativeBond,
		},
		{
			type: "text",
			placeholder: "Sigla do Vínculo:",
			setState: setBondAbbreviation,
		},
		{
			type: "text",
			placeholder: "Tipo de unidade:",
			setState: setUnityType,
		},
		{
			type: "text",
			placeholder: "Município:",
			setState: setMunicipality,
		},
		{
			type: "text",
			placeholder: "Número do telefone:",
			setState: setTelephoneNumber,
		},
		{
			type: "text",
			placeholder: "Observações:",
			setState: setNote,
		},
	])

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar Unidade"
			fields={fields}
			onClickBtn={onSubmit}
			/>
		</div>
	);
}
