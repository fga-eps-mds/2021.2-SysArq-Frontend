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
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import { KeyboardDatePicker } from "@material-ui/pickers";

import TimelapseIcon from "@material-ui/icons/Timelapse";
import CancelIcon from "@material-ui/icons/Cancel";

import { initialPeriod, isDateNotValid, formatDateName } from "../../../support";

import SpecialLabels from "../SpecialLabels";

import ChipsContainer from "../Container/ChipsContainer";
import AddChip from "../AddChip";

const ReferencePeriodInput = ({
	referencePeriod,
	setReferencePeriod,
	setReferencePeriodHelperText,
	referencePeriodHelperText,
	isDetailPage,
}) => {
	const [openNewPeriodDialog, setOpenNewPeriodDialog] = useState(false);

	const [period, setPeriod] = useState(initialPeriod);
	const [periodHelperText, setPeriodHelperText] = useState("");

	const handleOpenNewPeriodDialog = () => setOpenNewPeriodDialog(true);

	const handleCloseNewPeriodDialog = () => setOpenNewPeriodDialog(false);

	const handlePeriodChange = (date) => {
		setPeriodHelperText("");
		setPeriod(date);
	};

	const handleAddNewPeriodDialog = () => {
		if (isDateNotValid(period, setPeriodHelperText, "period", "required")) {
			return "period error";
		}

		const periodList = referencePeriod;
		const formattedPeriod = formatDateName(period);

		if (periodList.indexOf(formattedPeriod) !== -1) {
			setPeriodHelperText("Período já adicionado");
			return "period already added error";
		}

		periodList.push(formattedPeriod);
		setReferencePeriod(periodList);
		setReferencePeriodHelperText("");

		setOpenNewPeriodDialog(false);
		return "added period";
	};

	const handleDeletePeriod = (deletedPeriod) => {
		const periodList = referencePeriod;
		const newPeriodList = periodList.filter((item) => item !== deletedPeriod);

		setReferencePeriod(newPeriodList);
	};

	return (
		<>
			<Grid item xs={12} sm={12} md={12}>
				<SpecialLabels label="Período das Frequências" />

				{referencePeriodHelperText !== "" ? (
					<Alert styles={{ width: "100%" }} severity="error">
						{referencePeriodHelperText}
					</Alert>
				) : (
					""
				)}

				<ChipsContainer justifyContent="left" marginTop="0%">
					{referencePeriod.map((addedPeriod) => (
						<Chip
							icon={<TimelapseIcon />}
							label={`${addedPeriod.substring(5, 8)}/${addedPeriod.substring(
								0,
								4
							)}`}
							color="secondary"
							deleteIcon={<CancelIcon data-testid="delete" />}
							onDelete={
								isDetailPage ? false : () => handleDeletePeriod(addedPeriod)
							}
						/>
					))}

					{isDetailPage ? (
						""
					) : (
						<AddChip
							label="Adicionar"
							onClick={handleOpenNewPeriodDialog}
							isDetailPage={isDetailPage}
						/>
					)}
				</ChipsContainer>
			</Grid>

			<Dialog
				fullWidth
				maxWidth="xs"
				open={openNewPeriodDialog}
				onClose={handleCloseNewPeriodDialog}
				aria-labelledby="newPeriod-dialog-title"
			>
				<DialogTitle id="newPeriod-dialog-title">Novo</DialogTitle>
				<DialogContent>
					<KeyboardDatePicker
						inputVariant="outlined"
						style={{ width: "100%" }}
						id="period-date-picker-dialog"
						label="Período"
						format="MMM/yyyy"
						value={period}
						onChange={handlePeriodChange}
						openTo="month"
						views={["month", "year"]}
						okLabel="Confirmar"
						cancelLabel="Cancelar"
						error={periodHelperText !== ""}
						helperText={periodHelperText}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNewPeriodDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleAddNewPeriodDialog} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

ReferencePeriodInput.propTypes = {
	referencePeriod: PropTypes.arrayOf(PropTypes.string).isRequired,
	setReferencePeriod: PropTypes.func.isRequired,
	setReferencePeriodHelperText: PropTypes.func.isRequired,
	referencePeriodHelperText: PropTypes.string.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
};

export default ReferencePeriodInput;
