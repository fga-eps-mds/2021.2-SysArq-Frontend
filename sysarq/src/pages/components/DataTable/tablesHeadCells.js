const headCellsDocumentSubject = [
	{
		id: "subject_name",
		numeric: false,
		padding: "normal",
		label: "Nome do Assunto",
	},

	{
		id: "temporality",
		numeric: true,
		padding: "normal",
		label: "Temporalidade",
	},
];

const headCellsBoxAbbreviation = [
	{
		id: "number",
		numeric: true,
		padding: "normal",
		label: "Número",
	},

	{
		id: "abbreviation",
		numeric: false,
		padding: "normal",
		label: "Abreviação",
	},

	{
		id: "name",
		numeric: false,
		padding: "normal",
		label: "Nome",
	},

	{
		id: "year",
		numeric: true,
		padding: "normal",
		label: "Ano",
	},
];

const headCellsPublicWorker = [
	{
		id: "name",
		numeric: false,
		padding: "normal",
		label: "Nome",
	},

	{
		id: "cpf",
		numeric: false,
		padding: "normal",
		label: "CPF",
	},

	{
		id: "office",
		numeric: false,
		padding: "normal",
		label: "Cargo",
	},

	{
		id: "class_worker",
		numeric: false,
		padding: "normal",
		label: "Classe",
	},

	{
		id: "capacity",
		numeric: false,
		padding: "normal",
		label: "Lotação",
	},

	{
		id: "county",
		numeric: false,
		padding: "normal",
		label: "Município",
	},
];

const tableHeadCells = (url) => {
	let headCells = [];

	if (url === "document_subject/") {
		headCells = headCellsDocumentSubject;
	} else if (url === "box_abbreviation/") {
		headCells = headCellsBoxAbbreviation;
	} else if (url === "public_worker/") {
		headCells = headCellsPublicWorker;
	}
	return headCells;
};

export default tableHeadCells;
