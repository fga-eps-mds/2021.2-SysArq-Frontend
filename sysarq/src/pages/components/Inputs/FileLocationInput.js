import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

import { axiosArchives, axiosProfile } from "../../../Api";
import { logout } from "../../../support";

const FileLocationInput = ({
	set,
	connectionError,
	isDetailPage,
	FileLocationDetail,
	FileLocation,
}) => {
	const [FileLocations, setFileLocations] = useState([]);

	const handleChange = (event) => set(event.target.value);

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);
				axiosArchives
					.get("file-location/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setFileLocations(response.data))
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					logout();
				} else connectionError();
			});
	}, []);

	return (
		<Grid item xs={12} sm={6} md={6}>
			{isDetailPage ? (
				<TextField
					fullWidth
					variant="outlined"
					id="FileLocation"
					label="Prateleira"
					value={FileLocationDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<FormControl fullWidth variant="outlined">
					<InputLabel id="select-FileLocation-label">
						Localização do Arquivo
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-FileLocation-label"
						label="Localização do Arquivo"
						id="select-FileLocation"
						value={FileLocation}
						onChange={handleChange}
						renderValue={(value) => `${value.file}`}
					>
						<MenuItem value="">
							<em>Nenhuma</em>
						</MenuItem>

						{FileLocations.map((FileLocationOption) => (
							<MenuItem key={FileLocationOption.id} value={FileLocationOption}>
								{FileLocationOption.file}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Grid>
	);
};

FileLocationInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
	FileLocationDetail: PropTypes.string.isRequired,
	FileLocation: PropTypes.string.isRequired,
};

export default FileLocationInput;
