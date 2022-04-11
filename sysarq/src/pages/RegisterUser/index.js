import React, { useState } from "react";
import { validateBr } from "js-brasil";
import InputMask from "react-input-mask";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
	Container,
	Paper,
	makeStyles,
	Typography,
	TextField,
	InputAdornment,
	InputLabel,
	IconButton,
	MenuItem,
	Select,
	FormControl,
	FormHelperText,
} from "@material-ui/core";
import { axiosProfile } from "../../Api";
import { axiosProfileError } from "../../support";
import PopUpAlert from "../components/PopUpAlert";

const useStyles = makeStyles((theme) => ({
	title: {
		paddingTop: theme.spacing(4),
		color: "#5289B5",
		fontSize: "30px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	container: {
		marginTop: theme.spacing(6),
		alignContents: "center",
		textAlign: "center",
		marginBottom: theme.spacing(6),
	},
	input: {
		textAlign: "center",
		minWidth: "300px",
		width: "50%",
	},
	paper: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	button: {
		marginTop: "25px",
		marginBottom: "25px",
		padding: "1rem",
		border: "0",
		outline: "0",
		color: "#F6F6F6",
		fontWeight: "500",
		background: "#5289B5",
		fontSize: "1rem",
		letterSpacing: "1.25px",
		borderRadius: "4px",
		transition: "filter 0.4s",
		height: "50px",

		"&:hover": {
			filter: "brightness(0.9)",
		},
	},
}));

const RegisterUser = () => {
	const classes = useStyles();

	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [usernameHelperText, setUsernameHelperText] = useState("");

	const [userType, setUserType] = useState("");
	const [userTypeError, setUserTypeError] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [firstNameError, setFirstNameError] = useState(false);
	const [firstNameHelperText, setFirstNameHelperText] = useState("");

	const [lastName, setLastName] = useState("");
	const [lastNameError, setLastNameError] = useState(false);
	const [lastNameHelperText, setLastNameHelperText] = useState("");

	const [cpf, setCpf] = useState("");
	const [cpfError, setCpfError] = useState(false);
	const [cpfHelperText, setCpfHelperText] = useState("");

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState("");

	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [passwordConfirmationError, setPasswordConfirmationError] =
		useState(false);
	const [passwordConfirmationHelperText, setPasswordConfirmationHelperText] =
		useState("");

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (helper, error, main, event) => {
		helper("");
		error(false);

		main(event.target.value);
	};

	const handleUsernameChange = (event) =>
		handleChange(setUsernameHelperText, setUsernameError, setUsername, event);

	const handleUserTypeChange = (event) => {
		setUserType(event.target.value);
		setUserTypeError(false);
	};

	const handleFirstNameChange = (event) =>
		handleChange(
			setFirstNameHelperText,
			setFirstNameError,
			setFirstName,
			event
		);

	const handleLastNameChange = (event) =>
		handleChange(setLastNameHelperText, setLastNameError, setLastName, event);

	const handleCpfChange = (event) =>
		handleChange(setCpfHelperText, setCpfError, setCpf, event);

	const handlePassword = (event) =>
		handleChange(setPasswordHelperText, setPasswordError, setPassword, event);

	const handlePasswordConfirmation = (event) =>
		handleChange(
			setPasswordConfirmationHelperText,
			setPasswordConfirmationError,
			setPasswordConfirmation,
			event
		);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleRequestError = (status) => {
		setOpenAlert(true);
		setSeverityAlert("error");
		if (status === 400) {
			setAlertHelperText("O nome de usuário já está em uso");
		} else {
			setAlertHelperText(
				"Verifique sua conexão com a internet e recarregue a página."
			);
		}
	};

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const onSuccess = () => {
		setUsername("");
		setUserType("");
		setFirstName("");
		setLastName("");
		setCpf("");
		setPassword("");
		setPasswordConfirmation("");

		setOpenAlert(true);
		setSeverityAlert("success");
		setAlertHelperText("Usuário cadastrado com sucesso!");
	};

	const onClick = () => {
		let inputError = false;
		if (username.length < 3) {
			setUsernameError(true);
			setUsernameHelperText(
				"Insira um nome de usuário válido (deve conter ao menos 3 caracteres)"
			);
			inputError = true;
		}
		if (userType === "") {
			setUserTypeError(true);
			inputError = true;
		}
		if (firstName === "") {
			setFirstNameError(true);
			setFirstNameHelperText("Insira o seu primeiro nome");
			inputError = true;
		}
		if (lastName === "") {
			setLastNameError(true);
			setLastNameHelperText("Insira o seu último nome");
			inputError = true;
		}
		if (!validateBr.cpf(cpf)) {
			setCpfError(true);
			setCpfHelperText("Insira um cpf válido");
			inputError = true;
		}
		if (password.length < 8) {
			setPasswordError(true);
			setPasswordHelperText(
				"Insira uma senha válida (deve conter ao menos 8 caracteres)"
			);
			inputError = true;
		}
		if (passwordConfirmation !== password) {
			setPasswordConfirmationError(true);
			setPasswordConfirmationHelperText("As senhas não são idênticas");
			inputError = true;
		}
		if (inputError) {
			return "Erro";
		}

		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosProfile
					.post(`users/register/`, {
						username,
						user_type: userType,
						first_name: firstName,
						last_name: lastName,
						cpf,
						password,
					},
						{ headers: { Authorization: `JWT ${localStorage.getItem("tk")}` } })
					.then(() => {
						onSuccess();
						return true;
					})
					.catch((err) => {
						handleRequestError(err.response.status);
						return false;
					});
			})
			.catch((error) => {
				axiosProfileError(error)
			});

		return "Sucesso";
	};

	return (
		<Container maxWidth="md" className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<Typography className={classes.title}>Registrar usuário</Typography>

				<TextField
					className={classes.input}
					margin="normal"
					id="username"
					label="Nome de usuário"
					value={username}
					onChange={handleUsernameChange}
					error={usernameError}
					helperText={usernameHelperText}
					variant="outlined"
				/>

				<FormControl
					variant="outlined"
					fullwidth
					error={userTypeError}
					className={classes.input}
					margin="normal"
				>
					<InputLabel id="user-type-label">Tipo de usuário</InputLabel>
					<Select
						labelId="user-type-label"
						label="Tipo de usuário"
						id="user-type"
						value={userType}
						onChange={handleUserTypeChange}
					>
						<MenuItem value="AD">Administrador</MenuItem>
						<MenuItem value="AL">Alimentador</MenuItem>
						<MenuItem value="VI">Visualizador</MenuItem>
					</Select>
					{userTypeError && (
						<FormHelperText>Defina o tipo de usuário</FormHelperText>
					)}
				</FormControl>

				<TextField
					className={classes.input}
					margin="normal"
					id="firstName"
					label="Nome"
					value={firstName}
					error={firstNameError}
					onChange={handleFirstNameChange}
					helperText={firstNameHelperText}
					variant="outlined"
				/>
				<TextField
					className={classes.input}
					margin="normal"
					id="lastName"
					label="Sobrenome"
					value={lastName}
					error={lastNameError}
					onChange={handleLastNameChange}
					helperText={lastNameHelperText}
					variant="outlined"
				/>
				<InputMask
					mask="999.999.999-99"
					onChange={handleCpfChange}
					value={cpf}
					alwaysShowMask
				>
					<TextField
						className={classes.input}
						margin="normal"
						id="cpf"
						label="CPF"
						error={cpfError}
						onChange={handleCpfChange}
						helperText={cpfHelperText}
						variant="outlined"
					/>
				</InputMask>
				<TextField
					className={classes.input}
					margin="normal"
					id="password"
					label="Senha"
					value={password}
					error={passwordError}
					onChange={handlePassword}
					helperText={passwordHelperText}
					type={showPassword ? "text" : "password"}
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={(event) => event.preventDefault}
									data-testid="showPass"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classes.input}
					margin="normal"
					id="passwordConfirmation"
					label="Confirme sua senha"
					value={passwordConfirmation}
					error={passwordConfirmationError}
					onChange={handlePasswordConfirmation}
					helperText={passwordConfirmationHelperText}
					type={showPassword ? "text" : "password"}
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={(event) => event.preventDefault}
									data-testid="showPass"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<button
					type="button"
					variant="contained"
					onClick={onClick}
					className={classes.button}
				>
					REGISTRAR
				</button>
			</Paper>
			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</Container>
	);
};

export default RegisterUser;
