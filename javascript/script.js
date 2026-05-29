// --- SISTEMA DE PROTEÇÃO ---
// Verifica se o "crachá" existe no localStorage
if (localStorage.getItem('usuario_logado') !== 'true') {
    // Se não estiver logado, avisa e expulsa para o login
    alert("Acesso restrito! Por favor, faça login.");
    window.location.href = 'login.html';
}

// --- LÓGICA DE LOGOUT ---
// Adicione um botão no seu HTML com id="btnLogout"
document.getElementById('btnLogout')?.addEventListener('click', () => {
    localStorage.removeItem('usuario_logado'); // Remove o crachá
    window.location.href = 'login.html'; // Volta para o início
});


const API_URL = "https://projeto-alunos-production.up.railway.app/alunos";

// ================= LISTAR =================
async function listarAlunos() {

    const res = await fetch(API_URL);
    const alunos = await res.json();

    const tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";

    alunos.forEach(aluno => {

        tabela.innerHTML += `
    <tr>
        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>

        <td>
        <button onclick="abrirEditar(${aluno.id},'${aluno.nome}','${aluno.email}')">Editar</button>
        <button onclick="excluirAluno(${aluno.id})">Excluir</button>
        </td>
    </tr>`;
});

}
listarAlunos()
// ================= MODAIS =================

function abrirModalAdicionar() {
    document.getElementById("modalAdicionar").style.display = "flex";
}

function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}
// ================= ADICIONAR =================
async function adicionarAluno() {

    const nome = document.getElementById("nomeAdd").value;
    const email = document.getElementById("emailAdd").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    });

    fecharModal("modalAdicionar");
    listarAlunos();

}


// ================= ABRIR EDITAR =================

function abrirEditar(id, nome, email) {

    document.getElementById("idEdit").value = id;
    document.getElementById("nomeEdit").value = nome;
    document.getElementById("emailEdit").value = email;

    document.getElementById("modalEditar").style.display = "flex";

}


// ================= EDITAR =================
async function editarAluno() {

    const id = document.getElementById("idEdit").value;
    const nome = document.getElementById("nomeEdit").value;
    const email = document.getElementById("emailEdit").value;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    });

    fecharModal("modalEditar");
    listarAlunos();

}


// ================= EXCLUIR =================
async function excluirAluno(id) {

    if (!confirm("Deseja excluir este aluno?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    listarAlunos();

}


// CARREGAR
listarAlunos();