import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import AutoComplete from "../AutoComplete";

const SenderUnitInput = ({
	setHelperText,
	set,
	senderUnit,
	units,
	senderUnitHelperText,
}) => {
	const handleChange = (event, newValue) => {
		setHelperText("");
		set(newValue);
	};

	return (
		<Grid item xs={12} sm={12} md={12}>
				<AutoComplete
					value={senderUnit}
					handleValueChange={handleChange}
					options={units}
					optionsLabel={(option) => `${option.unity_name}`}
					propertyCheck="unity_name"
					sortProperty="unity_name"
					label="Unidade que Encaminhou*"
					helperText={senderUnitHelperText}
				/>
		</Grid>
	);
};

SenderUnitInput.propTypes = {
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	senderUnit: PropTypes.string.isRequired,
	units: PropTypes.arrayOf(PropTypes.string).isRequired,
	senderUnitHelperText: PropTypes.string.isRequired,
};

export default SenderUnitInput;
