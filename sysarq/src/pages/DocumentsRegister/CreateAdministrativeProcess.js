import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./CreateAdministrativeProcess.css";

const hostApi = `${process.env.REACT_APP_URL_API}administrative_process`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState(0);
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
    const [shelfeNumber, setShelfeNumber] = useState(0);
    const [shelfpNumber, setShelfpNumber] = useState(0);
    const [workerRegistered, setWorkerRegistered] = useState(0);
    const [status, setStatus] = useState(true);
    const [notes, setNotes] = useState("");
	
	const [fields] = useState([
		{
			type: "text",
			placeholder: "Número do processo",
			setState: setProcessNumber,
		},
		{
			type: "text",
			placeholder: "Data de autuação",
			setState: setBookedDate,
		},
		{
			type: "text",
			placeholder: "Interessado",
			setState: setInterested,
		},
		{
			type: "text",
			placeholder: "CPF/Cnpj",
			setState: setCpfCnpj,
		},
	]);

	function onSubmit() {
		axios
			.post(hostApi, {
				process_number: processNumber,
				booked_date: bookedDate,
				interested,
				cpf_cnpj: cpfCnpj,
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