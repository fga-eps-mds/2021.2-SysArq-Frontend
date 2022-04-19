import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { maskBr } from "js-brasil";
import { axiosArchives, axiosProfile } from "./Api";

export const initialDate = new Date();

export const initialPeriod = new Date(
	initialDate.getFullYear(),
	initialDate.getMonth(),
	"01"
);

const formatDateNumber = (number) => `0${number}`.slice(-2);

export const arrayMes = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
]

export const formatDateName = (date) =>
	`${date.getFullYear()}-${
		arrayMes[date.getMonth()]
	}`;

export const formatDate = (date) =>
	`${date.getFullYear()}-${formatDateNumber(
		date.getMonth() + 1
	)}-${formatDateNumber(date.getDate())}`;

export const isInt = (number) => /^\d+$/.test(number);

export const isDateNotValid = (
	date,
	setHelperText,
	dateType = "period",
	fieldType = ""
) => {
	if (fieldType === "required" && date === null) {
		setHelperText(
			dateType !== "period" ? "Insira uma data" : "Insira um período"
		);
		return true;
	}
	if (date !== null && !isInt(date.getFullYear())) {
		setHelperText(
			dateType !== "period"
				? "Insira uma data válida"
				: "Insira um período válido"
		);
		return true;
	}
	return false;
};

export function logout() {
	localStorage.removeItem("tk");
	localStorage.removeItem("tkr");
	localStorage.removeItem("isLogged");
	localStorage.removeItem("user_type");
	window.location = "/login";
}

export function axiosProfileError(error, connectionError = null) {
	if (error.response && error.response.status === 401) {
		logout();
	} else {
		connectionError();
	}
}

export function getUnits(setUnits, connectionError) {
	axiosProfile
		.post(`api/token/refresh/`, {
			refresh: localStorage.getItem("tkr"),
		})
		.then((res) => {
			localStorage.setItem("tk", res.data.access);
			localStorage.setItem("tkr", res.data.refresh);

			axiosArchives
				.get("unity/", {
					headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
				})
				.then((response) => {
					setUnits(response.data);
				})
				.catch(() => connectionError());
		})
		.catch((error) => {
			axiosProfileError(error, connectionError);
		});
}

export function getPublicWorkers(setPublicWorkers, connectionError) {
	axiosArchives
		.get("public-worker/", {
			headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
		})
		.then((response) => setPublicWorkers(response.data))
		.catch(() => connectionError());
}

export function autocompl(
	publicWorkers,
	publicWorkerInput,
	handlePublicWorkerChange,
	setPublicWorkerInput,
	publicWorkerOptions,
	publicWorkerHelperText
) {
	return (
		<Autocomplete
			id="workerName"
			data-testid="autocomplete"
			value={publicWorkers.name}
			onChange={(event, newValue) => {
				handlePublicWorkerChange(newValue);
			}}
			inputValue={publicWorkerInput}
			onInputChange={(event, newInputValue) => {
				setPublicWorkerInput(newInputValue);
			}}
			options={publicWorkerOptions.sort(
				(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			)}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => `${option.name}, ${maskBr.cpf(option.cpf)}`}
			getOptionSelected={(option, value) => option.name === value.name}
			autoHighlight
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					label="Servidor, CPF*"
					error={publicWorkerHelperText !== ""}
					helperText={publicWorkerHelperText}
				/>
			)}
		/>
	);
}

export function parseJwt(token) {
	const base64Payload = token.split(".")[1];
	const payload = Buffer.from(base64Payload, "base64");
	return JSON.parse(payload.toString());
}

export const userTypeMap = {
	AD: 3,
	AL: 2,
	VI: 1,
};

export function senderWorker(
	senderPublicWorkers,
	senderPublicWorkerInput,
	handleSenderPublicWorkerChange,
	setSenderPublicWorkerInput,
	senderPublicWorkerOptions,
	senderPublicWorkerHelperText
) {
	return (
		<Autocomplete
			id="workerName"
			data-testid="autocomplete"
			value={senderPublicWorkers.name}
			onChange={(event, newValue) => {
				handleSenderPublicWorkerChange(newValue);
			}}
			inputValue={senderPublicWorkerInput}
			onInputChange={(event, newInputValue) => {
				setSenderPublicWorkerInput(newInputValue);
			}}
			options={senderPublicWorkerOptions.sort(
				(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			)}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => `${option.name}, ${maskBr.cpf(option.cpf)}`}
			getOptionSelected={(option, value) => option.name === value.name}
			autoHighlight
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					label="Servidor que encaminhou*"
					error={senderPublicWorkerHelperText !== ""}
					helperText={senderPublicWorkerHelperText}
				/>
			)}
		/>
	);
}

export function receiverWorker(
	receiverPublicWorkers,
	receiverPublicWorkerInput,
	handleReceiverPublicWorkerChange,
	setReceiverPublicWorkerInput,
	receiverPublicWorkerOptions,
	receiverPublicWorkerHelperText
) {
	return (
		<Autocomplete
			id="workerName"
			data-testid="autocomplete"
			value={receiverPublicWorkers.name}
			onChange={(event, newValue) => {
				handleReceiverPublicWorkerChange(newValue);
			}}
			inputValue={receiverPublicWorkerInput}
			onInputChange={(event, newInputValue) => {
				setReceiverPublicWorkerInput(newInputValue);
			}}
			options={receiverPublicWorkerOptions.sort(
				(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			)}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => `${option.name}, ${maskBr.cpf(option.cpf)}`}
			getOptionSelected={(option, value) => option.name === value.name}
			autoHighlight
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					label="Servidor que recebeu*"
					error={receiverPublicWorkerHelperText !== ""}
					helperText={receiverPublicWorkerHelperText}
				/>
			)}
		/>
	);
}
