import React from "react";
import { render, screen } from "@testing-library/react";

import ArchivingRelation from "../pages/DocumentsRegister/ArchivingRelation";

describe("Main component", () => {
	it("Title", () => {
		render(<ArchivingRelation />);

		expect(screen.getByText("Relação de Arquivamento")).toBeInTheDocument();
	});
});
