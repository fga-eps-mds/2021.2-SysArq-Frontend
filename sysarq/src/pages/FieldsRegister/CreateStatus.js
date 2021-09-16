import React, { useState } from "react";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const hostApi = `${process.env.REACT_APP_URL_API}status/`;

const useStyles = makeStyles({
	fields: {
		marginTop: 20,
		marginBotton: 20,
		display: "block",
	},
});

export default function CreateStatus() {
	const [status, setStatus] = useState("ARQUIVADO");
	const [eliminated, setEliminated] = useState("ELIMINADO");
	const [sentFrom, setSentFrom] = useState("");
	const [requestedDocument, setRequestedDocument] = useState("");
	const [sendDate, setSendDate] = useState("");
	const classes = useStyles();

	const onChangeStatus = (event) => {
		setStatus(event.target.value);
	};
	const onChangeEliminated = (event) => {
		setEliminated(event.target.value);
	};
	const onChangeSentFrom = (event) => {
		setSentFrom(event.target.value);
	};
	const onChangeRequestedDocument = (event) => {
		setRequestedDocument(event.target.value);
	};
	const onChangeSendDate = (event) => {
		setSendDate(event.target.value);
	};

	const onClick = () => {
		axios
			.post(hostApi, {
				filed: status === "ARQUIVADO",
				eliminated: eliminated === "ELIMINADO",
				sent_from: sentFrom,
				requested_document: requestedDocument,
				send_date: sendDate,
			})
			.then(() => {})
			.catch(() => {});
	};

	return (
		<div>
			<h1>Status</h1>

			<select
				data-testid="statusID"
				className={classes.fields}
				label="Status"
				onChange={onChangeStatus}
			>
				<option>ARQUIVADO</option>
				<option value="DESARQUIVADO">DESARQUIVADO</option>
			</select>

			<select
				data-testid="eliminado"
				className={classes.fields}
				label="Eliminado ?"
				onChange={onChangeEliminated}
			>
				<option>ATIVO</option>
				<option value="ELIMINADO">ELIMINADO</option>
			</select>

			{status === "DESARQUIVADO" && (
				<div>
					<input
						data-testid="enviado-por"
						onChange={onChangeSentFrom}
						type="unity_that_forwarded"
						value={sentFrom}
						placeholder="Enviado por"
						variant="filed"
					/>
					<input
						data-testid="requisitado"
						onChange={onChangeRequestedDocument}
						type="document_requested"
						value={requestedDocument}
						placeholder="Documento que solicito o desarquivamento"
						variant="filed"
					/>
					<input
						data-testid="data-envio"
						onChange={onChangeSendDate}
						type="send_date"
						value={sendDate}
						placeholder="Data de envio"
						variant="filed"
					/>
				</div>
			)}

			<Button
				data-testid="click"
				onClick={onClick}
				style={{ marginTop: "20px" }}
				variant="contained"
				color="primary"
			>
				Salvar
			</Button>
		</div>
	);
}
