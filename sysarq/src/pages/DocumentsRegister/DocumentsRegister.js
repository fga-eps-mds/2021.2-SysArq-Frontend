import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import MenuCard from "../components/MenuCard";

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}));

export default function DocumentsRegister() {
	const classes = useStyles();

	return (
		<div>
			<CssBaseline />
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon=""
							title="Processo Administrativo"
							createUrl="/create-administrative-process"
							listUrl="/documents-register/administrative-process"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon=""
							title="Relação de Frequências"
							createUrl="/create-frequency-relation"
							listUrl="/documents-register/frequency-relation"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon=""
							title="Folha de Frequências"
							createUrl="/create-frequency-document"
							listUrl="/documents-register/frequency-document"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon=""
							title="Relação de Arquivamento"
							createUrl="/create-archiving-relation"
							listUrl="/documents-register/archiving-relation"
						/>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
