import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	makeStyles,
	withStyles,
	Paper,
	Toolbar,
	Typography,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	IconButton,
	TablePagination,
} from "@material-ui/core";

import MuiLink from "@material-ui/core/Link";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import tableHeadCells from "./tablesHeadCells";

import { axiosProfile, axiosArchives } from "../../../Api";

import { logout } from "../../../support";

import PopUpAlert from "../PopUpAlert";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),

		margin: "auto",
		width: "85%",
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

const DataTable = ({ url, title }) => {
	const classes = useStyles();

	const [headCells, setHeadCells] = useState([]);
	const [rows, setRows] = useState([]);

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("");

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("error");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [updateTable, setUpdateTable] = useState(true);

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

								listTable.push(...response.data.box_archiving);
								listTable.push(...response.data.frequency_sheet);
								listTable.push(...response.data.administrative_process);
								listTable.push(...response.data.frequecy_relation);

								setRows(listTable);
							} else {
								setRows(response.data);
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
					if (error.response && error.response.status === 401) {
						logout();
					} else {
						setOpenAlert(true);
						setSeverityAlert("error");

						setAlertHelperText(
							"Verifique sua conexão com a internet e recarregue a página."
						);
					}
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
				if (error.response && error.response.status === 401) {
					logout();
				} else {
					setOpenAlert(true);
					setSeverityAlert("error");

					setAlertHelperText(
						"Verifique sua conexão com a internet e recarregue a página."
					);
				}
			});
	};

	const cellContent = (row, id) => {
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

	return (
		<>
			<Paper className={classes.paper}>
				<Toolbar>
					<Typography className={classes.title} variant="h6" component="div">
						{title}
					</Typography>
					<Button
						disableElevation
						style={{ fontWeight: "bold" }}
						variant="outlined"
						color="secondary"
						href={`${url}create`}
					>
						Adicionar
					</Button>
				</Toolbar>
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
												{orderBy === headCell.id ? (
													<span className={classes.visuallyHidden}>
														{order === "desc"
															? "sorted descending"
															: "sorted ascending"}
													</span>
												) : null}
											</TableSortLabel>
										</TableCell>
										{headCells.indexOf(headCell) === headCells.length - 1 ? (
											<TableCell aling="right">{}</TableCell>
										) : (
											""
										)}
									</>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow hover tabIndex={-1} key={row.id}>
										{Array.from(Array(headCells.length).keys()).map(
											(headCellIndex) => (
												<>
													<TableCell
														key={row[headCells[headCellIndex].id]}
														align={headCellIndex === 0 ? "left" : "right"}
													>
														{cellContent(row, headCells[headCellIndex].id)}
													</TableCell>
													{headCellIndex === headCells.length - 1 ? (
														<TableCell align="right">
															<IconButton color="secondary" size="small">
																<EditIcon />
															</IconButton>
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
													) : (
														""
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

				{url === "shelf/" || url === "rack/" ? (
					<Typography style={{ marginBottom: "1%" }}>
						<Link
							className={classes.link}
							href={url === "shelf/" ? "/fields/rack" : "/fields/shelf"}
						>
							Ver {url === "shelf/" ? "Prateleiras" : "Estantes"}
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
};

export default DataTable;
