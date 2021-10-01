import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import SearchList from "../pages/SearchList";

describe("Main component", () => {
	it("Title", () => {
		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<SearchList />
			</Router>
		);
	});
});
