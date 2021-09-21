import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;

export default function CreateShelf() {
	const [numberE, setNumberE] = useState(0);
	const [numberP, setNumberP] = useState(0);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onClick = () => {
		Api.post(hostApiShelf, {
			shelfe_number: numberE,
			shelfp_number: numberP,
		})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {});
	};

	const [fields] = useState([
		{
			type: "number",
			placeholder: "Estante",
			setState: setNumberE,
		},
		{
			type: "number",
			placeholder: "Prateleira",
			setState: setNumberP,
		},
	]);

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar estante e/ou prateleira"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
