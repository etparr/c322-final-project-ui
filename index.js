function displayFlowers(flowers) {
    const flowerContainer = document.querySelector('.flower-container');
    flowerContainer.innerHTML = '';

    flowers.forEach(flower => {
        const card = document.createElement('div');
        card.classList.add('flower-card');
        card.setAttribute('data-type', flower.type.toLowerCase());
        card.setAttribute('data-occasion', flower.occasion.toLowerCase());
        card.setAttribute('data-color', flower.color.toLowerCase());
        card.setAttribute('data-price', flower.price);

        const image = document.createElement('img');
        image.src = `https://c322-final-project-latest.onrender.com/flowers/${flower.name}/image`;
        image.alt = flower.name;
        image.classList.add('flower-image');
        card.appendChild(image);

        const name = document.createElement('div');
        name.textContent = flower.name;
        name.classList.add('flower-name');
        card.appendChild(name);

        const price = document.createElement('div');
        price.textContent = `$${flower.price.toFixed(2)}`;
        price.classList.add('flower-price');
        
        const pricePrefix = document.createElement('span');
        pricePrefix.textContent = 'from ';
        pricePrefix.classList.add('price-prefix');
        price.insertBefore(pricePrefix, price.firstChild);
        
        card.appendChild(price);

        card.addEventListener('click', function() {
            window.location.href = `addToBasket.html?name=${encodeURIComponent(flower.name)}&type=${encodeURIComponent(flower.type)}&color=${encodeURIComponent(flower.color)}&price=${encodeURIComponent(flower.price)}&occasion=${encodeURIComponent(flower.occasion)}`;
        });
        
        flowerContainer.appendChild(card);
    });
}

function sortAndDisplayFlowers(flowers) {
    const sortingCriteria = document.getElementById('sorting').value;
    flowers.sort((a, b) => {
        if (sortingCriteria === 'priceLowToHigh') {
            return a.price - b.price;
        } else if (sortingCriteria === 'priceHighToLow') {
            return b.price - a.price;
        }
    });
    displayFlowers(flowers);
}

fetch(`https://c322-final-project-latest.onrender.com/flowers`)
    .then(response => response.json())
    .then(flowers => {
        sortAndDisplayFlowers(flowers);
    })
    .catch(error => console.error('Error fetching flowers:', error));

    function filterFlowers() {
        const type = document.getElementById('flowerType').value.toLowerCase();
        const occasion = document.getElementById('occasion').value.toLowerCase();
        const color = document.getElementById('color').value.toLowerCase();
    
        document.querySelectorAll('.flower-card').forEach(card => {
            const matchesType = (type === 'all' || card.dataset.type === type);
            const matchesOccasion = (occasion === 'all' || card.dataset.occasion === occasion);
            const matchesColor = (color === 'all' || card.dataset.color === color);
    
            if (matchesType && matchesOccasion && matchesColor) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function filterAndSortFlowers() {
        fetch(`https://c322-final-project-latest.onrender.com/flowers`)
        .then(response => response.json())
        .then(flowers => {
            sortAndDisplayFlowers(flowers);
            filterFlowers(); 
        });
    }