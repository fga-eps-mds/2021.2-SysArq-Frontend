import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';


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