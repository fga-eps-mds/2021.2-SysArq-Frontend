import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import tableHeadCells from "./tablesHeadCells";

import { axiosArchives } from "../../../Api";

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: "bold",
		flex: "1 1 100%",
	},

	root: {
		width: "100%",
	},

	paper: {
		marginTop: theme.spacing(3),
		width: "80%",
		overflowX: "auto",
		marginBottom: theme.spacing(2),
		margin: "auto",
	},

	table: {
		width: "100%",
	},

	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

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
	const [orderBy, setOrderBy] = React.useState("subject-name");
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	useEffect(() => {
		setHeadCells(tableHeadCells(url));

		axiosArchives.get(url)
			.then((response) => {
				setRows(response.data);
			})
			.catch(() => {})
			.then(() => {});
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

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div>
			<CssBaseline />

			<Typography
				className={classes.title}
				gutterBottom
				variant="h6"
				component="h2"
			/>
			<Paper className={classes.paper}>
				<Toolbar className={classes.root}>
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
					<Table className={classes.table} size="medium">
						<TableHead>
							<TableRow>
								{headCells.map((headCell) => (
									<TableCell
										key={headCell.id}
										align={headCells.indexOf(headCell) === 0 ? "left" : "right"}
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
													{row[headCells[headCellIndex].id]}
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
		</div>
	);
};

DataTable.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default DataTable;
