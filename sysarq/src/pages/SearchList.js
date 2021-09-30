import React from "react";

import DataTable from "./components/DataTable/DataTable";

export default function SearchList(filter, filterValue) {
    const string = `search?filter=%7B%22${filter}%22:%22${filterValue}%22%7D`

	return <DataTable title="Resultado da pesquisa" url={string} />;
}
