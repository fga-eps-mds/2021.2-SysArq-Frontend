import React, { useState } from "react";
import FormCadastro from "../components/FormCadastro";

import "./CreateAdministrativeProcess.css";

export default function CreateAdministrativeProcess() {
	const [campo, setCampo] = useState("");
	const [campo2, setCampo2] = useState("");
	
	const [fields] = useState([
		{
			type: "text",
			placeholder: "Campo 1 *",
			setState: setCampo,
		},
		{
			type: "select",
			placeholder: "Campo 2 *",
			setState: setCampo2,
			options: [
				"Opção 1",
				"Opção 2",
			]
		}
	]);

	function onSubmit() {
		console.log("Axios req: ", {
			campo,
			campo2,
		})
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