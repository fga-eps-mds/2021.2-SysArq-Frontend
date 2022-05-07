import React from "react";

import Grid from "@material-ui/core/Grid";

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

				<CardContainer title="Campos Obrigatórios" spacing={2}>
					<h3 style={{ color: "#666666" }}>
						Cadastro de informações obrigatórias, que dão suporte ao Menu
						Cadastro
					</h3>
					<Grid>
						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								paddingTop: 20,
								marginLeft: -60,
							}}
						>
							<MenuCard
								icon="document-name-icon"
								title="Nome do Documento"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Nome do Documento
								</h2>
								<p style={{ textAlign: "left" }}>
									Campo que dá nome ao documento, tanto quanto ao tipo de
									documento
									<br />
									(Ex: Oficio , Processo , Despacho), quanto ao assunto do
									documento
									<br />
									(Ex: Ajuda de Custo, Exoneração, Licença), seguida da
									temporalidade do
									<br />
									documento, que é o período de validade do documento.
								</p>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								marginLeft: -60,
							}}
						>
							<MenuCard icon="unit-icon" title="Unidade" url="" lg={3} />
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>Unidade</h2>
								<p style={{ textAlign: "left" }}>
									Nome da unidade policial e seus vínculos administrativos,
									<br />
									seguido das siglas de cada unidade. Consultar Lista telefônica
									<br />
									do site da{" "}
									<a
										href="https://www.policiacivil.go.gov.br/wp-content/uploads/2020/02/lista-dp-fevereiro.pdf"
										style={{ textDecoration: "none" }}
									>
										{" "}
										Polícia Civil.{" "}
									</a>
								</p>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								marginLeft: -60,
							}}
						>
							<MenuCard
								icon="abbreviation-icon"
								title="Sigla da Caixa"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Sigla da Caixa
								</h2>
								<p style={{ textAlign: "left" }}>
									Nome da capa de rosto das caixas box que são arquivados os
									<br />
									processos e documentos.
								</p>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								marginLeft: -60,
							}}
						>
							<MenuCard
								icon="shelf-rack-icon"
								title="Localidade do Documento"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Localidade do Documento
								</h2>
								<p style={{ textAlign: "left" }}>
									Local onde as caixas box estão arquivadas fisicamente,
									<br />
									tanto na unidade do arquivo, quanto nas estantes e
									prateleiras.
								</p>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								marginLeft: -60,
							}}
						>
							<MenuCard
								icon="public-worker-icon"
								title="Servidor"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Servidor
								</h2>
								<p style={{ textAlign: "left" }}>
									Identificação do servidor da Polícia Civil, o CPF é<br />
									obrigatório ( Dica: na folha de frequência localiza o CPF)
								</p>
							</div>
						</div>
					</Grid>
				</CardContainer>

				<CardContainer title="Documentos" spacing={2}>
					<h3 style={{ color: "#666666" }}>
						Documentos (processos, relação e folhas de frequências, documentos
						em caixas) que chegam fisicamente, encaminhados virtualmente via
						SEI, para serem arquivados.
					</h3>
					<Grid>
						<div
							style={{
								display: "flex",
								marginTop: 10,
								marginBottom: 10,
								paddingTop: 20,
							}}
						>
							<MenuCard
								icon="administrative-process-icon"
								title="Processo Administrativo"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Processo Administrativo
								</h2>
								<p style={{ textAlign: "left" }}>
									Conjunto de documentos anexados em uma capa branca ou amarela,
									<br />
									identificados em etiquetas, através de numeração de geralmente
									<br />
									quinze (15) números, assunto e outras informações.
								</p>
							</div>
						</div>

						<div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
							<MenuCard
								icon="frequency-relation-icon"
								title="Relação de Frequências"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Relação de Frequências
								</h2>
								<p style={{ textAlign: "left" }}>
									Documento que relaciona os servidores de alguma unidade
									policial
									<br />
									ou administrativa, que terão as frequências de determinado
									<br />
									período arquivadas.
								</p>
							</div>
						</div>

						<div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
							<MenuCard
								icon="frequency-sheet-icon"
								title="Folha de Frequências"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Folha de Frequências
								</h2>
								<p style={{ textAlign: "left" }}>
									Folha individual do servidor referente a sua assiduidade,
									<br />
									encaminhada por sua unidade policial/administrativa, através
									<br />
									da relação de frequência.
								</p>
							</div>
						</div>

						<div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
							<MenuCard
								icon="box-archiving-icon"
								title="Arquivamento de Caixas"
								url=""
								lg={3}
							/>
							<div style={{ marginLeft: 55, marginTop: 45 }}>
								<h2 style={{ textAlign: "left", marginBottom: 40 }}>
									Arquivamento de Caixas
								</h2>
								<p style={{ textAlign: "left" }}>
									Conjunto de documentos acondicionado em uma caixa tipo box,
									<br />
									geralmente de cor azul, constando: numeração seguida do ano de
									arquivamento,
									<br />
									assunto(s), data(s) de produção do documento e unidade que
									encaminhou,
									<br />
									que serão arquivadas.
								</p>
							</div>
						</div>
					</Grid>
				</CardContainer>
			</section>
		</body>
	);
}
