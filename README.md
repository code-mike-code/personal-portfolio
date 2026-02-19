# Personal Portfolio (Code Mike Dev)

This is a personal portfolio website built with React to showcase projects, skills, and provide contact information.

##  Security Note & Important Changes

**The Problem:** The original implementation loaded project data directly from the GitHub API in the browser, using a `GITHUB_TOKEN` that was stored in the client-side code. This created a **critical security vulnerability**, as the secret token was visible to any visitor of the website.

**The Solution:**
1.  **API Call Removed:** The direct API call to GitHub from the front end has been removed.
2.  **Secret Token Deleted:** The `github.secret.js` file containing the token has been removed from the project to eliminate the exposure.
3.  **Mock Data Used:** The project now uses `mock-repos.js` to display sample data for the project list. This ensures the website is fully functional and secure.

**Future Recommendation:**
To load real, dynamic data securely, a backend solution (like a serverless function on Vercel/Netlify or a small Node.js server) should be implemented. This backend would store the API key safely and make the requests to the GitHub API, never exposing the key in the browser.

---

## Technologies Used

*   **React:** The core UI library.
*   **Webpack:** For module bundling and code transpilation.
*   **Babel:** For compiling modern JavaScript (ES6+) and JSX.
*   **Jest:** For component testing.
*   **ESLint:** For code quality and consistency.
*   **CSS Modules:** For locally-scoped component styling.
*   **EmailJS:** For handling form submissions (contact form).


## Getting Started

To run the project locally, follow these steps.

### Prerequisites

You will need [Node.js](https://nodejs.org/) (version 14 or higher) and npm on your system.

### Installation

1.  Clone the repository:
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    ```
2.  Navigate to the project directory:
    ```sh
    cd personal-portfolio
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

4.  **Configure Environment Variables:**
    
    Create a `.env` file in the project root directory:
    ```sh
    cp .env.example .env
    ```
    
    Then edit `.env` and add your credentials:
    ```env
    # EmailJS Configuration (required for contact form)
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here

    # GitHub Configuration (optional, for Projects component)
    REACT_APP_GITHUB_USERNAME=your_github_username
    REACT_APP_GITHUB_TOKEN=your_github_token_here
    ```
    
    **How to get EmailJS credentials:**
    - Sign up at [EmailJS](https://www.emailjs.com/)
    - Create a new email service
    - Create an email template
    - Copy your Service ID, Template ID, and Public Key
    
    **Note:** The `.env` file is gitignored and will not be committed to version control.

### Running the Project

To start the development server (usually on `http://localhost:8080`):
```sh
npm start
```

### Building the Project

To create an optimized production build in the `dist/` directory:
```sh
npm run build
```

### Code Quality

Run ESLint to check code quality:
```sh
npm run lint
```

Auto-fix linting issues:
```sh
npm run lint:fix
```

Run tests:
```sh
npm test
```

## Troubleshooting

**Contact form not working:**
- Ensure you have created a `.env` file with valid EmailJS credentials
- Check the browser console for any error messages about missing environment variables

**Build errors:**
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure you're using Node.js version 14 or higher

## Project Structure

```
/
├── public/
│   └── index.html      # HTML template
├── src/
│   ├── components/     # Reusable React components
│   │   ├── AboutMe/
│   │   ├── Contact/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Projects/     # Project list component (now using mock data)
│   │   └── ...
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── index.js        # Application entry point
├── package.json        # Project dependencies and scripts
└── webpack.config.js   # Webpack configuration
```