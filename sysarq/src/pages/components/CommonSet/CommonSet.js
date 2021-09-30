import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import ReceivedDateInput from "../Inputs/ReceivedDateInput";
import DocumentTypeInput from "../Inputs/DocumentTypeInput";
import SenderUnitInput from "../Inputs/SenderUnitInput";
import AbbreviationInput from "../Inputs/AbbreviationInput";
import ShelfInput from "../Inputs/ShelfInput";
import RackInput from "../Inputs/RackInput";
import NotesInput from "../Inputs/NotesInput";

const CommonSet = ({
	setReceivedDateHelperText,
	setReceivedDate,
	receivedDate,
	receivedDateHelperText,
	setDocumentTypeHelperText,
	setDocumentType,
	connectionError,
	documentType,
	documentTypeHelperText,
	setSenderUnitHelperText,
	setSenderUnit,
	senderUnit,
	units,
	senderUnitHelperText,
	abbreviation,
	setAbbreviation,
	shelf,
	setShelf,
	rack,
	setRack,
	setNotes,
	notes,
}) => (
	<>
		<Grid item xs={12} sm={6} md={4}>
			<ReceivedDateInput
				setHelperText={setReceivedDateHelperText}
				set={setReceivedDate}
				receivedDate={receivedDate}
				helperText={receivedDateHelperText}
			/>
		</Grid>

		<DocumentTypeInput
			setHelperText={setDocumentTypeHelperText}
			set={setDocumentType}
			connectionError={connectionError}
			documentType={documentType}
			documentTypeHelperText={documentTypeHelperText}
		/>

		<SenderUnitInput
			setHelperText={setSenderUnitHelperText}
			set={setSenderUnit}
			senderUnit={senderUnit}
			units={units}
			senderUnitHelperText={senderUnitHelperText}
		/>

		<AbbreviationInput
			abbreviation={abbreviation}
			set={setAbbreviation}
			connectionError={connectionError}
		/>

		<ShelfInput
			shelf={shelf}
			set={setShelf}
			connectionError={connectionError}
		/>

		<RackInput rack={rack} set={setRack} connectionError={connectionError} />

		<NotesInput set={setNotes} notes={notes} />
	</>
);

CommonSet.propTypes = {
	setReceivedDateHelperText: PropTypes.func.isRequired,
	setReceivedDate: PropTypes.func.isRequired,
	receivedDate: PropTypes.instanceOf(Date).isRequired,
	receivedDateHelperText: PropTypes.string.isRequired,
	setDocumentTypeHelperText: PropTypes.func.isRequired,
	setDocumentType: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	documentType: PropTypes.string.isRequired,
	documentTypeHelperText: PropTypes.string.isRequired,
	setSenderUnitHelperText: PropTypes.func.isRequired,
	setSenderUnit: PropTypes.func.isRequired,
	senderUnit: PropTypes.string.isRequired,
	units: PropTypes.arrayOf(PropTypes.string).isRequired,
	senderUnitHelperText: PropTypes.string.isRequired,
	abbreviation: PropTypes.string.isRequired,
	setAbbreviation: PropTypes.func.isRequired,
	shelf: PropTypes.string.isRequired,
	setShelf: PropTypes.func.isRequired,
	rack: PropTypes.string.isRequired,
	setRack: PropTypes.func.isRequired,
	setNotes: PropTypes.func.isRequired,
	notes: PropTypes.string.isRequired,
};

export default CommonSet;
