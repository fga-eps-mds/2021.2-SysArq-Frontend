import React, { useState } from "react";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiUnity = `${process.env.REACT_APP_URL_API}unity/`;

export default function CreateUnity() {
	const [unityName, setUnityName] = useState("");
	const [unityAbbreviation, setUnityAbbreviation] = useState("");
	const [administrativeBond, setAdiministrativeBond] = useState("");
	const [bondAbbreviation, setBondAbbreviation] = useState("");
	const [unityType, setUnityType] = useState("");
	const [county, setCounty] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [note, setNote] = useState("");

	const onClick = () => {
		Api.post(hostApiUnity, {
			unity_name: unityName,
			unity_abbreviation: unityAbbreviation,
			administrative_bond: administrativeBond,
			bond_abbreviation: bondAbbreviation,
			type_of_unity: unityType,
			telephone_number: telephoneNumber,
			municipality: county,
			note,
		})
			.then(() => {})
			.catch(() => {});
	};

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Nome da unidade",
			setState: setUnityName,
		},
		{
			type: "ShortText",
			placeholder: "Sigla da unidade",
			setState: setUnityAbbreviation,
		},
		{
			type: "text",
			placeholder: "Vínculo administrativo",
			setState: setAdiministrativeBond,
		},
		{
			type: "ShortText",
			placeholder: "Sigla do vínculo",
			setState: setBondAbbreviation,
		},
		{
			type: "MiddleText",
			placeholder: "Tipo de unidade",
			setState: setUnityType,
		},
		{
			type: "text",
			placeholder: "Município",
			setState: setCounty,
		},
		{
			type: "phone",
			placeholder: "Telefone",
			setState: setTelephoneNumber,
		},
		{
			type: "text",
			placeholder: "Observações",
			setState: setNote,
		},
	]);

	return (
		<div className="create-form-container">
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar Unidade"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
