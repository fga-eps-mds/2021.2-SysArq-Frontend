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

export default function FieldsRegister() {
	const classes = useStyles();

	return (
		<div>
			<CssBaseline />
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-assunto"
							title="Assunto do Documento"
							createUrl="/create-document-subject"
							listUrl="/fields-register/document-subject"
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-sigla-da-caixa"
							title="Sigla da Caixa"
							createUrl="create-box-abbreviation"
							listUrl="/fields-register/box-abbreviation"
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-servidor"
							title="Servidor"
							createUrl="create-public-worker"
							listUrl="/fields-register/public-worker"
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-unidade"
							title="Unidade"
							createUrl="create-unity"
							listUrl="/fields-register/unity"
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-tipo-de-documento"
							title="Tipo de Documento"
							createUrl="create-document-type"
							listUrl="/fields-register/document-type"
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-status"
							title="Status"
							createUrl="/create-status"
							listUrl="/fields-register/status" 
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<MenuCard
							icon="icone-estante-prateleira"
							title="Estante e Prateleira"
							createUrl="/create-shelf"
							listUrl="/fields-register/shelf"
						/>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
