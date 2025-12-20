// ===================================
// GLOBAL STATE & DOM ELEMENTS
// ===================================

let allMovies = [];
let filteredMovies = [];
let favorites = [];
let currentLang = 'en';

// Translation dictionary
const translations = {
    en: {
        navHome: 'Home',
        navMovies: 'Movies & Series',
        navFavorites: 'My Favorites',
        searchPlaceholder: 'Search movies...',
        btnPlay: '▶ Play',
        btnInfo: 'ℹ Info',
        filterAllTypes: 'All Types',
        filterMovies: 'Movies',
        filterSeries: 'Series',
        filterAllCategories: 'All Categories',
        filterAllRatings: 'All Ratings',
        filterAllYears: 'All Years',
        genreAction: 'Action',
        genreSciFi: 'Sci-Fi',
        genreComedy: 'Comedy',
        genreDrama: 'Drama',
        genreHorror: 'Horror',
        genreAdventure: 'Adventure',
        genreRomance: 'Romance',
        genreThriller: 'Thriller',
        ratingExcellent: '9+ ⭐ Excellent',
        ratingGreat: '8+ ⭐ Great',
        ratingGood: '7+ ⭐ Good',
        ratingAverage: '6+ ⭐ Average',
        sortBy: 'Sort By',
        sortRatingDesc: 'Rating: High → Low',
        sortRatingAsc: 'Rating: Low → High',
        sortYearDesc: 'Year: New → Old',
        sortYearAsc: 'Year: Old → New',
        sortTitleAsc: 'Title: A → Z',
        sortTitleDesc: 'Title: Z → A',
        btnClear: 'Clear',
        sectionPopular: 'Popular Movies & Series',
        loading: 'Loading...',
        noResults: 'No results found.',
        pageAllMovies: 'All Movies & Series',
        pageFavorites: 'My Favorites',
        emptyFavTitle: 'No Favorites Yet',
        emptyFavMsg1: "You don't have any favorite movies or series yet.",
        emptyFavMsg2: 'Click the heart icon to add movies and series to your favorites.',
        btnBrowse: 'Browse Movies',
        modalSummary: 'Summary',
        modalGenre: 'Genre:',
        modalDirector: 'Director:',
        modalCast: 'Cast:',
        resultsTotal: 'Total',
        resultsShowing: 'Showing',
        resultsOf: '/',
        resultsText: 'results'
    },
    tr: {
        navHome: 'Ana Sayfa',
        navMovies: 'Filmler & Diziler',
        navFavorites: 'Favorilerim',
        searchPlaceholder: 'Film ara...',
        btnPlay: '▶ Oynat',
        btnInfo: 'ℹ Bilgi',
        filterAllTypes: 'Tüm Tipler',
        filterMovies: 'Filmler',
        filterSeries: 'Diziler',
        filterAllCategories: 'Tüm Kategoriler',
        filterAllRatings: 'Tüm Puanlar',
        filterAllYears: 'Tüm Yıllar',
        genreAction: 'Aksiyon',
        genreSciFi: 'Bilim Kurgu',
        genreComedy: 'Komedi',
        genreDrama: 'Drama',
        genreHorror: 'Korku',
        genreAdventure: 'Macera',
        genreRomance: 'Romantik',
        genreThriller: 'Gerilim',
        ratingExcellent: '9+ ⭐ Mükemmel',
        ratingGreat: '8+ ⭐ Harika',
        ratingGood: '7+ ⭐ İyi',
        ratingAverage: '6+ ⭐ Orta',
        sortBy: 'Sırala',
        sortRatingDesc: 'Puan: Yüksek → Düşük',
        sortRatingAsc: 'Puan: Düşük → Yüksek',
        sortYearDesc: 'Yıl: Yeni → Eski',
        sortYearAsc: 'Yıl: Eski → Yeni',
        sortTitleAsc: 'İsim: A → Z',
        sortTitleDesc: 'İsim: Z → A',
        btnClear: 'Temizle',
        sectionPopular: 'Popüler Filmler & Diziler',
        loading: 'Yükleniyor...',
        noResults: 'Sonuç bulunamadı.',
        pageAllMovies: 'Tüm Filmler & Diziler',
        pageFavorites: 'Favorilerim',
        emptyFavTitle: 'Henüz Favori Yok',
        emptyFavMsg1: 'Henüz favori film veya diziniz yok.',
        emptyFavMsg2: 'Filmler ve diziler eklemek için kalp ikonuna tıklayın.',
        btnBrowse: 'Filmlere Göz At',
        modalSummary: 'Özet',
        modalGenre: 'Tür:',
        modalDirector: 'Yönetmen:',
        modalCast: 'Oyuncular:',
        resultsTotal: 'Toplam',
        resultsShowing: 'Gösterilen',
        resultsOf: '/',
        resultsText: 'sonuç'
    }
};

// DOM Elements
const mainContent = document.getElementById('mainContent');
const moviesGrid = document.getElementById('moviesGrid');
const allMoviesGrid = document.getElementById('allMoviesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const typeFilter = document.getElementById('typeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const ratingFilter = document.getElementById('ratingFilter');
const yearFilter = document.getElementById('yearFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const resultsCount = document.getElementById('resultsCount');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const movieModal = document.getElementById('movieModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const heroSection = document.getElementById('heroSection');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    // Load favorites from localStorage
    loadFavoritesFromStorage();

    // Load theme preference from localStorage
    loadThemeFromStorage();
    
    // Load movies from JSON
    await loadMovies();
    
     // Load language preference from localStorage
    loadLanguageFromStorage();

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
        
        updateResultsCount();
        renderMovies(filteredMovies);
        renderAllMovies();
        renderFavorites();
        setupHeroSection();
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading movies:', error);
        showLoading(false);
        moviesGrid.innerHTML = '<p class="error-message">An error occurred while loading movies.</p>';
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
        alert(`Playing ${heroMovie.title}... (Demo)`);
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
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;
    const selectedRating = ratingFilter.value;
    const selectedYear = yearFilter.value;
    const selectedSort = sortFilter.value;
    
    // Filter movies
    filteredMovies = allMovies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesType = selectedType === 'all' || movie.type === selectedType;
        const matchesCategory = selectedCategory === 'all' || movie.genre === selectedCategory;
        
        // Rating filter
        let matchesRating = true;
        if (selectedRating !== 'all') {
            const minRating = parseFloat(selectedRating);
            matchesRating = movie.rating >= minRating;
        }
        
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
        
        return matchesSearch && matchesType && matchesCategory && matchesRating && matchesYear;
    });
    
    // Sort movies
    applySorting(selectedSort);
    
    // Update results count
    updateResultsCount();
    
    renderMovies(filteredMovies);
}

// ===================================
// SORTING FUNCTION
// ===================================

function applySorting(sortType) {
    switch(sortType) {
        case 'rating-desc':
            filteredMovies.sort((a, b) => b.rating - a.rating);
            break;
        case 'rating-asc':
            filteredMovies.sort((a, b) => a.rating - b.rating);
            break;
        case 'year-desc':
            filteredMovies.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            filteredMovies.sort((a, b) => a.year - b.year);
            break;
        case 'title-asc':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title, 'en'));
            break;
        case 'title-desc':
            filteredMovies.sort((a, b) => b.title.localeCompare(a.title, 'en'));
            break;
        default:
            // Keep original order
            break;
    }
}

// ===================================
// RESULTS COUNTER
// ===================================

function updateResultsCount() {
    const count = filteredMovies.length;
    const total = allMovies.length;
    
    if (count === total) {
        resultsCount.textContent = `${translations[currentLang].resultsTotal} ${total} ${translations[currentLang].resultsText}`;
    } else {
        resultsCount.textContent = `${translations[currentLang].resultsShowing} ${count} ${translations[currentLang].resultsOf} ${total} ${translations[currentLang].resultsText}`;
    }
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
    typeFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Clear filters button
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

     
    // Language toggle
    langToggle.addEventListener('click', toggleLanguage);
    
    // Scroll to top button
    scrollToTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScrollToTopVisibility);
    
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
// CLEAR ALL FILTERS
// ===================================

function clearAllFilters() {
    // Reset all filter inputs
    searchInput.value = '';
    typeFilter.value = 'all';
    categoryFilter.value = 'all';
    ratingFilter.value = 'all';
    yearFilter.value = 'all';
    sortFilter.value = 'default';
    
    // Reapply filters (which will show all movies)
    applyFilters();
    
    // Simple visual feedback
    clearFiltersBtn.style.opacity = '0.6';
    setTimeout(() => {
        clearFiltersBtn.style.opacity = '1';
    }, 200);
}

// ===================================
// SCROLL TO TOP FUNCTIONALITY
// ===================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScrollToTopVisibility() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}
// ===================================
// THEME TOGGLE
// ===================================

function toggleTheme() {
    const body = document.body;
    
    body.classList.toggle('light-mode');
    
    // Save preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

function loadThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
}
// ===================================
// LANGUAGE TOGGLE
// ===================================

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    langToggle.textContent = currentLang.toUpperCase();
    localStorage.setItem('language', currentLang);
    updatePageLanguage();
}

function loadLanguageFromStorage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        langToggle.textContent = currentLang.toUpperCase();
    }
    updatePageLanguage();
}

function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
    
    // Update results count
    updateResultsCount();
}

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c🎬 Vantage Movie Library', 'color: #e50914; font-size: 20px; font-weight: bold;');
console.log('%cWeb Technologies Project - 2025', 'color: #fff; font-size: 14px;');
console.log('%cTechnologies: HTML5, CSS3, JavaScript ES6+, Fetch API, LocalStorage', 'color: #b3b3b3; font-size: 12px;');

    