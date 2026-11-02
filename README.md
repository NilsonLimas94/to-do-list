# Foco de Hoje — Modern Glassmorphism To-Do List

Uma aplicação moderna de gerenciamento de tarefas pessoais desenvolvida com **HTML5 Semântico**, **CSS3 Avançado** e **Vanilla JavaScript puro**. O projeto adota uma estética **Glassmorphism / Dark Mode** inspirada em produtos SaaS de alta performance (como Linear e Notion), com foco em usabilidade, micro-interações e código limpo.

---

## Demonstração Online (Deploy)

Acesse a aplicação em produção rodando na Vercel:  
🔗 **[https://to-do-list-vert-two-57.vercel.app](https://to-do-list-vert-two-57.vercel.app)**

---

## Demonstração Visual

A interface conta com layout centralizado, superfícies translúcidas com efeito de desfoque (`backdrop-filter: blur`), gradientes refinados em roxo/índigo e controles 100% customizados.

---

## Funcionalidades

- **Criação de Tarefas com Categorias:** Adição rápida de itens com suporte a categorias visuais (`🔥 Alta`, `📘 Estudo`, `🎨 Design` e `⚡ Geral`).
- **Validação de Formulário:** Bloqueio de submissões vazias com limpeza automática do campo e devolução do cursor (`focus`).
- **Atalhos de Produtividade:** Cadastro instantâneo de tarefas pressionando a tecla `Enter`.
- **Barra de Progresso & Métricas em Tempo Real:** 
  - Cálculo percentual automático de conclusão da lista.
  - Atualização dinâmica dos contadores no cabeçalho e nos botões de filtro.
- **Filtros Dinâmicos:** Alternância instantânea de visualização entre:
  - **Todas:** Exibe a lista completa.
  - **Pendentes:** Oculta tarefas concluídas para focar no que ainda precisa ser feito.
  - **Concluídas:** Exibe apenas o histórico de itens finalizados.
- **Limpeza em Lote:** Botão de ação rápida para excluir todas as tarefas concluídas de uma só vez.
- **Persistência Local (`localStorage`):** Os dados são serializados em JSON e permanecem salvos mesmo após recarregar a página (`F5`) ou fechar o navegador.
- **Área com Rolagem Interna Inteligente:** Container com altura controlada (`max-height`) e scrollbar customizada para evitar que listas extensas quebrem o layout da tela.

---

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica (`<main>`, `<select>`, `<button>`), acessibilidade e organização limpa do DOM.
- **CSS3:**
  - Layout flexível com **Flexbox**.
  - Efeito **Glassmorphism** via `backdrop-filter: blur(16px)` com fallbacks para navegadores baseados em WebKit.
  - Componentes nativos customizados (`appearance: none` em `<select>` e `<input type="checkbox">`).
  - Animações e micro-interações (`transition`, `transform: scale()`).
  - Tipografia moderna com a fonte **Inter** (Google Fonts).
- **JavaScript (Vanilla / ES6+):**
  - Manipulação direta do DOM (`createElement`, `querySelector`, `classList.toggle`).
  - Gerenciamento de eventos (`click`, `keydown`, `change`).
  - Serialização e desserialização de dados com `JSON.stringify` e `JSON.parse`.
  - Persistência com a Web API `localStorage`.

---

## Estrutura de Arquivos

```text
to-do-list/
├── index.html          # Marcação semântica e esqueleto da aplicação
├── style.css           # Estilização completa, variáveis, temas e animações
├── script.js           # Lógica de negócio, manipulação do DOM e persistência
├── design-mockup.svg   # Vetor de design de referência para o Figma
├── FIGMA_SPEC.md       # Especificações técnicas de cores, tipografia e espaçamentos
└── README.md           # Documentação completa do projeto
```

---

## Como Executar o Projeto

Como o projeto foi desenvolvido com tecnologias nativas da web, não é necessário instalar dependências ou gerenciadores de pacotes (`npm`/`yarn`):

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/NilsonLimas94/to-do-list.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo `index.html` para abrir diretamente no seu navegador, ou use uma extensão de servidor local como o **Live Server** no VS Code.

---

## Aprendizados e Desafios Superados

- **Arquitetura de Estado:** Separação entre os dados armazenados na memória/`localStorage` e a renderização visual na tela.
- **Controle de Fluxo e Usabilidade:** Sincronização entre múltiplos componentes reativos (barra de progresso, abas de filtro e checkboxes).
- **CSS Semântico e Avançado:** Criação de componentes complexos (como selects e checkboxes customizados) usando CSS puro, sem recorrer a bibliotecas externas pesadas.

---

## Autor

Desenvolvido por **[Nilson Limas Junior]**  
- **LinkedIn:** [linkedin.com/in/nilsonlimasjunior/](https://linkedin.com/in/nilsonlimasjunior/)  
- **GitHub:** [github.com/NilsonLimas94](https://github.com/NilsonLimas94)

