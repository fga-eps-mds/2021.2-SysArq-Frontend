import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Paper, TextField, Grid, Container } from "@material-ui/core";

export default function createForm(
	fields,
	title,
	subtitle,
	classes,
	show,
	showError,
	onClick
) {
	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? (
				<Alert severity="error">Erro de conexão!</Alert>
			) : (
				""
			)}
			<Paper className="form-cadastro-container" elevation={10}>
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
				<div className="inputs-container">
					<Container className="container">
						<Grid container spacing={2}>
							{fields.map((item, key) => {
								const input =
									item.type !== "date" ? (
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
												className={classes.input}
												inputProps={{ maxLength: "100" }}
											/>
										</Grid>
									) : (
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
												className={classes.inputDate}
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
		</div>
	);
}

export function createForm2(
	fields,
	title,
	subtitle,
	classes,
	show,
	showError,
	onClick,
	isBox
) {
	return (
		<div className="create-form-container">
			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
			{showError === true ? (
				<Alert severity="error">Erro de conexão!</Alert>
			) : (
				""
			)}
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
											className={classes.input}
											helperText={isBox ? item.helperText : null}
											error={isBox ? item.error : null}
											inputProps={{ maxLength: "100" }}
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
		</div>
	);
}
