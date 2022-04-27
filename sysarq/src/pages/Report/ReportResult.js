import React from "react";

import DataTable from "../components/DataTable";

export default function ReportResult() {
    const url = localStorage.getItem("url");
	return (
		<DataTable title="Relatório" url={url} />
	);
}
