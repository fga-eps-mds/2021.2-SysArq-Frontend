import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import { KeyboardDatePicker } from "@material-ui/pickers";

const DocumentDateInput = ({
	isDetailPage,
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
		<>
			{isDetailPage ? (
				<TextField
					fullWidth
					id="documentDate"
					label="Data do Documento"
					value={
						documentDate
							? `${documentDate.substring(8, 10)}/${documentDate.substring(
									5,
									7
							  )}/${documentDate.substring(0, 4)}`
							: documentDate
					}
					inputProps={{ readOnly: true }}
				/>
			) : (
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
			)}
		</>
	);
};

DocumentDateInput.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	documentDate: PropTypes.instanceOf(Date).isRequired,
	helperText: PropTypes.string.isRequired,
};

export default DocumentDateInput;
