import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import DescriptionIcon from "@material-ui/icons/Description";
import "./ButtonCard.css"

const useStyles = makeStyles(() => ({
	card: {
		height: "100%",
		display: "flex",	
		flexDirection: "column",
	},

	icon: {
		height: 125,
		color: "#000000",
		width: "100%",
		alignSelf: "center",
	},

	content: {
		flexGrow: 1,
	},
}));

const Icon = ({ iconName, title }) => {
	const classes = useStyles();

	let icon = "";

	if (
		iconName === "icone-processo" &&
		title === "Processo Administrativo"
	) {
		icon = <DescriptionIcon className={classes.icon} />;
	}
	else if (
		iconName === "icone-frequencia" &&
		title === "Relação de Frequências"
	) {
		icon = <DescriptionIcon className={classes.icon} />;
	}
	else if (
		iconName === "icone-folha" &&
		title === "Folha de Frequências"
	) {
		icon = <DescriptionIcon className={classes.icon} />;
	}
	else if (
		iconName === "icone-arquivar" &&
		title === "Relação de Arquivamento"
	) {
		icon = <DescriptionIcon className={classes.icon} />;
	}
	return icon;
};

const ButtonCard = ({ icon, title, createUrl }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card} id = "card">
			<CardActionArea className={classes.content} href={createUrl}>
				<CardContent>
					<Icon iconName={icon} title={title} />
					<Typography
						align="center"
						fontFamily='Montserrat'
						gutterBottom
						variant="h6"
						component="h2"
						id = "texto"
					>
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

ButtonCard.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createUrl: PropTypes.string.isRequired,
};

export default ButtonCard;
