import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { axiosProfileError } from "../../../support";

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

export default function CreateDocumentName() {
	const classes = useStyles();

	const [documentName, setDocumentName] = useState("");
	const [temporalityValue, setTemporality] = useState("");

	const [documentNameHelperText, setdocumentNameHelperText] = useState("");
	const [documentNameError, setdocumentNameError] = useState(false);
	const [temporalityHelperText, settemporalityHelperText] = useState("");
	const [temporalityError, settemporalityError] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const connectionError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const handleRequestError = (value) => {
		setOpenAlert(true);
		setSeverityAlert("error");
		if (value === 400) {
			setAlertHelperText("Nome do documento já existe");
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página"
			);
		}
	};

	const clear = () => {
		setDocumentName("");
		setTemporality("");
	};

	const onSuccess = () => {
		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Nome do documento cadastrado!");
		clear();
		window.location.reload();
	};

	const onClick = () => {
		if (documentName === "") {
			setdocumentNameError(true);
			setdocumentNameHelperText("Nome inválido");
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
					.post(
						`document-name/`,
						{
							document_name: documentName,
							temporality: temporalityValue,
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } }
					)
					.then(() => {
						onSuccess();
					})
					.catch((err) => {
						if (err.response.status === 401) {
							axiosProfileError(err);
							return false;
						}
						handleRequestError(err.response.status);
						return false;
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});

		return null;
	};

	const fields = [
		{
			type: "text",
			placeholder: "Nome*",
			setValue: setDocumentName,
			value: documentName,
			helperText: documentNameHelperText,
			error: documentNameError,
			setHelperText: setdocumentNameHelperText,
			setError: setdocumentNameError,
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

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar nome do documento";

	return createForm(
		fields,
		title,
		subtitle,
		classes,
		onClick,
		openAlert,
		handleAlertClose,
		severityAlert,
		alertHelperText,
		"Nome do Documento",
		"document-name/",
		clear
	);
}
