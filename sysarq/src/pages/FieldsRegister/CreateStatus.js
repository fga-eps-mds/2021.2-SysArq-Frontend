import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";


const hostApi = `${process.env.REACT_APP_URL_API}status/`;

export default function CreateStatus() {
	const [status, setStatus] = useState("ARQUIVADO");
	const [eliminated, setEliminated] = useState("ELIMINADO");
	const [sentFrom, setSentFrom] = useState("");
	const [requestedDocument, setRequestedDocument] = useState("");
	const [sendDate, setSendDate] = useState("");
	
	const[fields, setFields] = useState([
		{
			type: "select",
			placeholder: "Status:",
			setState: setStatus,
			options: ["ARQUIVADO", "DESARQUIVDO"],
		},
		{
			type: "select",
			placeholder: "Situação:",
			setState: setEliminated,
			options: ["ARQUIVADO", "ELIMINADO"],
		},

	]);
	

	const onSubmit = () => {
		axios
			.post(hostApi, {
				filed: status === "ARQUIVADO",
				eliminated: eliminated === "ELIMINADO",
				sent_from: sentFrom,
				requested_document: requestedDocument,
				send_date: sendDate,
			})
			.then(() => {})
			.catch(() => {});
	};

	useEffect(() => {
		if(status === "DESARQUIVADO"){
			setFields([
				...fields,
				{
					type: "text",
					placeholder: "Enviado por:",
					setState: setSentFrom,
				},
				{
					type: "text",
					placeholder: "Documento que solicitou o desarquivamento:",
					setState: setRequestedDocument,
				},
				{
					type: "text",
					placeholder: "Data de envio:",
					setState: setSendDate,
				},
			])
		}
	}, [status])
	
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
