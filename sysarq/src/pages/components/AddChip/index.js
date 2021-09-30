import React from "react";
import PropTypes from "prop-types";

import Chip from "@material-ui/core/Chip";

import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddChip = ({ label, onClick }) => (
	<Chip
		label={label}
		icon={<AddCircleIcon />}
		color="primary"
		onClick={onClick}
		clickable
	/>
);

AddChip.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default AddChip;
