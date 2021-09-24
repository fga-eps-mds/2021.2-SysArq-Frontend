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

const boxAbbreviationHeadCells = [
	{
		id: "number",
		numeric: true,
		label: "Número",
	},

	{
		id: "abbreviation",
		numeric: false,
		label: "Abreviação",
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
		id: "type_of_unity",
		numeric: false,
		label: "Tipo de Unidade",
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
		id: "shelfe_number",
		numeric: true,
		label: "Estante",
	},

	{
		id: "shelfp_number",
		numeric: true,
		label: "Prateleira",
	},
];

const statusHeadCells = [
	{
		id: "filed",
		numeric: false,
		label: "Arquivado",
	},

	{
		id: "sent_from",
		numeric: false,
		label: "Unidade que Encaminhou",
	},

	{
		id: "requested_document",
		numeric: false,
		label: "Documento Solicitado",
	},

	{
		id: "send_date",
		numeric: true,
		label: "Data de Envio",
	},
];

const tableHeadCells = (url) => {
	let headCells = [];

	if (url === "document-subject/") {
		headCells = documentSubjectHeadCells;
	} else if (url === "box-abbreviation/") {
		headCells = boxAbbreviationHeadCells;
	} else if (url === "unity/") {
		headCells = unityHeadCells;
	} else if (url === "document-type/") {
		headCells = documentTypeHeadCells;
	} else if (url === "shelf/") {
		headCells = shelfHeadCells;
	} else if (url === "status/") {
		headCells = statusHeadCells;
	}
	return headCells;
};

export default tableHeadCells;
