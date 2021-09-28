import "./Search.css"
import { Button, TextField } from "@material-ui/core";

export default function Search() {
	return (
		<div>
			<body>
			<h1 id="Search_title">Arquivo Geral da Polícia Civil do Goiás</h1>
			<Button
			color="primary"
			variant="contained"
			id="button"
			size="small"
			>
				Buscar
			</Button>
			
			<Button
			color="primary"
			variant="contained"
			id="button"
			size="small"
			>
				filtros
			</Button>

			<TextField
        		id="input"
        		label="Pesquisar:"
        		variant="outlined"
				type="filled"
        	/>
	
			{/* <TextField
				label="Pesquisar:"
				variant="filled"
				id="input"
			/> */}
			</body>
		</div>);
}