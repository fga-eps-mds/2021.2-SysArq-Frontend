import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { axiosProfileError } from "../../../support";

const isCpfValid = (cpfLength) => cpfLength === 11;

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

export default function CreatePublicWorker() {
	const classes = useStyles();

	const [workerName, setName] = useState("");
	const [workerCpf, setCpf] = useState("");
	const [workerRole, setRole] = useState("");
	const [workerCategory, setCategory] = useState("");
	const [workerWorkplace, setWorkplace] = useState("");
	const [municipalArea, setMunicipalArea] = useState("");

	const [nameError, setNameError] = useState(false);
	const [nameHelperText, setNameHelperText] = useState("");
	const [cpfError, setCpfError] = useState(false);
	const [cpfHelperText, setCpfHelperText] = useState("");

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

	const onClick = () => {
		if (workerName === "") {
			setNameError(true);
			setNameHelperText("Insira um nome");
			return "Erro";
		}
		if (!isCpfValid(workerCpf.length)) {
			setCpfError(true);
			setCpfHelperText("Insira um CPF válido");
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
						`public-worker/`,
						{
							name: workerName,
							cpf: workerCpf,
							role: workerRole,
							category: workerCategory,
							workplace: workerWorkplace,
							municipal_area: municipalArea,
						},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } }
					)
					.then(() => {
						setOpenAlert(true);
						setSeverityAlert("success");
						setAlertHelperText("Servidor cadastrado!");
					})
					.catch(() => {
						connectionError();
					});

				return res;
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
		return null;
	};

	const values = [
		{
			type: "text",
			placeholder: "Nome*",
			setValue: setName,
			value: workerName,
			helperText: nameHelperText,
			error: nameError,
			setHelperText: setNameHelperText,
			setError: setNameError,
		},
		{
			type: "text",
			placeholder: "CPF*",
			setValue: setCpf,
			value: workerCpf,
			helperText: cpfHelperText,
			error: cpfError,
			setHelperText: setCpfHelperText,
			setError: setCpfError,
		},
		{
			type: "text",
			placeholder: "Cargo",
			setValue: setRole,
			value: workerRole,
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
			placeholder: "Classe",
			setValue: setCategory,
			value: workerCategory,
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
			placeholder: "Unidade",
			setValue: setWorkplace,
			value: workerWorkplace,
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
			placeholder: "Municipio",
			setValue: setMunicipalArea,
			value: municipalArea,
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

	const pageTitle = "Arquivo Geral da Policia Civil de Goiás";
	const pageSubtitle = "Cadastrar servidor";

	return createForm(
		values,
		pageTitle,
		pageSubtitle,
		classes,
		onClick,
		openAlert,
		handleAlertClose,
		severityAlert,
		alertHelperText
	);
}
