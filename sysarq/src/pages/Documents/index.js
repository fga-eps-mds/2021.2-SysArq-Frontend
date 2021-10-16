import CardContainer from "../components/Container/CardContainer";
import MenuCard from "../components/MenuCard";

const Documents = () => (
	<CardContainer title="Documentos" spacing={2}>
		<MenuCard
			icon="administrative-process-icon"
			title="Processo Administrativo"
			url="/documents/administrative-process/create"
			lg={3}
		/>
		<MenuCard
			icon="frequency-relation-icon"
			title="Relação de Frequências"
			url="/documents/frequency-relation/create"
			lg={3}
		/>
		<MenuCard
			icon="frequency-sheet-icon"
			title="Folha de Frequências"
			url="/documents/frequency-sheet/create"
			lg={3}
		/>
		<MenuCard
			icon="archiving-relation-icon"
			title="Relação de Arquivamento"
			url="/documents/archiving-relation/create"
			lg={3}
		/>
	</CardContainer>
);

export default Documents;
