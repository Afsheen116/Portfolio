const db = require('./db');

const projects = [
    {
        title: "ERP Management System",
        description: "Built a role-based ERP system using .NET and SQL Server. Implemented CRUD operations, backend logic, and scalable module architecture for business operations.",
        techStack: "ASP.NET, C#, SQL Server, JS",
        liveLink: "#",
        githubLink: "",
        image: "assets/erp.png"
    },
    {
        title: "Real-Time Chat App",
        description: "A full-featured MERN stack chat platform with real-time bidirectional communication, user authentication, and responsive terminal-like UI.",
        techStack: "React, Socket.io, Node.js, Express",
        liveLink: "",
        githubLink: "https://github.com/Afsheen116/ChatApp",
        image: "assets/chat.png"
    },
    {
        title: "Weather App",
        description: "Built a responsive weather application using API integration to fetch real-time weather data with dynamic UI updates.",
        techStack: "JS, OpenWeather API, CSS, HTML",
        liveLink: "",
        githubLink: "https://github.com/Afsheen116/WeatherApp",
        image: "assets/weather.png"
    },
    {
        title: "Zenvest - Student Fintech",
        description: "A financial planning platform for students to manage budgeting, savings, and financial literacy through an intuitive experience.",
        techStack: "React, Firebase, Chart.js",
        liveLink: "",
        githubLink: "",
        image: "assets/zenvest.png"
    },
    {
        title: "Rajasthan Tourism Pro",
        description: "A comprehensive tourism platform for hotel bookings, customized itineraries, and transport management with elite UI standards.",
        techStack: ".NET Core, React, PostgreSQL",
        liveLink: "",
        githubLink: "",
        image: "assets/tourism.png"
    }
];

const insertProject = (project) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO projects (title, description, techStack, liveLink, githubLink, image) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(query, [project.title, project.description, project.techStack, project.liveLink, project.githubLink, project.image], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};

async function seed() {
    for (const project of projects) {
        try {
            await insertProject(project);
            console.log("Successfully inserted project:", project.title);
        } catch (error) {
            console.error("Failed to insert:", project.title, error.message);
        }
    }
    console.log("Seeding complete!");
}

seed();
