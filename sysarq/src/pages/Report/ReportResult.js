import React, { useState, useEffect } from "react";
import {
	pdf,
	PDFDownloadLink,
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { saveAs } from "file-saver";
import { makeStyles } from "@material-ui/core";
import { maskBr } from "js-brasil";
import DataTable from "../components/DataTable";
import tableHeadCells from "../components/DataTable/tablesHeadCells";
import CardContainer from "../components/Container/CardContainer";
import { axiosProfile, axiosArchives } from "../../Api";
import {
	axiosProfileError,
	getPublicWorkers,
	autocompl,
	formatDate,
	getUniqueFieldValues,
} from "../../support";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
	},
	body: {},
	row: {
		flexDirection: "row",
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 20,
		justifyContent: "space-between",
	},
	logo1: {
		margin: 20,
		width: 60,
		height: 80.3,
	},
	logo2: {
		marginTop: 30,
		width: 60,
		height: 72.5,
	},
	header: {
		justifyContent: "center",
		margin: 50,
		marginLeft: 0,
	},
	title: {
		flexDirection: "row",
		// paddingLeft: '20%'
		justifyContent: "center",
	},
	text: {
		// width: '50%',
		textAlign: "center",
		justifyContent: "center",
		fontSize: 10,
	},
	table: {
		margin: 30,
	},
	rodape: {
		position: "absolute",
		fontSize: 10,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
});

const useStyles = makeStyles((theme) => ({
	title: {
		paddingTop: theme.spacing(4),
		color: "#5289B5",
		fontSize: "30px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	container: {
		marginTop: theme.spacing(6),
		alignContents: "center",
		textAlign: "center",
		marginBottom: theme.spacing(6),
	},
	input: {
		textAlign: "center",
		minWidth: "300px",
		width: "50%",
	},
	paper: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	sectionTitle: {
		width: "100%",
		textAlign: "left",
		color: "#1f3541",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
	button: {
		marginTop: "25px",
		marginBottom: "25px",
		padding: "1rem",
		border: "0",
		outline: "0",
		color: "#F6F6F6",
		fontWeight: "500",
		background: "#5289B5",
		fontSize: "1rem",
		letterSpacing: "1.25px",
		borderRadius: "4px",
		transition: "filter 0.4s",
		height: "50px",

		"&:hover": {
			filter: "brightness(0.9)",
		},
	},
}));

export default function ReportResult() {
	const url = localStorage.getItem("url");
	const classes = useStyles();

	const currentDay = new Date().toLocaleString("pt-BR", { day: "2-digit" });
	const currentMonth = new Date().toLocaleString("pt-BR", { month: "2-digit" });
	const currentYear = new Date().getFullYear();

	const [reportData, setReportData] = useState(null);

	const [openAlert, setOpenAlert] = useState(false);
	const [alertHelperText, setAlertHelperText] = useState("");
	const [severityAlert, setSeverityAlert] = useState("error");

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const connectionError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const handleRequestError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");
		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const formatDocumentDate = (date) => {
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);
		return `${day}/${month}/${year}`;
	};

	const getDocumentDate = (data) => {
		if (data.archiving_date) {
			return data.archiving_date;
		}
		if (data.received_date) {
			return data.received_date;
		}
		return data.reference_period;
	};

	const getTemporality = (data) => {
		if (data.temporality_date >= 9999) {
			return "Permanente";
		}
		return data.temporality_date ? data.temporality_date : "-";
	};

	const getTemporalityDate = (data) => {
		if (data.temporality_date >= 9999) {
			return "Permanente";
		}
		if (!data.temporality_date) {
			return "Indefinido";
		}
		let date = getDocumentDate(data);
		date = `${data.temporality_date}${date.substring(4)}`;
		const day = date.substring(8, 10);
		const month = date.substring(5, 7);
		const year = date.substring(0, 4);
		return `${day}/${month}/${year}`;
	};

	const getReportTitle = () => {
		const prefix = url.split("/")[0];
		let title = "";
		switch (prefix) {
			case "report":
				title = "Relatório de Temporalidade";
				break;
			case "document-name":
				title = "Relatório de Assuntos cadastrados";
				break;
			case "public-worker":
				title = "Relatório de Servidores cadastrados";
				break;
			case "unity":
				title = "Relatório de Unidades cadastradas";
				break;
			case "box-archiving-report":
				title = "Relatório de Caixas cadastradas";
				break;
			case "administrative-process-report":
				title = "Relatório de Processos Administrativos";
				break;
			case "frequency-relation-report":
				title = "Relatório de Relações de Frequência";
				break;
			case "frequency-sheet-report/":
				title = "Relatório de Folhas de Frequência";
				break;
			case "status-report/":
				title = "Relatório de Status";
				break;
			default:
				title = "Relatório";
		}

		return title;
	};

	const cellContent = (row, id) => {
		const monthMap = {
			"01": "jan",
			"02": "fev",
			"03": "mar",
			"04": "abr",
			"05": "mai",
			"06": "jun",
			"07": "jul",
			"08": "ago",
			"09": "set",
			10: "out",
			11: "nov",
			12: "dez",
		};

		if (id === "cpf") {
			return maskBr.cpf(row[id]);
		}

		if (id === "is_filed") {
			if (row[id] === true) {
				return "Sim";
			}
			return "Não";
		}
		if (id === "is_eliminated") {
			if (row[id] === true) {
				return "Sim";
			}
			return "Não";
		}

		if (id === "document_name") {
			if (row.document_name_name) {
				return row.document_name_name;
			}
			return row[id];
		}

		if (id === "box_number") {
			return row.origin_box.number;
		}

		if (id === "status") {
			if (cellContent(row, "is_eliminated") === "Sim") {
				return "Eliminado";
			}
			if (cellContent(row, "is_filed") === "Não") {
				return "Desarquivado";
			}
			return "Arquivado";
		}

		if (
			id === "notice_date" ||
			id === "received_date" ||
			id === "document_date"
		) {
			const date = id === "document_date" ? getDocumentDate(row) : row[id];
			const day = date.substring(8, 10);
			const month = date.substring(5, 7);
			const year = date.substring(0, 4);
			return `${day}/${month}/${year}`;
		}

		if (id === "reference_period") {
			let formated = "";
			if (Array.isArray(row[id])) {
				Object.values(row[id]).forEach((e) => {
					const month = e.substring(5);
					const year = e.substring(0, 4);
					formated += `${month}/${year} `;
				});

				return formated;
			}
			const month = row[id].substring(5, 7);
			const year = row[id].substring(0, 4);
			return `${monthMap[month]}/${year}`;
		}

		if (id === "temporality") {
			if (row[id] === 9999) {
				return "Permanente";
			}

			return row[id];
		}

		if (id === "temporality_date") {
			if (row[id] >= 9999) {
				return "Permanente";
			}

			if (!row[id]) {
				return "Indefinido";
			}

			let date = getDocumentDate(row);
			date = `${row[id]}${date.substring(4)}`;
			const day = date.substring(8, 10);
			const month = date.substring(5, 7);
			const year = date.substring(0, 4);
			return `${day}/${month}/${year}`;
		}

		if (id === "temporality_year") {
			if (!row.temporality_date) {
				return "Indefinida";
			}
			const date = getDocumentDate(row);
			let temporality = parseInt(row.temporality_date, 10);
			if (temporality >= 9999) {
				return "Permanente";
			}
			const year = parseInt(date.substring(0, 4), 10);
			temporality -= year;
			return temporality;
		}

		if (id === "temporality_date" || id === "document_type_name") {
			if (typeof row[id] === "undefined") return "-";
			if (typeof row[id] !== "object") return row[id];
			const obj = row[id];
			for (let i = 0; i < obj.length; i += 1) {
				if (i < obj.length - 1) {
					obj[i] = `${obj[i]} `;
				}
			}
			return obj;
		}

		if (typeof row[id] === "undefined" || row[id] === null || row[id] === "")
			return "-";

		return row[id];
	};

	const genTable = () => {
		const labels = tableHeadCells(url);

		return (
			<View style={styles.table}>
				<Table data={reportData}>
					<TableHeader>
						{labels.map((row, i) => (
							<TableCell style={{ textAlign: "center" }}>
								<Text style={{ fontSize: 12 }}>
									{" "}
									{row.label.split(" ").join("\n")}{" "}
								</Text>
							</TableCell>
						))}
					</TableHeader>
					<TableBody>
						{labels.map((row, i) => (
							<DataTableCell
								style={{ textAlign: "center" }}
								getContent={(r) => cellContent(r, row.id)}
							/>
						))}
					</TableBody>
				</Table>
			</View>
		);
	};
	const MyDoc = () => (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.body}>
					<View style={styles.row}>
						<View>
							<Image
								src="https://i.imgur.com/Pz4BpXQ.png"
								style={styles.logo1}
							/>
						</View>
						<View style={styles.header}>
							<Text style={styles.text}>
								ESTADO DE GOIÁS {"\n"}
								DELEGACIA-GERAL DA POLÍCIA CIVIL
							</Text>
						</View>
						<View>
							<Image
								src="https://i.imgur.com/4D88yCh.jpg"
								style={styles.logo2}
							/>
						</View>
					</View>
					<View style={styles.title}>
						<Text style={styles.text}>{getReportTitle().toUpperCase()}</Text>
					</View>
					{genTable()}
				</View>
				<Text style={styles.rodape} fixed>
					SEÇÃO DO ARQUIVO-GERAL{"\n"}
					RUA 70, Nº 338, SETOR CENTRAL - GOIANIA - GO - CEP 74055-120 -
					(62)3201-2721
				</Text>
			</Page>
		</Document>
	);

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.get(url, {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						setReportData(response.data);
						console.log(reportData);
					})
					.catch(() => handleRequestError());
			})
			.catch((error) => axiosProfileError(error, connectionError));
	}, []);

	return (
		<>
			<DataTable title={getReportTitle()} url={url} isReport />
			<button
				type="button"
				className={classes.button}
				onClick={async () => {
					const doc = <MyDoc />;
					const asPdf = pdf([]); // {} is important, throws without an argument
					asPdf.updateContainer(doc);
					const blob = await asPdf.toBlob();
					saveAs(
						blob,
						`relatorio-${currentDay}-${currentMonth}-${currentYear}.pdf`
					);
				}}
				style={{
					marginLeft: "40%",
					marginRight: "40%",
					width: 200,
				}}
			>
				DOWNLOAD PDF
			</button>
		</>
	);
}
