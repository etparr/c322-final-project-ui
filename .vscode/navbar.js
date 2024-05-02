document.addEventListener('DOMContentLoaded', function() {
    const cartIconContainer = document.querySelector('#cartIconContainer');
    const cartCountBadge = document.querySelector('#cartCountBadge');
    const cartCount = localStorage.getItem('cartCount') || '0';

    if (cartCountBadge && parseInt(cartCount) > 0) {
        cartCountBadge.textContent = cartCount;
        cartCountBadge.style.display = 'block';
    }
});