import React from "react";
import PropTypes from "prop-types";

import Chip from "@material-ui/core/Chip";

import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddChip = ({ onClick }) => (
	<Chip
		label="Adicionar"
		icon={<AddCircleIcon />}
		color="primary"
		onClick={onClick}
		clickable
	/>
);

AddChip.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default AddChip;
