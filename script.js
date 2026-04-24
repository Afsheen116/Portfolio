

document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = window.PORTFOLIO_API_BASE_URL || "http://localhost:5000/api";
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");
    const projectStage = document.querySelector("#projectStage");
    const projectDots = document.querySelector(".project-dots");
    const projectFeedback = document.querySelector("#projectFeedback");
    const prevProjectButton = document.querySelector(".project-nav.prev");
    const nextProjectButton = document.querySelector(".project-nav.next");
    const defaultProjects = [
        {
            title: "ERP Management System",
            description: "Built a role-based ERP system using .NET and SQL Server. Implemented CRUD operations, backend logic, and scalable module architecture for business operations.",
            techStack: ["ASP.NET", "C#", "SQL Server", "JS"],
            liveLink: "#",
            buttonText: "Case Study",
            image: "assets/erp.png"
        },
        {
            title: "Real-Time Chat App",
            description: "A full-featured MERN stack chat platform with real-time bidirectional communication, user authentication, and responsive terminal-like UI.",
            techStack: ["React", "Socket.io", "Node.js", "Express"],
            githubLink: "https://github.com/Afsheen116/ChatApp",
            buttonText: "GitHub",
            image: "assets/chat.png"
        },
        {
            title: "Weather App",
            description: "Built a responsive weather application using API integration to fetch real-time weather data with dynamic UI updates.",
            techStack: ["JS", "OpenWeather API", "CSS", "HTML"],
            githubLink: "https://github.com/Afsheen116/WeatherApp",
            buttonText: "GitHub",
            image: "assets/weather.png"
        },
        {
            title: "Zenvest - Student Fintech",
            description: "A financial planning platform for students to manage budgeting, savings, and financial literacy through an intuitive experience.",
            techStack: ["React", "Firebase", "Chart.js"],
            buttonText: "In Progress",
            image: "assets/zenvest.png"
        },
        {
            title: "Rajasthan Tourism Pro",
            description: "A comprehensive tourism platform for hotel bookings, customized itineraries, and transport management with elite UI standards.",
            techStack: [".NET Core", "React", "PostgreSQL"],
            buttonText: "In Progress",
            image: "assets/tourism.png"
        }
    ];



    const setProjectFeedback = (message) => {
        if (!projectFeedback) {
            return;
        }

        projectFeedback.hidden = false;
        projectFeedback.textContent = message;
    };

    const hideProjectFeedback = () => {
        if (!projectFeedback) {
            return;
        }

        projectFeedback.hidden = true;
        projectFeedback.textContent = "";
    };

    const normalizeTechStack = (techStack) => {
        if (Array.isArray(techStack)) {
            return techStack.filter(Boolean); 
        }

        if (typeof techStack === "string") {
            return techStack.split(",").map((item) => item.trim()).filter(Boolean);
        }

        return [];
    };

    const createProjectCard = (project) => {
        const article = document.createElement("article");
        article.className = "project-card";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "project-img";

        const image = document.createElement("img");
        image.src = project.image || "assets/project1.png";
        image.alt = `${project.title} preview`;
        imageWrapper.appendChild(image);

        const info = document.createElement("div");
        info.className = "project-info";

        const category = document.createElement("span");
        category.className = "project-category";
        category.textContent = normalizeTechStack(project.techStack)[0] || "Featured Project";

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const tags = document.createElement("div");
        tags.className = "project-tags";

        normalizeTechStack(project.techStack).forEach((tech) => {
            const tag = document.createElement("span");
            tag.textContent = tech;
            tags.appendChild(tag);
        });

        const link = document.createElement("a");
        link.className = "project-link";
        link.href = project.liveLink || project.githubLink || "#contact";
        link.target = link.href.startsWith("http") ? "_blank" : "_self";
        link.rel = link.target === "_blank" ? "noreferrer" : "";
        link.textContent = project.buttonText || (project.liveLink ? "Live Demo" : (project.githubLink ? "GitHub" : "Explore"));

        info.append(category, title, description, tags, link);
        article.append(imageWrapper, info);

        return article;
    };

    const renderProjects = (projects) => {
        if (!projectStage) {
            return;
        }

        projectStage.querySelectorAll(".project-card").forEach((card) => card.remove());

        if (projectDots) {
            projectDots.innerHTML = "";
        }

        if (!projects.length) {
            setProjectFeedback("Projects will appear here soon.");

            if (prevProjectButton) {
                prevProjectButton.style.display = "none";
            }

            if (nextProjectButton) {
                nextProjectButton.style.display = "none";
            }

            return;
        }

        hideProjectFeedback();

        projects.forEach((project) => {
            const card = createProjectCard(project);
            projectStage.insertBefore(card, projectStage.querySelector(".project-controls"));
        });

        setupProjectCarousel();
    };

    const setupProjectCarousel = () => {
        if (!projectStage) {
            return;
        }

        const projectCards = Array.from(projectStage.querySelectorAll(".project-card"));

        if (!projectCards.length) {
            return;
        }

        let activeProjectIndex = Math.floor(projectCards.length / 2);
        const positionClasses = ["is-active", "is-prev", "is-next", "is-prev-outer", "is-next-outer", "is-hidden"];

        const getWrappedOffset = (index) => {
            let offset = index - activeProjectIndex;
            const midpoint = Math.floor(projectCards.length / 2);

            if (offset > midpoint) {
                offset -= projectCards.length;
            }

            if (offset < -midpoint) {
                offset += projectCards.length;
            }

            return offset;
        };

        const renderCarousel = () => {
            projectCards.forEach((card, index) => {
                const offset = getWrappedOffset(index);
                let stateClass = "is-hidden";

                if (offset === 0) {
                    stateClass = "is-active";
                } else if (offset === -1) {
                    stateClass = "is-prev";
                } else if (offset === 1) {
                    stateClass = "is-next";
                } else if (offset === -2) {
                    stateClass = "is-prev-outer";
                } else if (offset === 2) {
                    stateClass = "is-next-outer";
                }

                card.classList.remove(...positionClasses);
                card.classList.add(stateClass);
                card.style.zIndex = String(20 - Math.abs(offset));
                card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
            });

            if (projectDots) {
                Array.from(projectDots.children).forEach((dot, index) => {
                    dot.classList.toggle("is-active", index === activeProjectIndex);
                    dot.setAttribute("aria-current", index === activeProjectIndex ? "true" : "false");
                });
            }
        };

        const moveToProject = (index) => {
            activeProjectIndex = (index + projectCards.length) % projectCards.length;
            renderCarousel();
        };

        if (projectDots) {
            projectDots.innerHTML = "";

            projectCards.forEach((_, index) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "project-dot";
                dot.setAttribute("aria-label", `Go to project ${index + 1}`);
                dot.onclick = () => moveToProject(index);
                projectDots.appendChild(dot);
            });
        }

        projectCards.forEach((card, index) => {
            card.onclick = () => {
                if (index !== activeProjectIndex) {
                    moveToProject(index);
                }
            };
        });

        const showNavigation = projectCards.length > 1;

        if (prevProjectButton) {
            prevProjectButton.style.display = showNavigation ? "inline-flex" : "none";
            prevProjectButton.onclick = () => moveToProject(activeProjectIndex - 1);
        }

        if (nextProjectButton) {
            nextProjectButton.style.display = showNavigation ? "inline-flex" : "none";
            nextProjectButton.onclick = () => moveToProject(activeProjectIndex + 1);
        }

        renderCarousel();
    };

    const loadProjects = async () => {
        setProjectFeedback("Loading projects...");

        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to load projects.");
            }

            renderProjects(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error("Project fetch failed:", error);
            renderProjects(defaultProjects);
        }
    };



    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            const icon = hamburger.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !navLinks.classList.contains("nav-active"));
                icon.classList.toggle("fa-times", navLinks.classList.contains("nav-active"));
            }
        });
    }

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks?.classList.remove("nav-active");

            const icon = hamburger?.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".hidden-up, .hidden-left, .hidden-right").forEach((element) => {
        observer.observe(element);
    });

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href").substring(1) === currentSection);
        });
    });

    loadProjects();
    window.dispatchEvent(new Event("scroll"));
});
