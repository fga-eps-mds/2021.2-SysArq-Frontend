import React, { useState } from "react";

import {
	makeStyles,
	withStyles,
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Box,
	Button,
	CircularProgress,
} from "@material-ui/core";

import MuiLink from "@material-ui/core/Link";

import Alert from "@material-ui/lab/Alert";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import { axiosProfile } from "../../Api";

import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
	container: {
		margin: "auto",
		textAlign: "center",
	},

	card: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),

		borderRadius: "10px",
		backgroundColor: "#f6f6f6",
		boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.5)",
	},

	title: {
		paddingTop: theme.spacing(4),

		color: "#1f3541",
		fontSize: "30px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},

	input: {
		textAlign: "center",
		width: "82%",
	},

	alert: {
		width: "82%",
		marginLeft: "9%",
		marginTop: "2%",
	},

	box: {
		display: "flex",
		height: "100%",
		width: "82%",
		marginTop: "8%",
		marginLeft: "9%",
	},

	spreadBox: {
		justifyContent: "space-around",
		alignItems: "center",
	},

	link: {
		fontWeight: "bold",
	},

	reference: {
		paddingTop: theme.spacing(8),

		color: "#1f354195",
		fontSize: "12px",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
}));

const Link = withStyles({
	root: {
		"&:hover": {
			color: "#5389b5",
		},
	},
})(MuiLink);

const Login = () => {
	const classes = useStyles();

	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState(false);
	const [usernameHelperText, setUsernameHelperText] = useState("");

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHelperText, setPasswordHelperText] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [loginError, setLoginError] = useState(false);
	const [loginHelperText, setLoginHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleUsernameChange = (event) => {
		setUsernameHelperText("");
		setUsernameError(false);

		setLoginHelperText("");
		setLoginError(false);

		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPasswordHelperText("");
		setPasswordError(false);

		setLoginHelperText("");
		setLoginError(false);

		setPassword(event.target.value);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const onPush = () => {
		setLoading(true);

		if (username.length < 3) {
			setUsernameError(true);
			setUsernameHelperText("Digite um nome de usuário válido");

			setLoading(false);

			return "username error";
		}

		if (password.length < 8) {
			setPasswordError(true);
			setPasswordHelperText("Digite uma senha válida");

			setLoading(false);

			return "password error";
		}

		axiosProfile
			.post(`api/token/`, {
				username,
				password,
			})
			.then((response) => {
				localStorage.setItem("tk", response.data.access);
				localStorage.setItem("tkr", response.data.refresh);
				localStorage.setItem("isLogged", true);

				window.location = "/";
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					setLoginHelperText("Nome de Usuário e/ou Senha incorreto!");
				} else {
					setLoginHelperText("Erro de conexão!");
				}

				setLoginError(true);
				setLoading(false);
			});

		return "post done";
	};

	return (
		<div style={{ background: "#1f3541" }} id="root">
			<Container className={classes.container} maxWidth="sm">
				<Grid container>
					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardContent>
								<img src={logo} alt="Logo" height="42" width="42" />
								<Typography className={classes.title}>Entrar</Typography>

								<TextField
									fullWidth
									className={classes.input}
									margin="normal"
									id="username"
									label="Nome de Usuário"
									value={username}
									onChange={handleUsernameChange}
									error={usernameError}
									helperText={usernameHelperText}
								/>
								<TextField
									fullWidth
									className={classes.input}
									margin="normal"
									id="password"
									label="Senha"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={handlePasswordChange}
									error={passwordError}
									helperText={passwordHelperText}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													data-testid="showPass"
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
									onKeyUp={(event) => (event.key === "Enter" ? onPush() : null)}
								/>

								{loginError === true ? (
									<Alert className={classes.alert} severity="error">
										{loginHelperText}
									</Alert>
								) : (
									""
								)}

								<Box className={`${classes.spreadBox} ${classes.box}`}>
									<Typography>
										<Link
											className={classes.link}
											target="_blank"
											href="https://github.com/fga-eps-mds/2021.1-PC-GO1/issues"
										>
											Ajuda?
										</Link>
									</Typography>

									{loading ? (
										<CircularProgress />
									) : (
										<Button
											style={{ fontWeight: "bold" }}
											variant="contained"
											color="primary"
											onClick={onPush}
										>
											Entrar
										</Button>
									)}
								</Box>

								<Typography className={classes.reference}>
									Logo made by{" "}
									<Link target="_blank" href="https://www.freepik.com/">
										Freepik
									</Link>{" "}
									from{" "}
									<Link target="_blank" href="https://www.flaticon.com/">
										www.flaticon.com
									</Link>
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Login;
