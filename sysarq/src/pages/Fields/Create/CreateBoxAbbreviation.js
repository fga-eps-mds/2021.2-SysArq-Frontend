import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { logout } from "../../../support";

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
	const [boxNumber, setBoxNumber] = useState("");
	const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [boxName, setBoxName] = useState("");
	const [boxYear, setBoxYear] = useState("");

	const [yearHelperText, setYearHelperText] = useState("");
	const [yearError, setYearError] = useState(false);
	const [boxNumberHelperText, setboxNumberHelperText] = useState("");
	const [boxNumberError, setboxNumberError] = useState(false);
	const [boxAbbreviationHelperText, setboxAbbreviationHelperText] =
		useState("");
	const [boxAbbreviationError, setboxAbbreviationError] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const onClick = () => {
		if (boxNumber === "") {
			setboxNumberError(true);
			setboxNumberHelperText("Número inválido");
			return "Erro";
		}
		if (boxAbbreviation === "") {
			setboxAbbreviationError(true);
			setboxAbbreviationHelperText("Sigla inválida");
			return "Erro";
		}
		if (boxYear === "" || parseInt(boxYear, 10) < 1900) {
			setYearError(true);
			setYearHelperText("Ano inválido");
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
					.post(`box-abbreviation/`, {
						number: boxNumber,
						abbreviation: boxAbbreviation,
						name: boxName,
						year: boxYear,
					})
					.then(() => {
						setOpenAlert(true);
						setSeverityAlert("success");
						setAlertHelperText("Caixa cadastrada!");
					})
					.catch(() => {
						setOpenAlert(true);
						setAlertHelperText(
							"Verifique sua conexão com a internet e recarregue a página."
						);
						setSeverityAlert("error");
					});
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) logout();
				else {
					setOpenAlert(true);
					setAlertHelperText(
						"Verifique sua conexão com a internet e recarregue a página."
					);
					setSeverityAlert("error");
				}
			});
		setYearError(false);
		setboxNumberError(false);
		setboxAbbreviationError(false);

		setYearHelperText("");
		setboxNumberHelperText("");
		setboxAbbreviationHelperText("");
		return null;
	};

	const fields = [
		{
			type: "number",
			placeholder: "Número da caixa*",
			setValue: setBoxNumber,
			value: boxNumber,
			helperText: boxNumberHelperText,
			error: boxNumberError,
			setHelperText: setboxNumberHelperText,
			setError: setboxNumberError,
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
			type: "number",
			placeholder: "Ano*",
			setValue: setBoxYear,
			value: boxYear,
			helperText: yearHelperText,
			error: yearError,
			setHelperText: setYearHelperText,
			setError: setYearError,
		},
	];

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar caixa";

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
		true
	);
}
