// Update the year in copyright footer
document.addEventListener('DOMContentLoaded', () => {
    // Get user's location and update time
    const updateLocationAndTime = () => {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        const locationTime = document.querySelector('footer p:first-child');
        
        if (locationTime) {
            // Try to get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Use reverse geocoding to get city name
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
                            .then(response => response.json())
                            .then(data => {
                                const city = data.city || data.locality || 'Your Location';
                                locationTime.textContent = `${city}, ${timeString.replace(/\s+/g, ' ')}`;
                            })
                            .catch(() => {
                                // Fallback if reverse geocoding fails
                                locationTime.textContent = `Your Location, ${timeString.replace(/\s+/g, ' ')}`;
                            });
                    },
                    // Error handling for geolocation
                    () => {
                        locationTime.textContent = `Your Location, ${timeString.replace(/\s+/g, ' ')}`;
                    }
                );
            } else {
                // Fallback if geolocation is not supported
                locationTime.textContent = `Your Location, ${timeString.replace(/\s+/g, ' ')}`;
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
    
    if (checkbox && themeLabel) {
        // Check if user preference already exists
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.body.classList.toggle('dark-theme', currentTheme === 'dark');
            checkbox.checked = currentTheme === 'dark';
            if (checkboxMobile) checkboxMobile.checked = currentTheme === 'dark';
            themeLabel.textContent = currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }
        
        // Toggle theme when checkbox changes
        checkbox.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
            
            // Keep mobile theme toggle in sync
            if (checkboxMobile) checkboxMobile.checked = theme === 'dark';
        });
        
        // Sync mobile theme toggle
        if (checkboxMobile) {
            checkboxMobile.addEventListener('change', () => {
                document.body.classList.toggle('dark-theme');
                const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
                themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
                
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
                name: "DHRUVRAJ SINH RANA",
                contact: {
                    email: "dhruvrana.rana@gmail.com",
                    phone: "9484553365",
                    linkedin: "www.linkedin.com/in/dhruv-raj-rana",
                    location: "Gujarat, India"
                },
                education: [
                    { institution: "Vellore Institute of Technology", degree: "B.Tech Computer Science and Engineering with Specialization in IoT (Internet of Things)", gpa: "8.74", period: "2022 - 2026", location: "Vellore" },
                    { institution: "Delhi Public School", degree: "Class XII", aggregate: "93.7", period: "2019 - 2021", location: "Bharuch" },
                    { institution: "Delhi Public School", degree: "Class X", aggregate: "88.0", period: "2007 - 2019", location: "Bharuch" }
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
}); 