import React from "react";
// import PropTypes from "prop-types";

import { makeStyles, Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	box: {
		paddingBottom: theme.spacing(3),

		display: "flex",
		height: "100%",
		width: "100%",
	},

	spreadBox: {
		justifyContent: "right",
		alignItems: "center",
	},
}));

const DocumentsDetail = () => {
	const classes = useStyles();

	return (
		<Box className={`${classes.spreadBox} ${classes.box}`}>
			<Button
				style={{ marginRight: "1%", fontWeight: "bold", color: "#fe0000" }}
				variant="outlined"
				color="inherit"
				size="small"
			>
				Excluir
			</Button>
			<Button
				style={{ fontWeight: "bold" }}
				variant="outlined"
				color="secondary"
				size="small"
			>
				Editar
			</Button>
		</Box>
	);
};

DocumentsDetail.propTypes = {};

export default DocumentsDetail;
