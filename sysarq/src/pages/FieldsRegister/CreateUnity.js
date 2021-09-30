import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { axiosArchives, axiosProfile } from "../../Api";
import createForm from "./form";

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

	const [showError, setShowError] = useState(false);
	const handleCloseError = () => setShowError(false);
	const handleShowError = () => setShowError(true);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onClick = () => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.post(`unity/`, {
						unity_name: unityName,
						unity_abbreviation: unityAbbreviation,
						administrative_bond: administrativeBond,
						bond_abbreviation: bondAbbreviation,
						type_of_unity: unityType,
						municipality: county,
						telephone_number: telephoneNumber,
						notes: note,
					})
					.then(() => {
						handleShow();
						setTimeout(handleClose, 3000);
					})
					.catch(() => {
						handleShowError();
						setTimeout(handleCloseError, 3000);
					});
			})
			.catch(() => {});
	};

	const fields = [
		{
			type: "text",
			placeholder: "Nome da unidade",
			setValue: setUnityName,
			value: unityName,
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
		show,
		showError,
		onClick,
		false
	);
}
