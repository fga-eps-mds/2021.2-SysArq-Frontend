import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const NumberProcessInput = ({
	setHelperText,
	set,
	number,
	helperText,
	isDetailPage,
}) => {
	const handleChange = (event) => {
		setHelperText("");
		set(event.target.value);
	};

	return (
		<TextField
			fullWidth
			id="processNumber"
			label={isDetailPage ? "Número do Processo" : "Número do Processo*"}
			value={number}
			onChange={handleChange}
			error={helperText !== ""}
			helperText={helperText}
			inputProps={{ maxLength: 20, readOnly: isDetailPage }}
		/>
	);
};

NumberProcessInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	number: PropTypes.string.isRequired,
	helperText: PropTypes.string.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
};

export default NumberProcessInput;
