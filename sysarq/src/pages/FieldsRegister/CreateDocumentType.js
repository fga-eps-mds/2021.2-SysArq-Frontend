import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiDocType = `${process.env.REACT_APP_URL_API}document-type/`;

export default function CreateDocumentType() {
	const [documentName, setDocumentName] = useState("");
	const [temporalityValue, setTemporality] = useState(null);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onClick = () => {
		Api.post(hostApiDocType, {
			document_name: documentName,
			temporality: temporalityValue,
		})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {});
	};

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Nome do documento",
			setState: setDocumentName,
		},
		{
			type: "date",
			placeholder: "Temporalidade",
			setState: setTemporality,
		},
	]);

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar tipo de documento"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
