import React from "react";
import PropTypes from "prop-types";

import { Grid, TextField } from "@material-ui/core";

const NotesInput = ({ set, notes }) => {
	const handleChange = (event) => set(event.target.value);

	return (
		<Grid item xs={12} sm={12} md={12}>
			<TextField
				fullWidth
				id="notes"
				label="Observação"
				value={notes}
				onChange={handleChange}
				inputProps={{ maxLength: 300 }}
				multiline
			/>
		</Grid>
	);
};

NotesInput.propTypes = {
	set: PropTypes.func.isRequired,
	notes: PropTypes.string.isRequired,
};

export default NotesInput;
