import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";

import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiDocSub = `${process.env.REACT_APP_URL_API}document-subject/`;

export default function CreateDocumentSubject() {
	const [documentSubject, setDocumentSubject] = useState("");
	const [temporalityValue, setTemporality] = useState(null);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

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
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {
				handleShowError();
				setTimeout(handleCloseError, 3000);
			});
	};

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? <Alert severity="error">Erro de conexão!</Alert> : ""}
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar Assunto de documento"
				fields={fields}
				onClickBtn={onSubmit}
			/>
		</div>
	);
}
