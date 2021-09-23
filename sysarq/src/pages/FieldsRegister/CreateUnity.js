import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import FormCadastro from "../FormCadastro";
import Api from "../../Api";

const hostApiUnity = `${process.env.REACT_APP_URL_API}unity/`;

export default function CreateUnity() {
	const [unityName, setUnityName] = useState("");
	const [unityAbbreviation, setUnityAbbreviation] = useState("");
	const [administrativeBond, setAdiministrativeBond] = useState("");
	const [bondAbbreviation, setBondAbbreviation] = useState("");
	const [unityType, setUnityType] = useState("");
	const [county, setCounty] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [note, setNote] = useState("");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const onClick = () => {
		// console.log(hostApiUnity)
		// console.log(unityName)
		// console.log(unityAbbreviation)
		// console.log(bondAbbreviation)
		// console.log(unityType)
		// console.log(county)
		// console.log(telephoneNumber)
		// console.log(note)

		Api.post(hostApiUnity, {
			unity_name: unityName,
			unity_abbreviation: unityAbbreviation,
			administrative_bond: administrativeBond,
			bond_abbreviation: bondAbbreviation,
			type_of_unity: unityType,
			municipality: county,
			telephone_number: telephoneNumber,
			note,
		})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(() => {
				handleShowError();
				setTimeout(handleCloseError, 3000);
			});
	};

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Nome da unidade",
			setState: setUnityName,
		},
		{
			type: "ShortText",
			placeholder: "Sigla da unidade",
			setState: setUnityAbbreviation,
		},
		{
			type: "text",
			placeholder: "Vínculo administrativo",
			setState: setAdiministrativeBond,
		},
		{
			type: "ShortText",
			placeholder: "Sigla do vínculo",
			setState: setBondAbbreviation,
		},
		{
			type: "MiddleText",
			placeholder: "Tipo de unidade",
			setState: setUnityType,
		},
		{
			type: "text",
			placeholder: "Município",
			setState: setCounty,
		},
		{
			type: "phone",
			placeholder: "Telefone",
			setState: setTelephoneNumber,
		},
		{
			type: "text",
			placeholder: "Observações",
			setState: setNote,
		},
	]);

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? <Alert severity="error">Erro de conexão!</Alert> : ""}

			<FormCadastro
				title="Arquivo Geral da Policia Civil de Goiás"
				subtitle="Cadastrar Unidade"
				fields={fields}
				onClickBtn={onClick}
			/>
		</div>
	);
}
