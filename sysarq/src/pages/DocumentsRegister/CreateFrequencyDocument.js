import React, { useState, useEffect } from "react";
import FormCadastro from "../FormCadastro";
import "./Create.css";
import Api from "../../Api";

const hostApi = `${process.env.REACT_APP_URL_API}frequency-sheet/`;
const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;
const hostApiBoxAbbreviation = `${process.env.REACT_APP_URL_API}box-abbreviation/`;

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
	const [optionsEstante, setOptionsEstante] = useState(null);
	const [optionsAbbreviation, setOptionsAbbreviation] = useState(null);
	const [shelfNumber, setShelfNumber] = useState(0);
	const [update, setUpdate] = useState(0);

	const [fields, setFields] = useState([
		
	]);

	useEffect(() => {
		function loadOptionsEstante() {
			Api.get(hostApiShelf)
			.then((response) => {
				const optionsEstanteData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.shelfe_number}`,
				}));
				setOptionsEstante(optionsEstanteData);
				setUpdate(2);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsAbbreviation() {
			Api.get(hostApiBoxAbbreviation)
			.then((response) => {
				const optionsAbbreviationData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.abbreviation}`,	
				}));
				setOptionsAbbreviation(optionsAbbreviationData);
				setUpdate(1);
			})
			.catch(() => {})
			.then(() => {});
		}

		loadOptionsEstante();
		loadOptionsAbbreviation();
	},[]);

	useEffect(() => {
		function loadFields() {
			setFields(
				[
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
						type: "id",
						placeholder: "Sigla da caixa:",
						setState: setBoxAbbreviation,
						options: optionsAbbreviation
					},
					{
						type: "id",
						placeholder: "Estante:",
						setState: setShelfNumber,
						options: optionsEstante
					},
					{
						type: "text",
						placeholder: "Observações:",
						setState: setObservations,
					},
				]
			)
		}
		loadFields();
	}, [update]);

	function onSubmit() {
		Api
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
		<div className="create-form-container">
			<FormCadastro 
				title="Arquivo Geral da Polícia Civil de Goiás"
				subtitle="Cadastrar documento"
				fields={fields}
				onClickBtn={onSubmit}
			/>
		</div>
	);
}