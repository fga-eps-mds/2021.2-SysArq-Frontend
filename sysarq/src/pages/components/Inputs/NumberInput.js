import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const NumberInput = ({ setHelperText, set, number, helperText }) => {
	const handleChange = (event) => {
		setHelperText("");
		set(event.target.value);
	};

	return (
		<TextField
			fullWidth
			id="number"
			label="Número*"
			value={number}
			onChange={handleChange}
			error={helperText !== ""}
			helperText={helperText}
			inputProps={{ maxLength: 20 }}
		/>
	);
};

NumberInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	number: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
};

export default NumberInput;
