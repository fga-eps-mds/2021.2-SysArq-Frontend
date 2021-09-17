import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}administrative-process`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState("");
	const [bookedDate, setBookedDate] = useState("");
	const [interested, setInterested] = useState("");
	const [cpfCnpj, setCpfCnpj] = useState(0);
	const [subject, setSubject] = useState("");
	const [destinationUnity, setDestinationUnity] = useState("");
    const [referenceDate, setReferenceDate] = useState("");
    const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [forwardedBy, setForwardedBy] = useState("");
    const [archivingDate, setArchivingDate] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
    const [shelfNumber, setShelfNumber] = useState(0);
    const [workerRegistered, setWorkerRegistered] = useState("");
    const [status, setStatus] = useState(true);
    const [observations, setObservations] = useState("");
	
	const [fields] = useState([
		{
			type: "text",
			placeholder: "Número do processo:*",
			setState: setProcessNumber,
		},
		{
			type: "text",
			placeholder: "Data de autuação:*",
			setState: setBookedDate,
		},
		{
			type: "text",
			placeholder: "Interessado:*",
			setState: setInterested,
		},
		{
			type: "text",
			placeholder: "CPF/Cnpj:",
			setState: setCpfCnpj,
		},
		{
			type: "id",
			placeholder: "Assunto:*",
			setState: setSubject,
		},
		{
			type: "id",
			placeholder: "Orgão/Unidade de destino:",
			setState: setDestinationUnity,
		},
		{
			type: "text",
			placeholder: "Referência:",
			setState: setReferenceDate,
		},
		{
			type: "text",
			placeholder: "Unidade que encaminhou para arquivamento:",
			setState: setUnityForwardedArchiving,
		},
		{
			type: "text",
			placeholder: "Servidor que encaminhou para arquivamento:",
			setState: setForwardedBy,
		},
		{
			type: "text",
			placeholder: "Data de arquivamento:",
			setState: setArchivingDate,
		},
		{
			type: "id",
			placeholder: "Sigla da Caixa:",
			setState: setBoxAbbreviation,
		},
		{
			type: "id",
			placeholder: "Estante:",
			setState: setShelfNumber,
		},
		{
			type: "text",
			placeholder: "Servidor cadastrante:",
			setState: setWorkerRegistered,
		},
		{
			type: "id",
			placeholder: "Status*:",
			setState: setStatus,
		},
		{
			type: "text",
			placeholder: "Observações:*",
			setState: setObservations,
		},
	]);

	function onSubmit() {
		axios
			.post(hostApi, {
				process_number: processNumber,
				notice_date: bookedDate,
				interested,
				cpf_cnpj: cpfCnpj,
				subject_id: subject,
				dest_unity_id: destinationUnity,
				reference_month_year: referenceDate,
				sender_unity: unityForwardedArchiving,
				sender_user: forwardedBy,
				archiving_date: archivingDate,
				abbreviation_id: boxAbbreviation,
				shelf_id: shelfNumber,
				filer_user: workerRegistered,
				status_id: status,
				notes: observations

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