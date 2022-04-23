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

const RackInput = ({
	set,
	connectionError,
	isDetailPage,
	rackDetail,
	rack,
}) => {
	const [racks, setRacks] = useState([]);

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
					.get("rack/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => setRacks(response.data))
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
					id="rack"
					label="Prateleira"
					value={rackDetail}
					inputProps={{ readOnly: true }}
				/>
			) : (
				<FormControl fullWidth variant="outlined">
					<InputLabel id="select-rack-label">Prateleira</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-rack-label"
						label="Prateleira"
						id="select-rack"
						value={rack}
						onChange={handleChange}
						renderValue={(value) => `${value.number}`}
					>
						<MenuItem value="">
							<em>Nenhuma</em>
						</MenuItem>

						{racks.map((rackOption) => (
							<MenuItem key={rackOption.id} value={rackOption}>
								{rackOption.number}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Grid>
	);
};

RackInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	isDetailPage: PropTypes.bool.isRequired,
	rackDetail: PropTypes.string.isRequired,
	rack: PropTypes.string.isRequired,
};

export default RackInput;
