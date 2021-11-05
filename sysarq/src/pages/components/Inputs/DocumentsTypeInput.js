import React, { useState } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import Info from "@material-ui/icons/Info";
import CancelIcon from "@material-ui/icons/Cancel";

import ChipsContainer from "../Container/ChipsContainer";
import DocumentTypeInput from "./DocumentTypeInput";
import SpecialLabels from "../SpecialLabels";
import AddChip from "../AddChip";

const DocumentsTypeInput = ({
	typeList,
	setTypeList,
	typeListHelperText,
	setTypeListHelperText,
	isDetailPage,
	connectionError,
}) => {
	const [openNewTypeDialog, setOpenNewTypeDialog] = useState(false);

	const [type, setType] = useState("");
	const [typeHelperText, setTypeHelperText] = useState("");

	const [month, setMonth] = useState("");
	const [monthHelperText, setMonthHelperText] = useState("");

	const [year, setYear] = useState("");
	const [yearHelperText, setYearHelperText] = useState("");

	const handleOpenNewTypeDialog = () => {
		setOpenNewTypeDialog(true);
		setTypeListHelperText("");
	};

	const handleCloseNewTypeDialog = () => setOpenNewTypeDialog(false);

	const handleMonthChange = (event) => {
		setMonthHelperText("");
		if (event.target.value === "") {
			setMonth(null);
		} else {
			setMonth(event.target.value);
		}
	};
	const handleYearChange = (event) => {
		setYearHelperText("");
		setYear(event.target.value);
	};

	const handleAddNewTypeDialog = () => {
		if (type === "") {
			setTypeHelperText("Selecione um tipo");
			return "type error";
		}
		if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
			setTypeHelperText("Insira um mês válido");
			return "month error";
		}
		if (parseInt(year, 10) < 1900 || year === "") {
			setTypeHelperText("Insira um ano válido");
			return "year error";
		}

		const newType = {
			document_type_id: type.id,
			document_type_name: type.document_name,
			month,
			year,
			temporality_date: parseInt(type.temporality, 10) + parseInt(year, 10),
		};
		const newTypeList = typeList;

		newTypeList.push(newType);
		setTypeList(newTypeList);
		setTypeListHelperText("");
		setOpenNewTypeDialog(false);
		return "added type";
	};

	const handleDeleteType = (deletedType) => {
		const types = typeList;
		const newTypeList = types.filter((item) => item !== deletedType);

		setTypeList(newTypeList);
	};

	return (
		<>
			<Grid item xs={12} sm={12} md={12}>
				<SpecialLabels label="Tipo do Documento" />

				{typeListHelperText !== "" ? (
					<Alert styles={{ width: "100%" }} severity="error">
						{typeListHelperText}
					</Alert>
				) : (
					""
				)}

				<ChipsContainer justifyContent="left" marginTop="0%">
					{typeList.map((addedType) => (
						<Chip
							icon={<Info />}
							label={
								addedType.month === null || addedType.month === ""
									? `${addedType.document_type_name} - ${addedType.year}`
									: `${addedType.document_type_name} - ${addedType.month}/${addedType.year}`
							}
							color="secondary"
							deleteIcon={<CancelIcon data-testid="delete" />}
							onDelete={
								isDetailPage ? false : () => handleDeleteType(addedType)
							}
						/>
					))}

					{isDetailPage ? (
						""
					) : (
						<AddChip label="Adicionar Tipo" onClick={handleOpenNewTypeDialog} />
					)}
				</ChipsContainer>
			</Grid>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewTypeDialog}
				onClose={handleCloseNewTypeDialog}
				aria-labelledby="newType-dialog-title"
			>
				<DialogTitle id="newType-dialog-title">Novo</DialogTitle>
				<DialogContent>
					<DocumentTypeInput
						setHelperText={setTypeHelperText}
						set={setType}
						connectionError={connectionError}
						documentType={type}
						documentTypeHelperText={typeHelperText}
					/>
					<TextField
						fullWidth
						id="month"
						label="Mês"
						margin="normal"
						value={month}
						onChange={handleMonthChange}
						error={monthHelperText !== ""}
						helperText={monthHelperText}
						type="number"
						inputProps={{ maxLength: 2 }}
					/>
					<TextField
						fullWidth
						id="year"
						label="Ano*"
						margin="normal"
						value={year}
						onChange={handleYearChange}
						error={yearHelperText !== ""}
						helperText={yearHelperText}
						type="number"
						inputProps={{ maxLength: 4 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNewTypeDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleAddNewTypeDialog} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

DocumentsTypeInput.propTypes = {
	typeList: PropTypes.arrayOf(PropTypes.string).isRequired,
	setTypeList: PropTypes.func.isRequired,
	typeListHelperText: PropTypes.string.isRequired,
	setTypeListHelperText: PropTypes.func.isRequired,
	isDetailPage: PropTypes.string.isRequired,
	connectionError: PropTypes.func.isRequired,
};

export default DocumentsTypeInput;
