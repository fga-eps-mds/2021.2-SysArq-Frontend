import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}document-type/`;


export default function CreateDocumentType() {
	const [documentName, setDocumentName] = useState("");
	const [temporalityValue, setTemporality] = useState("");

	const onSubmit = () => {
		axios
			.post(hostApi, {
				document_name: documentName,
				temporality: temporalityValue,
			})
			.then(() => {})
			.catch(() => {});
	};

	const[fields] = useState([
		{
			type: "text",
			placeholder: "Nome do Documento:",
			setState: setDocumentName,
		},
		{
			type: "text",
			placeholder: "Temporalidade:",
			setState: setTemporality,
		},
	]);

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar tipo de documento"
			fields={fields}
			onClickBtn={onSubmit}
			/>
		</div>
	);
}
