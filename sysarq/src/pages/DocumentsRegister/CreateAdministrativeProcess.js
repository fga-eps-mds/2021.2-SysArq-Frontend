import React, { useState, useEffect } from "react";
// import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

import Api from "../../Api";

const hostApi = `${process.env.REACT_APP_URL_API}administrative-process/`;
const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;
const hostApiBoxAbbreviation = `${process.env.REACT_APP_URL_API}box-abbreviation/`;
const hostApiUnity = `${process.env.REACT_APP_URL_API}unity/`;
const hostApiDocumentSubject = `${process.env.REACT_APP_URL_API}document-subject/`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState("");
	const [bookedDate, setBookedDate] = useState(null);
	const [interested, setInterested] = useState("");
	const [cpfCnpj, setCpfCnpj] = useState(0);
	const [subject, setSubject] = useState("");
	const [destinationUnity, setDestinationUnity] = useState("");
    const [referenceDate, setReferenceDate] = useState("");
    const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [forwardedBy, setForwardedBy] = useState("");
    const [archivingDate, setArchivingDate] = useState(null);
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
    const [shelfNumber, setShelfNumber] = useState(0);
    const [workerRegistered, setWorkerRegistered] = useState("");
    const [status, setStatus] = useState(true);
    const [observations, setObservations] = useState("");
	const [optionsEstante, setOptionsEstante] = useState(null);
	const [optionsAbbreviation, setOptionsAbbreviation] = useState(null);
	const [optionsSubject, setOptionsSubject] = useState(null);
	const [optionsUnity, setOptionsUnity] = useState(null);
	const [update, setUpdate] = useState(0);

	const statusOptions = [
		{
			"description": "Arquivado",
			"value": 1
		},
		{
			"description": "Eliminado",
			"value": 2
		},
	]
	
	const [fields, setFields] = useState([
		
	]);

	useEffect(() => {
		function loadOptionsSubject() {
			Api.get(hostApiDocumentSubject)
			.then((response) => {
				const optionsSubjectData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.subject_name}`,
				}));
				setOptionsSubject(optionsSubjectData);
				setUpdate(4);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsEstante() {
			Api.get(hostApiShelf)
			.then((response) => {
				const optionsEstanteData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.shelfe_number}`,
				}));
				setOptionsEstante(optionsEstanteData);
				setUpdate(3);
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
				setUpdate(2);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsUnity() {
			Api.get(hostApiUnity)
			.then((response) => {
				// console.log(response);
				const optionsUnityData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.unity_name}`,	
				}));
				setOptionsUnity(optionsUnityData);
				setUpdate(1);
			})
			.catch(() => {})
			.then(() => {});
		}

		loadOptionsSubject();
		loadOptionsEstante();
		loadOptionsAbbreviation();
		loadOptionsUnity();
	},[]);

	useEffect(() => {
		function loadFields() {
			setFields(
				[
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
						options: optionsSubject
					},
					{
						type: "id",
						placeholder: "Orgão/Unidade de destino:",
						setState: setDestinationUnity,
						options: optionsUnity
					},
					{
						type: "text",
						placeholder: "Referência:",
						setState: setReferenceDate,
					},
					{
						type: "id",
						placeholder: "Unidade que encaminhou para arquivamento:",
						setState: setUnityForwardedArchiving,
						options: optionsUnity
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
						placeholder: "Servidor cadastrante:",
						setState: setWorkerRegistered,
					},
					{
						type: "id",
						placeholder: "Status*:",
						setState: setStatus,
						options: statusOptions
					},
					{
						type: "text",
						placeholder: "Observações:*",
						setState: setObservations,
					},
				]
			)
		}
		loadFields();
	}, [update]);

	function onSubmit() {
		// 2021-09-09
		Api
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