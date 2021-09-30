import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

import { axiosArchives, axiosProfile } from "../../../Api";

const RackInput = ({ set, connectionError, rack }) => {
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
					.get("rack/")
					.then((response) => setRacks(response.data))
					.catch(() => connectionError());
			})
			.catch(() => {});
	}, []);

	return (
		<Grid item xs={12} sm={6} md={4}>
			<FormControl fullWidth>
				<InputLabel id="select-rack-label">Prateleira</InputLabel>
				<Select
					style={{ textAlign: "left" }}
					labelId="select-rack-label"
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
		</Grid>
	);
};

RackInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	rack: PropTypes.string.isRequired,
};

export default RackInput;
