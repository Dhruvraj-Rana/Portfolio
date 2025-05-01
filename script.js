// Update the year in copyright footer
document.addEventListener('DOMContentLoaded', () => {
    // Page loader functionality
    const pageLoader = document.getElementById('page-loader');
    
    // Perspective Grid Background
    const initPerspectiveGrid = () => {
        const horizontalLines = document.getElementById('horizontal-lines');
        const verticalLines = document.getElementById('vertical-lines');
        const gridContainer = document.getElementById('grid-container');
        
        if (!horizontalLines || !verticalLines || !gridContainer) return;
        
        // Generate horizontal lines
        const horizontalLineCount = 30;
        const horizontalGap = 100 / horizontalLineCount;
        
        for (let i = 0; i <= horizontalLineCount; i++) {
            const line = document.createElement('div');
            line.className = 'horizontal-line';
            line.style.top = `${i * horizontalGap}%`;
            horizontalLines.appendChild(line);
        }
        
        // Generate vertical lines
        const verticalLineCount = 30;
        const verticalGap = 100 / verticalLineCount;
        
        for (let i = 0; i <= verticalLineCount; i++) {
            const line = document.createElement('div');
            line.className = 'vertical-line';
            line.style.left = `${i * verticalGap}%`;
            verticalLines.appendChild(line);
        }
        
        // Scroll animation
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollRatio = scrollY / maxScroll;
            
            // Parallax effect with subtle movement
            const rotationX = 60 + (scrollRatio * 5); // 60-65 degree rotation
            const translateZ = scrollRatio * -50; // -50px to 0px
            const translateY = scrollRatio * 10; // 0px to 10px
            
            gridContainer.style.transform = `rotateX(${rotationX}deg) translateZ(${translateZ}px) translateY(${translateY}%)`;
            
            // Adjust opacity based on scroll
            const grid = document.getElementById('perspective-grid');
            if (grid) {
                grid.style.opacity = Math.max(0.2, 0.6 - (scrollRatio * 0.3));
            }
        });
    };
    
    // Initialize grid
    initPerspectiveGrid();

    if (pageLoader) {
        // Hide loader after content is loaded
        window.addEventListener('load', () => {
            // Add a small delay for a smoother experience
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 500);
            }, 1500); // Match this with the animation duration
        });
    }
    
    // Get user's location and update time with country flag
    const updateLocationAndTime = () => {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        const locationTimeText = document.getElementById('location-time-text');
        const countryFlag = document.getElementById('country-flag');
        
        // Function to set Katpadi, India as fallback
        const setKatpadiFallback = () => {
            locationTimeText.textContent = `Katpadi, ${timeString.replace(/\s+/g, ' ')}`;
            // Indian flag emoji (🇮🇳)
            countryFlag.textContent = "🇮🇳";
        };
        
        if (locationTimeText && countryFlag) {
            // Attempt to use a more reliable geolocation service
            try {
                // First try a direct IP-based location service
                fetch('https://ipapi.co/json/')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const city = data.city || 'Katpadi';
                        const countryCode = data.country || 'IN';
                        
                        if (city && countryCode) {
                            // Update location text
                            locationTimeText.textContent = `${city}, ${timeString.replace(/\s+/g, ' ')}`;
                            
                            // Add country flag emoji
                            const flagEmoji = countryCode
                                .toUpperCase()
                                .replace(/./g, char => 
                                    String.fromCodePoint(char.charCodeAt(0) + 127397)
                                );
                            countryFlag.textContent = flagEmoji;
                        } else {
                            setKatpadiFallback();
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching location data:', error);
                        setKatpadiFallback();
                    });
            } catch (error) {
                console.log('Error in location detection:', error);
                setKatpadiFallback();
            }
        }
    };
    
    // Update time initially and then every minute
    updateLocationAndTime();
    setInterval(updateLocationAndTime, 60000);
    
    // Update copyright year
    const copyrightElement = document.querySelector('footer p:last-child');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear}`;
    }
    
    // Custom cursor enhancement
    const cursor = document.getElementById('cursor');
    
    if (cursor) {
        // Use mousemove on window rather than document for complete coverage
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Ensure cursor is visible when mouse is moving
            cursor.style.opacity = '1';
        });
        
        // Make sure cursor stays visible even when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1';
        });
        
        // Prevent cursor from disappearing when mouse leaves the document
        window.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursor.style.opacity = '1';
            }
        });
        
        // Make cursor slightly larger when hovering over links
        const links = document.querySelectorAll('a, button, input, textarea, select, .filter-btn, .submit-btn');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.width = '0.75rem';
                cursor.style.height = '0.75rem';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.width = '0.5rem';
                cursor.style.height = '0.5rem';
            });
        });
    }

    // Theme toggle functionality
    const checkbox = document.getElementById('checkbox');
    const checkboxMobile = document.getElementById('checkbox-mobile');
    const themeLabel = document.querySelector('.theme-label');
    const perspectiveGrid = document.getElementById('perspective-grid');
    
    if (checkbox && themeLabel) {
        // Check if user preference already exists
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            checkbox.checked = currentTheme === 'dark';
            if (checkboxMobile) checkboxMobile.checked = currentTheme === 'dark';
            themeLabel.textContent = currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
            
            // Handle grid visibility based on theme
            if (perspectiveGrid) {
                perspectiveGrid.style.display = currentTheme === 'dark' ? 'none' : 'block';
            }
        }
        
        // Toggle theme when checkbox changes
        checkbox.addEventListener('change', () => {
            const theme = checkbox.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
            
            // Toggle grid visibility
            if (perspectiveGrid) {
                perspectiveGrid.style.display = theme === 'dark' ? 'none' : 'block';
            }
            
            // Keep mobile theme toggle in sync
            if (checkboxMobile) checkboxMobile.checked = theme === 'dark';
        });
        
        // Sync mobile theme toggle
        if (checkboxMobile) {
            checkboxMobile.addEventListener('change', () => {
                const theme = checkboxMobile.checked ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
                
                // Toggle grid visibility
                if (perspectiveGrid) {
                    perspectiveGrid.style.display = theme === 'dark' ? 'none' : 'block';
                }
                
                // Keep desktop theme toggle in sync
                checkbox.checked = theme === 'dark';
            });
        }
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    if (mobileMenuToggle && mobileNav && mobileMenuOverlay) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show back to top button when user scrolls down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Progress bar functionality
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
    
    // Add resume download functionality
    const resumeDownloadBtn = document.getElementById('resume-download');
    if (resumeDownloadBtn) {
        resumeDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create resume data with Dhruvraj's information
            const resumeData = {
                name: "DHRUVRAJSINH RANA",
                contact: {
                    email: "dhruvrana.rana@gmail.com",
                    phone: "9484553365",
                    linkedin: "www.linkedin.com/in/dhruvraj-rana",
                    location: "Gujarat, India"
                },
                education: [
                    { institution: "Vellore Institute of Technology", degree: "B.Tech Computer Science and Engineering with Specialization in IoT (Internet of Things)", gpa: "8.78", period: "2022 - 2026", location: "Vellore" },
                    { institution: "Delhi Public School", degree: "Class XII", aggregate: "93.7", period: "2019 - 2021", location: "Bharuch" },
                    { institution: "Delhi Public School", degree: "Class X", aggregate: "88.0", period: "2018 - 2019", location: "Bharuch" }
                ],
                work_experience: [
                    { 
                        company: "Kunnismart Solutions Pvt ltd", 
                        role: "Technical Lead Intern", 
                        period: "Feb 2024 - Present",
                        location: "Vellore",
                        responsibilities: [
                            "Developed and deployed Livestockify application on google play store",
                            "Recruited and on boarded new interns/Co-led a team of interns for a new App Development project",
                            "Mentored and guided new interns in software development and related areas"
                        ]
                    },
                    {
                        company: "Entrepreneurship Cell, VIT",
                        role: "Director of Research and Development",
                        period: "Aug 2024 - Jan 2025",
                        location: "Vellore",
                        responsibilities: [
                            "Led a team of 17 students to research and analyze emerging startups within VIT, providing insights into innovative business models and market trends",
                            "Organized multiple events focused on business simulations, enhancing participants' strategic and entrepreneurial skills",
                            "Conceptualized and executed a flagship event integrating key business concepts and startup methodologies, fostering a dynamic learning experience"
                        ]
                    }
                ],
                skills: {
                    programming_languages: ["Java (Expert)", "HTML/CSS (Intermediate)", "SQL (Intermediate)"],
                    frameworks_libraries: ["Spring Boot (Fundamental)", "React (Fundamental)", "Hibernate (Fundamental)", "Junit (Fundamental)"],
                    development_tools: ["Git (Expert)", "Maven (Fundamental)", "Gradle (Fundamental)", "Docker (Fundamental)", "Swagger (Fundamental)", "Kubernetes (Fundamental)"],
                    databases: ["MySQL (Advanced)", "PostgreSQL (Fundamental)", "Redis (Fundamental)"],
                    cloud_platforms: ["AWS (Fundamental)", "EC2, S3, Lambda, RDS"],
                    technical_foundations: ["Operating Systems", "System Design", "DBMS", "OOPS", "DSA"]
                },
                projects: [
                    {
                        name: "HealthHub",
                        technologies: "Golang, Postgres",
                        url: "https://github.com/nickawvwoo/HOSPITAL-MANAGEMENT",
                        description: "Online doctor appointment booking platform using golang, postgres, grpc, html, javascript. Helps user book appointment of required doctor based on their choice of timing and doctor expertise with notification system of appointment. Slot booking system like bookmyshow."
                    },
                    {
                        name: "Collaborative Docs",
                        technologies: "Golang, Quil Editor, Postgres, Docker",
                        url: "https://github.com/nickawvwoo/DocHub",
                        description: "A real-time collaborative documentation platform which enables user have real time edits and documentation with collaborators. Enables concurrency control and containerization of user and document server with authentication security to the documents ensuring user privacy and protection of sensitive data. AI backend to edit the document style."
                    },
                    {
                        name: "Pharmacy System",
                        technologies: "Java, Spring Boot, Quil Editor",
                        url: "https://github.com/nickawvwoo/Pharmacy_System",
                        description: "Currently working on a pharmacy e-commerce platform which helps users buy medicines and can be used by retailers to maintain stock of medicines."
                    }
                ],
                certifications: [
                    {
                        name: "AWS Solutions Architect - Associate (SAA-C03)",
                        issuer: "Amazon Web Services"
                    }
                ]
            };
            
            // Convert data to JSON string
            const resumeJson = JSON.stringify(resumeData, null, 2);
            
            // Create blob and download link
            const blob = new Blob([resumeJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // Create a temporary download link
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'dhruvraj-rana-resume.json';
            
            // Append to body, click and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Show a success message
            const originalText = resumeDownloadBtn.textContent;
            resumeDownloadBtn.textContent = '✓ Resume Downloaded';
            
            // Reset after 2 seconds
            setTimeout(() => {
                resumeDownloadBtn.textContent = originalText;
            }, 2000);
        });
    }

    // Fade-in animations for sections
    const addFadeInObserver = () => {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            section.classList.add('fade-in-section');
            observer.observe(section);
        });
    };
    
    // Initialize animations
    addFadeInObserver();
    
    // Add staggered animation to skill items
    const initSkillsAnimation = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            // Add staggered delay to each item
            item.style.transitionDelay = `${index * 30}ms`;
            
            // Add hover class with delay for staggered effect
            const skillCategory = item.closest('.skill-category');
            if (skillCategory) {
                skillCategory.addEventListener('mouseenter', () => {
                    setTimeout(() => {
                        item.classList.add('skill-hover');
                    }, index * 50);
                });
                
                skillCategory.addEventListener('mouseleave', () => {
                    setTimeout(() => {
                        item.classList.remove('skill-hover');
                    }, (skillItems.length - index) * 30);
                });
            }
        });
    };
    
    // Initialize skills animation
    initSkillsAnimation();
    
    // Project filters
    const initProjectFilters = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectRows = document.querySelectorAll('.project-row');
        
        if (filterButtons.length === 0 || projectRows.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter projects with animation
                projectRows.forEach(row => {
                    row.classList.add('fade-out');
                    
                    setTimeout(() => {
                        if (filter === 'all' || row.getAttribute('data-category') === filter) {
                            row.classList.remove('hidden');
                            setTimeout(() => {
                                row.classList.remove('fade-out');
                            }, 50);
                        } else {
                            row.classList.add('hidden');
                        }
                    }, 300);
                });
            });
        });
    };
    
    initProjectFilters();

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Form will submit normally to FormSubmit
            // The button will reset after 3 seconds if there's an error
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Tech or Pokemon Game
    const initTechPokemonGame = () => {
        const techGrid = document.getElementById('tech-grid');
        const scoreDisplay = document.getElementById('score');
        const highScoreDisplay = document.getElementById('high-score');
        const resetButton = document.getElementById('reset-game');
        const gameMessage = document.getElementById('game-message');

        // List of terms from the image
        const terms = [
            { name: 'python', isPokemon: false },
            { name: 'javascript', isPokemon: false },
            { name: 'shiny', isPokemon: false },
            { name: 'dplyr', isPokemon: false },
            { name: 'purrr', isPokemon: false },
            { name: 'ditto', isPokemon: true },
            { name: 'ggplot', isPokemon: false },
            { name: 'd3', isPokemon: false },
            { name: 'canvas', isPokemon: false },
            { name: 'spark', isPokemon: false },
            { name: 'sawk', isPokemon: true },
            { name: 'pyspark', isPokemon: false },
            { name: 'sparklyR', isPokemon: false },
            { name: 'lodash', isPokemon: false },
            { name: 'lazy', isPokemon: false },
            { name: 'bootstrap', isPokemon: false },
            { name: 'jupyter', isPokemon: false },
            { name: 'vulpix', isPokemon: true },
            { name: 'git', isPokemon: false },
            { name: 'flask', isPokemon: false },
            { name: 'numpy', isPokemon: false },
            { name: 'pandas', isPokemon: false },
            { name: 'feebas', isPokemon: true },
            { name: 'scikit', isPokemon: false },
            { name: 'keras', isPokemon: false },
            { name: 'onyx', isPokemon: true },
            { name: 'ekans', isPokemon: true },
            { name: 'hadoop', isPokemon: false },
            { name: 'scala', isPokemon: false },
            { name: 'unity', isPokemon: false }
        ];

        let score = 0;
        let highScore = parseInt(localStorage.getItem('techPokemonHighScore')) || 0;
        let clickedItems = new Set();

        // Update high score display
        highScoreDisplay.textContent = highScore;

        // Shuffle array
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        // Create game grid
        const createGrid = () => {
            techGrid.innerHTML = '';
            shuffleArray([...terms]).forEach(term => {
                const item = document.createElement('div');
                item.className = 'tech-item';
                item.textContent = term.name;
                item.dataset.isPokemon = term.isPokemon;
                
                item.addEventListener('click', () => handleClick(item, term));
                techGrid.appendChild(item);
            });
        };

        // Handle click on item
        const handleClick = (item, term) => {
            if (clickedItems.has(term.name)) return;
            
            clickedItems.add(term.name);
            
            if (term.isPokemon) {
                item.classList.add('correct');
                score += 10;
                gameMessage.textContent = 'Correct! That is a Pokémon!';
            } else {
                item.classList.add('incorrect');
                score = Math.max(0, score - 5);
                gameMessage.textContent = 'Wrong! That is a tech tool!';
            }
            
            item.classList.add('revealed');
            scoreDisplay.textContent = score;
            
            if (score > highScore) {
                highScore = score;
                highScoreDisplay.textContent = highScore;
                localStorage.setItem('techPokemonHighScore', highScore);
            }
            
            // Check if game is complete
            if (clickedItems.size === terms.length) {
                gameMessage.textContent = `Game Over! Final Score: ${score}`;
            }
        };

        // Reset game
        const resetGame = () => {
            score = 0;
            clickedItems.clear();
            scoreDisplay.textContent = '0';
            gameMessage.textContent = '';
            createGrid();
        };

        // Initialize
        resetButton.addEventListener('click', resetGame);
        createGrid();
    };

    // Initialize game when DOM is loaded
    initTechPokemonGame();

    // Game Dropdown Functionality
    const gameDropdownBtn = document.getElementById('game-dropdown-btn');
    const gameSection = document.getElementById('game');

    if (gameDropdownBtn && gameSection) {
        gameDropdownBtn.addEventListener('click', () => {
            gameDropdownBtn.classList.toggle('active');
            gameSection.classList.toggle('active');
        });
    }
}); 