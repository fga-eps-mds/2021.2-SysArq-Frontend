import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";


export default function CreateUnity() {

	const useStyles = makeStyles({
		input: {
			width: "100%",
			height: 36,
			marginBottom: "1rem",
			maxWidth: 908,
		},
		inputDate: {
			width: "100%",
			height: 36,
			marginTop: "2rem",
			marginBottom: "2rem",
			maxWidth: 908,
		},
	});
	const classes = useStyles();

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

		axiosArchives.post(`unity/`, {
			unity_name: unityName,
			unity_abbreviation: unityAbbreviation,
			administrative_bond: administrativeBond,
			bond_abbreviation: bondAbbreviation,
			type_of_unity: unityType,
			municipality: county,
			telephone_number: telephoneNumber,
			note
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

	const title = "Arquivo Geral da Policia Civil de Goiás"
	const subtitle = "Cadastrar unidade"

	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? <Alert severity="error">Erro de conexão!</Alert> : ""}
			<Paper className="form-cadastro-container" elevation={10}>
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
				<div className="inputs-container">
					{fields.map((item, key) => {
						const input = (
							<TextField
								key={key.toString()}
								id={item.placeholder}
								label={item.placeholder}
								type={item.type}
								onChange={({ target }) => item.setState(target.value)}
								className={classes.input}
								inputProps={{ maxLength: "100" }}
							/>
						)
						return input
					}
					)}
				</div>
				<button data-testid="click" type="button" onClick={onClick}>
					CADASTRAR
				</button>
			</Paper>
		</div>
	);
}
