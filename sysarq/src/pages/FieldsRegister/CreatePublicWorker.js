import React, { useState } from "react";
import axios from "axios";
import FormCadastro from "../FormCadastro";
import "../DocumentsRegister/Create.css";

const hostApi = `${process.env.REACT_APP_URL_API}public-worker/`;

export default function CreatePublicWorker() {
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
    const [office, setOffice] = useState("");
    const [classWorker, setCalssWorker] = useState("");
    const [capacity, setCapacity] = useState("");
    const [county, setCounty] = useState("");


	const[fields] = useState([
		{
			type: "text",
			placeholder: "Nome:",
			setState: setName,
		},
		{
			type: "text",
			placeholder: "CPF:",
			setState: setCpf,
		},
        {
			type: "text",
			placeholder: "Cargo:",
			setState: setOffice,
		},
        {
			type: "text",
			placeholder: "Classe:",
			setState: setCalssWorker,
		},
        {
			type: "text",
			placeholder: "Lotação:",
			setState: setCapacity,
		},
        {
			type: "text",
			placeholder: "Município:",
			setState: setCounty,
		},
	]);

	const onSubmit = () => {
		axios
			.post(hostApi, {
				name,
                cpf,
                office,
                class_worker: classWorker,
                capacity,
                county,
			})
			.then(() => {})
			.catch(() => {});
	};

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar servidor"
			fields={fields}
			onClickBtn={onSubmit}
			/>
		</div>
	);
}
