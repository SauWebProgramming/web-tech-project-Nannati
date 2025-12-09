// ===================================
// GLOBAL STATE & DOM ELEMENTS
// ===================================

let allMovies = [];
let filteredMovies = [];
let favorites = [];

// DOM Elements
const mainContent = document.getElementById('mainContent');
const moviesGrid = document.getElementById('moviesGrid');
const allMoviesGrid = document.getElementById('allMoviesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const yearFilter = document.getElementById('yearFilter');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const movieModal = document.getElementById('movieModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const heroSection = document.getElementById('heroSection');

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // Load favorites from localStorage
    loadFavoritesFromStorage();
    
    // Load movies from JSON
    await loadMovies();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Handle initial route
    handleRoute();
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

// ===================================
// FETCH MOVIES DATA
// ===================================

async function loadMovies() {
    try {
        showLoading(true);
        
        const response = await fetch('movies.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allMovies = data;
        filteredMovies = [...allMovies];
        
        renderMovies(filteredMovies);
        renderAllMovies();
        renderFavorites();
        setupHeroSection();
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading movies:', error);
        showLoading(false);
        moviesGrid.innerHTML = '<p class="error-message">Filmler yüklenirken bir hata oluştu.</p>';
    }
}

// ===================================
// RENDER FUNCTIONS
// ===================================

function renderMovies(movies, targetGrid = moviesGrid) {
    targetGrid.innerHTML = '';
    
    if (movies.length === 0) {
        noResults.classList.add('active');
        return;
    }
    
    noResults.classList.remove('active');
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        targetGrid.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('data-id', movie.id);
    
    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${movie.id}">
            ${isFavorite ? '♥' : '♡'}
        </button>
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-rating">⭐ ${movie.rating}</span>
                <span class="movie-year">${movie.year}</span>
            </div>
        </div>
    `;
    
    // Click event for movie details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('favorite-btn')) {
            showMovieDetail(movie);
        }
    });
    
    // Favorite button event
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(movie);
    });
    
    return card;
}

function renderAllMovies() {
    renderMovies(allMovies, allMoviesGrid);
}

function renderFavorites() {
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    
    if (favorites.length === 0) {
        favoritesEmpty.style.display = 'block';
        favoritesGrid.style.display = 'none';
    } else {
        favoritesEmpty.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        renderMovies(favorites, favoritesGrid);
    }
}

// ===================================
// HERO SECTION
// ===================================

function setupHeroSection() {
    if (allMovies.length === 0) return;
    
    // Select a random high-rated movie for hero
    const heroMovie = allMovies
        .filter(m => m.rating >= 8.5)
        .sort(() => 0.5 - Math.random())[0] || allMovies[0];
    
    heroSection.style.backgroundImage = `url('${heroMovie.backdrop}')`;
    
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    heroTitle.textContent = heroMovie.title;
    heroDescription.textContent = heroMovie.description;
    
    // Hero button events
    const heroPlayBtn = document.getElementById('heroPlayBtn');
    const heroInfoBtn = document.getElementById('heroInfoBtn');
    
    heroPlayBtn.addEventListener('click', () => {
        alert(`${heroMovie.title} oynatılıyor... (Demo)`);
    });
    
    heroInfoBtn.addEventListener('click', () => {
        showMovieDetail(heroMovie);
    });
}

// ===================================
// SEARCH & FILTER
// ===================================

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;
    
    filteredMovies = allMovies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || movie.genre === selectedCategory;
        
        let matchesYear = true;
        if (selectedYear !== 'all') {
            if (selectedYear === '2010s') {
                matchesYear = movie.year >= 2010 && movie.year < 2020;
            } else if (selectedYear === '2000s') {
                matchesYear = movie.year >= 2000 && movie.year < 2010;
            } else {
                matchesYear = movie.year.toString() === selectedYear;
            }
        }
        
        return matchesSearch && matchesCategory && matchesYear;
    });
    
    renderMovies(filteredMovies);
}

// ===================================
// MOVIE DETAIL MODAL
// ===================================

function showMovieDetail(movie) {
    const modalTitle = document.getElementById('modalTitle');
    const modalRating = document.getElementById('modalRating');
    const modalYear = document.getElementById('modalYear');
    const modalDuration = document.getElementById('modalDuration');
    const modalDescription = document.getElementById('modalDescription');
    const modalGenre = document.getElementById('modalGenre');
    const modalDirector = document.getElementById('modalDirector');
    const modalCast = document.getElementById('modalCast');
    const modalHero = document.getElementById('modalHero');
    const modalFavoriteBtn = document.getElementById('modalFavoriteBtn');
    
    // Set modal content
    modalTitle.textContent = movie.title;
    modalRating.textContent = `⭐ ${movie.rating}`;
    modalYear.textContent = movie.year;
    modalDuration.textContent = movie.duration;
    modalDescription.textContent = movie.description;
    modalGenre.textContent = movie.genre;
    modalDirector.textContent = movie.director;
    modalCast.textContent = movie.cast;
    modalHero.style.backgroundImage = `url('${movie.backdrop}')`;
    
    // Update favorite button
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    modalFavoriteBtn.textContent = isFavorite ? '♥' : '♡';
    modalFavoriteBtn.className = `btn btn-icon ${isFavorite ? 'active' : ''}`;
    
    // Favorite button event
    modalFavoriteBtn.onclick = () => {
        toggleFavorite(movie);
        const newIsFavorite = favorites.some(fav => fav.id === movie.id);
        modalFavoriteBtn.textContent = newIsFavorite ? '♥' : '♡';
        modalFavoriteBtn.className = `btn btn-icon ${newIsFavorite ? 'active' : ''}`;
    };
    
    // Show modal
    movieModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    movieModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===================================
// FAVORITES MANAGEMENT
// ===================================

function toggleFavorite(movie) {
    const index = favorites.findIndex(fav => fav.id === movie.id);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(movie);
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
    }
    
    // Save to localStorage
    saveFavoritesToStorage();
    
    // Update all favorite buttons for this movie (instead of re-rendering everything)
    updateFavoriteButtons(movie.id);
    
    // Only re-render the favorites page
    renderFavorites();
}

function updateFavoriteButtons(movieId) {
    // Find all favorite buttons for this movie across all grids
    const buttons = document.querySelectorAll(`.favorite-btn[data-id="${movieId}"]`);
    const isFavorite = favorites.some(fav => fav.id === movieId);
    
    buttons.forEach(button => {
        if (isFavorite) {
            button.classList.add('active');
            button.textContent = '♥';
        } else {
            button.classList.remove('active');
            button.textContent = '♡';
        }
    });
}

function loadFavoritesFromStorage() {
    const stored = localStorage.getItem('movieFavorites');
    if (stored) {
        try {
            favorites = JSON.parse(stored);
        } catch (error) {
            console.error('Error loading favorites:', error);
            favorites = [];
        }
    }
}

function saveFavoritesToStorage() {
    try {
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

// ===================================
// SPA ROUTING
// ===================================

function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const pages = document.querySelectorAll('.page-section');
    
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const activePage = document.getElementById(`${hash}Page`);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === hash) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// ===================================
// EVENT LISTENERS
// ===================================

function initializeEventListeners() {
    // Search
    searchInput.addEventListener('input', applyFilters);
    searchBtn.addEventListener('click', applyFilters);
    
    // Filters
    categoryFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && movieModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            window.location.hash = page;
        });
    });
    
    // Handle hash change
    window.addEventListener('hashchange', handleRoute);
}

// ===================================
// UI HELPERS
// ===================================

function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('active');
        moviesGrid.style.display = 'none';
    } else {
        loadingSpinner.classList.remove('active');
        moviesGrid.style.display = 'grid';
    }
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c🎬 CineMax Movie Library', 'color: #e50914; font-size: 20px; font-weight: bold;');
console.log('%cWeb Teknolojileri Projesi - 2025', 'color: #fff; font-size: 14px;');
console.log('%cTeknolojiler: HTML5, CSS3, JavaScript ES6+, Fetch API, LocalStorage', 'color: #b3b3b3; font-size: 12px;');

