# Personal Portfolio Website

A modern, responsive portfolio website inspired by Maxim Siebert's design aesthetic. This project showcases a minimalist design with dark and light theme options, custom cursor, smooth animations, and interactive elements.

## Features

- **Responsive Design:** Optimized for all device sizes
- **Custom Cursor:** Unique dot cursor that follows mouse movements
- **Dark/Light Theme Toggle:** User preference saved in local storage
- **Portfolio Gallery:** Visual showcase of projects with hover effects
- **Contact Form:** Interactive form with validation and submission feedback
- **Smooth Animations:** Fade-in effects for sections as they enter the viewport
- **Mobile-Friendly Navigation:** Optimized layout for smaller screens

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (Vanilla JS)
- Intersection Observer API for scroll animations

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling including dark/light themes
├── script.js           # JavaScript functionality
├── server.py           # Python server script for mobile testing via QR code
└── README.md           # Project documentation
```

## Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Open the project in your favorite code editor

3. To view locally:
   - Use VS Code's Live Server extension
   - OR run the Python server:
     ```
     python server.py
     ```
     Then scan the QR code with your mobile device (both devices must be on the same WiFi network)

## Customization

The website is easy to customize:

- **Personal Information:** Update your name, title, and intro in `index.html`
- **Projects & Experience:** Modify the project and experience sections in `index.html`
- **Colors:** Change theme colors by updating CSS variables in `styles.css`
- **Gallery:** Add your own project images by replacing the colored divs with actual images

## Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Opera
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT License


---

Created with ❤️ by Dhruvraj Rana 
