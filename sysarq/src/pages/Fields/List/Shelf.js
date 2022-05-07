import React from "react";

import DataTable from "../../components/DataTable";

export default function Shelf() {
	return (
		<div
			style={{
				display: "flex",
				marginLeft: "10px",
				marginRight: "10px",
				marginBottom: "100px",
			}}
		>
			<DataTable title="Estante" url="shelf/" />
			<div style={{ width: "25px" }} />
			<DataTable title="Prateleira" url="rack/" />
			<div style={{ width: "25px" }} />
			<DataTable title="Localidade" url="file-location/" />
		</div>
	);
}
