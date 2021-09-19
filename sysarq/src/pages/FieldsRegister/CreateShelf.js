import React, { useState } from "react";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;

export default function CreateShelf() {
	const [numberE, setNumberE] = useState(0);
	const [numberP, setNumberP] = useState(0);

	const onClick = () => {
		Api
			.post(hostApiShelf, {
				shelfe_number: numberE,
				shelfp_number: numberP,
			})
			.then(() => {})
			.catch(() => {});
	};

	const[fields] = useState([
		{
			type: "number",
			placeholder: "Estante:",
			setState: setNumberE,
		},
		{
			type: "number",
			placeholder: "Prateleira:",
			setState: setNumberP,
		},
	]);

	return (
		<div className="create-form-container">
			<FormCadastro
			title="Arquivo Geral da Policia Civil de Goiás"
			subtitle="Cadastrar Estante/prateleira"
			fields={fields}
			onClickBtn={onClick}
			/>
		</div>
	);
}
