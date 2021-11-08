import React from "react";
import { render, screen } from "@testing-library/react";

import Footer from "../pages/components/Footer";

describe("Main component", () => {
	it("Title", () => {
		render(<Footer />);
	});
});
