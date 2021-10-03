import React from "react";
import ReactDOM from "react-dom";

import App from "../App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

test("renders with React.StrictMode, App and root div", () => {
	const root = document.createElement("div");

	root.id = "root";
	document.body.appendChild(root);

	require("../index.js");

	expect(ReactDOM.render).toHaveBeenCalledWith(<App />, root);
});
