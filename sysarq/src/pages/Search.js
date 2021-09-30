import "./Search.css";
import {
	TextField,
	Button,
	Grid,
	ThemeProvider,
	createTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as React from "react";
import imgBox from "./assets/logo.png";
// import SearchList from "./SearchList";



const useStyles = makeStyles({
	input: {
		marginTop: 30,
		width: 650,
	},

	button: {
		marginTop: 50,
		marginLeft: 10,
		borderRadius: 4,
	},

	select: {
		marginTop: 50,
		marginLeft: 100,
	},

	select_box: {
		minWidth: 200,
		height: 40,
	},

	select_label: {
		marginTop: -15,
		marginLeft: 20,
	},
});

export default function Search() {
	const classes = useStyles();
	// const [value1, setValue1] = React.useState("");
	// const [value2, setValue2] = React.useState("");

	const theme = createTheme({
		palette: {
			primary: {
				main: "#5289B5",
			},
		},
	});

	// const handleChangeofvalue1 = (event) => {
	// 	setValue1(event.target.value);
	// };

	// const handleChangeofvalue2 = (event) => {
	// 	setValue2(event.target.value);
	// };

	// const onClick = () => (
	// 	SearchList(value1,value2)
	// 	);

	

	return (
		<div>
			<body id="body">
				<img id="logo" src={imgBox} alt="Logo" />
				<h1 id="search_title">Arquivo Geral da Polícia Civil do Goiás</h1>

				<ThemeProvider theme={theme}>
					<TextField
						className={classes.input}
						placeholder="Pesquisar:"
						variant="outlined"
						color="primary"
						// value={value1}
						// onChange={handleChangeofvalue1}
					/>
				</ThemeProvider>

				<Grid item xs={12} sm={12} md={12}>
					<ThemeProvider theme={theme}>
						<Button
							className={classes.button}
							color="primary"
							variant="contained"
							id="button"
							size="large"
							// onclick={onClick}
							href="/searchList/"
						>
							Ir
						</Button>

						<FormControl
							sx={{ m: 1, minWidth: 120 }}
							className={classes.select}
						>
							<InputLabel className={classes.select_label}>
								Filtrar por:
							</InputLabel>
							<Select
								className={classes.select_box}
								// value={value2}
								// onChange={handleChangeofvalue2}
								variant="outlined"
								label="dropdown"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="process_number">Número de processo</MenuItem>
								<MenuItem value="shelf">Estante</MenuItem>
								<MenuItem value="hack">Prateleira</MenuItem>
								<MenuItem value="abbreviation">Sigla da caixa</MenuItem>
								<MenuItem value="is_filed">Enviado</MenuItem>
								<MenuItem value="is_eliminated">Eliminado</MenuItem>
								<MenuItem value="user">Usuário</MenuItem>
								<MenuItem value="document_type">Tipo de documento</MenuItem>
							</Select>
						</FormControl>
					</ThemeProvider>
				</Grid>
			</body>
		</div>
	);
}
