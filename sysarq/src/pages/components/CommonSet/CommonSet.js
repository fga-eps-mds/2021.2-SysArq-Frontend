import React from "react";
import PropTypes from "prop-types";

import { Grid, TextField } from "@material-ui/core";

import ReceivedDateInput from "../Inputs/ReceivedDateInput";
import DocumentTypeInput from "../Inputs/DocumentTypeInput";
import SenderUnitInput from "../Inputs/SenderUnitInput";
import NotesInput from "../Inputs/NotesInput";

import { receiverWorker, senderWorker } from "../../../support";

const CommonSet = ({
	isDetailPage,
	setReceivedDateHelperText,
	setReceivedDate,
	receivedDate,
	receivedDateHelperText,
	documentTypeDetail,
	setDocumentTypeHelperText,
	setDocumentType,
	connectionError,
	documentType,
	documentTypeHelperText,
	senderUnitDetail,
	setSenderUnitHelperText,
	setSenderUnit,
	senderUnit,
	units,
	senderUnitHelperText,
	senderPublicWorkers,
	senderPublicWorkerInput,
	handleSenderPublicWorkerChange,
	setSenderPublicWorkerInput,
	senderPublicWorkerOptions,
	senderPublicWorkerHelperText,
	senderPublicWorkerDetail,
	receiverPublicWorkers,
	receiverPublicWorkerInput,
	handleReceiverPublicWorkerChange,
	setReceiverPublicWorkerInput,
	receiverPublicWorkerOptions,
	receiverPublicWorkerHelperText,
	receiverPublicWorkerDetail,
	setNotes,
	notes,
}) => (
	<>
		<Grid item xs={12} sm={6} md={4}>
			<ReceivedDateInput
				isDetailPage={isDetailPage}
				setHelperText={setReceivedDateHelperText}
				set={setReceivedDate}
				receivedDate={receivedDate}
				helperText={receivedDateHelperText}
			/>
		</Grid>

		<DocumentTypeInput
			isDetailPage={isDetailPage}
			documentTypeDetail={documentTypeDetail}
			setHelperText={setDocumentTypeHelperText}
			set={setDocumentType}
			connectionError={connectionError}
			documentType={documentType}
			documentTypeHelperText={documentTypeHelperText}
		/>

		<SenderUnitInput
			isDetailPage={isDetailPage}
			senderUnitDetail={senderUnitDetail}
			setHelperText={setSenderUnitHelperText}
			set={setSenderUnit}
			senderUnit={senderUnit}
			units={units}
			senderUnitHelperText={senderUnitHelperText}
		/>

		<Grid item xs={12} sm={12} md={12}>
			{isDetailPage ? (
				<TextField
					fullWidth
					id="senderPublicWorker"
					label="Servidor que encaminhou"
					value={senderPublicWorkerDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				senderWorker(
					senderPublicWorkers,
					senderPublicWorkerInput,
					handleSenderPublicWorkerChange,
					setSenderPublicWorkerInput,
					senderPublicWorkerOptions,
					senderPublicWorkerHelperText
				)
			)}
		</Grid>

		<Grid item xs={12} sm={12} md={12}>
			{isDetailPage ? (
				<TextField
					fullWidth
					id="receiverPublicWorker"
					label="Servidor que recebeu"
					value={receiverPublicWorkerDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				receiverWorker(
					receiverPublicWorkers,
					receiverPublicWorkerInput,
					handleReceiverPublicWorkerChange,
					setReceiverPublicWorkerInput,
					receiverPublicWorkerOptions,
					receiverPublicWorkerHelperText
				)
			)}
		</Grid>

		<NotesInput set={setNotes} notes={notes} isDetailPage={isDetailPage} />
	</>
);

CommonSet.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	setReceivedDateHelperText: PropTypes.func.isRequired,
	setReceivedDate: PropTypes.func.isRequired,
	receivedDate: PropTypes.instanceOf(Date).isRequired,
	receivedDateHelperText: PropTypes.string.isRequired,
	documentTypeDetail: PropTypes.string.isRequired,
	setDocumentTypeHelperText: PropTypes.func.isRequired,
	setDocumentType: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	documentType: PropTypes.string.isRequired,
	documentTypeHelperText: PropTypes.string.isRequired,
	senderUnitDetail: PropTypes.string.isRequired,
	setSenderUnitHelperText: PropTypes.func.isRequired,
	setSenderUnit: PropTypes.func.isRequired,
	senderUnit: PropTypes.string.isRequired,
	units: PropTypes.arrayOf(PropTypes.string).isRequired,
	senderUnitHelperText: PropTypes.string.isRequired,
	senderPublicWorkers: PropTypes.arrayOf(PropTypes.string).isRequired,
	senderPublicWorkerInput: PropTypes.string.isRequired,
	handleSenderPublicWorkerChange: PropTypes.string.isRequired,
	setSenderPublicWorkerInput: PropTypes.func.isRequired,
	senderPublicWorkerOptions: PropTypes.string.isRequired,
	senderPublicWorkerHelperText: PropTypes.func.isRequired,
	senderPublicWorkerDetail: PropTypes.string.isRequired,
	receiverPublicWorkers: PropTypes.arrayOf(PropTypes.string).isRequired,
	receiverPublicWorkerInput: PropTypes.string.isRequired,
	handleReceiverPublicWorkerChange: PropTypes.string.isRequired,
	setReceiverPublicWorkerInput: PropTypes.func.isRequired,
	receiverPublicWorkerOptions: PropTypes.string.isRequired,
	receiverPublicWorkerHelperText: PropTypes.func.isRequired,
	receiverPublicWorkerDetail: PropTypes.string.isRequired,
	setNotes: PropTypes.func.isRequired,
	notes: PropTypes.string.isRequired,
};

export default CommonSet;
