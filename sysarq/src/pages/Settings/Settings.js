import React from "react";
import MenuCard from "../components/MenuCard";
import CardContainer from "../components/Container/CardContainer";


import "./Settings.css";

export default function Settings() {

	return (
		<body id="body">
			<section>


				<CardContainer title="Configurações" spacing={2}>
					<MenuCard
						icon="CreateUser"
						title="Cadastro de usuários"
						url="/register-user"
						lg={6}
					/>
					<MenuCard
						icon="Settings"
						title="Gerenciamento de usuários"
						url="/settings"
						lg={6}
					/>
				</CardContainer>

			</section>
		</body>
	);
}
