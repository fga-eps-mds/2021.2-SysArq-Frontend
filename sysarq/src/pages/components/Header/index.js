import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StarsIcon from "@material-ui/icons/Stars";

import "./styles.css";

import imgFolders from "../../../assets/folders.png";

function Header() {
	return (
		<div className="header">
			<a href="/">
				<img src={imgFolders} alt="Logo" />
			</a>

			<input type="checkbox" id="bt_menu" />
			<label htmlFor="bt_menu">&#9776;</label>

			<div className="div-media">
				<ul>
					<li>
						<a href="/">Pesquisar</a>
					</li>
					<li>
						<a href="/fields-register">Campos</a>
					</li>
					<li>
						<a href="/documents-register">Cadastro</a>
					</li>
					<li>
						<a href="/">Configurações</a>
					</li>
					<li>
						<a href="/">Relatório</a>
					</li>
					<li>
						<a href="/">Sair</a>
					</li>
				</ul>
			</div>

			<BottomNavigation showLabels>
				<BottomNavigationAction
					label="Pesquisar"
					href="/"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Campos"
					href="/fields-register"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Cadastro"
					href="/documents-register"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Configurações"
					href="#"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Relatório"
					href="#"
					icon={<StarsIcon />}
				/>
			</BottomNavigation>
			<button type="submit">Sair</button>
		</div>
	);
}

export default Header;
