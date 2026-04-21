const db = require('./db');

const projects = [
    {
        title: "Analytics Dashboard",
        description: "Real-time reporting, clean data storytelling, and a secure backend built for high-volume product teams.",
        techStack: "React, Node.js, Chart.js",
        liveLink: "#contact",
        githubLink: "",
        image: "assets/project1.png"
    },
    {
        title: "NexShop Platform",
        description: "Mobile-first shopping flows with layered filtering, fast checkout, and payment-ready product architecture.",
        techStack: "Next.js, Stripe, MongoDB",
        liveLink: "#contact",
        githubLink: "",
        image: "assets/project2.png"
    },
    {
        title: "Pulse CRM Suite",
        description: "Lead intelligence, activity pipelines, and polished management tools for fast-moving customer teams.",
        techStack: "TypeScript, PostgreSQL, REST API",
        liveLink: "#contact",
        githubLink: "",
        image: "assets/project1.png"
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
