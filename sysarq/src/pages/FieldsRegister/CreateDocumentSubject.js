import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";


export default function CreateDocumentSubject() {

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

	const [documentSubject, setDocumentSubject] = useState("");
	const [temporalityValue, setTemporality] = useState("2021-01-01");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const [fields] = useState([
		{
			type: "text",
			placeholder: "Assunto do documento",
			setState: setDocumentSubject,
		},
		{
			type: "date",
			placeholder: "Temporalidade",
			setState: setTemporality,
		},
	]);

	const onClick = () => {
		axiosArchives.post(`document-subject/`, {
			subject_name: documentSubject,
			temporality: temporalityValue,
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

	const title = "Arquivo Geral da Policia Civil de Goiás"
	const subtitle = "Cadastrar assunto do documento"

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
							item.type !== "date" ?
								<TextField
									key={key.toString()}
									id={item.placeholder}
									label={item.placeholder}
									type={item.type}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "100" }}
								/>
								:
								<TextField
									key={key.toString()}
									id={item.placeholder}
									label={item.placeholder}
									type={item.type}
									onChange={({ target }) => item.setState(target.value)}
									value={temporalityValue}
									className={classes.inputDate}
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
