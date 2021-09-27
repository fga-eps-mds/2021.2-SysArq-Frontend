import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives } from "../../Api";
import createForm from "./form";

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

export default function CreateDocumentSubject() {
	const classes = useStyles();

	const [documentSubject, setDocumentSubject] = useState("");
	const [temporalityValue, setTemporality] = useState("2021-01-01");

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const fields = [
		{
			type: "text",
			placeholder: "Assunto do documento",
			setValue: setDocumentSubject,
			value: documentSubject,
			helperText: "",
			error: false,
			setHelperText: () => {
				"";
			},
			setError: () => {
				"";
			},
		},
		{
			type: "date",
			placeholder: "Temporalidade",
			setValue: setTemporality,
			value: temporalityValue,
			helperText: "",
			error: false,
			setHelperText: () => {
				"";
			},
			setError: () => {
				"";
			},
		},
	];

	const onClick = () => {
		axiosArchives
			.post(`document-subject/`, {
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

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar assunto do documento";

	return createForm(fields, title, subtitle, classes, show, showError, onClick);
}
