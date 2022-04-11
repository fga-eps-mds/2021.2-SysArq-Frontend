const headCellsSearch = () => {
	const idList = [
		"process_number",
		"Número do processo",
		"interested",
		"Interessado",
		"sender_user_name",
		"Servidor que encaminhou",
		"person_name",
		"Servidor",
		"cpf",
		"CPF",
		"document_subject_name",
		"Assunto do documento",
		"document_name_name",
		"Tipo do documento",
		"sender_unity_name",
		"Unidade que encaminhou",
		"shelf_number",
		"Estante",
		"rack_number",
		"Prateleira",
		"fileLocation_number",
		"Localidade",
		"abbreviation_name",
		"Sigla da Caixa",
		"is_filed",
		"Arquivado",
		"is_eliminated",
		"Eliminado",
		"temporality_date",
		"Temporalidade",
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
		id: "name",
		numeric: false,
		label: "Nome",
	},

	{
		id: "abbreviation",
		numeric: false,
		label: "Sigla",
	},
];

const documentNameHeadCells = [
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

const fileLocationHeadCells = [
	{
		id: "file",
		numeric: false,
		label: "Localidade do Arquivo",
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
];

const administrativeProcessHeadCells = [
	{
		id: "process_number",
		numeric: false,
		label: "Número do Processo",
	},
	{
		id: "notice_date",
		numeric: false,
		label: "Data de Autuação",
	},
	{
		id: "interested",
		numeric: false,
		label: "Interessado",
	},
	{
		id: "document_subject_name",
		numeric: false,
		label: "Assunto do Documento",
	},
];

const frequencyRelationHeadCells = [
	{
		id: "process_number",
		numeric: false,
		label: "Número do Processo",
	},
	{
		id: "received_date",
		numeric: false,
		label: "Data de Recebimento",
	},
	{
		id: "document_name_name",
		numeric: false,
		label: "Nome do Documento",
	},
];

const frequencySheetHeadCells = [
	{
		id: "person_name",
		numeric: false,
		label: "Servidor",
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
		id: "reference_period",
		numeric: false,
		label: "Período de Frequência",
	},
];

const boxArchivingHeadCells = [
	{
		id: "process_number",
		numeric: false,
		label: "Número do Processo",
	},
	{
		id: "received_date",
		numeric: false,
		label: "Data de Recebimento",
	},
	{
		id: "sender_unity_name",
		numeric: false,
		label: "Unidade que Encaminhou",
	},
	{
		id: "document_name_name",
		numeric: false,
		label: "Nome do Documento",
	},
];

const tableHeadCells = (url) => {
	let headCells = [];
	if (url === "unity/") {
		headCells = unityHeadCells;
	} else if (url === "box-abbreviation/") {
		headCells = headCellsBoxAbbreviation;
	} else if (url === "document-name/") {
		headCells = documentNameHeadCells;
	} else if (url === "shelf/") {
		headCells = shelfHeadCells;
	} else if (url === "rack/") {
		headCells = rackHeadCells;
	} else if (url === "file-location/") {
		headCells = fileLocationHeadCells;
	} else if (url === "public-worker/") {
		headCells = publicWorkerHeadCells;
	} else if (url === "administrative-process/") {
		headCells = administrativeProcessHeadCells;
	} else if (url === "frequency-relation/") {
		headCells = frequencyRelationHeadCells;
	} else if (url === "frequency-sheet/") {
		headCells = frequencySheetHeadCells;
	} else if (url === "box-archiving/") {
		headCells = boxArchivingHeadCells;
	} else if (url && url.includes("search")) {
		headCells = headCellsSearch();
	}

	return headCells;
};

export default tableHeadCells;
