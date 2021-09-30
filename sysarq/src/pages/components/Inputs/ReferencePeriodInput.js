import React, { useState } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import { initialPeriod, isDateNotValid, formatDate } from "../../../support";

import SpecialLabels from "../../components/SpecialLabels";

import ChipsContainer from "../../components/Container/ChipsContainer";
import AddChip from "../../components/AddChip";

const ReferencePeriodInput = ({
	referencePeriod,
	setReferencePeriod,
	setReferencePeriodHelperText,
	referencePeriodHelperText,
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
		const formattedPeriod = formatDate(period);

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
				<SpecialLabels label="Período de Referência" />

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
							label={`${addedPeriod.substring(5, 7)}/${addedPeriod.substring(
								0,
								4
							)}`}
							color="secondary"
							deleteIcon={<CancelIcon data-testid="delete" />}
							onDelete={() => handleDeletePeriod(addedPeriod)}
						/>
					))}

					<AddChip label="Adicionar" onClick={handleOpenNewPeriodDialog} />
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
						style={{ width: "100%" }}
						id="period-date-picker-dialog"
						label="Período"
						format="MM/yyyy"
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
};

export default ReferencePeriodInput;
