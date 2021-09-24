import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";


export default function CreateBoxAbbreviation() {

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

	const [Number, setNumber] = useState(0);
	const [Abbreviation, setAbbreviation] = useState("");
	const [Name, setName] = useState("");
	const [Year, setBondYear] = useState(0);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);
	

	const onClick = () => {
		axiosArchives.post(`box-abbreviation/`, {
			number: Number,
			abbreviation: Abbreviation,
			name: Name,
			year: Year,
		})
			.then(() => {
				handleShow();
				setTimeout(handleClose, 3000);
			})
			.catch(()=>{
				handleShowError();
				setTimeout(handleCloseError, 3000);
			})
	};

	const [fields] = useState([
		{
			type: "number",
			placeholder: "Número da caixa",
			setState: setNumber,
		},
		{
			type: "ShortText",
			placeholder: "Sigla da caixa",
			setState: setAbbreviation,
		},
		{
			type: "text",
			placeholder: "Nome completo",
			setState: setName,
		},
		{
			type: "number",
			placeholder: "Ano",
			setState: setBondYear,
		},
	]);

	const title = "Arquivo Geral da Policia Civil de Goiás"
	const subtitle = "Cadastrar caixa"

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
