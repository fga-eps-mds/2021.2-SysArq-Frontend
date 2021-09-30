import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, exact, path }) => {
	if (localStorage.getItem("isLogged") === "true") {
		return (
			<Route exact={exact} path={path}>
				{children}
			</Route>
		);
	}

	localStorage.removeItem("tk");
	localStorage.removeItem("tkr");
	localStorage.removeItem("isLogged");

	window.location = "/login";

	return <></>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
	exact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
};

export default PrivateRoute;
