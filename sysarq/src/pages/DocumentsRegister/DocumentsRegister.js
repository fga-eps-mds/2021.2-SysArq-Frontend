import ButtonCard from "./ButtonCard";
import "./DocumentRegister.css"



export default function DocumentsRegister() {


	return (
			<paper className="form-cards-container" elevation={10}>
				<h1>Arquivo Geral da Polícial Civil de Goiás</h1>
					<h2>Tipos de documentos para cadastro</h2>
						<div className="card-container">
							<ButtonCard
							icon="icone-processo"
							title="Processo Administrativo"
							createUrl="/create-administrative-process"
							/>
					
							<ButtonCard
								icon="icone-frequencia"
								title="Relação de Frequências"
								createUrl="/create-frequency-relation"
							/>
					
				
							<ButtonCard
							icon="icone-folha"
							title="Folha de Frequências"
							createUrl="/create-frequency-document"
							
							/>
				
							<ButtonCard
							icon="icone-arquivar"
							title="Relação de Arquivamento"
							createUrl="/create-archiving-relation"
							/>
						</div>
				
			
			</paper>		
		
	);
}
