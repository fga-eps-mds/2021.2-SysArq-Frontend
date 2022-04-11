import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import { KeyboardDatePicker } from "@material-ui/pickers";

const ReceivedDateInput = ({
	isDetailPage,
	setHelperText,
	set,
	receivedDate,
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
					variant="outlined"
					id="receivedDate"
					label="Data do Recebimento"
					value={
						receivedDate
							? `${receivedDate.substring(8, 10)}/${receivedDate.substring(
									5,
									7
							  )}/${receivedDate.substring(0, 4)}`
							: receivedDate
					}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<KeyboardDatePicker
					style={{ width: "100%" }}
					inputVariant="outlined"
					id="received-date-picker-dialog"
					label="Data de Recebimento*"
					format="dd/MM/yyyy"
					value={receivedDate}
					onChange={handleChange}
					okLabel="Confirmar"
					cancelLabel=""
					clearable
					clearLabel="Limpar"
					showTodayButton
					todayLabel="Hoje"
					KeyboardButtonProps={{
						"aria-label": "change received date",
					}}
					error={helperText !== ""}
					helperText={helperText}
				/>
			)}
		</>
	);
};

ReceivedDateInput.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	receivedDate: PropTypes.instanceOf(Date).isRequired,
	helperText: PropTypes.string.isRequired,
};

export default ReceivedDateInput;
