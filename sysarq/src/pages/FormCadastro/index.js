import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./styles.css";

function FormCadastro({
    title,
    subtitle,
    fields,
    onClickBtn,
}) {

    const useStyles = makeStyles({
        input: {
            width: "100%",
            height: 36,
            marginBottom: "1rem",
            maxWidth: 908,
            color: "red",
        },
    });
    // const label = { inputProps: { 'Montserrat': 'Checkbox demo' } };
    const classes = useStyles();

    const [multiSelectValue] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

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
                                            value={item.state}
                                            onChange={({ target }) => item.setState(target.value)}
                                            label="Age"
                                        >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {
                                            item.options && (
                                                item.options.map((option) =>
                                            <MenuItem value={option.value} key={option.value}>
                                                <em>{option.description}</em>
                                            </MenuItem>)
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                );
                                break;

                                case "select":
                                    input=(
                                        <FormControl variant="standard" className={classes.input}>
                                            <InputLabel>{item.placeholder}</InputLabel>
                                            <Select onChange={({target}) => item.setState(target.value)} value={item.state}>
                                                {
                                                    item.options.map((option) =>   
                                                            <MenuItem value={option}>
                                                                <em>{option}</em>
                                                            </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    );
                                break;

                            case "multi-select":
                                input = (

                                    <FormControl variant="standard" className={classes.input} sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel>{item.placeholder}</InputLabel>
                                        <Select
                                            multiple
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard-label"
                                            value={multiSelectValue}
                                            renderValue={(selected) => selected.join(', ')}
                                            onChange={({ target }) => item.setState([...target.value])}
                                        >
                                        <MenuItem disabled value=""><em>None</em></MenuItem>
                                        {
                                            item.options && (
                                                item.options.map((option) =>
                                            <MenuItem value={option.value} key={option.value}>
                                                <em>{option.description}</em>
                                            </MenuItem>)
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                );
                                
                                break;

                            case "date":
                                input = (
                                    <FormControl variant="standard">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date picker inline"
                                                value={selectedDate}
                                                onChange={(dateS) => {
                                                    const day = dateS.getDate();
                                                    const month = dateS.getMonth();
                                                    const year = dateS.getFullYear();
                                                    const stringDate = `${year}-${month}-${day}`;
                                                    item.setState(stringDate);
                                                    setSelectedDate(stringDate);
                                                }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                    
                                );
                                break;

                            case "checkbox":
                                input = (
                                    <FormControl component="fieldset">
                                    <FormGroup column>
                                        <FormControlLabel
                                        className={classes.input}
                                        control={<Checkbox defaultChecked color="default" />}
                                        label={item.placeholder}
                                        labelPlacement="end"
                                        />
                                    </FormGroup>
                                    </FormControl>
                                );
                                break;

                            case "number":
                                input = (
                                <TextField
                                    className={classes.input}
                                    label={item.placeholder}
                                    type="number"
                                    onChange={({ target }) => item.setState(target.value)}
                                    
                                />);
                            
                                break;

                            default:
                                input = (
                                    <TextField
                                        label={item.placeholder}
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
    onClickBtn: PropTypes.func.isRequired,
};

export default FormCadastro;