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

	const userType = localStorage.getItem("user_type");

	return (
		<div className="header">
      <img src={imgFolders} alt="Logo" height="40" width="40" />

			<input type="checkbox" id="bt_menu" />
			<label htmlFor="bt_menu">&#9776;</label>

			<div className="div-media">
				<ul>
					<li>
						<a href="/">Pesquisar</a>
					</li>

					{(userType === "AD" || userType === "AL") && (
						<li>
							<a href="/documents">Cadastro</a>
						</li>
					)}

					{(userType === "AD" || userType === "AL") && (
						<li>
							<a href="/fields">Campos</a>
						</li>
					)}

					{userType === "AD" && (
						<li>
							<a href="/report">Relatório</a>
						</li>
					)}

					{userType === "AD" && (
						<li>
							<a href="/settings">Configurações</a>
						</li>
					)}
          <li>
            <a href="/manual">Manual</a>
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
					label="Pesquisar"
					href="/"
					icon={<StarsIcon />}
				/>
				{(userType === "AD" || userType === "AL") && (
					<BottomNavigationAction
						label="Cadastro"
						href="/documents"
						icon={<StarsIcon />}
					/>
				)}
				{(userType === "AD" || userType === "AL") && (
					<BottomNavigationAction
						label="Campos Obrigatórios"
						href="/fields"
						icon={<StarsIcon />}
					/>
				)}
				{userType === "AD" && (
					<BottomNavigationAction
						label="Relatório"
						href="/report"
						icon={<StarsIcon />}
					/>
				)}
				{userType === "AD" && (
					<BottomNavigationAction
						label="Configurações"
						href="/settings"
						icon={<StarsIcon />}
					/>
				)}
				<BottomNavigationAction
					label="Manual"
					href="/manual"
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
