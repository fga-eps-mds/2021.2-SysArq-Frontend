import React from "react";
import PropTypes from "prop-types";

import { KeyboardDatePicker } from "@material-ui/pickers";

const ReceivedDateInput = ({
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
		<KeyboardDatePicker
			style={{ width: "100%" }}
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
	);
};

ReceivedDateInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	receivedDate: PropTypes.instanceOf(Date).isRequired,
	helperText: PropTypes.string.isRequired,
};

export default ReceivedDateInput;
