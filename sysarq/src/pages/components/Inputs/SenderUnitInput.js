import React from "react";
import PropTypes from "prop-types";

import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";

const SenderUnitInput = ({
	isDetailPage,
	senderUnitDetail,
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
			{isDetailPage ? (
				<TextField
					fullWidth
					variant="outlined"
					id="senderUnit"
					label="Unidade que Encaminhou"
					value={senderUnitDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<FormControl
					fullWidth
					variant="outlined"
					error={senderUnitHelperText !== ""}
				>
					<InputLabel id="select-senderUnit-label">
						Unidade que Encaminhou*
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-senderUnit-label"
						label="Unidade que Encaminhou*"
						id="select-senderUnit"
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
			)}
		</Grid>
	);
};

SenderUnitInput.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	senderUnitDetail: PropTypes.string.isRequired,
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	senderUnit: PropTypes.string.isRequired,
	units: PropTypes.arrayOf(PropTypes.string).isRequired,
	senderUnitHelperText: PropTypes.string.isRequired,
};

export default SenderUnitInput;
