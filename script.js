const API_URL = "http://localhost:8081/v1/vibecoffee/produto";

// =====================================
// PEGA O ID DA URL
// view.html?id=1
// =====================================

const params = new URLSearchParams(window.location.search);
const idProduto = Number(params.get("id"));

// =====================================
// CARREGA PRODUTO
// =====================================

async function carregarProduto() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        const dados = await response.json();

        const produtos = dados.response.produto;

        const produto = produtos.find(
            item => item.id === idProduto
        );

        if (!produto) {
            console.error("Produto não encontrado.");
            return;
        }

        preencherTela(produto);

    } catch (erro) {

        console.error(
            "Erro ao carregar produto:",
            erro
        );

    }

}

// =====================================
// PREENCHE A TELA
// =====================================

function preencherTela(produto) {

    // TÍTULO

    const titulo =
        document.querySelector(".product-title");

    if (titulo) {
        titulo.innerHTML =
            produto.nome.replace(" ", "<br>");
    }

    // DESCRIÇÃO

    const descricao =
        document.querySelector(".product-desc");

    if (descricao) {
        descricao.textContent =
            produto.descricao;
    }

    // PREÇO

    const preco =
        produto.tipo_categoria[0].preco;

    const precoElemento =
        document.getElementById("unitPrice");

    if (precoElemento) {

        precoElemento.textContent =
            Number(preco).toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }

    // STATUS

    atualizarStatus(produto.status);

    // TIPO (quente ou gelado)

    configurarTipo(
        produto.tipo_categoria[0].id_tipo
    );

    // FOTO

    carregarImagem(produto.foto);

}

// =====================================
// STATUS
// =====================================

function atualizarStatus(status) {

    const dot =
        document.getElementById("statusDot");

    const texto =
        document.getElementById("statusText");

    if (!dot || !texto) return;

    if (status == 1) {

        dot.className =
            "status-dot available";

        texto.className =
            "status-label available";

        texto.textContent =
            "Disponível";

    } else {

        dot.className =
            "status-dot unavailable";

        texto.className =
            "status-label unavailable";

        texto.textContent =
            "Indisponível";

    }

}

// =====================================
// TIPO
// 1 = QUENTE
// 2 = GELADO
// =====================================

function configurarTipo(idTipo) {

    const quente =
        document.getElementById("btnQuente");

    const gelado =
        document.getElementById("btnGelado");

    if (!quente || !gelado) return;

    quente.classList.remove("active");
    gelado.classList.remove("active");

    if (idTipo == 1) {

        quente.classList.add("active");

    } else if (idTipo == 2) {

        gelado.classList.add("active");

    }

}

// =====================================
// IMAGEM
// =====================================

function carregarImagem(nomeArquivo) {

    const imagem =
        document.getElementById("mainImg");

    const placeholder =
        document.getElementById("imgPlaceholder");

    if (!imagem) return;

    /*
       Ajuste esta pasta conforme
       a estrutura do seu projeto
    */

    imagem.src =
        `img/${nomeArquivo}`;

    imagem.style.display =
        "block";

    if (placeholder) {
        placeholder.style.display =
            "none";
    }

}

// =====================================
// BOTÕES MANUAIS
// =====================================

function selectTemp(temp) {

    const quente =
        document.getElementById("btnQuente");

    const gelado =
        document.getElementById("btnGelado");

    quente.classList.toggle(
        "active",
        temp === "quente"
    );

    gelado.classList.toggle(
        "active",
        temp === "gelado"
    );

}

// =====================================
// THUMBNAILS
// =====================================

document
.querySelectorAll(".thumb")
.forEach(thumb => {

    thumb.addEventListener(
        "click",
        () => {

            document
            .querySelectorAll(".thumb")
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            thumb.classList.add(
                "active"
            );

        }
    );

});

// =====================================
// INICIAR
// =====================================

carregarProduto();