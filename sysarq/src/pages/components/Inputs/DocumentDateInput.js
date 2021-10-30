import React from "react";
import PropTypes from "prop-types";

import { KeyboardDatePicker } from "@material-ui/pickers";

const DocumentDateInput = ({
	setHelperText,
	set,
	documentDate,
	helperText,
}) => {
	const handleChange = (date) => {
		setHelperText("");
		set(date);
	};

	return (
		<KeyboardDatePicker
			style={{ width: "100%" }}
			id="document-date-picker-dialog"
			label="Data do Documento*"
			format="dd/MM/yyyy"
			value={documentDate}
			onChange={handleChange}
			okLabel="Confirmar"
			cancelLabel=""
			clearable
			clearLabel="Limpar"
			showTodayButton
			todayLabel="Hoje"
			KeyboardButtonProps={{
				"aria-label": "change document date",
			}}
			error={helperText !== ""}
			helperText={helperText}
		/>
	);
};

DocumentDateInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	documentDate: PropTypes.instanceOf(Date).isRequired,
	helperText: PropTypes.string.isRequired,
};

export default DocumentDateInput;
