import React, { useState, useEffect } from "react";
import Api from "../../Api";
// import axios from "axios";
import FormCadastro from "../FormCadastro";
import "./Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}frequency-relation/`;
const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;
const hostApiBoxAbbreviation = `${process.env.REACT_APP_URL_API}box-abbreviation/`;
const hostApiDocumentSubject = `${process.env.REACT_APP_URL_API}document-subject/`;

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
	const [optionsEstante, setOptionsEstante] = useState(null);
	const [optionsAbbreviation, setOptionsAbbreviation] = useState(null);
	const [optionsSubject, setOptionsSubject] = useState(null);
	const [update, setUpdate] = useState(0);

	const [fields, setFields] = useState([]);

	useEffect(() => {
		function loadOptionsSubject() {
			Api.get(hostApiDocumentSubject)
				.then((response) => {
					const optionsSubjectData = response.data.map((d) => ({
						value: d.id,
						description: `${d.subject_name}`,
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
					const optionsEstanteData = response.data.map((d) => ({
						value: d.id,
						description: `${d.shelfe_number}`,
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
					const optionsAbbreviationData = response.data.map((d) => ({
						value: d.id,
						description: `${d.abbreviation}`,
					}));
					setOptionsAbbreviation(optionsAbbreviationData);
					setUpdate(1);
				})
				.catch(() => {})
				.then(() => {});
		}
		loadOptionsSubject();
		loadOptionsEstante();
		loadOptionsAbbreviation();
	}, []);

	useEffect(() => {
		function loadFields() {
			setFields([
				{
					type: "text",
					placeholder: "Número do processo:*",
					setState: setProcessNumber,
				},
				{
					type: "id",
					placeholder: "Tipo do documento de envio:*",
					setState: setDocumentType,
					options: optionsSubject,
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
					type: "id",
					placeholder: "Sigla da Caixa:",
					setState: setBoxAbbreviation,
					options: optionsAbbreviation,
				},
				{
					type: "id",
					placeholder: "Estante:",
					setState: setShelfNumber,
					options: optionsEstante,
				},
				{
					type: "text",
					placeholder: "Observações:",
					setState: setObservations,
				},
			]);
		}
		loadFields();
	}, [update]);

	const onSubmit = () => {
		Api.post(hostApi, {
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
	};

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
