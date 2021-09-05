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

const headCellsUnity = [
	{
		id: "name_of_unity",
		numeric: false,
		padding: "normal",
		label: "Nome da Unidade",
	},

	{
		id: "unity_abbreviation",
		numeric: false,
		padding: "normal",
		label: "Sigla da Unidade",
	},

	{
		id: "administrative_bond",
		numeric: false,
		padding: "normal",
		label: "Vínculo Administrativo",
	},

	{
		id: "bond_abbreviation",
		numeric: false,
		padding: "normal",
		label: "Sigla do Vínculo",
	},

	{
		id: "type_of_unity",
		numeric: false,
		padding: "normal",
		label: "Tipo de Unidade",
	},

	{
		id: "municipality",
		numeric: false,
		padding: "normal",
		label: "Município",
	},

	{
		id: "telephone_number",
		numeric: true,
		padding: "normal",
		label: "Telefone",
	},

	{
		id: "note",
		numeric: false,
		padding: "normal",
		label: "Observações",
	},
];

const headCellsDocumentType = [
	{
		id: "document_name",
		numeric: false,
		padding: "normal",
		label: "Nome do Documento",
	},

	{
		id: "temporality",
		numeric: true,
		padding: "normal",
		label: "Temporalidade",
	},
];

const headCellsShelf = [
	{
		id: "number",
		numeric: true,
		padding: "normal",
		label: "Estante"
	},

	{
		id: "number",
		numeric: true,
		padding: "normal",
		label: "Prateleira"
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
	} else if (url === "unity/") {
		headCells = headCellsUnity;
	} else if (url === "document_type/") {
		headCells = headCellsDocumentType;
	} else if (url === "shelf/") {
		headCells = headCellsShelf;
	}
	return headCells;
};

export default tableHeadCells;
