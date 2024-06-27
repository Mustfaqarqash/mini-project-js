let productsArr = [];

async function getAllProducts() {
    try {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        let response = await fetch("http://localhost:3000/product", { 
            method: "GET",
            headers: headersList
        });

        productsArr = await response.json(); 
        console.log(productsArr);

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ""; // Clear previous products

        productsArr.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            let colorIcon = product.isFavorite ? "red" : "gray";

            productCard.innerHTML = `
                <div class="favorite-icon" id="favorite-icon-${product.productId}" data-id="${product.productId}">
                    <i class="fa-solid fa-heart" style="color: ${colorIcon};"></i>
                </div>
                <img src="${product.productImage}" alt="${product.productName}">
                <h2>${product.productName}</h2>
                <p>$${product.productPrice}</p>
                <button class="cart-button">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        });

        // Add event listeners for favorite icons after they are added to the DOM
        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', async (e) => {
                const productId = e.currentTarget.dataset.id;
                const product = productsArr.find(p => p.productId == productId);
                if (product) {
                    await favorite(product);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function favorite(product) {
    try {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        };

        let putResponse = await fetch(`http://localhost:3000/product/${product.productId}`, { 
            method: "PATCH",
            headers: headersList,
            body: JSON.stringify({ isFavorite: !product.isFavorite }) // Toggle favorite status
        });

        if (putResponse.ok) {
            console.log(`Product with ID ${product.productId} updated successfully.`);
            // Refresh products after update
            await getAllProducts();
        } else {
            console.error('Failed to update product');
        }

    } catch (error) {
        console.error('Error updating product:', error);
    }
}

document.addEventListener('DOMContentLoaded', getAllProducts);

document.getElementById("favorite").addEventListener("click", () => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ""; // Clear previous products

    productsArr.forEach(product => {
        if (product.isFavorite) {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <div class="favorite-icon" id="favorite-icon-${product.productId}">
                    <i class="fa-solid fa-heart" style="color: red;"></i>
                </div>
                <img src="${product.productImage}" alt="${product.productName}">
                <h2>${product.productName}</h2>
                <p>$${product.productPrice}</p>
                <button class="cart-button">Add to Cart</button>
            `;

            productContainer.appendChild(productCard);
        }
    });

    // Re-add event listeners for favorite icons after they are added to the DOM
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        icon.addEventListener('click', async (e) => {
            const productId = e.currentTarget.dataset.id;
            const product = productsArr.find(p => p.productId == productId);
            if (product) {
                await favorite(product);
            }
        });
    });
});

document.getElementById("home").addEventListener("click", getAllProducts);
