import React from "react";
import PropTypes from "prop-types";

import {
	makeStyles,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@material-ui/core";

import SubjectIcon from "@material-ui/icons/Subject";
import AbbreviationIcon from "@material-ui/icons/LocalOffer";
import UnitIcon from "@material-ui/icons/HomeWork";
import DocumentTypeIcon from "@material-ui/icons/Class";
import ShelfRackIcon from "@material-ui/icons/GridOn";
import PublicWorkerIcon from "@material-ui/icons/Person";

import AdministrativeProcessIcon from "@material-ui/icons/Assignment";
import FrequencyRelationIcon from "@material-ui/icons/Description";
import FrequencySheetIcon from "@material-ui/icons/AccountBox";
import BoxArchivingIcon from "@material-ui/icons/AllInbox";

import CreateUser from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";

import "./styles.css";

const useStyles = makeStyles(() => ({
	icon: {
		height: 125,
		width: "100%",
	},
}));

const Icon = ({ iconName }) => {
	const classes = useStyles();

	let icon = "";

	if (iconName === "subject-icon") {
		icon = <SubjectIcon className={classes.icon} />;
	} else if (iconName === "abbreviation-icon") {
		icon = <AbbreviationIcon className={classes.icon} />;
	} else if (iconName === "unit-icon") {
		icon = <UnitIcon className={classes.icon} />;
	} else if (iconName === "document-type-icon") {
		icon = <DocumentTypeIcon className={classes.icon} />;
	} else if (iconName === "shelf-rack-icon") {
		icon = <ShelfRackIcon className={classes.icon} />;
	} else if (iconName === "public-worker-icon") {
		icon = <PublicWorkerIcon className={classes.icon} />;
	} else if (iconName === "administrative-process-icon") {
		icon = <AdministrativeProcessIcon className={classes.icon} />;
	} else if (iconName === "frequency-relation-icon") {
		icon = <FrequencyRelationIcon className={classes.icon} />;
	} else if (iconName === "frequency-sheet-icon") {
		icon = <FrequencySheetIcon className={classes.icon} />;
	} else if (iconName === "CreateUser") {
		icon = <CreateUser className={classes.icon} />;
	} else if (iconName === "Settings") {
		icon = <Settings className={classes.icon} />;
	} else {
		icon = <BoxArchivingIcon className={classes.icon} />;
	}

	return icon;
};

const MenuCard = ({ icon, title, url, lg }) => (
	<Grid item xs={12} sm={12} md={6} lg={lg}>
		<Card id="card">
			<CardActionArea id="card-action" href={url}>
				<CardContent>
					<Icon iconName={icon} />
					<Typography id="text">{title}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	</Grid>
);

MenuCard.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	lg: PropTypes.number.isRequired,
};

export default MenuCard;
