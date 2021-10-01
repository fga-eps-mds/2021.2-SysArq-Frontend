import React from "react";
import { useParams } from "react-router-dom";

import DataTable from "./components/DataTable/DataTable";

export default function SearchList() {
	const url = `search/?filter=%7B%22${useParams().field}%22:%22${
		useParams().content
	}%22%7D`;
	return <DataTable title="Resultado da Pesquisa" url={url} />;
}
