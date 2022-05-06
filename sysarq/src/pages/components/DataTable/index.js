import React, { useState, useEffect } from "react";
import { maskBr } from "js-brasil";
import PropTypes from "prop-types";

import {
	makeStyles,
	withStyles,
	Paper,
	Toolbar,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	IconButton,
	TablePagination,
	TextField
} from "@material-ui/core";

import MuiLink from "@material-ui/core/Link";

import DeleteIcon from "@material-ui/icons/Delete";

import EditIcon from "@material-ui/icons/Edit";

import CloseIcon from "@material-ui/icons/Close";

import tableHeadCells from "./tablesHeadCells";

import { axiosProfile, axiosArchives } from "../../../Api";

import { axiosProfileError } from "../../../support";

import PopUpAlert from "../PopUpAlert";
import WarningIcon from "../WarningIcon";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),

		margin: "auto",
		width: "85%",
		minWidth: 0,
	},

	title: {
		marginTop: theme.spacing(0.5),

		flex: "1 1 100%",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
		color: "#1f3541",
	},

	visuallyHidden: {
		overflow: "hidden",
		position: "absolute",
		width: 1,
	},

	link: {
		marginLeft: theme.spacing(3),

		fontWeight: "bold",
		fontSize: "14px",
		color: "#5389b5",
	},

	filter: {
		marginLeft: theme.spacing(3),
	},
}));

const Link = withStyles({
	root: {
		"&:hover": {
			color: "#1f3541",
		},
	},
})(MuiLink);

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);

	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
	return b[orderBy] && a[orderBy]
		? b[orderBy].toString().localeCompare(a[orderBy].toString(), undefined, {
				numeric: true,
				sensitivity: "base",
		  })
		: null;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({ url, title, isReport }) => {
	const classes = useStyles();

	const fieldUrls = [
		"document-subject/",
		"unity/",
		"box-abbreviation/",
		"document-name/",
		"shelf/",
		"rack/",
		"file-location/",
		"public-worker/",
	];

	const [headCells, setHeadCells] = useState([]);
	const [rows, setRows] = useState([]);

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("");

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");
 	const [isEditing, setIsEditing] = useState(null);
	const [updateTable, setUpdateTable] = useState(true);

	const connectionError = () => {
		setOpenAlert(true);
		setSeverityAlert("error");

		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const calcTemporalityDate = (year, date) => {
		let d = date.slice();
		const datePropertyYear = date.slice(0, 4);
		d = d.replace(datePropertyYear, year.toString());
		return new Date(d);
	};

	const handleTemporalityStatus = (data) => {
		const datePropertyOptions = {
			"administrative-process/": "archiving_date",
			"frequency-sheet/": "reference_period",
			"frequency-relation/": "received_date",
		};

		const dateProperty = datePropertyOptions[url];
		const today = new Date();

		return data.map((item) => {
			const document = { ...item };
			const temporalityDate = calcTemporalityDate(
				document.temporality_date,
				document[dateProperty]
			);
			document.info = temporalityDate <= today ? "temporality hit" : "";
			return document;
		});
	};

	useEffect(() => {
		if (updateTable) {
			setHeadCells(tableHeadCells(url));

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
							if (url && url.includes("search")) {
								const listTable = [];

								response.data.administrative_process.map(
									(administrativeProcess) =>
										listTable.push({
											docName: "administrative-process",
											...administrativeProcess,
										})
								);

								response.data.frequecy_relation.map((frequencyRelation) =>
									listTable.push({
										docName: "frequency-relation",
										...frequencyRelation,
									})
								);

								response.data.frequency_sheet.map((frequencySheet) =>
									listTable.push({
										docName: "frequency-sheet",
										...frequencySheet,
									})
								);

								response.data.box_archiving.map((boxArchiving) =>
									listTable.push({ docName: "box-archiving", ...boxArchiving })
								);

								setRows(listTable);
							} else {
								let data = [...response.data];
								switch (url) {
									case "administrative-process/":
									case "frequency-sheet/":
									case "frequency-relation/":
										data = handleTemporalityStatus(data);
										break;
									default:
										break;
								}
								// data =  data.map((item, index) => {
								// 	const newItem = { ...item }
								// 	newItem.info = index % 3 === 0 ? "temporality hit" : ""
								// 	return newItem;
								// })
								setRows(data);
							}

							setUpdateTable(false);
						})
						.catch(() => {
							setOpenAlert(true);
							setSeverityAlert("error");

							setAlertHelperText(
								"Verifique sua conexão com a internet e recarregue a página."
							);
						});

					return "get done";
				})
				.catch((error) => {
					axiosProfileError(error, connectionError);
				});
		}
	}, [updateTable]);

	const handleAlertClose = () => setOpenAlert(false);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const getDocumentDate = (row) => {
		if (row.archiving_date) {
			return row.archiving_date;
		}
		if (row.received_date) {
			return row.received_date;
		}
		return row.reference_period;
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const deleteRow = (row) => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.delete(`${url}${row.id}/`, {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then(() => {
						setOpenAlert(true);
						setSeverityAlert("success");
						setAlertHelperText("Campo excluído com sucesso!");
						setUpdateTable(true);
					})
					.catch((error) => {
						setOpenAlert(true);
						setSeverityAlert("error");

						if (
							error.response &&
							error.response.data.indexOf("Cannot") !== -1
						) {
							setAlertHelperText(
								"Campo em uso! Atualize os documentos que utilizam esse campo."
							);
						} else {
							setAlertHelperText(
								"Verifique sua conexão com a internet e recarregue a página."
							);
						}
					});
			})
			.catch((error) => {
				axiosProfileError(error, connectionError);
			});
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

		if (url === "box-archiving/" && id === "status") {
			// return row.is_eliminated ? "Eliminado" : row.is_filed ? "Arquivado" : "Desarquivado";
			//
			if (row.is_eliminated) return "Eliminado";
			if (row.is_filed) return "Arquivado";
			return "Desarquivado";
		}

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
		if (id === "info") {
			if (row[id].indexOf("temporality hit") > -1) {
				return <WarningIcon text="O documento atingiu sua temporalidade" />;
			}
			return " ";
		}

		if (typeof row[id] === "undefined" || row[id] === null || row[id] === "")
			return "-";

		return row[id];
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const [currentFilter, setCurrentFilter] = useState("");
	const [filteredRows, setFilteredRows] = useState(rows);

	const filterRows = (query) => {
		const rowsWithFilter = rows.filter((row) => {
            // eslint-disable-next-line
			for (const [key, value] of Object.entries(row)) {
				try {
					if (
						key !== "id" &&
						cellContent(
							row,
							url === "box-archiving/" &&
								(key === "is_eliminated" || key === "is_filed")
								? "status"
								: key
						)
							.toString()
							.toLowerCase()
							.includes(query.toLowerCase())
					) {
						return true;
					}
				} catch {} // eslint-disable-line
			}
			return false;
		});

		setFilteredRows(rowsWithFilter);
	};

	useEffect(() => {
		filterRows(currentFilter);
	}, [currentFilter]);

	useEffect(() => {
		setFilteredRows(rows);
		filterRows(currentFilter);
	}, [rows]);
	
	const updateItem = (id, values) => {
		axiosProfile
		.post(`api/token/refresh/`, {
			refresh: localStorage.getItem("tkr"),
		})
		.then((res) => {
			localStorage.setItem("tk", res.data.access);
			localStorage.setItem("tkr", res.data.refresh);

			axiosArchives
				.put(`${url}${id}/`, values, {
					headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					"Content-Type": "application/json"
				})
				.then(() => {
					setOpenAlert(true);
					setSeverityAlert("success");
					setAlertHelperText("Campo atualizado com sucesso!");
					setUpdateTable(true);
				})
				.catch((error) => {
					setOpenAlert(true);
					setSeverityAlert("error");
					if (
						error?.response?.data &&
						error.response.data?.indexOf("Cannot") !== -1
					) {
						setAlertHelperText(
							"Campo em uso! Atualize os documentos que utilizam esse campo."
						);
					} else {
						setAlertHelperText(
							"Verifique sua conexão com a internet e recarregue a página."
						);
					}
				});
		})
		.catch((error) => {
			axiosProfileError(error, connectionError);
		});
	}

	return (
		<>
			<Paper className={classes.paper} elevation={10}>
				<Toolbar>
					<Typography className={classes.title} variant="h6" component="div">
						{title}
					</Typography>
				</Toolbar>
				{isReport === false && (
					<TextField
						label="Filtro"
						value={currentFilter}
						onChange={(e) => setCurrentFilter(e.target.value)}
						variant="outlined"
						className={classes.filter}
					/>
				)}
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{headCells.map((headCell) => (
									<>
										<TableCell
											key={headCell.id}
											align={
												headCells.indexOf(headCell) === 0 ? "left" : "right"
											}
											padding="normal"
											sortDirection={orderBy === headCell.id ? order : false}
										>
											<TableSortLabel
												active={orderBy === headCell.id}
												direction={orderBy === headCell.id ? order : "asc"}
												onClick={createSortHandler(headCell.id)}
											>
												{headCell.label}
												{orderBy === headCell.id && (
													<span className={classes.visuallyHidden}>
														{order === "desc"
															? "sorted descending"
															: "sorted ascending"}
													</span>
												)}
											</TableSortLabel>
										</TableCell>

										{headCells.indexOf(headCell) === headCells.length - 1 &&
										fieldUrls.indexOf(url) !== -1 ? (
											<TableCell aling="right">{}</TableCell>
										) : (
											""
										)}
									</>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{stableSort(filteredRows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow
										hover
										tabIndex={-1}
										key={row.id}
										onClick={
											fieldUrls.indexOf(url) !== -1
												? null
												: () => {
														window.open(
															`/documents/${
																row.docName === undefined
																	? url
																	: `${row.docName}/`
															}view/${row.id}`,
															"_blank",
															"popup"
														);
												  }
										}
									>
										{Array.from(Array(headCells.length).keys()).map(
											(headCellIndex) => (
												<>
													<TableCell
														key={row[headCells[headCellIndex].id]}
														align={headCellIndex === 0 ? "left" : "right"}
													>
														{isEditing === row.id ? (
															<TextField 
															width="50px" 
															id="outlined-basic" 
															size="small" 
															type={headCells[headCellIndex].inputType}
															defaultValue={
																headCells[headCellIndex].id === 'cpf' ? cellContent(row, headCells[headCellIndex].id).replace(/[^\w\s]/gi, '') 
																	:
																	cellContent(row, headCells[headCellIndex].id)
															} 
															variant="outlined"
															onBlur={e => e.target.value && updateItem(row.id, { [headCells[headCellIndex].id]: e.target.value})}
															 />
														) : (
															cellContent(row, headCells[headCellIndex].id)
															
														)}
													</TableCell>
													{headCellIndex === headCells.length - 1 &&
														fieldUrls.indexOf(url) !== -1 &&
														isReport === false && (
															<TableCell align="right">
																{ !headCells[headCellIndex].disable && (isEditing === row.id ? (
																	<IconButton
																	color="inherit"
																	size="small"
																>
																	<CloseIcon
																		data-testid="edit-field"
																		onClick={() => setIsEditing(null)}
																	/>
																</IconButton>
																) : (
																	<IconButton
																	color="inherit"
																	size="small"
																	>
																		<EditIcon
																			data-testid="edit-field"
																			onClick={() => setIsEditing(row.id)}
																		/>
																	</IconButton>
																))}
																<IconButton
																	style={{ color: "#fe0000" }}
																	color="inherit"
																	size="small"
																>
																	<DeleteIcon
																		data-testid="delete-field"
																		onClick={() => deleteRow(row)}
																	/>
																</IconButton>
															</TableCell>
														)}
												</>
											)
										)}
									</TableRow>
								))}
							{page !== 0 && emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>

				{url === "shelf/" || url === "rack/" || url === "file-location/" ? (
					<Typography style={{ marginBottom: "1%" }}>
						<Link
							className={classes.link}
							href={
								url === "shelf/" ||
								"/fields/rack" ||
								"/fields/shelf" ||
								"/fields/file-location"
							}
						>
							Ver{" "}
							{url === "shelf/" ||
								"Prateleiras" ||
								"Estantes" ||
								"Localidades dos Arquivos"}
						</Link>
					</Typography>
				) : (
					""
				)}
			</Paper>

			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</>
	);
};

DataTable.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	isReport: PropTypes.bool,
};

DataTable.defaultProps = {
	isReport: false,
};

export default DataTable;
