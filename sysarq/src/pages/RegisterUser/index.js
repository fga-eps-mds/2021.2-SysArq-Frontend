import React, { useState } from "react"

import { Container, Paper, makeStyles, Typography, TextField } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(4),

        fontSize: "30px",
        fontWeight: "bold",
        fontFamily: ['"Montserrat"', "sans-serif"],
    },
    container: {
        marginTop: theme.spacing(4),
        alignContents: "center",
        textAlign: "center",
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
        alignItems: "center"
    }
}))

const RegisterUser = () => {
    const classes = useStyles();

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [usernameHelperText, setUsernameHelperText] = useState("")

    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstNameHelperText, setFirstNameHelperText] = useState("")

    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameHelperText, setLastNameHelperText] = useState("")

    const [cpf, setCpf] = useState("")
    const [cpfError, setCpfError] = useState(false)
    const [cpfHelperText, setCpfHelperText] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordHelperText, setPasswordHelperText] = useState("")

    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)
    const [passwordConfirmationHelperText, setPasswordConfirmationHelperText] = useState("")

    const handleChange = (helper, error, main, event) => {
        helper("")
        error(false)

        main(event.target.value)
    }

    const handleUsernameChange = (event) => handleChange(setUsernameHelperText, setUsernameError, setUsername, event)

    const handleFirstNameChange = (event) => handleChange(setFirstNameHelperText, setFirstNameError, setFirstName, event)

    const handleLastNameChange = (event) => handleChange(setLastNameHelperText, setLastNameError, setLastName, event)

    const handleCpfChange = (event) => handleChange(setCpfHelperText, setCpfError, setCpf, event)

    const handlePassword = (event) => handleChange(setPasswordHelperText, setPasswordError, setPassword, event)

    const handlePasswordConfirmation = (event) => handleChange(setPasswordConfirmationHelperText, setPasswordConfirmationError, setPasswordConfirmation, event)

    return (
        <Container maxWidth="md" className={classes.container}>
            <Paper elevation={1} className={classes.paper}>

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
                />
                <TextField 
                    className={classes.input} 
                    margin="normal" 
                    id="firstName" 
                    label="Nome" 
                    value={firstName} 
                    error={firstNameError}
                    onChange={handleFirstNameChange} 
                    helperText={firstNameHelperText} 
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
                />
                <TextField
                    className={classes.input}
                    margin="normal" 
                    id="cpf" 
                    label="CPF" 
                    value={cpf} 
                    error={cpfError}
                    onChange={handleCpfChange} 
                    helperText={cpfHelperText}
                />
                <TextField
                    className={classes.input}
                    margin="normal" 
                    id="password" 
                    label="Senha" 
                    value={password} 
                    error={passwordError}
                    onChange={handlePassword} 
                    helperText={passwordHelperText}
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
                />

            </Paper>
        </Container>
    )

}

export default RegisterUser;
