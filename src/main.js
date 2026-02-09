/**
 * WAS Insurance - Main JavaScript
 * Pure vanilla JavaScript for interactive functionality
 */

(function () {
    'use strict';

    // =======================
    // Utility Functions
    // =======================

    /**
     * DOM Ready Handler
     */
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Format date to DD/MM/YYYY
     */
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /**
     * Validate date format DD/MM/YYYY
     */
    function validateDateFormat(dateString) {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(dateString)) return false;

        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }

        return day > 0 && day <= monthLength[month - 1];
    }

    // =======================
    // Navigation Handler
    // =======================

    class Navigation {
        constructor() {
            this.hamburger = document.getElementById('hamburgerBtn');
            this.navMenu = document.getElementById('navMenu');
            this.init();
        }

        init() {
            if (!this.hamburger || !this.navMenu) return;

            this.hamburger.addEventListener('click', () => this.toggleMenu());

            // Handle expandable nav items
            const expandBtns = document.querySelectorAll('.nav-expand-btn');
            expandBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleSubmenu(btn);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    this.closeMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });

            // Handle window resize
            window.addEventListener('resize', debounce(() => {
                if (window.innerWidth > 768) {
                    this.closeMenu();
                }
            }, 250));
        }

        toggleSubmenu(btn) {
            const submenu = btn.nextElementSibling;
            if (submenu && submenu.classList.contains('nav-submenu')) {
                submenu.classList.toggle('expanded');
                btn.classList.toggle('expanded');
            }
        }

        toggleMenu() {
            const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';
            this.hamburger.setAttribute('aria-expanded', !isExpanded);
            this.navMenu.classList.toggle('active');
        }

        closeMenu() {
            this.hamburger.setAttribute('aria-expanded', 'false');
            this.navMenu.classList.remove('active');
        }
    }

    // =======================
    // Destination Selector
    // =======================

    class DestinationSelector {
        constructor() {
            this.input = document.getElementById('destination');
            this.dropdown = document.getElementById('dropdownResults');
            this.selectedContainer = document.getElementById('selectedDestinations');
            this.selectedDestinations = [];
            this.activeIndex = -1;

            // Sample destinations data
            this.destinations = [
                { name: 'Bali', country: 'Indonesia', region: 'Asia' },
                { name: 'Austria', country: 'Austria', region: 'Europe' },
                { name: 'Australia', country: 'Australia', region: 'Oceania' },
                { name: 'New Zealand', country: 'New Zealand', region: 'Oceania' },
                { name: 'USA', country: 'United States', region: 'North America' },
                { name: 'United Kingdom', country: 'United Kingdom', region: 'Europe' },
                { name: 'World Wide', country: 'Multiple', region: 'Global' },
                { name: 'All of Europe', country: 'Multiple', region: 'Europe' },
                { name: 'All of Asia', country: 'Multiple', region: 'Asia' },
                { name: 'Canada', country: 'Canada', region: 'North America' },
                { name: 'Japan', country: 'Japan', region: 'Asia' },
                { name: 'Thailand', country: 'Thailand', region: 'Asia' },
                { name: 'France', country: 'France', region: 'Europe' },
                { name: 'Italy', country: 'Italy', region: 'Europe' },
                { name: 'Spain', country: 'Spain', region: 'Europe' },
            ];

            this.init();
        }

        init() {
            if (!this.input || !this.dropdown) return;

            // Load pre-selected destinations from HTML
            this.loadPreselectedDestinations();

            this.input.addEventListener('input', debounce((e) => {
                console.log('Searching for:', e.target.value);
                if (!e.target.value.trim()) {
                    this.hideDropdown();
                    return;
                }
                this.handleSearch(e.target.value);
            }, 100));

            this.input.addEventListener('focus', () => {
                if (this.input.value.trim()) {
                    this.handleSearch(this.input.value);
                }
            });

            // Keyboard navigation
            this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.destination-input-wrapper')) {
                    this.hideDropdown();
                }
            });
        }

        handleKeydown(e) {
            if (!this.dropdown.classList.contains('active')) return;

            const items = this.dropdown.querySelectorAll('.dropdown-item');
            if (items.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.activeIndex = (this.activeIndex + 1) % items.length;
                    this.updateActiveItem(items);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.activeIndex = (this.activeIndex - 1 + items.length) % items.length;
                    this.updateActiveItem(items);
                    break;
                case 'Enter':
                    if (this.activeIndex >= 0) {
                        e.preventDefault();
                        items[this.activeIndex].click();
                    }
                    break;
                case 'Escape':
                    this.hideDropdown();
                    break;
            }
        }

        updateActiveItem(items) {
            items.forEach((item, index) => {
                if (index === this.activeIndex) {
                    item.classList.add('focused');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('focused');
                }
            });
        }

        loadPreselectedDestinations() {
            const chips = this.selectedContainer.querySelectorAll('.destination-chip');
            chips.forEach(chip => {
                const text = chip.textContent.trim().replace('×', '').trim();
                this.selectedDestinations.push(text);

                const removeBtn = chip.querySelector('.chip-remove');
                if (removeBtn) {
                    removeBtn.addEventListener('click', () => this.removeDestination(text));
                }
            });
        }

        handleSearch(query) {
            if (!query.trim()) {
                this.hideDropdown();
                return;
            }

            const results = this.destinations.filter(dest =>
                dest.name.toLowerCase().includes(query.toLowerCase()) &&
                !this.selectedDestinations.includes(dest.name)
            );

            if (results.length === 0) {
                this.showEmptyState();
            } else {
                this.showResults(results);
            }
        }

        showResults(results) {
            this.dropdown.innerHTML = '';
            this.activeIndex = -1;

            results.forEach(dest => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = `${dest.name} (${dest.country})`;
                item.setAttribute('role', 'option');
                item.addEventListener('click', () => this.selectDestination(dest.name));
                this.dropdown.appendChild(item);
            });

            this.dropdown.classList.add('active');
        }

        showEmptyState() {
            this.dropdown.innerHTML = '<div class="dropdown-item">Destination not found</div>';
            this.dropdown.classList.add('active');
        }

        hideDropdown() {
            this.dropdown.classList.remove('active');
            this.activeIndex = -1;
        }

        selectDestination(name) {
            if (this.selectedDestinations.includes(name)) return;

            this.selectedDestinations.push(name);
            this.addChip(name);
            this.input.value = '';
            this.hideDropdown();
        }

        addChip(name) {
            const chip = document.createElement('span');
            chip.className = 'destination-chip';
            chip.innerHTML = `
                ${name}
                <button type="button" class="chip-remove" aria-label="Remove ${name}">×</button>
            `;

            const removeBtn = chip.querySelector('.chip-remove');
            removeBtn.addEventListener('click', () => this.removeDestination(name));

            this.selectedContainer.appendChild(chip);
        }

        removeDestination(name) {
            const index = this.selectedDestinations.indexOf(name);
            if (index > -1) {
                this.selectedDestinations.splice(index, 1);
            }

            const chips = this.selectedContainer.querySelectorAll('.destination-chip');
            chips.forEach(chip => {
                if (chip.textContent.trim().replace('×', '').trim() === name) {
                    chip.remove();
                }
            });
        }
    }

    // =======================
    // Date Input Handler
    // =======================

    class DateInputHandler {
        constructor() {
            this.departDate = document.getElementById('departDate');
            this.returnDate = document.getElementById('returnDate');
            this.init();
        }

        init() {
            if (!this.departDate || !this.returnDate) return;

            this.departDate.addEventListener('blur', (e) => {
                this.validateDate(e.target);
            });

            this.returnDate.addEventListener('blur', (e) => {
                this.validateDate(e.target);
            });

            // Add placeholder formatting
            [this.departDate, this.returnDate].forEach(input => {
                input.addEventListener('input', (e) => {
                    this.formatDateInput(e.target);
                });
            });
        }

        formatDateInput(input) {
            let value = input.value.replace(/\D/g, '');

            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }

            input.value = value;
        }

        validateDate(input) {
            const value = input.value;

            if (value && !validateDateFormat(value)) {
                input.setCustomValidity('Please enter a valid date in DD/MM/YYYY format');
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        }
    }

    // =======================
    // Traveller Age Handler
    // =======================

    class TravellerAgeHandler {
        constructor() {
            this.addBtn = document.getElementById('addTravellerBtn');
            this.container = document.getElementById('travellerAges');
            this.ages = [23]; // Default age
            this.init();
        }

        init() {
            if (!this.addBtn || !this.container) return;

            this.addBtn.addEventListener('click', () => this.showAgePrompt());
        }

        showAgePrompt() {
            const age = prompt('Enter traveller age:');

            if (age === null) return; // User cancelled

            const ageNum = parseInt(age, 10);

            if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
                alert('Please enter a valid age between 0 and 120');
                return;
            }

            this.addAge(ageNum);
        }

        addAge(age) {
            this.ages.push(age);

            const ageDisplay = document.createElement('span');
            ageDisplay.className = 'age-display';
            ageDisplay.textContent = age;
            ageDisplay.style.cursor = 'pointer';
            ageDisplay.title = 'Click to remove';

            ageDisplay.addEventListener('click', () => {
                const index = this.ages.indexOf(age);
                if (index > -1) {
                    this.ages.splice(index, 1);
                }
                ageDisplay.remove();
            });

            this.container.appendChild(ageDisplay);
        }
    }

    // =======================
    // Quote Form Handler
    // =======================

    class QuoteFormHandler {
        constructor() {
            this.form = document.getElementById('quoteForm');
            this.init();
        }

        init() {
            if (!this.form) return;

            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        handleSubmit(e) {
            e.preventDefault();

            // Basic validation
            const destination = document.getElementById('destination');
            const departDate = document.getElementById('departDate');
            const returnDate = document.getElementById('returnDate');

            let isValid = true;
            let errorMessage = '';

            // Check if at least one destination is selected
            const selectedDestinations = document.querySelectorAll('.destination-chip');
            if (selectedDestinations.length === 0) {
                isValid = false;
                errorMessage = 'Please select at least one destination';
            }

            // Validate dates
            if (!departDate.value || !returnDate.value) {
                isValid = false;
                errorMessage = 'Please enter both departure and return dates';
            } else if (!validateDateFormat(departDate.value) || !validateDateFormat(returnDate.value)) {
                isValid = false;
                errorMessage = 'Please enter valid dates in DD/MM/YYYY format';
            }

            if (!isValid) {
                alert(errorMessage);
                return;
            }

            // Store form data and redirect
            const formData = {
                destinations: Array.from(selectedDestinations).map(chip =>
                    chip.textContent.trim().replace('×', '').trim()
                ),
                departDate: departDate.value,
                returnDate: returnDate.value,
                ages: Array.from(document.querySelectorAll('.age-display')).map(el =>
                    el.textContent
                ),
                promoCode: document.getElementById('promoCode').value
            };

            sessionStorage.setItem('quoteData', JSON.stringify(formData));

            // Redirect to quote page
            window.location.href = 'quote.html';
        }
    }

    // =======================
    // Trip Type Selector
    // =======================

    class TripTypeSelector {
        constructor() {
            this.singleTripBtn = document.getElementById('singleTripBtn');
            this.multiTripBtn = document.getElementById('multiTripBtn');
            this.init();
        }

        init() {
            if (!this.singleTripBtn || !this.multiTripBtn) return;

            this.singleTripBtn.addEventListener('click', () => this.selectType('single'));
            this.multiTripBtn.addEventListener('click', () => this.selectType('multi'));
        }

        selectType(type) {
            if (type === 'single') {
                this.singleTripBtn.classList.add('active');
                this.singleTripBtn.setAttribute('aria-pressed', 'true');
                this.multiTripBtn.classList.remove('active');
                this.multiTripBtn.setAttribute('aria-pressed', 'false');
            } else {
                this.multiTripBtn.classList.add('active');
                this.multiTripBtn.setAttribute('aria-pressed', 'true');
                this.singleTripBtn.classList.remove('active');
                this.singleTripBtn.setAttribute('aria-pressed', 'false');
            }
        }
    }

    // =======================
    // Plan Selection Handler
    // =======================

    class PlanSelectionHandler {
        constructor() {
            this.planCards = document.querySelectorAll('.plan-card');
            this.init();
        }

        init() {
            if (this.planCards.length === 0) return;

            this.planCards.forEach(card => {
                const selectBtn = card.querySelector('.btn');
                if (selectBtn) {
                    selectBtn.addEventListener('click', () => this.selectPlan(card));
                }

                // Handle benefit selects
                const selects = card.querySelectorAll('.benefit-select');
                selects.forEach(select => {
                    select.addEventListener('change', (e) => this.updatePrice(card));
                });
            });
        }

        selectPlan(card) {
            const planName = card.querySelector('.plan-name').textContent;
            const price = card.querySelector('.price-current').textContent;

            console.log(`Selected plan: ${planName} at ${price}`);

            // Store selection and proceed
            sessionStorage.setItem('selectedPlan', JSON.stringify({
                name: planName,
                price: price
            }));

            // Show success message
            alert(`You've selected the ${planName} plan!`);

            // In a real application, this would proceed to the next step
        }

        updatePrice(card) {
            // In a real application, this would recalculate the price based on selected options
            console.log('Price update triggered');
        }
    }

    // =======================
    // Smooth Scroll Handler
    // =======================

    class SmoothScrollHandler {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#' || href.length === 1) return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // =======================
    // Quote Data Loader
    // =======================

    class QuoteDataLoader {
        constructor() {
            this.init();
        }

        init() {
            // Check if we're on the quote page or plan-details page
            const isQuotePage = document.querySelector('.quote-page');
            const isPlanDetailsPage = document.querySelector('.plan-details-main');

            if (!isQuotePage && !isPlanDetailsPage) return;

            const quoteData = sessionStorage.getItem('quoteData');
            if (quoteData) {
                this.loadData(JSON.parse(quoteData));

            } else {
                // No data in session storage - redirect to landing page
                console.warn('No quote data found in session storage. Redirecting to landing page...');
                window.location.href = '/index.html';
        }


        loadData(data) {
            // Update trip details summary - works for both quote.html and plan-details.html
            // Try quote.html structure first (.detail-value), then plan-details.html structure (.info-value)
            let destinationElement = document.querySelector('.trip-detail .detail-value');
            if (!destinationElement) {
                destinationElement = document.querySelector('.info-item .info-value');
            }

            if (destinationElement && data.destinations) {
                destinationElement.textContent = data.destinations.join(', ');
            }

            // Get all value elements (works for both page structures)
            let valueElements = document.querySelectorAll('.trip-detail .detail-value');
            if (valueElements.length === 0) {
                valueElements = document.querySelectorAll('.info-item .info-value');
            }

            // Update dates (second element)
            if (valueElements[1] && data.departDate && data.returnDate) {
                valueElements[1].textContent = `${data.departDate} - ${data.returnDate}`;
            }

            // Update ages (third element)
            if (valueElements[2] && data.ages) {
                valueElements[2].textContent = data.ages.join(', ');
            }
        }
    }

    // =======================
    // Initialize All Components
    // =======================

    ready(() => {
        // Initialize all components
        new Navigation();
        new DestinationSelector();
        new DateInputHandler();
        new TravellerAgeHandler();
        new QuoteFormHandler();
        new TripTypeSelector();
        new PlanSelectionHandler();
        new SmoothScrollHandler();
        new QuoteDataLoader();

        // Add loaded class to body for animations
        document.body.classList.add('loaded');

        // Console welcome message
        console.log('%c WAS Insurance ', 'background: #1a2b4a; color: #f5a623; font-size: 16px; font-weight: bold; padding: 10px;');
        console.log('%c Breaking the limits of traditional travel insurance ', 'color: #1a2b4a; font-size: 12px;');
    });

    // =======================
    // Service Worker Registration (Optional)
    // =======================

    // Uncomment to enable service worker for PWA capabilities
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
    */

})();
