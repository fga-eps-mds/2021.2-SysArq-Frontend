import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";

import { Alert, AlertTitle } from "@material-ui/lab";

const PopUpAlert = ({ open, handleClose, severity, helperText }) => (
	<Snackbar
		style={{ textAlign: "left" }}
		anchorOrigin={{ vertical: "top", horizontal: "right" }}
		open={open}
		autoHideDuration={10000}
		onClose={handleClose}
	>
		<Alert variant="filled" onClose={handleClose} severity={severity}>
			<AlertTitle>{severity === "error" ? "Erro" : "Sucesso"}</AlertTitle>
			{helperText}
		</Alert>
	</Snackbar>
);

PopUpAlert.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	severity: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
};

export default PopUpAlert;
