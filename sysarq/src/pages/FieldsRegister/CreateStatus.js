// import React, { useState, useEffect } from "react";
// import FormCadastro from "../FormCadastro";
// import { axiosArchives } from "../../Api";

// export default function CreateStatus() {
//     const [status, setStatus] = useState("ARQUIVADO");
//     const [Eliminated, setEliminated] = useState("ELIMINADO");
//     const [sentFrom, setSentFrom] = useState("");
//     const [requestedDocument, setRequestedDocument] = useState("");
//     const [sendDate, setSendDate] = useState("");
//     const [fields, setFields] = useState([
//         {
//             type: "select",
//             placeholder: "Situação de arquivamento",
//             setState: setStatus,
//             options: ["ARQUIVADO", "DESARQUIVADO"],
//         },
//         {
//             type: "select",
//             placeholder: "Situação de armazenamento",
//             setState: setEliminated,
//             options: ["ARMAZENADO", "ELIMINADO"],
//         },

//     ]);

//     const onSubmit = () => {
//         console.log(status)
//         console.log(Eliminated)
//         console.log(sentFrom)
//         console.log(requestedDocument)
//         console.log(sendDate)
//         axiosArchives
//             .post(`status/`, {
//                 is_filed: true,
//                 eliminated: false,
//                 sent_from: sentFrom,
//                 requested_document: requestedDocument,
//                 send_date: sendDate,
//             })
//             .then(() => { })
//             .catch(() => { });
//     };

//     useEffect(() => {
//         if (status === "DESARQUIVADO") {
//             setFields([
//                 ...fields,
//                 {
//                     type: "text",
//                     placeholder: "Enviado por:",
//                     setState: setSentFrom,
//                 },
//                 {
//                     type: "text",
//                     placeholder: "Documento que solicitou o desarquivamento:",
//                     setState: setRequestedDocument,
//                 },
//                 {
//                     type: "text",
//                     placeholder: "Data de envio:",
//                     setState: setSendDate,
//                 },
//             ])
//         } else if (status === "ARQUIVADO") {
//             setFields([
//                 {
//                     type: "select",
//                     placeholder: "Situação de arquivamento",
//                     setState: setStatus,
//                     options: ["ARQUIVADO", "DESARQUIVADO"],
//                 },
//                 {
//                     type: "select",
//                     placeholder: "Situação de armazenamento",
//                     setState: setEliminated,
//                     options: ["ARMAZENADO", "ELIMINADO"],
//                 },
//             ])
//         }
//     }, [status])

//     return (

//         <div className="create-form-container">
//             <FormCadastro
//                 title="Arquivo Geral da Policia Civil de Goiás"
//                 subtitle="Cadastrar Status de encaminhamento"
//                 fields={fields}
//                 onClickBtn={onSubmit}
//             />

//         </div>
//     );

// }
