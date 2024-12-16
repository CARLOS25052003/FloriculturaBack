document.addEventListener('DOMContentLoaded', () => {
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(produto => {
    produto.addEventListener('click', () => {
      const productId = produto.getAttribute('data-id');
      // Redireciona para a página de detalhes com o ID do produto
      window.location.href = `produto.html?id=${productId}`;
    });
  });
});
