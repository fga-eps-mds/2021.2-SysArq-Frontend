import React from "react";
import {
	Paper,
	TextField,
	Grid,
	Container,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import PopUpAlert from "../components/PopUpAlert";
import DataTable from "../components/DataTable";
import FieldsCreate from "../components/Actions/FieldsCreate";
import AutoComplete from "../components/AutoComplete";

export default function createForm(
	fields,
	title,
	subtitle,
	classes,
	checked,
	onClick,
	openAlert,
	handleAlertClose,
	handleChange,
	severityAlert,
	alertHelperText,
	listaTitle,
	listaUrl,
	clear
) {
	return (
		<>
			<div className="create-form-container">
				<Paper className="form-cadastro-container" elevation={10}>
					<h1>{title}</h1>
					<h2>{subtitle}</h2>
					<div className="inputs-container">
						<Container className="container">
							<Grid container spacing={2}>
								{fields.map((item, key) => {
									if (item.placeholder === "CPF*") {
										const input = (
											<Grid item xs={12} sm={12} md={12} key={key.toString()}>
												<InputMask
													mask="999.999.999-99"
													id={item.placeholder}
													label={item.placeholder}
													type={item.type}
													value={item.value}
													onChange={(event) => {
														item.setValue(event.target.value);
														item.setHelperText("");
														item.setError(false);
													}}
													className={classes.input}
													inputProps={{ maxLength: "100" }}
													helperText={item.helperText}
													error={item.error}
												>
													<TextField variant="outlined" />
												</InputMask>
											</Grid>
										);
										return input;
									}
									if (item.placeholder === "Temporalidade (anos)*") {
										const input = (
											<Grid item xs={12} sm={12} md={12} key={key.toString()}>
												<FormControlLabel
													label="Permanente"
													control={
														<Checkbox
															checked={checked}
															onChange={handleChange}
														/>
													}
												/>
												<TextField
													id={item.placeholder}
													label={item.placeholder}
													type={item.type}
													value={item.value}
													onChange={(event) => {
														item.setValue(event.target.value);
														item.setHelperText("");
														item.setError(false);
													}}
													className={classes.input}
													inputProps={{ maxLength: "100" }}
													disabled={checked}
													helperText={item.helperText}
													error={item.error}
                        />
											</Grid>
										);
										return input;
									}
									if (item.options) {
										const input = (
											<Grid item xs={12} sm={12} md={12} key={key.toString()}>
												<AutoComplete
													value={item.value}
													handleValueChange={(event, newValue) =>
														item.setValue(newValue)
													}
													options={item.options}
													optionsLabel={(option) => `${option}`}
													label={item.placeholder}
													helperText={item.helperText}
													type={item.type}
													freeField
													className={classes.input}
												/>
											</Grid>
										);
										return input;
									}
									const input = (
										<Grid item xs={12} sm={12} md={12} key={key.toString()}>
											<TextField
												variant="outlined"
												id={item.placeholder}
												label={item.placeholder}
												type={item.type}
												value={item.value}
												onChange={(event) => {
													item.setValue(event.target.value);
													item.setHelperText("");
													item.setError(false);
												}}
												className={classes.input}
												inputProps={{ maxLength: "100" }}
												helperText={item.helperText}
												error={item.error}
											/>
										</Grid>
									);
									return input;
								})}
							</Grid>
						</Container>
					</div>
					<FieldsCreate onSubmit={onClick} clearFunc={clear} />
				</Paper>
				<PopUpAlert
					open={openAlert}
					handleClose={handleAlertClose}
					severity={severityAlert}
					helperText={alertHelperText}
				/>
			</div>

			<div style={{ marginBottom: "100px" }}>
				<DataTable title={listaTitle} url={listaUrl} />
			</div>
		</>
	);
}
