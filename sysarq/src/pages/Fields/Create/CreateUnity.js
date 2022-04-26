import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../../Api";
import createForm from "../form";
import { axiosProfileError, getUniqueFieldValues } from "../../../support";

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
	const [administrativeBond, setAdiministrativeBond] = useState(null);
	const [bondAbbreviation, setBondAbbreviation] = useState(null);
	const [county, setCounty] = useState(null);
	const [telephoneNumber, setTelephoneNumber] = useState(null);
	const [note, setNote] = useState("");

	const [administrativeBonds, setAdministrativeBonds] = useState([]);
	const [bondAbbreviations, setBondAbbreviations] = useState([])
	const [counties, setCounties] = useState([])
	const [telephoneNumbers, setTelephoneNumbers] = useState([])

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

	const handleRequestError = (value) => {
		setOpenAlert(true);
		setSeverityAlert("error");
		if (value === 400) {
			setAlertHelperText("Nome da unidade já existe");
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página"
			);
		}
	};

	const clear = () => {
		setUnityName("");
		setUnityAbbreviation("");
		setAdiministrativeBond(null);
		setBondAbbreviation(null);
		setCounty(null);
		setTelephoneNumber(null);
		setNote("");
	};

	const onSuccess = () => {
		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Unidade cadastrada!");
		clear();
		window.location.reload();
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
							municipality: county,
							telephone_number: telephoneNumber,
							notes: note,
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
			options: administrativeBonds,
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
			options: bondAbbreviations,
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
			options: counties,
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
			placeholder: "Telefone",
			setValue: setTelephoneNumber,
			value: telephoneNumber,
			options: telephoneNumbers,
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

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.get('unity/', {
						headers : { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						getUniqueFieldValues(response.data, 'administrative_bond', setAdministrativeBonds)
						getUniqueFieldValues(response.data, 'bond_abbreviation', setBondAbbreviations)
						getUniqueFieldValues(response.data, 'municipality', setCounties)
						getUniqueFieldValues(response.data, 'telephone_number', setTelephoneNumbers)
					})
			})	
			.catch((error) => {
				handleRequestError(error.response.status)
			})
	}, [])

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
		alertHelperText,
		"Unidade",
		"unity/",
		clear
	);
}
