
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ButtonCard from "./ButtonCard";
import "./DocumentRegister.css"


const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(60),
		paddingBottom: theme.spacing(3),
	},
}));

export default function DocumentsRegister() {
	const classes = useStyles();

	return (
		<div>
			<section id="caixa">
			<h1>Arquivo Geral da Polícial Civil de Goiás</h1>
			<h4>Tipos de documentos para cadastro</h4>
			<CssBaseline />
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3}>
						<section id = "c1">
						<ButtonCard
							icon="icone-processo"
							title="Processo Administrativo"
							createUrl="/create-administrative-process"
							
						/>
						</section>
					</Grid>
				
					<Grid item xs={12} sm={6} md={3}>
						<section id = "c2">
						<ButtonCard
							icon="icone-frequencia"
							title="Relação de Frequências"
							createUrl="/create-frequency-relation"
						/>
						</section>
					</Grid>
				
					<Grid item xs={12} sm={6} md={3}>
					<section id = "c3">
						<ButtonCard
							icon="icone-folha"
							title="Folha de Frequências"
							createUrl="/create-frequency-document"
							
						/>
						</section>
					</Grid>
				
					<Grid item xs={12} sm={6} md={3}>
					<section id = "c4">
						<ButtonCard
							icon="icone-arquivar"
							title="Relação de Arquivamento"
							createUrl="/create-archiving-relation"
						/>
						</section>
					</Grid>
				</Grid>
			</Container>
			</section>
			<section className="footer">
			<p> </p>
			</section>
			
		</div>
	);
}
