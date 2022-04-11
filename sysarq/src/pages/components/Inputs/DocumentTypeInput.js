import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";

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

	const handleChange = (event) => {
		setHelperText("");
		set(event.target.value);
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
				<FormControl variant="outlined" fullWidth error={documentTypeHelperText !== ""}>
					<InputLabel id="select-documentType-label">
						Nome do Documento*
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-documentType-label"
						id="select-documentType"
						label="Nome do Documento*"
						value={documentType}
						onChange={handleChange}
						renderValue={(value) => `${value.document_name}`}
					>
						<MenuItem key={0} value="">
							<em>Nenhum</em>
						</MenuItem>

						{documentTypes.map((documentTypeOption) => (
							<MenuItem key={documentTypeOption.id} value={documentTypeOption}>
								{documentTypeOption.document_name}
							</MenuItem>
						))}
					</Select>
					{documentTypeHelperText ? (
						<FormHelperText>{documentTypeHelperText}</FormHelperText>
					) : (
						""
					)}
				</FormControl>
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
