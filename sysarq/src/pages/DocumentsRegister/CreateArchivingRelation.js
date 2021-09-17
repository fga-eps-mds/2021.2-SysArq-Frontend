import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}archival-relation`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState(0);
	const [documentType, setDocumentType] = useState("");
	const [documentNumber, setDocumentNumber] = useState(0);
	const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [receiptDate, setReceiptDate] = useState("");
    const [workerRecieved, setWorkerRecieved] = useState("");
    const [numberBoxReceived, setNumberBoxReceived] = useState(0);
    const [originBox, setOriginBox] = useState("");
    const [Subjects, setSubjects] = useState("");
    const [Dates, setDates] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfNumber, setShelfNumber] = useState(0);
    const [observations, setObservations] = useState("");
    const [documentAttach, setDocumentAttach] = useState("");
    const [coversheet, setCoverSheet] = useState("");

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
			placeholder: "Unidade que encaminhou para arquivamento:*",
			setState: setUnityForwardedArchiving,
		},
		{
			type: "text",
			placeholder: "Data de recebimento:*",
			setState: setReceiptDate,
		},
		{
			type: "text",
			placeholder: "Servidor que recebeu as caixas:*",
			setState: setWorkerRecieved,
		},
		{
			type: "text",
			placeholder: "Quantidade de caixas box recebidas para arquivamento:",
			setState: setNumberBoxReceived,
		},
		{
			type: "text",
			placeholder: "Caixa de origem:",
			setState: setOriginBox,
		},
		{
			type: "text",
			placeholder: "Assuntos:",
			setState: setSubjects,
		},
		{
			type: "text",
			placeholder: "Data:",
			setState: setDates,
		},
		{
			type: "text",
			placeholder: "Sigla da caixa:",
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
		{
			type: "text",
			placeholder: "Anexar documento externo:",
			setState: setDocumentAttach,
		},
		{
			type: "text",
			placeholder: "Capa de rosto da caixa para impressão:",
			setState: setCoverSheet,
		},
	]);

	function onSubmit() {
		axios
			.post(hostApi, {
				process_number: processNumber,
				document_type_id: documentType,
				number: documentNumber,
				unity_forwarded_for_archiving: unityForwardedArchiving,
                receipt_date: receiptDate,
                worker_who_recieved_box: workerRecieved,
                number_of_boxes_received_for_archiving: numberBoxReceived,
                origin_box: originBox,
                subjects: Subjects,
                dates: Dates,
				box_abbreviation: boxAbbreviation,
				shelf_id: shelfNumber,
				notes: observations,
                cover_sheet: coversheet,
				document_url: documentAttach
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