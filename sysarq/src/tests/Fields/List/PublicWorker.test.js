import React from "react";
import { render, screen } from "@testing-library/react";

import PublicWorker from "../../../pages/Fields/List/PublicWorker";

describe("Main component", () => {
	it("Title", () => {
		render(<PublicWorker />);

		expect(screen.getByText("Servidor")).toBeInTheDocument();
	});
});
