import AllInboxIcon from "@material-ui/icons/AllInbox";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},

	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	cardContent: {
		flexGrow: 1,
	},

	icon: {
		height: 200,
		width: 200,
		color: "#074f66",
	},
}));

export default function FieldsRegister() {
	const classes = useStyles();

	return (
		<div>
			<CssBaseline />
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6} md={3}>
						<Card className={classes.card}>
							<CardContent className={classes.cardContent}>
								<AllInboxIcon className={classes.icon} />
								<Typography
									align="center"
									gutterBottom
									variant="body"
									component="h2"
								>
									Sigla
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" color="primary">
									Criar
								</Button>
								<Button size="small" color="primary">
									Listar
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
