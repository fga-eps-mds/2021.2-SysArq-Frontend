import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";

const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;


export default function CreateShelf() {
	const [numberE, setNumberE] = useState(0);
	const [numberP, setNumberP] = useState(0);

	const onSubmit = () => {
		axios
			.post(hostApiShelf, {
				shelfe_number: numberE,
				shelfp_number: numberP,
			})
			.then(() => {})
			.catch(() => {});
	};

	const[fields] = useState([
		{
			type: "id",
			placeholder: "Estante:",
			setState: setNumberE,
		},
		{
			type: "id",
			placeholder: "Prateleira:",
			setState: setNumberP,
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
