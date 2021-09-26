import React from "react";
import PropTypes from "prop-types";

import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";

const SenderUnitInput = ({
	setHelperText,
	set,
	senderUnit,
	units,
	senderUnitHelperText,
}) => {
	const handleChange = (event) => {
		setHelperText("");
		set(event.target.value);
	};

	return (
		<Grid item xs={12} sm={12} md={12}>
			<FormControl fullWidth error={senderUnitHelperText !== ""}>
				<InputLabel id="select-abbreviation-label">
					Unidade que Encaminhou*
				</InputLabel>
				<Select
					style={{ textAlign: "left" }}
					labelId="select-abbreviation-label"
					id="select-abbreviation"
					value={senderUnit}
					onChange={handleChange}
					renderValue={(value) => `${value.unity_name}`}
				>
					<MenuItem key={0} value="">
						<em>Nenhuma</em>
					</MenuItem>

					{units.map((senderUnitOption) => (
						<MenuItem key={senderUnitOption.id} value={senderUnitOption}>
							{senderUnitOption.unity_name}
						</MenuItem>
					))}
				</Select>
				{senderUnitHelperText ? (
					<FormHelperText>{senderUnitHelperText}</FormHelperText>
				) : (
					""
				)}
			</FormControl>
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
