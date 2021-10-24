const headCellsSearch = () => {
	const idList = [
		"process_number",
		"Número do processo",
		"shelf_number",
		"Estante",
		"rack_number",
		"Prateleira",
		"abbreviation_name",
		"Caixa",
		"is_filed",
		"Arquivado",
		"is_eliminated",
		"Eliminado",
	];

	const headCellsSearchList = [];

	for (let i = 0; i < idList.length; i += 2) {
		headCellsSearchList.push({
			id: idList[i],
			numeric: false,
			label: idList[i + 1],
		});
	}

	return headCellsSearchList;
};

const documentSubjectHeadCells = [
	{
		id: "subject_name",
		numeric: false,
		label: "Nome do Assunto",
	},

	{
		id: "temporality",
		numeric: false,
		label: "Temporalidade",
	},
];

const unityHeadCells = [
	{
		id: "unity_name",
		numeric: false,
		label: "Nome da Unidade",
	},

	{
		id: "unity_abbreviation",
		numeric: false,
		label: "Sigla da Unidade",
	},

	{
		id: "administrative_bond",
		numeric: false,
		label: "Vínculo Administrativo",
	},

	{
		id: "bond_abbreviation",
		numeric: false,
		label: "Sigla do Vínculo",
	},

	{
		id: "municipality",
		numeric: false,
		label: "Município",
	},

	{
		id: "telephone_number",
		numeric: true,
		label: "Telefone",
	},

	{
		id: "notes",
		numeric: false,
		label: "Observações",
	},
];

const headCellsBoxAbbreviation = [
	{
		id: "number",
		numeric: true,
		label: "Número",
	},

	{
		id: "abbreviation",
		numeric: false,
		label: "Sigla",
	},

	{
		id: "name",
		numeric: false,
		label: "Nome",
	},

	{
		id: "year",
		numeric: true,
		label: "Ano",
	},
];

const documentTypeHeadCells = [
	{
		id: "document_name",
		numeric: false,
		label: "Nome do Documento",
	},

	{
		id: "temporality",
		numeric: false,
		label: "Temporalidade",
	},
];

const shelfHeadCells = [
	{
		id: "number",
		numeric: true,
		label: "Número de Estante",
	},
];

const rackHeadCells = [
	{
		id: "number",
		numeric: true,
		label: "Número de Prateleira",
	},
];

const publicWorkerHeadCells = [
	{
		id: "name",
		numeric: false,
		label: "Nome",
	},

	{
		id: "cpf",
		numeric: false,
		label: "CPF",
	},

	{
		id: "role",
		numeric: false,
		label: "Cargo",
	},

	{
		id: "category",
		numeric: false,
		label: "Classe",
	},

	{
		id: "workplace",
		numeric: false,
		label: "Unidade",
	},

	{
		id: "municipal_area",
		numeric: false,
		label: "Municipio",
	},
];

const tableHeadCells = (url) => {
	let headCells = [];

	if (url === "document-subject/") {
		headCells = documentSubjectHeadCells;
	} else if (url === "unity/") {
		headCells = unityHeadCells;
	} else if (url === "box-abbreviation/") {
		headCells = headCellsBoxAbbreviation;
	} else if (url === "document-type/") {
		headCells = documentTypeHeadCells;
	} else if (url === "shelf/") {
		headCells = shelfHeadCells;
	} else if (url === "rack/") {
		headCells = rackHeadCells;
	} else if (url === "public-worker/") {
		headCells = publicWorkerHeadCells;
	} else if (url && url.includes("search")) {
		headCells = headCellsSearch();
	}
	return headCells;
};

export default tableHeadCells;
