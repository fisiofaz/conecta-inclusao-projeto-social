// Elementos do DOM
const btnCadastrarClinica = document.getElementById('btnCadastrarClinica');
const modalCadastro = document.getElementById('modalCadastro');
const closeModal = document.getElementById('closeModal');
const btnCancelar = document.getElementById('btnCancelar');
const formCadastroClinica = document.getElementById('formCadastroClinica');
const clinicasList = document.getElementById('clinicasList');
const successMessage = document.getElementById('successMessage');

// Abrir modal
btnCadastrarClinica.addEventListener('click', () => {
    modalCadastro.classList.add('active');
});

// Fechar modal
function fecharModal() {
    modalCadastro.classList.remove('active');
    formCadastroClinica.reset(); // Limpa o formulário
    successMessage.classList.remove('show'); // Esconde a mensagem de sucesso
}

closeModal.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);

// Fechar modal ao clicar fora
modalCadastro.addEventListener('click', (e) => {
    if (e.target === modalCadastro) {
        fecharModal();
    }
});

// Carregar clínicas do localStorage
function carregarClinicas() {
    const clinicas = JSON.parse(localStorage.getItem('clinicas')) || [];
    renderizarClinicas(clinicas);
}

// Renderizar clínicas na página
function renderizarClinicas(clinicas) {
    if (clinicas.length === 0) {
        clinicasList.innerHTML = '<p class="no-clinicas">Nenhuma clínica cadastrada ainda.</p>';
        return;
    }

    clinicasList.innerHTML = clinicas.map((clinica, index) => `
        <div class="clinica-card">
            <h3>${clinica.nomeClinica}</h3>
            <div class="clinica-info">
                <p><strong>Tipo:</strong> ${clinica.tipoServico}</p>
                <p><strong>Endereço:</strong> ${clinica.endereco}</p>
                <p><strong>Telefone:</strong> ${clinica.telefone}</p>
                ${clinica.email ? `<p><strong>E-mail:</strong> ${clinica.email}</p>` : ''}
                ${clinica.site ? `<p><strong>Site:</strong> <a href="${clinica.site}" target="_blank">${clinica.site}</a></p>` : ''}
                ${clinica.acessibilidade ? `<p><strong>Acessibilidade:</strong> ${clinica.acessibilidade}</p>` : ''}
                ${clinica.descricao ? `<p><strong>Serviços:</strong> ${clinica.descricao}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Salvar clínica
formCadastroClinica.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    // Coletar dados do formulário
    const novaClinica = {
        nomeClinica: document.getElementById('nomeClinica').value,
        tipoServico: document.getElementById('tipoServico').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        acessibilidade: document.getElementById('acessibilidade').value,
        descricao: document.getElementById('descricao').value,
        dataCadastro: new Date().toISOString() // Adiciona a data de cadastro
    };

    // Carregar clínicas existentes
    const clinicas = JSON.parse(localStorage.getItem('clinicas')) || [];

    // Adicionar nova clínica
    clinicas.push(novaClinica);

    // Salvar no localStorage
    localStorage.setItem('clinicas', JSON.stringify(clinicas));

    // Mostrar mensagem de sucesso
    successMessage.classList.add('show');

    // Atualizar lista de clínicas
    renderizarClinicas(clinicas);

    // Resetar formulário
    formCadastroClinica.reset();

    // Fechar modal após 2 segundos
    setTimeout(() => {
        fecharModal();
    }, 2000);
});

// Carregar clínicas ao iniciar a página
carregarClinicas();
