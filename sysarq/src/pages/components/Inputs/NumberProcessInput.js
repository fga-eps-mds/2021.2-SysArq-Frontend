import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const NumberProcessInput = ({ setHelperText, set, number, helperText, isDisabled }) => {
	const handleChange = (event) => {
		setHelperText("");
		set(event.target.value);
	};

	return (
		<TextField
			fullWidth
			id="processNumber"
			label="Número do Processo*"
			value={number}
			onChange={handleChange}
			error={helperText !== ""}
			helperText={helperText}
			inputProps={{ maxLength: 20 }}
			disabled={isDisabled}
		/>
	);
};

NumberProcessInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	number: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
	isDisabled: PropTypes.string.isRequired,
};

export default NumberProcessInput;
