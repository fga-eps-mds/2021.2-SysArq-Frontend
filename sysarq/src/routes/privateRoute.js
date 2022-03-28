import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../pages/components/Header";
import Footer from "../pages/components/Footer";
import { userTypeMap, logout } from "../support";

const PrivateRoute = ({ children, exact, path, permission }) => {
	if (localStorage.getItem("isLogged") === "true") {
		const securityLevel = userTypeMap[permission];

		if (
			userTypeMap[localStorage.getItem("user_type")] >= securityLevel ||
			true
		) {
			return (
				<Route exact={exact} path={path}>
					<Header />
					{children}
					<Footer />
				</Route>
			);
		}
	}

	logout();
	return <></>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
	exact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	permission: PropTypes.string,
};

PrivateRoute.defaultProps = {
	permission: "VI",
};

export default PrivateRoute;
