// import React, { useState } from "react";
// import Alert from "@material-ui/lab/Alert";
// import { axiosArchives } from "../../Api";

// export default function CreateShelf() {
// 	const [numberE, setNumberE] = useState(0);
// 	const [numberP, setNumberP] = useState(0);

// 	const [show, setShow] = useState(false);
// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);

// 	const [showError, setShowError] = useState(false);
// 	const handleCloseError = () => setShowError(false);
// 	const handleShowError = () => setShowError(true);

// 	const onClick = () => {
// 		axiosArchives.post(`shelf`, {
// 			shelfe_number: numberE,
// 			shelfp_number: numberP,
// 		})
// 			.then(() => {
// 				handleShow();
// 				setTimeout(handleClose, 3000);
// 			})
// 			.catch(() => {
// 				handleShowError();
// 				setTimeout(handleCloseError, 3000);
// 			});
// 	};

// 	const [fields] = useState([
// 		{
// 			type: "number",
// 			placeholder: "Estante",
// 			setState: setNumberE,
// 		},
// 		{
// 			type: "number",
// 			placeholder: "Prateleira",
// 			setState: setNumberP,
// 		},
// 	]);

// 	return (
// 		<div className="create-form-container">
// 			{show === true ? <Alert severity="success">Campo cadastrado!</Alert> : ""}
// 			{showError === true ? <Alert severity="error">Erro de conexão!</Alert> : ""}
// 		</div>
// 	);
// }
