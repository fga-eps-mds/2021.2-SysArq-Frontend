import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}document-subject/`;

export default function CreateDocumentSubject() {
	const [documentSubject, setDocumentSubject] = useState("");
	const [temporalityValue, setTemporality] = useState("");

	const[fields] = useState([
		{
			type: "text",
			placeholder: "Assundo do Documento:",
			setState: setDocumentSubject,
		},
		{
			type: "text",
			placeholder: "Temporalidade:",
			setState: setTemporality,
		},
	]);

	const onSubmit = () => {
		axios
			.post(hostApi, {
				subject_name: documentSubject,
				temporality: temporalityValue,
			})
			.then(() => {})
			.catch(() => {});
	};

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar Assunto de documento"
			fields={fields}
			onClickBtn={onSubmit}
			/>
		</div>
	);
}
