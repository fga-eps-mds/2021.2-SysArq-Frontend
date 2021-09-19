import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";

const hostApi = `${process.env.REACT_APP_URL_API}status/`;

export default function CreateStatus() {
	const [status, setStatus] = useState("ARQUIVADO");
	const [Eliminated, setEliminated] = useState("ELIMINADO");
	const [sentFrom, setSentFrom] = useState("");
	const [requestedDocument, setRequestedDocument] = useState("");
	const [sendDate, setSendDate] = useState("");
	
	const[fields] = useState([
		{
			type: "checkbox",
			placeholder: "Encaminhado",
			setState: setStatus,
			// options: ["ARQUIVADO", "DESARQUIVDO"],
		},
		{
			type: "checkbox",
			placeholder: "Eliminado",
			setState: setEliminated,
			// options: ["ARQUIVADO", "ELIMINADO"],
		},
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
	]);
	

	const onSubmit = () => {
		axios
			.post(hostApi, {
				filed: status,
				eliminated: Eliminated,
				sent_from: sentFrom,
				requested_document: requestedDocument,
				send_date: sendDate,
			})
			.then(() => {})
			.catch(() => {});
	};

	// useEffect(() => {
	// 	if(status === "DESARQUIVADO"){
	// 		setFields([
	// 			...fields,
	// 			{
	// 				type: "text",
	// 				placeholder: "Enviado por:",
	// 				setState: setSentFrom,
	// 			},
	// 			{
	// 				type: "text",
	// 				placeholder: "Documento que solicitou o desarquivamento:",
	// 				setState: setRequestedDocument,
	// 			},
	// 			{
	// 				type: "text",
	// 				placeholder: "Data de envio:",
	// 				setState: setSendDate,
	// 			},
	// 		])
	// 	}
	// }, [status])
	
	return (

		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar Status de encaminhamento"
			fields={fields}
			onClickBtn={onSubmit}
			/>

		</div>
	);
}
