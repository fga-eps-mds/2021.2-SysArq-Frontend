import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { axiosProfileError } from "../../../support";

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

	const [unityNameHelperText, setunityNameHelperText] = useState("");
	const [unityNameError, setunityNameError] = useState(false);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const connectionError = () => {
		setOpenAlert(true);
		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
		setSeverityAlert("error");
	};

	const onClick = () => {
		if (unityName === "") {
			setunityNameError(true);
			setunityNameHelperText("Nome da unidade não pode ser vazio");
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
						`unity/`,
						{
							unity_name: unityName,
							unity_abbreviation: unityAbbreviation,
							administrative_bond: administrativeBond,
							bond_abbreviation: bondAbbreviation,
							type_of_unity: unityType,
							municipality: county,
							telephone_number: telephoneNumber,
							notes: note,
						}, { headers: { Authorization: `JWT ${localStorage.getItem("tk")}`, }, }
					)
					.then(() => {
						setOpenAlert(true);
						setSeverityAlert("success");
						setAlertHelperText("Unidade cadastrada!");
					})
					.catch(() => {
						connectionError();
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError)
			});
		return null;
	};

	const fields = [
		{
			type: "text",
			placeholder: "Nome da unidade*",
			setValue: setUnityName,
			value: unityName,
			helperText: unityNameHelperText,
			error: unityNameError,
			setHelperText: setunityNameHelperText,
			setError: setunityNameError,
		},
		{
			type: "ShortText",
			placeholder: "Sigla da unidade",
			setValue: setUnityAbbreviation,
			value: unityAbbreviation,
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
			placeholder: "Vínculo administrativo",
			setValue: setAdiministrativeBond,
			value: administrativeBond,
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
			type: "ShortText",
			placeholder: "Sigla do vínculo",
			setValue: setBondAbbreviation,
			value: bondAbbreviation,
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
			type: "MiddleText",
			placeholder: "Tipo de unidade",
			setValue: setUnityType,
			value: unityType,
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
			placeholder: "Município",
			setValue: setCounty,
			value: county,
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
			type: "phone",
			placeholder: "Telefone",
			setValue: setTelephoneNumber,
			value: telephoneNumber,
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
			placeholder: "Observações",
			setValue: setNote,
			value: note,
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

	const title = "Arquivo Geral da Policia Civil de Goiás";
	const subtitle = "Cadastrar unidade";

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
