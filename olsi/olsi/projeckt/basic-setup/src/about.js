export default function about() {
    const aboutContainer = document.createElement('div');
    aboutContainer.innerHTML = `
    <style>
    *{
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

.productsContainer{
    display: flex;
}


.PANELI{
    margin-bottom: 20PX;
}


.mainTitle{
    font-size: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.tableList {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.tableList table {
    width: 100%;
    border-collapse: collapse;
}

.tableList th, .tableList td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.tableList th {
    background-color: #f2f2f2;
}

.tableList tr:hover {
    background-color: #f1f1f1;
}

.tableList button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.tableList button:hover {
    background-color: orange;
}

.createBtn {
    display: inline-block;
    padding: 10px 20px;
    margin: 20px 0;
    background-color: #0d5574;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    cursor: pointer;
}

.createBtn:hover {
    background-color: orange;
}

.createBtn a {
    color: white;
    text-decoration: none;
}

.productForm {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    max-width: 500px;
}

.productForm form {
    display: flex;
    flex-direction: column;
}

.productForm label {
    margin-bottom: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.productForm input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.productForm button {
    padding: 10px 20px;
    background-color: #0d5574;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.productForm button:hover {
    background-color: orange;
}

    </style>
     <!-- MAIN -->
        <!-- MAIN -->
        <div class="mainContent" style="width: 78vw;">
            <!--TITLE-->
            <div class="mainTitle">
                <h2>
                    PRODUKTET
                </h2>
            </div>
             <!-- list item -->
              <div class="tableList" id="tableList">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="productTableBody">
                            <tr >
                                <td ><img src="" alt="Product Image" width="50"></td>
                                <td >Product Title</td>
                                <td >$10.00</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
              </div>
              <div class="productForm">
              <form id="newProductForm">
                    <label for="productImage">Image:</label>
                    <input type="file" id="productImage" name="productImage" accept="image/*"><br><br>
                    
                    <label for="productTitle">Title:</label>
                    <input type="text" id="productTitle" name="productTitle"><br><br>
                    
                    <label for="productPrice">Price:</label>
                    <input type="number" id="productPrice" name="productPrice" step="0.01"><br><br>
                    
                    <button type="submit"  id="createBtn" class="createBtn">Create Product</button>
                    </form>
                    </div>
                    
                    </div>
                    <script src="products.js"></script>
                    </body>
                    
                    `; 
                    // Removed redundant DOMContentLoaded event listener
                    document.body.appendChild(aboutContainer);

                    // Add event listener after appending to the DOM
                    const createBtn = document.getElementById('createBtn');
                    createBtn.addEventListener('click', handleFormSubmit);

                    return aboutContainer;
                    }

                    document.addEventListener('DOMContentLoaded', () => {
                        fetchProducts();
                        // Removed redundant event listener setup
                    });

                    function fetchProducts() {
                        fetch('http://localhost:3000/products')
                            .then(response => response.json())
                            .then(data => {
                                const productTableBody = document.getElementById('productTableBody');
                                if (productTableBody) {
                                    productTableBody.innerHTML = ''; // Clear existing content

                                    data.forEach(product => {
                                        addProductRow(product);
                                    });
                                } else {
                                    console.error('Error: productTableBody element not found');
                                }
                            })
                            .catch(error => console.error('Error fetching products:', error));
                    }

                    function deleteProduct(productId, row) {
                        fetch(`http://localhost:3000/products/${productId}`, {
                            method: 'DELETE'
                        })
                            .then(response => {
                                if (response.ok) {
                                    row.remove();
                                    console.log('Product deleted successfully');
                                } else {
                                    console.error('Error deleting product');
                                }
                            })
                            .catch(error => console.error('Error deleting product:', error));
                    }

                    function addProductRow(product) {
                        const productTableBody = document.getElementById('productTableBody');
                        const row = document.createElement('tr');

                        const imgCell = document.createElement('td');
                        const img = document.createElement('img');
                        img.src = product.image;
                        img.alt = 'Product Image';
                        img.width = 50;
                        imgCell.appendChild(img);
                        row.appendChild(imgCell);

                        const titleCell = document.createElement('td');
                        titleCell.textContent = product.title;
                        row.appendChild(titleCell);

                        const priceCell = document.createElement('td');
                        priceCell.textContent = `$${product.price.toFixed(2)}`;
                        row.appendChild(priceCell);

                        const actionsCell = document.createElement('td');
                        const editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
                        editButton.onclick = () => editProduct(product.id);
                        actionsCell.appendChild(editButton);

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.onclick = () => deleteProduct(product.id, row);
                        actionsCell.appendChild(deleteButton);

                        row.appendChild(actionsCell);

                        productTableBody.appendChild(row);
                    }

                    function editProduct(productId) {
                        // Implement the edit functionality here
                        console.log(`Edit product with ID: ${productId}`);
                    }

                    function handleFormSubmit(event) {
                        event.preventDefault();
                        console.log('buttonPresed')
                        const imageInput = document.getElementById('productImage');
                        const titleInput = document.getElementById('productTitle');
                        const priceInput = document.getElementById('productPrice');

                        const reader = new FileReader();
                        reader.onload = function (event) {
                            const base64Image = event.target.result;

                            const newProduct = {
                                image: base64Image,
                                title: titleInput.value,
                                price: parseFloat(priceInput.value)
                            };

                            fetch('http://localhost:3000/products', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(newProduct)
                            })
                                .then(response => response.json())
                                .then(product => {
                                    addProductRow(product);
                                    console.log('Product added successfully');
                                })
                                .catch(error => console.error('Error adding product:', error));
                        };

                        reader.readAsDataURL(imageInput.files[0]);
                    }
