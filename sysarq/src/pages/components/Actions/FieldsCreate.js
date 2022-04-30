import { Button, Box, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	box: {
		paddingTop: theme.spacing(4),
		display: "flex",
		height: "100%",
		width: "30%",
		justifyContent: "space-between",
		alignItems: "center",
	},
}));

const FieldsCreate = ({ onSubmit, clearFunc }) => {
	const classes = useStyles();

	return (
		<Box className={`${classes.box}`}>
			<Button variant="outlined" onClick={clearFunc}>
				LIMPAR
			</Button>
			<Button
				style={{ fontWeight: "bold" }}
				variant="contained"
				color="primary"
				onClick={onSubmit}
			>
				CADASTRAR
			</Button>
		</Box>
	);
};

FieldsCreate.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	clearFunc: PropTypes.func.isRequired,
};

export default FieldsCreate;
