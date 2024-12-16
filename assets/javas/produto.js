document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get("id");

  if (produtoId) {
    fetch(`/api/produto/${produtoId}`)
      .then(response => response.json())
      .then(produto => {
        document.getElementById("produtoNome").textContent = produto.nome;
        document.getElementById("produtoImagem").src = produto.imagem;
        document.getElementById("produtoPrecoOriginal").textContent = produto.precoOriginal;
        document.getElementById("produtoPreco").textContent = produto.precoDesconto || produto.precoOriginal;
        document.getElementById("produtoDescricao").textContent = produto.descricao;

        if (!produto.desconto) {
          document.querySelector(".produto-detalhes__desconto").style.display = "none";
          document.querySelector(".produto__preco--original").style.display = "none";
        } else {
          document.getElementById("produtoDesconto").textContent = produto.desconto;
        }
      })
      .catch(error => {
        console.error("Erro ao carregar os dados do produto:", error);
        alert("Produto não encontrado.");
      });
  } else {
    alert("ID de produto inválido.");
  }
});
