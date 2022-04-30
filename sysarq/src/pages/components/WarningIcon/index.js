import { useState } from "react";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { Popover, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: "none",
	},
	popoverContent: {
		padding: theme.spacing(1),
	},
}));

const WarningIcon = ({ text }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(undefined);
	};

	return (
		<>
			<ReportProblemOutlinedIcon
				aria-owns={anchorEl ? "warning-popover" : undefined}
				aria-haspopup="true"
				color="primary"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>
			<Popover
				id="warning-popover"
				className={classes.popover}
				classes={{
					paper: classes.popoverContent,
				}}
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				onClose={handlePopoverClose}
				disableRestoreFocuse
			>
				<Typography>{text}</Typography>
			</Popover>
		</>
	);
};

WarningIcon.propTypes = {
	text: PropTypes.string.isRequired,
};

export default WarningIcon;
