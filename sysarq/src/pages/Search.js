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
		marginLeft: 10,
	},

	select_box: {
		minWidth: 200,
	},

	select_label: {
		marginTop: -1,
		marginLeft: 60,
	},
});

export default function Search() {
	const classes = useStyles();
	const [value, setValue] = React.useState("");

	const theme = createTheme({
		palette: {
			primary: {
				main: "#5289B5",
			},
		},
	});

	const handleChange = (event) => {
		setValue(event.target.value);
	};

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
								value={value}
								onChange={handleChange}
								variant="outlined"
								labelId="Resultado de pesquisa"
								autoWidth
								id="select"
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
