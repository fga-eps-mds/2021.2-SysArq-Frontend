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

const DocumentInput = ({
    set,
    connectionError,
    isDetailPage,
    documentDetail,
    document,
}) => {
    const [documents, setDocuments] = useState([]);

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
                    .get("document-name/", {
                        headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
                    })
                    .then((response) => setDocuments(response.data))
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
                    id="document"
                    label="nome do documento"
                    value={documentDetail}
                    inputProps={{ readOnly: true }}
                />
            ) : (
                <FormControl fullWidth>
                    <InputLabel id="select-document-label">Nome do Documento</InputLabel>
                    <Select
                        style={{ textAlign: "left" }}
                        labelId="select-document-label"
                        id="select-document"
                        value={document}
                        onChange={handleChange}
                        renderValue={(value) => `${value.document_name}`}
                    >
                        <MenuItem value="">
                            <em>Nenhuma</em>
                        </MenuItem>

                        {documents.map((documentOption) => (
                            <MenuItem key={documentOption.id} value={documentOption}>
                                {documentOption.document_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Grid>
    );
};

DocumentInput.propTypes = {
    set: PropTypes.func.isRequired,
    connectionError: PropTypes.func.isRequired,
    isDetailPage: PropTypes.bool.isRequired,
    documentDetail: PropTypes.string.isRequired,
    document: PropTypes.string.isRequired,
};

export default DocumentInput;
