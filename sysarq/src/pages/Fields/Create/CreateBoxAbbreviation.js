import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { axiosProfileError } from "../../../support";

const useStyles = makeStyles((theme) => ({
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
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),

		margin: "auto",
		textAlign: "center",
	},
}));

export default function CreateBoxAbbreviation() {
	const classes = useStyles();
	const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [boxName, setBoxName] = useState("");

	const [boxAbbreviationHelperText, setboxAbbreviationHelperText] =
		useState("");
	const [boxAbbreviationError, setboxAbbreviationError] = useState(false);

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

	const onSuccess = () => {
		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Caixa cadastrada!");
		setBoxName("");
		setBoxAbbreviation("");
		window.location.reload();
	};

	const onClick = () => {
		if (boxAbbreviation === "") {
			setboxAbbreviationError(true);
			setboxAbbreviationHelperText("Sigla inválida");
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
						`box-abbreviation/`,
						{
							abbreviation: boxAbbreviation,
							name: boxName,
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } }
					)
					.then(() => {
						onSuccess();
					})
					.catch(() => {
						connectionError();
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
		setboxAbbreviationError(false);

		setboxAbbreviationHelperText("");
		return null;
	};

	const fields = [
		{
			type: "text",
			placeholder: "Nome completo",
			setValue: setBoxName,
			value: boxName,
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
			type: "text",
			placeholder: "Sigla da caixa*",
			setValue: setBoxAbbreviation,
			value: boxAbbreviation,
			helperText: boxAbbreviationHelperText,
			error: boxAbbreviationError,
			setHelperText: setboxAbbreviationHelperText,
			setError: setboxAbbreviationError,
		},
	];

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar Sigla da Caixa";

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
		"Sigla da Caixa",
		"box-abbreviation/"
	);
}
