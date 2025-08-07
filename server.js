const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home', { 
        title: 'Home',
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About',
        currentPage: 'about'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Projects',
        currentPage: 'projects'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: '404 - Page Not Found',
        currentPage: ''
    });
});

// Start server only if this file is run directly (not required in tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Portfolio server running on http://localhost:${PORT}`);
    });
}

// Export the app for testing
module.exports = app;