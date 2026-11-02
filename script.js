// ═══════════════════════════════════════════════════════════
// SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
// Mapeamos os nós da página para constantes de acesso rápido
// ═══════════════════════════════════════════════════════════
const inputTarefa = document.getElementById("input-tarefa");
const selectCategoria = document.getElementById("categoria");
const btnAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const textoProgresso = document.getElementById("texto-progresso");
const barraProgresso = document.getElementById("barra-progresso");
const btnLimpar = document.getElementById("btn-limpar");
const filtroTodas = document.getElementById("filtro-todas");
const filtroPendentes = document.getElementById("filtro-pendentes");
const filtroConcluidas = document.getElementById("filtro-concluidas");

// Estado em memória: guarda qual aba de filtro está ativa ("todas", "pendentes", "concluidas")
let filtroAtual = "todas";


// ═══════════════════════════════════════════════════════════
// CRIAÇÃO DE NOVA TAREFA VIA FORMULÁRIO
// Captura os dados digitados, valida, cria o elemento DOM e atualiza o estado
// ═══════════════════════════════════════════════════════════
btnAdicionar.addEventListener("click", function() {
    // 1. Extrai o texto removendo espaços desnecessários nas pontas (.trim)
    const texto = inputTarefa.value.trim();
    const categoria = selectCategoria.value;

    // 2. Validação: impede a criação de tarefas vazias ou só com espaços
    if (texto === "") {
        alert("Por favor, digite o nome de uma tarefa antes de adicionar!");
        return; // Interrompe a execução
    }

    // 3. Mapeia o rótulo com emoji correspondente à categoria selecionada
    let textoTag = "⚡ Geral";
    if (categoria === "alta") textoTag = "🔥 Alta";
    if (categoria === "estudo") textoTag = "📘 Estudo";
    if (categoria === "design") textoTag = "🎨 Design";

    // 4. Cria a estrutura da tarefa dinamicamente na memória
    const novaTarefa = document.createElement("div");
    novaTarefa.classList.add("tarefa");

    // 5. Injeta a marcação interna com template string
    novaTarefa.innerHTML = `
        <input type="checkbox">
        <p>${texto}</p>
        <span class="tag tag-${categoria}">${textoTag}</span>
        <button class="btn-excluir" type="button">X</button>
    `;

    // 6. Captura os controles internos da tarefa recém-criada
    const checkbox = novaTarefa.querySelector('input[type="checkbox"]');
    const btnExcluir = novaTarefa.querySelector(".btn-excluir");

    // Alterna o estado de concluída (riscado/opaco), recalcula métricas e persiste
    checkbox.addEventListener("change", function() {
        novaTarefa.classList.toggle("concluida");
        atualizaProgresso();
        salvarTarefas();
        filtrarTarefas(filtroAtual); // Revalida a visibilidade na aba atual
    });

    // Remove o nó do DOM, recalcula métricas e persiste
    btnExcluir.addEventListener("click", function() {
        novaTarefa.remove();
        atualizaProgresso();
        salvarTarefas();
    });

    // 7. Renderiza a tarefa na tela dentro da lista
    listaTarefas.appendChild(novaTarefa);
    atualizaProgresso();
    salvarTarefas();

    // 8. Limpa o campo de entrada e devolve o foco para agilizar novas adições
    inputTarefa.value = "";
    inputTarefa.focus();
});


// ═══════════════════════════════════════════════════════════
// ATALHOS DE TECLADO
// Permite cadastrar tarefas rapidamente pressionando Enter no input
// ═══════════════════════════════════════════════════════════
inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        btnAdicionar.click(); // Dispara o evento de clique do botão
    }
});


// ═══════════════════════════════════════════════════════════
// ATUALIZAÇÃO DA BARRA DE PROGRESSO E CONTADORES
// Calcula métricas em tempo real (total, pendentes, concluídas e %)
// ═══════════════════════════════════════════════════════════
function atualizaProgresso() {
    // Contagem baseada na presença real dos elementos no DOM
    const total = document.querySelectorAll(".tarefa").length;
    const concluidas = document.querySelectorAll(".tarefa.concluida").length;
    const pendentes = total - concluidas;

    // Atualiza o texto do cabeçalho
    textoProgresso.textContent = `${concluidas} de ${total} concluídas`;

    // Regra de três: calcula a largura percentual da barra (evita divisão por zero)
    const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);
    barraProgresso.style.width = `${porcentagem}%`;

    // Atualiza os contadores entre parênteses nos botões de filtro
    filtroTodas.textContent = `Todas (${total})`;
    filtroPendentes.textContent = `Pendentes (${pendentes})`;
    filtroConcluidas.textContent = `Concluídas (${concluidas})`;
}


// ═══════════════════════════════════════════════════════════
// BOTÃO LIMPAR
// Remove em lote todas as tarefas com estado concluído
// ═══════════════════════════════════════════════════════════
btnLimpar.addEventListener("click", function() {
    const tarefasConcluidas = document.querySelectorAll(".tarefa.concluida");

    tarefasConcluidas.forEach(function(tarefa) {
        tarefa.remove();
    });

    // Atualiza o progresso e o banco local após a limpeza em lote
    salvarTarefas();
    atualizaProgresso();
});


// ═══════════════════════════════════════════════════════════
// FILTRAGEM DINÂMICA (Todas, Pendentes, Concluídas)
// Altera a visibilidade das tarefas via display e gerencia a aba ativa
// ═══════════════════════════════════════════════════════════
function filtrarTarefas(tipo) {
    filtroAtual = tipo; // Atualiza a variável de estado global
    const todasTarefas = document.querySelectorAll(".tarefa");

    todasTarefas.forEach(function(tarefa) {
        const estaConcluida = tarefa.classList.contains("concluida");

        if (tipo === "todas") {
            tarefa.style.display = "flex";
        } else if (tipo === "pendentes") {
            tarefa.style.display = estaConcluida ? "none" : "flex";
        } else if (tipo === "concluidas") {
            tarefa.style.display = estaConcluida ? "flex" : "none";
        }
    });

    // Remove a classe de destaque de todos os botões e aplica no selecionado
    filtroTodas.classList.remove("filtro-todas");
    filtroPendentes.classList.remove("filtro-todas");
    filtroConcluidas.classList.remove("filtro-todas");

    if (tipo === "todas") filtroTodas.classList.add("filtro-todas");
    if (tipo === "pendentes") filtroPendentes.classList.add("filtro-todas");
    if (tipo === "concluidas") filtroConcluidas.classList.add("filtro-todas");
}

// Ouvintes de clique para cada aba de filtro
filtroTodas.addEventListener("click", function() {
    filtrarTarefas("todas");
});

filtroPendentes.addEventListener("click", function() {
    filtrarTarefas("pendentes");
});

filtroConcluidas.addEventListener("click", function() {
    filtrarTarefas("concluidas");
});


// ═══════════════════════════════════════════════════════════
// SALVAMENTO NO LOCALSTORAGE
// Serializa o estado das tarefas em JSON e grava na chave "minhasTarefas"
// ═══════════════════════════════════════════════════════════
function salvarTarefas() {
    const tarefasParaSalvar = [];
    const elementosTarefas = document.querySelectorAll(".tarefa");

    elementosTarefas.forEach(function(tarefa) {
        const texto = tarefa.querySelector("p").textContent;
        const tag = tarefa.querySelector(".tag");

        // Extrai a categoria baseada na classe CSS da tag
        let categoria = "geral";
        if (tag.classList.contains("tag-alta")) categoria = "alta";
        if (tag.classList.contains("tag-estudo")) categoria = "estudo";
        if (tag.classList.contains("tag-design")) categoria = "design";

        const concluida = tarefa.classList.contains("concluida");

        tarefasParaSalvar.push({
            texto: texto,
            categoria: categoria,
            concluida: concluida
        });
    });

    // Converte o array de objetos em string JSON e salva no navegador
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefasParaSalvar));
}


// ═══════════════════════════════════════════════════════════
// CARREGAMENTO DO LOCALSTORAGE
// Desserializa os dados salvos e reconstrói as tarefas no DOM ao iniciar
// ═══════════════════════════════════════════════════════════
function carregarTarefas() {
    const dadosSalvos = localStorage.getItem("minhasTarefas");

    // Interrompe caso o usuário ainda não tenha nenhum dado gravado
    if (!dadosSalvos) return;

    const tarefasSalvas = JSON.parse(dadosSalvos);

    tarefasSalvas.forEach(function(item) {
        let textoTag = "⚡ Geral";
        if (item.categoria === "alta") textoTag = "🔥 Alta";
        if (item.categoria === "estudo") textoTag = "📘 Estudo";
        if (item.categoria === "design") textoTag = "🎨 Design";

        const novaTarefa = document.createElement("div");
        novaTarefa.classList.add("tarefa");

        // Restaura a classe visual caso a tarefa estivesse concluída
        if (item.concluida) {
            novaTarefa.classList.add("concluida");
        }

        novaTarefa.innerHTML = `
            <input type="checkbox" ${item.concluida ? "checked" : ""}>
            <p>${item.texto}</p>
            <span class="tag tag-${item.categoria}">${textoTag}</span>
            <button class="btn-excluir" type="button">X</button>
        `;

        const checkbox = novaTarefa.querySelector('input[type="checkbox"]');
        const btnExcluir = novaTarefa.querySelector(".btn-excluir");

        checkbox.addEventListener("change", function() {
            novaTarefa.classList.toggle("concluida");
            atualizaProgresso();
            salvarTarefas();
            filtrarTarefas(filtroAtual);
        });

        btnExcluir.addEventListener("click", function() {
            novaTarefa.remove();
            atualizaProgresso();
            salvarTarefas();
        });

        listaTarefas.appendChild(novaTarefa);
    });

    // Sincroniza métricas iniciais após restaurar todos os itens
    atualizaProgresso();
}


// ═══════════════════════════════════════════════════════════
// INICIALIZAÇÃO DA APLICAÇÃO
// Restaura tarefas existentes e sincroniza os contadores ao abrir a página
// ═══════════════════════════════════════════════════════════
carregarTarefas();
atualizaProgresso();

atualizaProgresso();