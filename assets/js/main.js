// Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    }
    // Profile Dropdown
    const profileBtn = document.getElementById('profileDropdownBtn');
    const dropdownMenu = document.getElementById('profileDropdown');

    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !profileBtn.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Search & Filter & Sort Functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInputLocation = document.getElementById('searchInputLocation');
    const searchSelectType = document.getElementById('searchSelectType');
    const searchSelectPrice = document.getElementById('searchSelectPrice');
    const sortSelect = document.getElementById('sortSelect');
    const propertyGrid = document.getElementById('propertyGrid');
    const noResultsMsg = document.getElementById('noResults');

    if (searchInputLocation) searchInputLocation.addEventListener('input', filterAndSortProperties);
    if (searchSelectType) searchSelectType.addEventListener('change', filterAndSortProperties);
    if (searchSelectPrice) searchSelectPrice.addEventListener('change', filterAndSortProperties);
    if (sortSelect) sortSelect.addEventListener('change', filterAndSortProperties);
    if (searchBtn) searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterAndSortProperties();
    });

    function filterAndSortProperties() {
        const properties = Array.from(document.querySelectorAll('.property-card'));
        const locationValue = searchInputLocation ? searchInputLocation.value.toLowerCase() : '';
        const typeValue = searchSelectType ? searchSelectType.value : 'all';
        const priceValue = searchSelectPrice ? searchSelectPrice.value : 'any';
        const sortValue = sortSelect ? sortSelect.value : 'newest';

        let matchCount = 0;

        // 1. Filter
        properties.forEach(card => {
            const cardLocation = card.getAttribute('data-location').toLowerCase();
            const cardType = card.getAttribute('data-type');
            const cardPrice = parseInt(card.getAttribute('data-price'));

            const matchesLocation = locationValue === '' || cardLocation.includes(locationValue);
            const matchesType = typeValue === 'all' || cardType === typeValue;
            let matchesPrice = false;

            if (priceValue === 'any') {
                matchesPrice = true;
            } else if (priceValue === '100-200') {
                matchesPrice = cardPrice >= 100000 && cardPrice <= 200000;
            } else if (priceValue === '200-500') {
                matchesPrice = cardPrice >= 200000 && cardPrice <= 500000;
            } else if (priceValue === '500-1000') {
                matchesPrice = cardPrice >= 500000 && cardPrice <= 1000000;
            } else if (priceValue === '1000+') {
                matchesPrice = cardPrice >= 1000000;
            }

            if (matchesLocation && matchesType && matchesPrice) {
                card.style.display = 'block';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 2. Sort
        if (propertyGrid) {
            properties.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                const bedsA = parseInt(a.getAttribute('data-beds') || 0);
                const bedsB = parseInt(b.getAttribute('data-beds') || 0);

                if (sortValue === 'price-low') return priceA - priceB;
                if (sortValue === 'price-high') return priceB - priceA;
                if (sortValue === 'beds') return bedsB - bedsA;
                return 0; // newest/default
            });

            // Re-append sorted elements
            properties.forEach(card => propertyGrid.appendChild(card));
        }

        // Toggle No Results Message
        if (noResultsMsg) {
            noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
        }
    }
    // Password Visibility Toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('passwordInput');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const icon = passwordToggle.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('ph-eye');
                icon.classList.add('ph-eye-slash');
            } else {
                icon.classList.remove('ph-eye-slash');
                icon.classList.add('ph-eye');
            }
        });
    }

    // Dynamic Navigation Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            // Remove hardcoded active classes to avoid conflicts
            link.classList.remove('active');
        }
    });
});

// Global Image Fallback Handler
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'; // High-quality real estate placeholder
    img.classList.add('image-fallback');
}

