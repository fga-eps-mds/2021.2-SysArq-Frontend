import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

import { axiosArchives } from "../../../Api";

const AbbreviationInput = ({ set, connectionError, abbreviation }) => {
	const [abbreviations, setAbbreviations] = useState([]);

	const handleChange = (event) => set(event.target.value);

	useEffect(() => {
		axiosArchives
			.get("box-abbreviation/")
			.then((response) => setAbbreviations(response.data))
			.catch(() => connectionError());
	}, []);

	return (
		<Grid item xs={12} sm={12} md={4}>
			<FormControl fullWidth>
				<InputLabel id="select-abbreviation-label">Sigla da Caixa</InputLabel>
				<Select
					style={{ textAlign: "left" }}
					labelId="select-abbreviation-label"
					id="select-abbreviation"
					value={abbreviation}
					onChange={handleChange}
					renderValue={(value) => `${value.abbreviation}`}
				>
					<MenuItem value="">
						<em>Nenhuma</em>
					</MenuItem>

					{abbreviations.map((abbreviationOption) => (
						<MenuItem key={abbreviationOption.id} value={abbreviationOption}>
							{abbreviationOption.abbreviation}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};

AbbreviationInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	abbreviation: PropTypes.string.isRequired,
};

export default AbbreviationInput;
