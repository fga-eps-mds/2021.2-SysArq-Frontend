import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
	makeStyles,
	createTheme,
	ThemeProvider,
	Paper,
	Typography,
	Toolbar,
	Tooltip,
	IconButton,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	TablePagination,
	Snackbar,
} from "@material-ui/core";

import { ptBR } from "@material-ui/core/locale";

import AddIcon from "@material-ui/icons/Add";

import { Alert, AlertTitle } from "@material-ui/lab";

import { axiosArchives, axiosProfile } from "../../../Api";

import tableHeadCells from "./tablesHeadCells";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),

		margin: "auto",
		width: "80%",
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
}));

const theme = createTheme(
	{
		palette: {
			primary: { main: "#1f3541" },
		},
	},
	ptBR
);

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
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({ url, title }) => {
	const classes = useStyles();

	const [headCells, setHeadCells] = React.useState([]);
	const [rows, setRows] = React.useState([]);

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("");

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertHelperText, setAlertHelperText] = React.useState("");

	useEffect(() => {
		setHeadCells(tableHeadCells(url));
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				const token = localStorage.getItem("tk");

				axiosArchives
					.get(url, { headers: { Authorization: `JWT ${token}` } })
					.then((response) => {
						if (url && url.includes("search")) {
							const listTable = [];
							listTable.push(...response.data.archival_relation);
							listTable.push(...response.data.frequency_sheet);
							listTable.push(...response.data.administrative_process);
							listTable.push(...response.data.frequecy_relation);
							setRows(listTable);
							return;
						}
						setRows(response.data);
					})
					.catch(() => {
						setOpenAlert(true);
						setAlertHelperText(
							"Verifique sua conexão com a internet e recarregue a página."
						);
					});
				return res;
			})
			.catch(() => {});
	}, []);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const test = (row, id) => {
		if (id === "is_filed") {
			if (row[id] === true) {
				return "Arquivado";
			}
			return "Desarquivado";
		}
		if (id === "is_eliminated") {
			if (row[id] === true) {
				return "Eliminado";
			}
			return row[id];
		}
		return row[id];
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div>
			<ThemeProvider theme={theme}>
				<Paper className={classes.paper}>
					<Toolbar>
						<Typography className={classes.title} variant="h6" component="div">
							{title}
						</Typography>
						<Tooltip title="Adicionar">
							<IconButton aria-label="adicionar" data-testid="botao-adicionar">
								<AddIcon />
							</IconButton>
						</Tooltip>
					</Toolbar>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{headCells.map((headCell) => (
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
													<TableCell
														key={row[headCells[headCellIndex].id]}
														align={headCellIndex === 0 ? "left" : "right"}
													>
														{test(row, headCells[headCellIndex].id)}
													</TableCell>
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
				</Paper>

				<Snackbar
					style={{ textAlign: "left" }}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={openAlert}
					autoHideDuration={10000}
					onClose={handleAlertClose}
				>
					<Alert variant="filled" onClose={handleAlertClose} severity="error">
						<AlertTitle>Erro</AlertTitle>
						{alertHelperText}
					</Alert>
				</Snackbar>
			</ThemeProvider>
		</div>
	);
};

DataTable.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default DataTable;
