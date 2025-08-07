# Portfolio Site

A professional Express.js portfolio website with modern design and responsive layout.

## Features

- **Home Page**: Welcome section with overview of services
- **About Page**: Personal information, skills, and technologies
- **Projects Page**: Showcase of development projects
- **404 Error Page**: Custom error handling
- **Responsive Design**: Mobile-first approach with modern CSS
- **Professional Styling**: Gradient backgrounds, card layouts, and smooth animations

## Technologies Used

- **Backend**: Express.js, EJS templating
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with gradients, flexbox, and grid
- **Dependencies**: express, ejs, express-ejs-layouts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Routes

- `/` - Home page
- `/about` - About page
- `/projects` - Projects showcase
- Any other route - 404 error page

## Customization

### Personal Information

Update the following files with your personal information:

- **Views**: Modify content in `views/home.ejs`, `views/about.ejs`, and `views/projects.ejs`
- **Contact**: Update email links in the templates
- **Footer**: Change the name in `views/layout.ejs`

### Styling

- **Colors**: Modify CSS variables in `public/css/style.css`
- **Layout**: Adjust grid and flexbox properties
- **Animations**: Customize transitions and hover effects

### Projects

Add your actual projects in `views/projects.ejs`:
- Replace placeholder project descriptions
- Update technology tags
- Add real project links (demo and code repository)

## Project Structure

```
portfolio-site/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── home.ejs          # Home page
│   ├── about.ejs         # About page
│   ├── projects.ejs      # Projects page
│   └── 404.ejs           # Error page
└── public/               # Static files
    └── css/
        └── style.css     # Main stylesheet
```

## CI/CD with CircleCI

This project includes a CircleCI configuration with automated testing and building:

### CircleCI Jobs

1. **Test Job**:
   - Installs dependencies with caching
   - Runs linting (if ESLint is configured)
   - Executes test suite
   - Performs security audit
   - Stores test results and artifacts

2. **Build Job**:
   - Creates production build
   - Copies application files
   - Installs production dependencies only
   - Verifies build integrity
   - Tests application startup
   - Stores build artifacts

### Setting up CircleCI

1. Connect your repository to CircleCI
2. The pipeline will automatically run on every push
3. Test job must pass before build job runs
4. Build artifacts are stored for deployment

## Deployment

This application can be deployed to various platforms:

- **Heroku**: Add a `Procfile` with `web: node server.js`
- **Vercel**: Works out of the box
- **Railway**: Deploy directly from Git
- **DigitalOcean**: Use App Platform

Make sure to set the `PORT` environment variable on your hosting platform.

### Using CircleCI Build Artifacts

The build job creates production-ready artifacts that can be deployed:
- Download build artifacts from CircleCI
- Extract and deploy to your hosting platform
- The build includes only production dependencies

## License

This project is open source and available under the MIT License.