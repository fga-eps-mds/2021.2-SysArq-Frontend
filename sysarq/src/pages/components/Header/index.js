import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StarsIcon from "@material-ui/icons/Stars";
import { logout } from "../../../support";
import "./styles.css";

import imgFolders from "../../../assets/logo.png";

function Header() {
	if (
		window.location.pathname === "/login" ||
		window.location.pathname === "/login/"
	)
		return null;

	return (
		<div className="header">
			<a href="/">
				<img src={imgFolders} alt="Logo" height="40" width="40" />
			</a>

			<input type="checkbox" id="bt_menu" />
			<label htmlFor="bt_menu">&#9776;</label>

			<div className="div-media">
				<ul>
					<li>
						<a href="/documents">Cadastro</a>
					</li>
					<li>
						<a href="/search">Pesquisar</a>
					</li>
					<li>
						<a href="/fields">Campos</a>
					</li>
					<li>
						<a href="/">Relatório</a>
					</li>
					<li>
						<a href="/Config">Configurações</a>
					</li>
					<li>
						<a onClick={logout} href="/login">
							Sair
						</a>
					</li>
				</ul>
			</div>

			<BottomNavigation showLabels>
				<BottomNavigationAction
					label="Cadastro"
					href="/documents"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Pesquisar"
					href="/search"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Campos Obrigatórios"
					href="/fields"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Relatório"
					href="#"
					icon={<StarsIcon />}
				/>
				<BottomNavigationAction
					label="Configurações"
					href="/Settings"
					icon={<StarsIcon />}
				/>
			</BottomNavigation>
			<button type="submit" onClick={logout}>
				Sair
			</button>
		</div>
	);
}

export default Header;
