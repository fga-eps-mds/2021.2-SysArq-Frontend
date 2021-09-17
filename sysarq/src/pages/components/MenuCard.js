import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SubjectIcon from "@material-ui/icons/Subject";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DescriptionIcon from "@material-ui/icons/Description";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ArchiveIcon from "@material-ui/icons/Archive";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const useStyles = makeStyles(() => ({
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},

	icon: {
		height: 125,
		color: "#074f66",
		width: "100%",
		alignSelf: "center",
	},

	button: {
		width: "100%",
		alignItems: "center",
		alignSelf: "end",
		color: "#5289B5",
	},

	content: {
		flexGrow: 1,
	},
}));

const Icon = ({ iconName }) => {
	const classes = useStyles();

	let icon = "";

	if (iconName === "icone-assunto") {
		icon = <SubjectIcon className={classes.icon} />;
	} else if (iconName === "icone-sigla-da-caixa") {
		icon = <LocalOfferIcon className={classes.icon} />;
	} else if (iconName === "icone-servidor") {
		icon = <PersonOutlineIcon className={classes.icon} />;
	} else if (iconName === "icone-unidade") {
		icon = <HomeWorkIcon className={classes.icon} />;
	} else if (iconName === "icone-tipo-de-documento") {
		icon = <DescriptionIcon className={classes.icon} />;
	} else if (iconName === "icone-status") {
		icon = <ArchiveIcon className={classes.icon} />;
	} else if (iconName === "icone-estante-prateleira") {
		icon = <AllInboxIcon className={classes.icon} />;
	}

	return icon;
};

const MenuCard = ({ icon, title, createUrl, listUrl }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardActionArea className={classes.content} href={listUrl}>
				<CardContent>
					<Icon iconName={icon} title={title} />
					<Typography
						align="center"
						fontFamily="Montserrat"
						gutterBottom
						variant="h6"
						component="h2"
					>
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					data-testid="click-criar"
					className={classes.button}
					href={createUrl}
					size="small"
					color="primary"
				>
					Criar
				</Button>
				<Button
					data-testid="click-listar"
					className={classes.button}
					href={listUrl}
					size="small"
					color="primary"
				>
					Listar
				</Button>
			</CardActions>
		</Card>
	);
};

MenuCard.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createUrl: PropTypes.string.isRequired,
	listUrl: PropTypes.string.isRequired,
};

export default MenuCard;
