import "./Search.css";
import {
	TextField,
	Button,
	Grid,
	ThemeProvider,
	createTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import imgBox from "./assets/logo.png";

const useStyles = makeStyles({
	input: {
		marginTop: 30,
		width: 650,
	},

	button: {
		marginTop: 50,
		marginLeft: 10,
	},
});

export default function Search() {
	const classes = useStyles();

	const theme = createTheme({
		palette: {
			primary: {
				main: "#5289B5",
			},
		},
	});

	return (
		<div>
			<body id="body">
				<img id="logo" src={imgBox} alt="Logo" />
				<h1 id="Search_title">Arquivo Geral da Polícia Civil do Goiás</h1>

				<ThemeProvider theme={theme}>
					<TextField
						className={classes.input}
						placeholder="Pesquisar:"
						variant="outlined"
						color="primary"
					/>
				</ThemeProvider>

				<Grid item xs={12} sm={12} md={15}>
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

						<Button
							className={classes.button}
							color="primary"
							variant="contained"
							id="button"
							size="large"
						>
							Filtrar por:
						</Button>
					</ThemeProvider>
				</Grid>
			</body>
		</div>
	);
}
