import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";

import { Alert, AlertTitle } from "@material-ui/lab";

const PopUpAlert = ({ open, handleClose, severity, helperText }) => {
	const createTitle = () => {
		if (severity === "error") {
			return "Erro";
		}
		if (severity === "success") {
			return "Success";
		}
		return "Aviso";
	}

	return (
		<Snackbar
			style={{ textAlign: "left" }}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			open={open}
			autoHideDuration={10000}
			onClose={handleClose}
		>
			<Alert variant="filled" onClose={handleClose} severity={severity}>
				<AlertTitle>{createTitle()}</AlertTitle>
				{helperText}
			</Alert>
		</Snackbar>
	);
}

PopUpAlert.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	severity: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
};

export default PopUpAlert;
