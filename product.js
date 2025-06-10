document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-details');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = '<p>Nie znaleziono produktu.</p>';
    return;
  }

  if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add('dark');
  }

  container.innerHTML = `
    <section class="card">
      <h2>${product.name}</h2>
      <p><strong>Cena:</strong> ${product.price} zł</p>
      <p>${product.description}</p>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" class="images">` : ""}
    </section>
  `;
});
