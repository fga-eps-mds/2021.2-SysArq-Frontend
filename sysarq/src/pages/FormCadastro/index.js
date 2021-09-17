import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./styles.css";

function FormCadastro({
    title,
    subtitle,
    fields,
    onClickBtn,
}) {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };

    const useStyles = makeStyles({
        input: {
            width: "100%",
            height: 36,
            marginBottom: "1rem",
            maxWidth: 908,
            color: "red",
        },
    });

    const classes = useStyles();

    return (
        <Paper className="form-cadastro-container" elevation={10}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <div className="inputs-container">
                {
                    fields.map((item) => {
                        let input;

                        switch(item.type) {
                            case "id":
                                input = (
                                    
                                    <FormControl variant="standard" className={classes.input} sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel>{item.placeholder}</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard-label"
                                        value={age}
                                        onChange={handleChange}
                                        label="Age"
                                        >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        </Select>
                                    </FormControl>
                                );
                                break;

                            default:
                                input = (
                                    <TextField
                                        placeholder={item.placeholder}
                                        onChange={({ target }) => item.setState(target.value)}
                                        className={classes.input}
                                    />
                                );
                                break;
                        }

                        return input;
                    })
                }
            </div>
            <button
                data-testid="click" 
                type="button" 
                onClick={onClickBtn}
            >
                CADASTRAR
            </button>
        </Paper>
    );
}

FormCadastro.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(Object).isRequired,
    onClickBtn: PropTypes.func.isRequired
};

export default FormCadastro;