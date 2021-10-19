import React from "react";
import { Paper, TextField, Grid, Container } from "@material-ui/core";
import PopUpAlert from "../components/PopUpAlert";

export default function createForm(
	fields,
	title,
	subtitle,
	classes,
	onClick,
	openAlert,
	handleAlertClose,
	severityAlert,
	alertHelperText,
	isBox
) {
	return (
		<div className="create-form-container">
			<Paper className="form-cadastro-container" elevation={10}>
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
				<div className="inputs-container">
					<Container className="container">
						<Grid container spacing={2}>
							{fields.map((item, key) => {
								const input = (
									<Grid item xs={12} sm={12} md={12} key={key.toString()}>
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
											className={
												item.type !== "date" || isBox != null
													? classes.input
													: classes.inputDate
											}
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
				<button data-testid="click" type="button" onClick={onClick}>
					CADASTRAR
				</button>
			</Paper>
			<PopUpAlert
				open={openAlert}
				handleClose={handleAlertClose}
				severity={severityAlert}
				helperText={alertHelperText}
			/>
		</div>
	);
}
