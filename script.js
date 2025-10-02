window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.display = "none";
        document.body.style.overflow = "auto";
    }, 3000);
});

const usuarioEmail = localStorage.getItem("usuarioEmail");
const emailTexto = document.getElementById("email-text");
const notificacao = document.getElementById("notification");

if (usuarioEmail) {
    emailTexto.innerText = usuarioEmail;
    if (!localStorage.getItem("notificacaoExibida")) {
        notificacao.style.display = "block";
        localStorage.setItem("notificacaoExibida", "true");
    } else {
        notificacao.style.display = "none";
    }
} else {
    emailTexto.innerText = "";
}

function logout() {
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("notificacaoExibida");
    window.location.href = "../login/index.html";
}

function closeNotification() {
    notificacao.style.display = "none";
}

const elementoTexto = document.getElementById("textoDigitando");

const textos = [
    "TableFlix",
    "OS MELHORES FILMES E SÉRIES SÃO AQUI!!"
];

let textoIndex = 0;
let letraIndex = 0;
let apagando = false;

function digitar() {
    const textoAtual = textos[textoIndex];

    if (!apagando) {
        if (letraIndex <= textoAtual.length) {
            let textoParcial = textoAtual.substring(0, letraIndex);

            if (textoIndex === 0) {
                const table = textoParcial.substring(0, 5);
                const flix = textoParcial.substring(5);
                elementoTexto.innerHTML = `${table}<span class="flix">${flix}</span>`;
            } else {
                elementoTexto.textContent = textoParcial;
            }

            letraIndex++;
            setTimeout(digitar, 80);
        } else {
            setTimeout(() => {
                apagando = true;
                digitar();
            }, 1500);
        }
    } else {
        if (letraIndex >= 0) {
            let textoParcial = textoAtual.substring(0, letraIndex);

            if (textoIndex === 0) {
                const table = textoParcial.substring(0, 5);
                const flix = textoParcial.substring(5);
                elementoTexto.innerHTML = `${table}<span class="flix">${flix}</span>`;
            } else {
                elementoTexto.textContent = textoParcial;
            }

            letraIndex--;
            setTimeout(digitar, 50);
        } else {
            apagando = false;
            textoIndex = (textoIndex + 1) % textos.length;
            setTimeout(digitar, 500);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    digitar();
});

const modalFilme = document.getElementById("modalFilme");
const modalImagem = document.getElementById("modalImagem");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");
const modalLink = document.getElementById("modalLink");

const imagensFilmes = document.querySelectorAll(".filmesDestaque img, .filmes img, .series img");

imagensFilmes.forEach((img) => {
    img.addEventListener("click", () => {
        modalImagem.src = img.src;
        modalImagem.alt = img.dataset.titulo || img.alt;
        modalTitulo.textContent = img.dataset.titulo || img.alt || "Título do Filme";
        modalDescricao.textContent = img.dataset.descricao || "Descrição não disponível.";
        modalLink.href = img.dataset.link || "#";
        
         modalLink.title = `Baixar ${modalTitulo.textContent}`;
        
        modalFilme.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    });
});

function fecharModal() {
    modalFilme.style.display = "none";
    document.body.style.overflow = "auto"; 
}

modalFilme.addEventListener("click", (e) => {
    if (e.target === modalFilme) {
        fecharModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalFilme.style.display === "flex") {
        fecharModal();
    }
});