import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StarsIcon from '@material-ui/icons/Stars';

import "./styles.css";

import imgFolders from "../../../assets/folders.png";

function Header() {
    return (
        <div className="header">
            <a
                href="/"
            >
                <img
                    src={imgFolders}
                    alt="Logo"
                />
            </a>
            <BottomNavigation showLabels>
                <BottomNavigationAction label="Pesquisar"  href="/" icon={<StarsIcon />} />
                <BottomNavigationAction label="Campos" href="/fields-register" icon={<StarsIcon />} />
                <BottomNavigationAction label="Cadastro" href="/documents-register" icon={<StarsIcon />} />
                <BottomNavigationAction label="Configurações" href="#" icon={<StarsIcon />} />
                <BottomNavigationAction label="Relatório" href="#" icon={<StarsIcon />} />
            </BottomNavigation>
            <button
                type="submit"
            >
                Sair
            </button>
        </div>
    );
}

export default Header;
