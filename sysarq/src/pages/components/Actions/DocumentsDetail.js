/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

import { makeStyles, Box, Button } from "@material-ui/core";
import { axiosArchives } from "../../../Api.js";

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

const DocumentsDetail = ({ data }) => {
	const classes = useStyles();

	console.log(data?.config?.url.split("/")[0]);

	const handleDelete = () => {
		axiosArchives
			.delete(data.config.url, {
				headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
			})
			.then(() => history.back())
			.catch(console.log);
	};

	return (
		<Box className={`${classes.spreadBox} ${classes.box}`}>
			<Button
				style={{ marginRight: "1%", fontWeight: "bold", color: "#fe0000" }}
				variant="outlined"
				color="inherit"
				size="small"
				onClick={() => handleDelete()}
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

DocumentsDetail.propTypes = { data: PropTypes.instanceOf(Object) };

export default DocumentsDetail;
