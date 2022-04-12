/* eslint-disable */

import { useEffect, useState } from "react"
import { axiosProfile } from "../../Api"
import {Button, Select, MenuItem, TextField, Box, IconButton, Collapse, makeStyles, Container, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core"
import InputMask from "react-input-mask"
import {validateBr} from "js-brasil"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import tableHeadCells from "../components/DataTable/tablesHeadCells";

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
    root : {
        "& > *": {
            borderBottom: "unset"
        }
    }
}));

const UserRow = ({ user }) => {
    const classes = useStyles()
    const [state, setState] = useState({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        cpf: user.cpf
    })

    console.log(user)

    const [invalid, setInvalid] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target

        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        setInvalid(checkInvalid())
    }, [state])

    const checkInvalid = () => {
        for (const val of Object.values(state)) {
            if (val === "" || val === null || val === undefined) {
                return true 
            }
        }

        if (!validateBr.cpf(state.cpf)) {
            return true 
        }

        if (state.username.length < 3) {
            return true 
        }

        return false 
    }

    const onSave = () => {
        axiosProfile.post("api/token/refresh/", {
            refresh: localStorage.getItem("tkr")
        }).then((res) => {
            localStorage.setItem("tk", res.data.access)
            localStorage.setItem("tkr", res.data.refresh)

            axiosProfile.put(`users/${user.id}/`, {
                user_type: state.userType,
                username: state.username,
                first_name: state.firstName,
                last_name: state.lastName,
                cpf: state.cpf,
            },
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tk")}`
                }
            }).then((res) => {
                console.log(res)
            })
        })
    }

    const onDelete = () => {
        axiosProfile.post("api/token/refresh/", {
            refresh: localStorage.getItem("tkr")
        }).then((res) => {
            localStorage.setItem("tk", res.data.access)
            localStorage.setItem("tkr", res.data.refresh)

            axiosProfile.delete(`users/${user.id}/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tk")}`
                }
            }).then((res) => {
                console.log(res)
            })
        })
    }

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <Button size="small" style={{ color: "#fe0000", marginBottom: "5px" }} onClick={() => onDelete()}>Excluir</Button>
                    <Button size="small" color="secondary" disabled={invalid} onClick={() => onSave()}>Salvar</Button>
                </TableCell>
                <TableCell component="th" scope="root">
                    <TextField value={state.username} name="username" onChange={handleChange}/>
                </TableCell>
                <TableCell>
                    <TextField value={state.firstName} name="firstName" onChange={handleChange}/>
                </TableCell>
                <TableCell>
                    <TextField value={state.lastName} name="lastName" onChange={handleChange}/>
                </TableCell>
                <TableCell>
                    <InputMask mask="999.999.999-99" value={state.cpf} alwaysShowMask onChange={handleChange}>
                        <TextField name="cpf"/>
                    </InputMask>
                </TableCell>
                <TableCell>
                    <Select defaultValue={state.userType} name="userType" onChange={handleChange}>
                        <MenuItem value="AD">Administrador</MenuItem>
                        <MenuItem value="AL">Alimentador</MenuItem>
                        <MenuItem value="VI">Visualizador</MenuItem>
                    </Select>
                </TableCell>
            </TableRow>
        </>
    )

}

const UserTable = ({ users }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center">Nome de usuário</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Sobrenome</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <UserRow key={u.username} user={u} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const classes = useStyles()

    useEffect(() => {
        axiosProfile.post("api/token/refresh/", {
            refresh: localStorage.getItem("tkr")
        }).then((res) => {
            localStorage.setItem("tk", res.data.access)
            localStorage.setItem("tkr", res.data.refresh)

            axiosProfile.get("users/get-users/", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tk")}`
                }
            }).then((res) => {
                setUsers(res.data)
            })
        })
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <Container maxWidth="lg" className={classes.container}>
            <UserTable users={users} />
        </Container>
    )
}

export default ManageUsers