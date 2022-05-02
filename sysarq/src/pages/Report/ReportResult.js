import React, { useState, useEffect } from "react";
import { pdf, PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';
import { saveAs } from 'file-saver';
import { makeStyles } from "@material-ui/core";
import DataTable from "../components/DataTable";
import CardContainer from "../components/Container/CardContainer";
import { axiosProfile, axiosArchives } from "../../Api";
import { axiosProfileError, getPublicWorkers, autocompl, formatDate } from "../../support";

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white'
	},
	body: {
	},
	row: {
		flexDirection: 'row',
	},
	logo1: {
		margin: 20,
		width: 60,
		height: 70
	},
	logo2: {
		marginTop: 30,
		width: 60,
		height: 60
	},
	header: {
		margin: 50
	},
	title: {
		flexDirection: 'row',
		width: '50%',
	},
	text: {
		// width: '50%',
		textAlign: 'center',
		fontSize: 10,
	},
	table: {
		margin: 30
	}
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

	const currentDay = new Date().toLocaleString("pt-BR", { day: '2-digit' });
	const currentMonth = new Date().toLocaleString("pt-BR", { month: '2-digit' });
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
	}

	const getDocumentDate = (data) => {
		if (data.archiving_date) {
			return data.archiving_date;
		}
		if (data.received_date) {
			return data.received_date;
		}
		return data.reference_period;
	}

	const getTemporality = (data) => {
		if (data.temporality_date >= 9999) {
			return "Permanente";
		}
		return data.temporality_date ? data.temporality_date : "-";
	}

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
	}

	const MyDoc = () => (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.body}>
					<View style={styles.row}>
						<View>
							<Image src="https://i.imgur.com/Pz4BpXQ.png" style={styles.logo1} />
						</View>
						<View style={styles.header}>
							<Text style={styles.text}>ESTADO DE GOIÁS</Text>
							<Text style={styles.text}>DELEGACIA-GERAL DA POLÍCIA CIVIL</Text>
						</View>
						<View>
							<Image src="https://i.imgur.com/4D88yCh.jpg" style={styles.logo2} />
						</View>
					</View>
					<View style={styles.title}>
						<Text style={styles.text}>RELATÓRIO DE TEMPORALIDADE DOCUMENTAL</Text>
					</View>
					<View style={styles.table}>
						<Table
							data={reportData}
						>
							<TableHeader>
								<TableCell>
									Nome do Documento
								</TableCell>
								<TableCell>
									Temporalidade
								</TableCell>
								<TableCell>
									Data do Documento
								</TableCell>
								<TableCell>
									Prazo de Guarda
								</TableCell>
								<TableCell>
									Número do Processo
								</TableCell>
							</TableHeader>
							<TableBody>
								<DataTableCell getContent={(r) => r.document_name ? r.document_name : "-"} />
								<DataTableCell getContent={(r) => getTemporality(r)} />
								<DataTableCell getContent={(r) => formatDocumentDate(getDocumentDate(r))} />
								<DataTableCell getContent={(r) => getTemporalityDate(r)} />
								<DataTableCell getContent={(r) => r.process_number} />
							</TableBody>
						</Table>
					</View>
				</View>
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
			<DataTable title="Relatório" url={url} />
			<button
				type="button"
				className={classes.button}
				onClick={async () => {
					const doc = <MyDoc />;
					const asPdf = pdf([]); // {} is important, throws without an argument
					asPdf.updateContainer(doc);
					const blob = await asPdf.toBlob();
					saveAs(blob, `relatorio-${currentDay}-${currentMonth}-${currentYear}.pdf`);
				}}
				style={{
					marginLeft: 600,
					marginRight: 600
				}}
			>DOWNLOAD PDF</button>
		</>
	);
}
