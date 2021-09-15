import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}administrative_process`;

export default function CreateAdministrativeProcess() {
	const [workerName, setWorkerName] = useState(0);
	const [numbercpf, setNumberCpf] = useState("");
	const [position, setPosition] = useState("");
	const [bracket, setBracket] = useState("");
	const [workspace, setWorkspce] = useState("");
	const [UrbanArea, setUrbanArea] = useState("");
	const [observations, setObservations] = useState("");
	const [ProcessNumberSentFrequency, setProcessNumberSentFrequency] = useState("");
	const [timeCourse, setTimeCourse] = useState("");
	const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfNumber, setShelfNumber] = useState(0);

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Nome do servidor:*",
			setState: setWorkerName,
		},
		{
			type: "text",
			placeholder: "CPF:*",
			setState: setNumberCpf,
		},
		{
			type: "text",
			placeholder: "Cargo:",
			setState: setPosition,
		},
		{
			type: "text",
			placeholder: "Classe:",
			setState: setBracket,
		},
		{
			type: "text",
			placeholder: "Período:",
			setState: setTimeCourse,
		},
		{
			type: "text",
			placeholder: "Lotação:",
			setState: setWorkspce,
		},
		{
			type: "text",
			placeholder: "Municípios:",
			setState: setUrbanArea,
		},
		{
			type: "text",
			placeholder: "Número do processo que encaminhou a frequência:",
			setState: setProcessNumberSentFrequency,
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
	]);

	function onSubmit() {
		axios
			.post(hostApi, {
				person_name: workerName,
				cpf: numbercpf,
				role: position,
				category: bracket,
				workplace: workspace,
				municipal_area: UrbanArea,
				notes: observations,
				process_number: ProcessNumberSentFrequency,
				reference_period: timeCourse,
				abbreviation_id: boxAbbreviation,
				shelf_id: shelfNumber 
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