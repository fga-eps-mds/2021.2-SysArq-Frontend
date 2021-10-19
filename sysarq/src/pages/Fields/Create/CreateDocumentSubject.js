import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { logout } from "../../../support";

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
	const [temporalityValue, setTemporality] = useState("");

	const [documentSubjectHelperText, setdocumentSubjectHelperText] =
		useState("");
	const [documentSubjectError, setdocumentSubjectError] = useState(false);
	const [temporalityHelperText, settemporalityHelperText] = useState("");
	const [temporalityError, settemporalityError] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const fields = [
		{
			type: "text",
			placeholder: "Assunto do documento*",
			setValue: setDocumentSubject,
			value: documentSubject,
			helperText: documentSubjectHelperText,
			error: documentSubjectError,
			setHelperText: setdocumentSubjectHelperText,
			setError: setdocumentSubjectError,
		},
		{
			type: "number",
			placeholder: "Temporalidade (anos)*",
			setValue: setTemporality,
			value: temporalityValue,
			helperText: temporalityHelperText,
			error: temporalityError,
			setHelperText: settemporalityHelperText,
			setError: settemporalityError,
		},
	];

	const onClick = () => {
		if (documentSubject === "") {
			setdocumentSubjectError(true);
			setdocumentSubjectHelperText("Assunto inválido");
			return "Erro";
		}
		if (temporalityValue === "") {
			settemporalityError(true);
			settemporalityHelperText("Temporalidade inválida");
			return "Erro";
		}
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.post(`document-subject/`, {
						subject_name: documentSubject,
						temporality: temporalityValue,
					})
					.then(() => {
						setOpenAlert(true);
						setSeverityAlert("success");
						setAlertHelperText("Assunto cadastrado!");
					})
					.catch(() => {
						setOpenAlert(true);
						setAlertHelperText(
							"Verifique sua conexão com a internet e recarregue a página."
						);
						setSeverityAlert("error");
					});

				return res;
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					logout();
				} else {
					setOpenAlert(true);
					setAlertHelperText(
						"Verifique sua conexão com a internet e recarregue a página."
					);
					setSeverityAlert("error");
				}
			});
		return null;
	};

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar assunto do documento";

	return createForm(
		fields,
		title,
		subtitle,
		classes,
		onClick,
		openAlert,
		handleAlertClose,
		severityAlert,
		alertHelperText
	);
}
