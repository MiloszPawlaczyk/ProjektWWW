document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.getElementById('catalog');
  const form = document.getElementById('productForm');
  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  

  function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  function renderCatalog() {
    const products = getProducts();
    const query = search.value.toLowerCase();
    const sorted = [...products].filter(p => p.name.toLowerCase().includes(query));

    if (sort.value === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort.value === 'price') sorted.sort((a, b) => a.price - b.price);

    catalog.innerHTML = '';
    for (const product of sorted) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Cena: ${product.price} zł</p>
        <p>${product.description}</p>
        ${product.image ? `<img src="${product.image}" alt="${product.name}" class="images">` : ""}
        <br><a href="product.html?id=${product.id}" class="btn">Zobacz więcej</a>`;
      catalog.appendChild(card);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const price = parseFloat(form.price.value);
    const description = form.description.value.trim();
    const imageInput = form.image.files[0];

    if (!name || isNaN(price)) return alert("Podaj poprawne dane.");

    const reader = new FileReader();
    reader.onload = function (event) {
      const products = getProducts();
      const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        image: event.target.result
      };
      products.push(newProduct);
      saveProducts(products);
      form.reset();
      renderCatalog();
    };

    if (imageInput) {
      reader.readAsDataURL(imageInput);
    } else {
      const products = getProducts();
      const newProduct = { id: Date.now(), name, price, description, image: "" };
      products.push(newProduct);
      saveProducts(products);
      form.reset();
      renderCatalog();
    }
  });

  search.addEventListener('input', renderCatalog);
  sort.addEventListener('change', renderCatalog);


  renderCatalog();
});