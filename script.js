// ==========================
// PRODUTO RECEBIDO
// ==========================

const produtoAtual = {
    nome: "Cappuccino Clássico",

    descricao:
        "Café expresso intenso, leite vaporizado e espuma cremosa. Simples, clássico e irresistível.",

    preco: 14.90,

    imagem: "img/cappuccino.jpg",

    disponivel: true,

};

// ==========================
// VARIÁVEIS
// ==========================

let basePrice = produtoAtual.preco;

// ==========================
// CARREGAR PRODUTO
// ==========================

function carregarProduto(produto) {

    document.getElementById("productTitle").innerHTML =
        produto.nome.replace(" ", "<br>");

    document.getElementById("productDesc").textContent =
        produto.descricao;

    document.getElementById("unitPrice").textContent =
        formatBRL(produto.preco);

    const imagem =
        document.getElementById("mainImg");

    imagem.src = produto.imagem;

    imagem.style.display = "block";

    const placeholder =
        document.getElementById("imgPlaceholder");

    if (placeholder) {
        placeholder.style.display = "none";
    }

    const tags =
        document.getElementById("productTags");

    tags.innerHTML = "";

    produto.tags.forEach(tag => {

        const span =
            document.createElement("span");

        span.classList.add("tag");

        span.textContent = tag;

        tags.appendChild(span);

    });

    atualizarStatus(produto.disponivel);

    basePrice = produto.preco;

    updateTotal();
}

// ==========================
// STATUS
// ==========================

function atualizarStatus(disponivel) {

    const texto =
        document.getElementById("statusText");

    const bolinha =
        document.getElementById("statusDot");

    if (disponivel) {

        texto.textContent = "Disponível";

        texto.className =
            "status-label available";

        bolinha.className =
            "status-dot available";

    } else {

        texto.textContent = "Indisponível";

        texto.className =
            "status-label unavailable";

        bolinha.className =
            "status-dot unavailable";
    }
}

// ==========================
// FORMATAR PREÇO
// ==========================

function formatBRL(valor) {

    return "R$ " +
        valor.toFixed(2)
        .replace(".", ",");
}

// ==========================
// TEMPERATURA
// ==========================

function selectTemp(temp) {

    document
        .getElementById("btnQuente")
        .classList.toggle(
            "active",
            temp === "quente"
        );

    document
        .getElementById("btnGelado")
        .classList.toggle(
            "active",
            temp === "gelado"
        );
}

// ==========================
// THUMBNAILS
// ==========================

const thumbs =
    document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {

    thumb.addEventListener("click", () => {

        thumbs.forEach(item => {

            item.classList.remove("active");

        });

        thumb.classList.add("active");

    });

});

// ==========================
// INICIALIZAÇÃO
// ==========================

carregarProduto(produtoAtual);