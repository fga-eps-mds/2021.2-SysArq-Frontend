import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}box-abbreviation`;

export default function CreateBoxAbbreviation() {
	const [number, setNumber] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [name, setName] = useState("");
	const [year, setBondYear] = useState("");

	const onSubmit = () => {
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

	const[fields] = useState([
		{
			type: "text",
			placeholder: "Número da caixa:",
			setState: setNumber,
		},
		{
			type: "text",
			placeholder: "Sigla da Caixa:",
			setState: setAbbreviation,
		},
		{
			type: "text",
			placeholder: "Nome Completo:",
			setState: setName,
		},
		{
			type: "text",
			placeholder: "Ano:",
			setState: setBondYear,
		},
	]);

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar Documento"
			fields={fields}
			onClickBtn={onSubmit}
			/>
		</div>
	);
}
