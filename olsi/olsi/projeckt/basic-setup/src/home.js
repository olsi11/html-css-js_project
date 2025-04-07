
export default function home() {
    const homeContainer = document.createElement('div');
    homeContainer.innerHTML = `
        <style>
        * {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }

    .dashboardContainer {
        display: flex;
        flex-direction: column;
    }

    .PANELI {
        margin-bottom: 20PX;
    }

    .mainContent {
        display: flex;
        flex-direction: column;
        width: 85vw;
    }

    .mainTitle {
        font-size: 30px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .GridContainer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap:20px;
        padding: 40px;
        cursor: pointer;
    }

    .cardContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin: 20px;
        border-radius: 15px;
        width: 500px;
        height: 250px;
        background-color: #f1f1f1;
    }

    .cardContainer h3 {
        color: gray;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 40px;
    }

    .cardContainer p {
        font-size: 15px;
        color: coral;
        font-family: system-ui;
    }
        @media (max-width: 412px) {
    .mainContent {
        width: 100%; 
        margin: 0;
    }

    .mainTitle {
        font-size: 20px;
        margin-top: 10px;
    }

    .GridContainer {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        padding: 20px;
    }

    .cardContainer {
        width: 90%; 
        height: auto; 
        padding: 10px;
    }

    .cardContainer h3 {
        font-size: 25px; 
    }

    .cardContainer p {
        font-size: 12px; 
    }

    .cardContainer img {
        width: 120px;
        height: 80px;
    }
}
        </style>
        <section class="dashboardContainer" id="container">
            <div class="mainContent" id="Content">
                <!--TITLE-->
                <div class="mainTitle">
                    <h2>
                        PANELI I KONTROLLIT
                    </h2>
                </div>
                    <div class="GridContainer" id="cardGridContainer">

                    </div>
            </div>
        </section>
        <button onClick="{ 
         console.log('Stats script loaded');
            let content = document.getElementById('Content');
            let cardGridContainer = document.getElementById('cardGridContainer');

    function createCard(pContent, h3Value, imgSrc) {
        let cardContainer = document.createElement('div');
        cardContainer.className = 'cardContainer';
        let value = document.createElement('h3');
        value.textContent = h3Value;
        let content = document.createElement('p');
        content.textContent = pContent;
        let img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '170px';
        img.style.height = '100px';

        if (cardGridContainer) {
            cardGridContainer.appendChild(cardContainer);
        }
        cardContainer.appendChild(value);
        cardContainer.appendChild(content);
        cardContainer.appendChild(img);
    };

    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let totalProducts = data.length;
            let totalPrice = data.reduce((acc, product) => acc + product.price, 0);
            let mostStockedProduct = data.reduce((prev, current) => (prev.stock > current.stock) ? prev : current);
            let leastStockedProduct = data.reduce((prev, current) => (prev.stock < current.stock) ? prev : current);

            createCard('Total Products: ' + totalProducts, 'Products');
            createCard('Total Price: $' + totalPrice, 'Price');
            createCard('Most Stocked Product: ' + mostStockedProduct.title, 'Stock', mostStockedProduct.image);
            createCard('Least Stocked Product: ' + leastStockedProduct.title, 'Stock', leastStockedProduct.image);
        })
        .catch(error => console.error('Error:', error));
    }"> Test </button>
    `
        
      
    return homeContainer;
}


