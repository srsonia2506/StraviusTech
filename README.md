# Stravius Tech - Premium Hero Section

A modern, responsive hero section designed for premium technology consultancy with AI-inspired aesthetics and smooth animations.

## ✨ Features

### 🎨 Visual Design
- **Premium Tech Aesthetic**: Deep tech blue background with subtle AI-inspired graphics
- **Modern Typography**: Space Grotesk font family for clean, geometric appearance
- **Gradient Accents**: Neon teal (#00D1B2) and cool orange (#FFA654) color scheme
- **Responsive Layout**: Mobile-first design that scales elegantly across all devices

### 🌟 Interactive Elements
- **Animated Background**: Flowing neural network lines and morphing data grids
- **Floating Particles**: Dynamic particle system with glowing effects
- **Hover Animations**: Subtle glow effects on logo and CTA button
- **Parallax Scrolling**: Background elements move at different rates for depth

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Fluid Typography**: Text scales smoothly using CSS clamp() functions
- **Adaptive Graphics**: Background elements adjust for different screen sizes
- **High DPI Support**: Crisp rendering on retina and high-resolution displays

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **Reduced Motion**: Respects user's motion preferences
- **Screen Reader Friendly**: Semantic HTML structure with proper ARIA labels
- **High Contrast**: Maintains readability across different display settings

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Customize** the content in the HTML file
4. **Modify** colors and styles in `styles.css`
5. **Enhance** interactions in `script.js`

## 📁 File Structure

```
stravius-tech-hero/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive features and enhancements
└── README.md           # This documentation
```

## 🎯 Customization

### Brand Content
Edit the following in `index.html`:
- **Brand Name**: Change "STRAVIUS TECH" to your company name
- **Tagline**: Update "Intelligent Solutions for the Digital Future"
- **CTA Button**: Modify "Book a Strategy Call" text and action

### Color Scheme
Modify these CSS custom properties in `styles.css`:
```css
/* Primary Colors */
--primary-bg: #0E0E1A;        /* Deep tech blue background */
--accent-teal: #00D1B2;       /* Neon teal accent */
--accent-orange: #FFA654;     /* Cool orange accent */
--text-primary: #ffffff;      /* Primary text color */
--text-secondary: #a0a0a0;    /* Secondary text color */
```

### Logo
Replace the SVG logo in `index.html` with your own:
```html
<div class="logo-mark">
    <!-- Replace with your logo SVG or image -->
    <svg>...</svg>
</div>
```

## 🔧 Advanced Customization

### Adding More Particles
Modify the `particleCount` variable in `script.js`:
```javascript
const particleCount = 12; // Increase for more particles
```

### Changing Animation Speeds
Adjust animation durations in `styles.css`:
```css
.neural-network::before {
    animation: neuralFlow 15s linear infinite; /* Faster: 15s */
}
```

### Enabling Typing Effect
Uncomment the typing effect in `script.js`:
```javascript
// Initialize typing effect (uncomment if desired)
initTypingEffect();
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## ⚡ Performance Features

- **Optimized Animations**: Uses `requestAnimationFrame` for smooth 60fps
- **Passive Event Listeners**: Scroll and resize events are passive for better performance
- **CSS Containment**: Background elements are contained to prevent layout thrashing
- **Lazy Loading**: Particles are created dynamically to reduce initial load time

## 🎨 Design Inspiration

This hero section draws inspiration from:
- **OpenAI.com**: Clean spacing and typography
- **Anthropic.com**: Minimalist design with abstract visuals
- **Vercel.com**: Modern tech aesthetic and smooth animations
- **Runway/Replit**: Creative and futuristic tech vibes

## 🔮 Future Enhancements

Potential additions for future versions:
- **WebGL Background**: Three.js or WebGL for more complex 3D effects
- **Interactive Particles**: Mouse-following particle system
- **Scroll-Triggered Animations**: Reveal animations on scroll
- **Contact Form Integration**: Direct booking form integration
- **PWA Features**: Service worker for offline functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this hero section.

---

**Built with ❤️ for modern web experiences** 