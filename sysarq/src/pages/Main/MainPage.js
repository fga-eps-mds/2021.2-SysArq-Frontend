import React from "react";


import imgBox from "../assets/logo.png";

import MenuCard from "../components/MenuCard";
import CardContainer from "../components/Container/CardContainer";

import "./MainPage.css";

export default function MainPage() {

	return (
		<body id="body">
			<section>
				<img id="logo" src={imgBox} alt="Logo" />
				<h1 id="search_title">Arquivo Geral da Polícia Civil de Goiás</h1>

                <CardContainer title="Documentos" spacing={2}>
                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                        <MenuCard
                            icon="administrative-process-icon"
                            title="Processo Administrativo"
                            url="/documents/administrative-process"						
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Conjunto de documentos anexados em uma capa branca ou amarela,<br/>
                            identificados em etiquetas, através de numeração de geralmente<br/>
                            quinze (15) números, assunto e outras informações.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -15}}>
                        <MenuCard
                            icon="frequency-relation-icon"
                            title="Relação de Frequências"
                            url="/documents/frequency-relation"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Documento que relaciona os servidores de alguma unidade policial<br/>
                            ou administrativa, que terão as frequências de determinado<br/>
                            período arquivadas.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -70 }}>
                        <MenuCard
                            icon="frequency-sheet-icon"
                            title="Folha de Frequências"
                            url="/documents/frequency-sheet"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85 }} >
                            Folha individual do servidor referente a sua assiduidade,<br/>
                            encaminhada por sua unidade policial/administrativa, através<br/>
                            da relação de frequência.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: 60 }}>
                        <MenuCard
                            icon="box-archiving-icon"
                            title="Arquivamento de Caixas"
                            url="/documents/box-archiving"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Conjunto de documentos acondicionado em uma caixa tipo box,<br/>
                            geralmente de cor azul, constando: numeração seguida do ano de arquivamento,<br/>
                            assunto(s), data(s) de produção do documento e unidade que encaminhou,<br/>
                            que serão arquivadas.
                        </h4>	
                    </div>
                </CardContainer>

                <CardContainer title="Campos Obrigatórios" spacing={2}>
                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                        <MenuCard
                            icon="document-name-icon"
                            title="Nome do Documento"
                            url="/fields/document-name"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Campo que dá nome ao documento, tanto quanto ao tipo de documento<br/>
                            (Ex: Oficio , Processo , Despacho), quanto ao assunto do documento<br/>
                            (Ex: Ajuda de Custo, Exoneração, Licença), seguida da temporalidade do<br/>
                            documento, que é o período de validade do documento.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -120 }}>
                        <MenuCard
                            icon="unit-icon"
                            title="Unidade"
                            url="/fields/unity"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Nome da unidade policial e seus vínculos administrativos,<br/>
                            seguido das siglas de cada unidade. Consultar Lista telefônica<br/>
                            do site da Policia Civil: 
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -116 }}>
                        <MenuCard
                            icon="abbreviation-icon"
                            title="Sigla da Caixa"
                            url="/fields/box-abbreviation"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Nome da capa de rosto das caixas box que são arquivados os<br/>
                            processos e documentos.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -15 }}>
                        <MenuCard
                            icon="shelf-rack-icon"
                            title="Localidade do Documento"
                            url="/fields/shelf"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Local onde as caixas box estão arquivadas fisicamente,<br/>
                            tanto na unidade do arquivo, quanto nas estantes e prateleiras.
                        </h4>	
                    </div>

                    <div style={{ display: "flex", marginTop: 10, marginBottom: 10, marginLeft: -155 }}>
                        <MenuCard
                            icon="public-worker-icon"
                            title="Servidor"
                            url="/fields/public-worker"
                            lg={3}
                        />
                        <h4 style={{ marginLeft: 15, textAlign: "left", marginTop: 85}}>
                            Identificação do servidor da Polícia Civil, o CPF é<br/>
                            obrigatório ( Dica: na folha de frequência localiza o CPF)
                        </h4>	
                    </div>


                </CardContainer>

                

				
			</section>
		</body>
	);
}
