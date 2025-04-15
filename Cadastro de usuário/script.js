document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarsenha = document.getElementById("confirmarsenha");
    const dataNascimento = document.getElementById("dataNascimento");
    const cpf = document.getElementById("cpf");
    const erro = document.getElementById("erro");
    const ultimoCadastro = document.getElementById("ultimoCadastro");
    const removerCadastro = document.getElementById("removerCadastro");
 
    function validarCPF(cpf) {
        return cpf.length === 11 && !isNaN(cpf);
    }
 
    function validarSenha(senha) {
        return senha.length >= 6;
    }
 
    function salvarCadastro() {
        const usuario = {
            nome: nome.value.toUpperCase(),
            email: email.value,
            senha: senha.value,
            dataNascimento: dataNascimento.value,
            cpf: cpf.value
        };
        localStorage.setItem("ultimoCadastro", JSON.stringify(usuario));
    }
 
    function exibirCadastro() {
        const usuario = JSON.parse(localStorage.getItem("ultimoCadastro"));
        if (usuario) {
            ultimoCadastro.innerHTML = `Nome: ${usuario.nome} <br>
                                        Email: ${usuario.email} <br>
                                        Data de Nascimento: ${usuario.dataNascimento} <br>
                                        CPF: ${usuario.cpf}`;
        }
    }
 
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        erro.textContent = "";
        
        if (!validarCPF(cpf.value)) {
            erro.textContent = "CPF inválido! Deve conter 11 números.";
            return;
        }
 
        if (!validarSenha(senha.value)) {
            erro.textContent = "A senha deve ter pelo menos 6 caracteres.";
            return;
        }
 
        if (senha.value !== confirmarsenha.value) {
            erro.textContent = "As senhas não coincidem.";
            return;
        }
 
        salvarCadastro();
        exibirCadastro();
        form.reset();
        
        window.location.href = "cadastro.html";
    });
 
    removerCadastro.addEventListener("click", () => {
        localStorage.removeItem("ultimoCadastro");
        ultimoCadastro.innerHTML = "";
    });
 
    exibirCadastro();
});
