import React, { useState } from "react";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiDocSub = `${process.env.REACT_APP_URL_API}document-subject/`;

export default function CreateDocumentSubject() {
	const [documentSubject, setDocumentSubject] = useState("");
	const [temporalityValue, setTemporality] = useState(null);

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Assunto do documento",
			setState: setDocumentSubject,
		},
		{
			type: "date",
			placeholder: "Temporalidade:",
			setState: setTemporality,
		},
	]);

	const onSubmit = () => {
		Api.post(hostApiDocSub, {
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
