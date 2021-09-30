import MenuCard from "../components/MenuCard/Documents";
import DocumentsContainer from "../components/Container/DocumentsContainer";

// TO-DO: Fundir os tipos de MenuCard

const Documents = () => (
	<DocumentsContainer title="Documentos" spacing={2}>
		<MenuCard
			icon="administrative-process-icon"
			title="Processo Administrativo"
			url="/documents/administrative-process/create"
		/>
		<MenuCard
			icon="frequency-relation-icon"
			title="Relação de Frequências"
			url="/documents/frequency-relation/create"
		/>
		<MenuCard
			icon="frequency-sheet-icon"
			title="Folha de Frequências"
			url="/documents/frequency-sheet/create"
		/>
		<MenuCard
			icon="archiving-relation-icon"
			title="Relação de Arquivamento"
			url="/documents/archiving-relation/create"
		/>
	</DocumentsContainer>
);

export default Documents;
