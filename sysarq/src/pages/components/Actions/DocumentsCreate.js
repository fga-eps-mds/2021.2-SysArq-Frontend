import React from "react";
import PropTypes from "prop-types";

import {
	makeStyles,
	withStyles,
	Box,
	Typography,
	CircularProgress,
	Button,
} from "@material-ui/core";

import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	box: {
		paddingTop: theme.spacing(4),

		display: "flex",
		height: "100%",
		width: "100%",
	},

	spreadBox: {
		justifyContent: "space-around",
		alignItems: "center",
	},

	link: {
		fontWeight: "bold",
		color: "#5389b5",
	},
}));

const Link = withStyles({
	root: {
		"&:hover": {
			color: "#fe0000",
		},
	},
})(MuiLink);

const DocumentsCreate = ({ isDetailPage, loading, onSubmit }) => {
	const classes = useStyles();

	return (
		<Box className={`${classes.spreadBox} ${classes.box}`}>
			{isDetailPage ? (
				""
			) : (
				<>
					<Typography>
						<Link className={classes.link} href="/documents">
							Cancelar
						</Link>
					</Typography>
					{loading ? (
						<CircularProgress />
					) : (
						<Button
							style={{ fontWeight: "bold" }}
							variant="contained"
							color="primary"
							onClick={onSubmit}
						>
							CADASTRAR
						</Button>
					)}
				</>
			)}
		</Box>
	);
};

DocumentsCreate.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default DocumentsCreate;
