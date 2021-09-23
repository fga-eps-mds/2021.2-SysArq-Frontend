import React, { useState ,useEffect } from "react";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiStatus = `${process.env.REACT_APP_URL_API}status/`;

export default function CreateStatus() {
	const [status, setStatus] = useState(false);
	const [Eliminated, setEliminated] = useState(false);
	const [sentFrom, setSentFrom] = useState("");
	const [requestedDocument, setRequestedDocument] = useState("");
	const [sendDate, setSendDate] = useState(null);

	const [fields, setFields] = useState([
		{
			type: "checkbox",
			placeholder: "Encaminhado",
			setState: setStatus,
		},
		{
			type: "checkbox",
			placeholder: "Eliminado",
			setState: setEliminated,
		},
	]);

	useEffect(() => {
		if(status === true){
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
					type: "date",
					placeholder: "Data de envio:",
					setState: setSendDate,
				},
			])
		}
		return () =>{
			setFields(fields)
		}
	}, [status])

	const onClick = () => {
		Api.post(hostApiStatus, {
			filed: status,
			eliminated: Eliminated,
			sent_from: sentFrom,
			requested_document: requestedDocument,
			send_date: sendDate,
		})
			.then(() => {})
			.catch(() => {});
	};

	return (
		<div className="create-form-container">
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar Status de encaminhamento"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
