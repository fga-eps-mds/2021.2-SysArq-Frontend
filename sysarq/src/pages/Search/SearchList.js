import React from "react";
import { useParams } from "react-router-dom";

import DataTable from "../components/DataTable/index";
/**
 *
 * não mais utilizado, mas pode servir para uma possivel tela de pesquisa especializada no futuro
 *
 */
export default function SearchList() {
	let url = "";
	if (
		useParams().field === "is_filed" ||
		useParams().field === "is_eliminated"
	) {
		const isTrue = useParams().content === "true";
		url = `search/?filter={"${useParams().field}":${isTrue}}`;
	} else {
		url = `search/?filter=%7B%22${useParams().field}%22:%22${
			useParams().content
		}%22%7D`;
	}

	return <DataTable title="Resultado da Pesquisa" url={url} />;
}
