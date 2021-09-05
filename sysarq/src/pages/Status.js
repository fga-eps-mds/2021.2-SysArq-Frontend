import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";


const useStyles = makeStyles({
    fields: {
        marginTop: 20,
        marginBotton: 20,
        display: 'block'
    }
})

export default function CreateStatus() {
	const [status, setStatus] = useState("ARQUIVADO");
    const [sentFrom, setSentFrom] = useState("");
    const [requestedDocument, setRequestedDocument] = useState("");
    const [sendDate, setSendDate] = useState("");
	const classes = useStyles();

	const onChangeStatus = (event) => {
		setStatus(event.target.value);
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
			.post("http://0.0.0.0:8002/status/", {
				filed: status,
				unity_that_forwarded: sentFrom,
				document_requested: requestedDocument,
				send_date: sendDate,
			})
			.then((response) => {
				// eslint-disable-next-line
				console.log("RESPOSTA", response);
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.log("ERROR", error.response);
			})
			.then(() => {});
	};


	return (
		<div>
		<h1>Status</h1>

		<select
			className={classes.fields}
			label="Status"
			onChange={onChangeStatus}
		>
			<option>ARQUIVADO</option>
			<option>DESARQUIVADO</option>
		</select>

		{
			status === "DESARQUIVADO" && (
				<div>
				<TextField
						className={classes.fields}
						onChange={onChangeSentFrom}
						type="unity_that_forwarded"
						value={sentFrom}
						placeholder="Eviado por"
						variant="filed"
					/>
					<TextField
						className={classes.fields}
						onChange={onChangeRequestedDocument}
						type="document_requested"
						value={requestedDocument}
						placeholder="Documento que solicito o desarquivamento"
						variant="filed"
					/>
					<TextField
						className={classes.fields}
						onChange={onChangeSendDate}
						type="send_date"
						value={sendDate}
						placeholder="Data de envio"
						variant="filed"
					/>
				</div>
			)
		}

		<Button
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