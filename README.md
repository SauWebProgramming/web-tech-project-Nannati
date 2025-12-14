# 🎬 Vantage - Interactive Movie Library (SPA)

This project was developed for the ISE-201 Web Technologies course.

## 🌟 Features

### ✅ Required Functions (All Implemented)

- **📋 List/Grid View**: All movies are displayed in a grid layout with modern card design
- **🔍 Search and Filtering**: 
  - Real-time search by movie title
  - Filter by category (Action, Sci-Fi, Drama, etc.)
  - Filter by year (2024, 2023, 2010s, 2000s)
- **📱 Detail Page**: Details are shown in a dynamic modal when a movie is clicked (SPA approach)
- **❤️ My Favorites**: Stored in the browser using localStorage, separate "My Favorites" page

### 🎯 Technical Features

- ✅ Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Fully responsive design - Mobile, tablet, desktop compatible
- ✅ CSS Flexbox and Grid usage
- ✅ Modern JavaScript (ES6+)
  - Using `const` and `let` (NO `var`)
  - Arrow functions (`=>`)
  - `async/await` and Promises
  - Template literals
- ✅ Fetching data from local JSON file with Fetch API
- ✅ Data management with localStorage
- ✅ Single Page Application (SPA) - Hash-based routing
- ✅ Hamburger menu (for mobile devices)

## 🎨 Design

- Netflix-inspired dark theme
- Modern and minimalist interface
- Smooth animations and transitions
- Hero section (featured movie)
- Interactive hover effects
- Custom scrollbar design

## 📁 Project Structure

```
web-tech-project-Nannati/
├── index.html          # Main HTML file (Semantic HTML5)
├── styles.css          # Style file (CSS3, Flexbox, Grid, Responsive)
├── app.js              # JavaScript file (ES6+, Fetch, SPA)
├── movies.json         # Movie data (42 movies)
└── README.md           # Project documentation
```

## 🚀 Installation and Running

### Option 1: Live Server (Recommended)

1. Clone the project:
```bash
git clone <repository-url>
web-tech-project-Nannati
```

2. Run with Live Server extension in VS Code:
   - Open the project in VS Code
   - Right-click on `index.html` file
   - Click "Open with Live Server"

```


## 📖 Usage

### Home Page
- Featured movie is displayed in the hero section
- You can search for movies from the search bar
- You can use category and year filters
- Click on movie cards to view details

### Movies Page
- All movies are displayed in a list
- Search and filtering features are available

### My Favorites Page
- Movies you marked as favorites are listed here
- Click the heart icon to add or remove movies
- Data is stored in your browser with localStorage

### Movie Details
- Modal opens when a movie card is clicked
- Movie summary, actors, director information are displayed
- Can also be added to favorites from the modal

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|------|
| HTML5 | Semantic structure, form validation |
| CSS3 | Flexbox, Grid, Media Queries, Animations |
| JavaScript ES6+ | `const/let`, arrow functions, `async/await` |
| Fetch API | Asynchronously loading JSON data |
| localStorage | Storing favorite movies in browser |
| Hash Routing | SPA navigation (#home, #movies, #favorites) |
| Google Fonts | Poppins font family |

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🎯 Project Requirements Compliance Status

### ✅ HTML5 & CSS3
- [x] Semantic HTML usage
- [x] Responsive Design (Media Queries)
- [x] CSS Flexbox and Grid

### ✅ Modern JavaScript (ES6+)
- [x] Using `const` and `let`
- [x] Arrow Functions
- [x] `async/await` and Promise

### ✅ Asynchronous JavaScript
- [x] Using `fetch()` API
- [x] Processing JSON data and rendering to DOM

### ✅ Data Management
- [x] Using localStorage
- [x] Data management with local JSON file

### ✅ SPA Functions
- [x] Dynamic page loading (hash-based routing)
- [x] Detail display with modal (no separate HTML page)
- [x] Search and filtering
- [x] Favorites system

## 🌟 Bonus Features (For Extra Points)

### Advanced CSS Animations and Transitions
- ✅ **Staggered Card Entry**: Each movie card appears with a slight delay animation
- ✅ **Smooth Hover Effects**: Cards grow, elevate and glow when hovered over
- ✅ **Button Wave Effect**: Wave animation when buttons are clicked
- ✅ **Heartbeat Animation**: Favorites animate with heartbeat effect
- ✅ **Loading Indicator**: Spinning animated loading indicator
- ✅ **Skeleton Loading**: Professional shimmer effect for loading states
- ✅ **Modal Animations**: Scaling and fade-in effects for modals
- ✅ **Hero Animations**: Staggered fade-in for hero content
- ✅ **Navigation Animations**: Smooth slide and underline effects
- ✅ **Page Transitions**: Fade-in animations between pages
- ✅ **Smooth Scrolling**: Smooth scrolling behavior throughout the page
- ✅ **Parallax Effects**: Multi-layered animations for depth
- ✅ **Glow Effects**: Text and element glows on interaction
- ✅ **Transform Animations**: Scale, rotate and translate effects

### CSS Animation List (15+ animations):
1. `fadeIn` - Fade in with opacity
2. `fadeInUp` - Fade in from bottom to top
3. `slideUp` - Slide up from bottom
4. `slideInLeft` - Slide in from left
5. `slideInRight` - Slide in from right
6. `heartBeat` - Heartbeat effect
7. `pulse` - Pulse opacity
8. `spin` - Rotation animation
9. `shimmer` - Loading shimmer
10. `bounce` - Bounce effect
11. `scaleIn` - Scale from small to large
12. `float` - Floating movement

### Advanced CSS Features:
- ✅ Cubic-bezier timing functions for smooth animations
- ✅ Transform combinations (scale + translate)
- ✅ Backdrop filters for blur effects
- ✅ Custom scrollbar design
- ✅ CSS variables for theming
- ✅ Pseudo-elements for effects (::before, ::after)
- ✅ Complex gradients
- ✅ Box-shadow animations
- ✅ Text-shadow effects

## 🌐 GitHub Pages Deployment

The project is live on GitHub Pages:

**Live Demo**: [GitHub Pages URL to be added here]

### Deployment Steps

1. Create a repository on GitHub
2. Go to Settings > Pages
3. Select Source: "Deploy from a branch"
4. Select Branch: "main" and root "/"
5. Click the Save button
6. Your site will be published within a few minutes

## 📊 Data Structure (movies.json)

```json
{
  "id": 1,
  "title": "Movie Title",
  "year": 2024,
  "genre": "Category",
  "rating": 8.5,
  "duration": "120 min",
  "director": "Director",
  "cast": "Actors",
  "description": "Movie description",
  "poster": "Poster URL",
  "backdrop": "Backdrop URL"
}
```

## 🎓 Learning Outcomes

Skills gained from this project:

- ✅ Creating Semantic HTML5 structure
- ✅ Modern CSS techniques (Flexbox, Grid, Animations)
- ✅ Responsive web design
- ✅ DOM manipulation with JavaScript
- ✅ Asynchronous programming (Fetch API, async/await)
- ✅ SPA (Single Page Application) concept
- ✅ Data management with localStorage
- ✅ Git version control and GitHub usage
- ✅ Modern web development best practices

## 👨‍💻 Developer

- **Name**: [Natnael Nigussu Tilahun]
- **Student ID**: [B231200574]
- **Course**: ISE-201 Web Technologies
- **Year**: 2025

## 📝 License

This project is for educational purposes and was developed for the ISE-201 Web Technologies course.

## 🙏 Acknowledgments

Resources used while developing this project:

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Unsplash](https://unsplash.com/) - For visual content

---

**Note**: The project is developed entirely using static HTML, CSS and JavaScript. No server-side technology (PHP, Node.js, etc.) was used.

