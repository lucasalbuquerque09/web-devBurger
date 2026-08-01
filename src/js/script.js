// // selecionando os elementos do DOM
const cardList = document.querySelector('.card-list');
const btnShowAll = document.getElementById('btnShowAll');
const btnAddDiscount = document.getElementById('btnDiscount');
const btnAddItAllUp = document.getElementById('btnSummary');
const btnVegan = document.getElementById('btnVegan');
// função para definir o botão ativo
function setActiveButton(activeButton) {
    [btnShowAll, btnAddDiscount, btnAddItAllUp, btnVegan].forEach((button) => {
        button?.classList.remove('active');
    });
    activeButton?.classList.add('active');
}
// função para formatar o preço
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}
// função para renderizar os produtos
function renderProducts(items = menuOptions) {
    let cart = '';

    items.forEach((item) => {
        cart += `
            <li>
                <img src="${item.src}" alt="${item.name}">
                <div class="info-card">
                    <div class="span-card">
                        <h2>${item.name}</h2>
                        <span>${formatPrice(item.price)}</span>
                    </div>
                    <p>${item.description}</p>
                    <button type="button">
                        <i class="bi bi-plus-lg"></i>
                        Add To Cart
                    </button>
                </div>
            </li>
        `;
    });

    if (cardList) {
        cardList.innerHTML = cart;
    }
}
// função para renderizar o resumo do pedido
function renderSummaryCard() {
    const originalPrice = menuOptions.reduce((sum, item) => sum + item.price, 0);
    const discountedTotal = originalPrice * 0.9;
    const discountAmount = originalPrice - discountedTotal

    if (cardList) {
        cardList.innerHTML = `
            <li>
                <img src="src/img/x-mostruoso-banner.jpg" alt="Order summary">
                <div class="info-card">
                    <div class="span-card">
                        <h2>Summary</h2>
                        <span>${formatPrice(discountedTotal)}</span>
                    </div>
                    <p>Original price: ${formatPrice(originalPrice)}</p>
                    <p>Discount amount: ${formatPrice(discountAmount)}</p>
                    <button type="button">
                        <i class="bi bi-plus-lg"></i>
                        Confirm order
                    </button>
                </div>
            </li>
        `;
    }

}

// event listeners para os botões
btnShowAll?.addEventListener('click', () => {
    setActiveButton(btnShowAll);
    renderProducts(menuOptions);
});

btnDiscount?.addEventListener('click', () => {
    setActiveButton(btnDiscount);
    renderProducts(menuOptions.map((item) => ({ ...item, price: item.price * 0.9 })));
});

btnSummary?.addEventListener('click', () => {
    setActiveButton(btnSummary);
    renderSummaryCard();
});

btnVegan?.addEventListener('click', () => {
    setActiveButton(btnVegan);
    renderProducts(menuOptions.filter((item) => item.vegan))
})



