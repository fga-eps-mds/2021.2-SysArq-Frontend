import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}frequency-relation`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState(0);
	const [documentType, setDocumentType] = useState("");
	const [documentNumber, setDocumentNumber] = useState(0);
	const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [timeCourse, setTimeCourse] = useState("");
	const [workerRecieved, setWorkerRecieved] = useState("");
	const [receiptDate, setReceiptDate] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfNumber, setShelfNumber] = useState(0);
    const [observations, setObservations] = useState("");
	
	const [fields] = useState([
		{
			type: "text",
			placeholder: "Número do processo:*",
			setState: setProcessNumber,
		},
		{
			type: "text",
			placeholder: "Tipo do documento de envio:*",
			setState: setDocumentType,
		},
		{
			type: "text",
			placeholder: "Número do documento de envio:*",
			setState: setDocumentNumber,
		},
		{
			type: "text",
			placeholder: "Período:*",
			setState: setTimeCourse,
		},
		{
			type: "text",
			placeholder: "Servidor que recebeu as frequências:*",
			setState: setWorkerRecieved,
		},
		{
			type: "text",
			placeholder: "Data de recebimento:*",
			setState: setReceiptDate,
		},
		{
			type: "text",
			placeholder: "Unidade que encaminhou para arquivamento:*",
			setState: setUnityForwardedArchiving,
		},
		{
			type: "text",
			placeholder: "Sigla da Caixa:",
			setState: setBoxAbbreviation,
		},
		{
			type: "text",
			placeholder: "Estante:",
			setState: setShelfNumber,
		},
		{
			type: "text",
			placeholder: "Observações:",
			setState: setObservations,
		},
	]);

	function onSubmit() {
		axios
			.post(hostApi, {
				process_number: processNumber,
				document_type_id: documentType,
				number: documentNumber,
				reference_period: timeCourse,
				worker_who_recieved_frequencies: workerRecieved,
				receipt_date: receiptDate,
				unity_forwarded_for_archiving: unityForwardedArchiving,
				box_abbreviation: boxAbbreviation,
				shelf_id: shelfNumber,
				notes: observations,
			})
			.then(() => {})
			.catch(() => {});
	}

	return (
		<div className="create-adm-process-container">
			<FormCadastro 
				title="Arquivo Geral da Polícia Civil de Goiás"
				subtitle="Cadastrar documento"
				fields={fields}
				onClickBtn={onSubmit}
			/>
		</div>
	);
}