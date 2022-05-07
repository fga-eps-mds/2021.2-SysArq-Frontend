import React from "react";
import PropTypes from "prop-types";

import { Grid, TextField } from "@material-ui/core";

const BoxesNotesInput = ({ set, boxnotes, isDetailPage }) => {
	const handleChange = (event) => set(event.target.value);

	return (
		<Grid item xs={12} sm={12} md={12}>
			<TextField
				fullWidth
				variant="outlined"
				id="boxnotes"
				label="Observação da caixa"
				value={boxnotes}
				onChange={handleChange}
				inputProps={{ maxLength: 300, readOnly: isDetailPage }}
				multiline
			/>
		</Grid>
	);
};

BoxesNotesInput.propTypes = {
	set: PropTypes.func.isRequired,
	boxnotes: PropTypes.string.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
};

export default BoxesNotesInput;
