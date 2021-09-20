import React, { useState } from "react";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiBox = `${process.env.REACT_APP_URL_API}box-abbreviation/`;

export default function CreateBoxAbbreviation() {
	const [Number, setNumber] = useState(0);
	const [Abbreviation, setAbbreviation] = useState("");
	const [Name, setName] = useState("");
	const [Year, setBondYear] = useState(0);

	const onClick = () => {
		Api.post(hostApiBox, {
			number: Number,
			abbreviation: Abbreviation,
			name: Name,
			year: Year,
		})
			.then(() => {})
			.catch(() => {});
	};

	const [fields] = useState([
		{
			type: "number",
			placeholder: "Número da caixa:",
			setState: setNumber,
		},
		{
			type: "ShortText",
			placeholder: "Sigla da Caixa:",
			setState: setAbbreviation,
		},
		{
			type: "text",
			placeholder: "Nome Completo:",
			setState: setName,
		},
		{
			type: "number",
			placeholder: "Ano:",
			setState: setBondYear,
		},
	]);

	return (
		<div className="create-form-container">
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar sigla da caixa"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
