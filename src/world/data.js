export const WORLD_CONFIG = {

    title: "JATIN'S WORLD",

    subtitle: "Explore. Discover. Build.",

    movementSpeed: 8,

    interactionDistance: 7,

    worldSize: 180

};


export const WORLD_LOCATIONS = [

    {
        id: "base",

        name: "JATIN'S BASE",

        type: "HOME",

        position: {
            x: 0,
            y: 0,
            z: 0
        },

        description:
            "The central spawn point of my world. This is where everything begins.",

        details: [
            "Robotics & Automation Engineering",
            "AI / ML",
            "Web Development",
            "Electronics",
            "3D / CAD"
        ],

        actionText: "EXPLORE PROFILE",

        actionUrl: "/home.html"

    },


    {
        id: "robotics",

        name: "ROBOTICS LAB",

        type: "TECHNICAL ZONE",

        position: {
            x: -30,
            y: 0,
            z: -20
        },

        description:
            "A workshop dedicated to robotics, automation, embedded systems and practical engineering.",

        details: [
            "Robotics",
            "Automation",
            "Embedded Systems",
            "Electronics",
            "Control Systems"
        ],

        actionText: "VIEW PROJECTS",

        actionUrl: "/projects.html"

    },


    {
        id: "ai",

        name: "AI / ML",

        type: "TECHNICAL ZONE",

        position: {
            x: 32,
            y: 0,
            z: -22
        },

        description:
            "The place where data, models and intelligent systems come together.",

        details: [
            "Machine Learning",
            "Deep Learning",
            "Generative AI",
            "Computer Vision",
            "Data Analysis"
        ],

        actionText: "VIEW SKILLS",

        actionUrl: "/skills.html"

    },


    {
        id: "web",

        name: "WEB DEVELOPMENT",

        type: "BUILD ZONE",

        position: {
            x: 34,
            y: 0,
            z: 18
        },

        description:
            "A digital building zone for creating interactive websites and 3D web experiences.",

        details: [
            "HTML",
            "CSS",
            "JavaScript",
            "Three.js",
            "WebGL",
            "3D Web Development"
        ],

        actionText: "VIEW PROJECTS",

        actionUrl: "/projects.html"

    },


    {
        id: "electronics",

        name: "ELECTRONICS LAB",

        type: "WORKSHOP",

        position: {
            x: -34,
            y: 0,
            z: 22
        },

        description:
            "A workshop for circuits, PCBs, microcontrollers, sensors and embedded systems.",

        details: [
            "PCB Design",
            "Microcontrollers",
            "Sensors",
            "Motor Control",
            "Embedded Systems"
        ],

        actionText: "VIEW PROJECTS",

        actionUrl: "/projects.html"

    },


    {
        id: "library",

        name: "LEARNING LIBRARY",

        type: "KNOWLEDGE ZONE",

        position: {
            x: 0,
            y: 0,
            z: -42
        },

        description:
            "A place representing the technologies and ideas I am currently learning.",

        details: [
            "Machine Learning",
            "Generative AI",
            "Agentic AI",
            "Advanced Web Development",
            "3D Graphics",
            "Robotics"
        ],

        actionText: "VIEW SKILLS",

        actionUrl: "/skills.html"

    },


    {
        id: "creative",

        name: "CREATIVE ZONE",

        type: "PERSONAL ZONE",

        position: {
            x: 0,
            y: 0,
            z: 42
        },

        description:
            "The relaxed side of my world — the things I enjoy outside technical work.",

        details: [
            "Writing",
            "Basketball",
            "Guitar",
            "Karate",
            "Chess",
            "Beard Styling",
            "Everythingholic"
        ],

        actionText: "EXPLORE HOBBIES",

        actionUrl: "/hobbies.html"

    },


    {
        id: "future",

        name: "NEXT ADVENTURE",

        type: "UNDER CONSTRUCTION",

        position: {
            x: 0,
            y: 0,
            z: 68
        },

        description:
            "The world is still being built. New projects, skills and experiences will appear here.",

        details: [
            "New Projects",
            "New Skills",
            "New Experiences",
            "More Things To Build"
        ],

        actionText: "KEEP EXPLORING",

        actionUrl: null

    }

];


export const ACHIEVEMENTS = [

    {
        title: "FIRST ROBOT",
        description: "Built a Line Follower Robot."
    },

    {
        title: "INTO AI",
        description: "Started exploring Machine Learning."
    },

    {
        title: "BUILDER",
        description: "Created interactive 3D web experiences."
    },

    {
        title: "HACK THE WORLD",
        description: "Participated in hackathons and technical challenges."
    }

];