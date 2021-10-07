import React from "react";
import { useParams } from "react-router-dom";

import DataTable from "./components/DataTable/index";

export default function SearchList() {
	let url = '';
	if (useParams().field === 'is_filed') {
		const isTrue = (useParams().content === 'true')
		url = `search/?filter={"is_filed":${isTrue}}`;
	}
	else if(useParams().field === 'is_eliminated'){
		url = `search/?filter={"is_eliminated":${true}}`;
	}

	else {
		url = `search/?filter=%7B%22${useParams().field}%22:%22${
			useParams().content
			}%22%7D`;
	}

	return <DataTable title="Resultado da Pesquisa" url={url} />;
}
