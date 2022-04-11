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

const ShelfInput = ({
	set,
	connectionError,
	isDetailPage,
	shelfDetail,
	shelf,
}) => {
	const [shelves, setShelves] = useState([]);

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
					.get("shelf/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setShelves(response.data))
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					logout();
				} else connectionError();
			});
	}, []);

	return (
		<Grid item xs={12} sm={6} md={4}>
			{isDetailPage ? (
				<TextField
					variant="outlined"
					fullWidth
					id="shelf"
					label="Estante"
					value={shelfDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="select-shelf-label">Estante</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-shelf-label"
						label="Estante"
						id="select-shelf"
						value={shelf}
						onChange={handleChange}
						renderValue={(value) => `${value.number}`}
					>
						<MenuItem value="">
							<em>Nenhuma</em>
						</MenuItem>

						{shelves.map((shelfOption) => (
							<MenuItem key={shelfOption.id} value={shelfOption}>
								{shelfOption.number}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Grid>
	);
};

ShelfInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
	shelfDetail: PropTypes.string.isRequired,
	shelf: PropTypes.string.isRequired,
};

export default ShelfInput;
