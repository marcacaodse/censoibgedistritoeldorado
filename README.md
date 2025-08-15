# Censo IBGE - População de Contagem MG - Distrito Sanitário Eldorado

Este é um painel interativo que apresenta dados do Censo IBGE para a população de Contagem, MG, com foco no Distrito Sanitário Eldorado. O painel inclui estatísticas gerais, gráficos de faixa etária, vulnerabilidade, evolução populacional por UBS e comparativos históricos.

## Estrutura do Projeto

- `index.html`: O arquivo HTML principal que estrutura o conteúdo do painel.
- `styles.css`: Contém os estilos CSS para a aparência do painel.
- `script.js`: Contém a lógica JavaScript para interatividade, filtros e renderização dos gráficos.

## Como Hospedar no GitHub Pages

Para hospedar este site no GitHub Pages, siga os passos abaixo:

1.  **Crie um novo repositório no GitHub:**
    - Acesse [GitHub](https://github.com/) e faça login.
    - Clique no botão "New" para criar um novo repositório.
    - Dê um nome ao seu repositório (ex: `censo-ibge-eldorado`).
    - Escolha se o repositório será público ou privado.
    - Clique em "Create repository".

2.  **Faça o upload dos arquivos:**
    - No seu novo repositório no GitHub, clique em "uploading an existing file" (ou arraste e solte os arquivos).
    - Faça o upload de todos os arquivos deste projeto (`index.html`, `styles.css`, `script.js`, `README.md`) para a raiz do repositório.

3.  **Configure o GitHub Pages:**
    - No seu repositório, vá para a aba "Settings" (Configurações).
    - No menu lateral esquerdo, clique em "Pages".
    - Em "Build and deployment", na seção "Source", selecione "Deploy from a branch".
    - Em "Branch", selecione a branch `main` (ou `master`, dependendo do seu repositório) e a pasta `/(root)`.
    - Clique em "Save".

4.  **Aguarde a publicação:**
    - O GitHub Pages levará alguns minutos para construir e publicar seu site.
    - Após a publicação, o URL do seu site será exibido na seção "GitHub Pages" (geralmente algo como `https://<seu-usuario>.github.io/<nome-do-repositorio>/`).

## Bibliotecas Externas Utilizadas

-   **Tailwind CSS**: Framework CSS para estilização rápida.
    -   CDN: `https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css`
-   **Chart.js**: Biblioteca JavaScript para criação de gráficos.
    -   CDN: `https://cdn.jsdelivr.net/npm/chart.js`
-   **Font Awesome**: Biblioteca de ícones.
    -   CDN: `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css`

Essas bibliotecas são carregadas via CDN, o que significa que você não precisa baixá-las ou incluí-las no seu repositório; elas serão acessadas diretamente da internet quando a página for carregada.

