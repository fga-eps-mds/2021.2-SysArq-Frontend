import React, { useState } from "react";

import {
    makeStyles, createTheme, ThemeProvider, Container, Grid, Card, CardContent, Typography, TextField,
    InputAdornment, IconButton, Box, Button
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import { Visibility, VisibilityOff } from "@material-ui/icons";

import { axiosProfile } from "../../Api";
import logo from "../../assets/logo.png"


const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        textAlign: "center"
	},

    card: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(16),

        borderRadius: "15px",
        backgroundColor: "#f6f6f6", // "#5389b5", "#f6f6f6",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)"
	},

    title: {
        paddingTop: theme.spacing(4),

        color: "#1f3541",
        fontSize: "30px",
        fontWeight: "700",
        fontFamily: ['"Montserrat"', 'sans-serif']
    },

    input: {
        textAlign: "center",
        width: "82%"
    },

    alert: {
        width: "82%",
        marginLeft: "9%",
        marginTop: "2%", 
    },

    box: { //
        height: 100,
        display: "flex",
    },

    spreadBox: {
        justifyContent: "space-around",
        alignItems: "center"
    },

    button: { //
        textAlign: "left",
	    width: "20%",
        justifyContent: "space-around",
        alignItems: "center"
	},

	content: {
		flexGrow: 1,
	},
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#1f3541",
        },
    },
});

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
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const onPush = () => { // 

        if (username.length < 3){
            setUsernameError(true);
            setUsernameHelperText("Digite um nome de usuário válido")
            return null
        }

        if (password.length < 8){
            setPasswordError(true);
            setPasswordHelperText("Digite uma senha válida")
            return null
        }

        axiosProfile.post(
            `api/token/`,
            {
                "username": username,
                "password": password,
            }
        ).then()
        .catch((error) => {
            setLoginHelperText(error.response)
            setLoginError(true)
        })

        return null
    } //

    return (
        <div style={{ background: "#1f3541" }} id="root">
            <ThemeProvider theme={theme}>
                <Container className={classes.container} maxWidth="sm">
                    <Grid container>
				        <Grid item xs={12}>
                            <Card className={classes.card}>
				                <CardContent>
                                    <img src={logo} alt="Logo" height="42" width="42" />
                                    <Typography className={classes.title}>
                                        Entrar
					                </Typography>

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
                                        type={ showPassword ? "text" : "password"}
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
                                                        {showPassword ? <Visibility data-testid="visible" /> : <VisibilityOff data-testid="invis"/> }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <div data-testid='alert'>

                                    { loginError === true?
                                        <Alert className={classes.alert} severity="error">
                                            {loginHelperText === undefined ? "Erro de conexão":loginHelperText}
                                            </Alert> : ""
                                    }
                                    </div >

                                    <Box className={`${classes.spreadBox} ${classes.box}`}>
                                        <Typography>
                                            Precisa de Ajuda?
					                    </Typography>
                                        <div styles={{"flexGrow": "1"}}/>
                                        <Button
                                            variant="contained"
					                        className={classes.button}
					                        size="small"
					                        color="primary"
                                            onClick={onPush}
                                            data-testid='send'
				                        >
					                        ENTRAR
				                        </Button>
                                    </Box>
				                </CardContent>
		                    </Card>
					    </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Login;
