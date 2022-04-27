import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Grid, TextField } from "@material-ui/core";

import AutoComplete from "../AutoComplete";
import { axiosArchives, axiosProfile } from "../../../Api";
import { logout } from "../../../support";

const DocumentTypeInput = ({
	isDetailPage,
	documentTypeDetail,
	setHelperText,
	set,
	connectionError,
	documentType,
	documentTypeHelperText,
}) => {
	const [documentTypes, setDocumentTypes] = useState([]);

	const handleChange = (event, newValue) => {
		setHelperText("");
		set(newValue);
	};

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.get("document-name/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						setDocumentTypes(response.data);
					})
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					logout();
				} else connectionError();
			});
	}, [documentType]);

	return (
		<Grid item xs={12} sm={12} md={12}>
			{isDetailPage ? (
				<TextField
					fullWidth
					variant="outlined"
					id="documentType"
					label="Nome do Documento"
					value={documentTypeDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<AutoComplete
					value={documentType}
					handleValueChange={handleChange}
					options={documentTypes}
					optionsLabel={(option) => `${option.document_name}`}
					propertyCheck="document_name"
					sortProperty="document_name"
					label="Nome do Documento*"
					helperText={documentTypeHelperText}
				/>
			)}
		</Grid>
	);
};

DocumentTypeInput.propTypes = {
	isDetailPage: PropTypes.bool.isRequired,
	documentTypeDetail: PropTypes.string.isRequired,
	setHelperText: PropTypes.func.isRequired,
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	documentType: PropTypes.string.isRequired,
	documentTypeHelperText: PropTypes.string.isRequired,
};

export default DocumentTypeInput;
