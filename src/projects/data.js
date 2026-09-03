/* =========================================
   PROJECT DATA
========================================= */

export const CATEGORIES = [

    {
        id: 'robotics',
        title: 'Robotics & Hardware',
        image: '/projects/categories/robotics.jpg'
    },

    {
        id: 'machine-learning',
        title: 'Machine Learning / Data Science',
        image: '/projects/categories/machine-learning.jpg'
    },

    {
        id: 'generative-ai',
        title: 'Generative AI / AI Applications',
        image: '/projects/categories/generative-ai.jpg'
    },

    {
        id: 'mobile-app',
        title: 'Mobile App Development',
        image: '/projects/categories/mobile-app.jpg',
        comingSoon: true
    },

    {
        id: 'hackathons',
        title: 'Hackathon Projects',
        image: '/projects/categories/hackathons.jpg',
        comingSoon: true
    },

    {
        id: 'web-development',
        title: 'Web Development',
        image: '/projects/categories/web-development.jpg'
    }

];


/* =========================================
   PROJECTS
========================================= */

export const PROJECTS = {


    /* =====================================
       ROBOTICS & HARDWARE
    ===================================== */

    robotics: [

        {
            id: 'line-follower',
            name: 'Line Follower Robot',

            image: '/projects/thumbnails/robotics/line-follower-robot.jpg',

            description:
                'An autonomous robot that follows a predefined path using an IR sensor array and PID control. Designed and assembled a custom PCB, integrated motors and sensors, and tuned the PID controller for accurate and stable movement.',

            topSkills: [
                'Embedded Systems',
                'PCB Design',
                'PID Control',
                'ESP32',
                'Robotics'
            ],

            allSkills: [
                'C/C++',
                'ESP32',
                'QTR-8A Sensor Array',
                'N20 Motors',
                'TB Motor Driver',
                'PID Control',
                'PCB Design',
                'EasyEDA',
                '3D Printing',
                'Circuit Design',
                'Embedded Systems',
                'Robotics',
                'Sensor Integration',
                'Motor Control',
                'Battery Management',
                'Hardware Debugging'
            ],

            status: '✅ COMPLETED',

            github:
                'https://github.com/lalchandanijatin1-cyber',

            demo: null,

            available: true
        },


        {
            id: 'smoke-detection-drone',
            name: 'Smoke Detection Drone',

            image: '/projects/thumbnails/robotics/smoke-detection-drone.jpg',

            description:
                'An autonomous drone-based system designed to detect smoke and identify potential fire-risk areas using onboard sensors and intelligent monitoring. The project focuses on aerial surveillance, real-time detection, and sending alerts for faster response.',

            topSkills: [
                'Drone Technology',
                'Embedded Systems',
                'IoT',
                'Sensor Integration',
                'AI/ML'
            ],

            allSkills: [
                'Python',
                'C/C++',
                'Arduino/ESP32',
                'Drone Technology',
                'Flight Controllers',
                'Smoke Sensors',
                'Gas Sensors',
                'IoT',
                'Sensor Integration',
                'GPS',
                'Wireless Communication',
                'Computer Vision',
                'Machine Learning',
                'Real-Time Monitoring',
                'Data Processing',
                'Embedded Systems',
                'Robotics',
                'Hardware Integration'
            ],

            status: '✅ COMPLETED',

            github: null,

            demo: null,

            available: true
        },


        {
            id: 'fast-line-follower',
            name: 'Fast Line Follower Robot',

            image: '/projects/thumbnails/robotics/fast-line-follower.jpg',

            description: null,

            topSkills: [],
            allSkills: [],

            status: '🚧 COMING SOON',

            github: null,
            demo: null,

            available: true,
            comingSoon: true
        },


        {
            id: 'roborace',
            name: 'RoboRace Robot',

            image: '/projects/thumbnails/robotics/roborace.jpg',

            description: null,

            topSkills: [],
            allSkills: [],

            status: '🚧 COMING SOON',

            github: null,
            demo: null,

            available: true,
            comingSoon: true
        },


        {
            id: 'robotic-arm',
            name: 'Robotic Arm',

            image: '/projects/thumbnails/robotics/robotic-arm.jpg',

            description: null,

            topSkills: [],
            allSkills: [],

            status: '🚧 COMING SOON',

            github: null,
            demo: null,

            available: true,
            comingSoon: true
        },


        {
            id: 'women-safety',
            name: 'Women Safety',

            image: '/projects/thumbnails/robotics/women-safety.jpg',

            description: null,

            topSkills: [],
            allSkills: [],

            status: '🚧 COMING SOON',

            github: null,
            demo: null,

            available: true,
            comingSoon: true
        }

    ],


    /* =====================================
       MACHINE LEARNING / DATA SCIENCE
    ===================================== */

    'machine-learning': [

        {
            id: 'california-house-price',
            name: 'California House Price Prediction',

            image: '/projects/thumbnails/robotics/california-house-price.jpg',

            description:
                'A machine learning regression project that predicts California house prices using features such as median income, house age, average rooms, population, and occupancy. The project includes data analysis, visualization, preprocessing, model training, and evaluation. The dataset contains 20,640 samples with 8 input features.',

            topSkills: [
                'Python',
                'Machine Learning',
                'Regression',
                'Data Analysis',
                'Data Visualization'
            ],

            allSkills: [
                'Python',
                'Pandas',
                'NumPy',
                'Scikit-learn',
                'Matplotlib',
                'Seaborn',
                'SciPy',
                'Exploratory Data Analysis (EDA)',
                'Data Preprocessing',
                'Feature Analysis',
                'Regression',
                'Model Training',
                'Model Evaluation',
                'Data Visualization',
                'Statistical Analysis'
            ],

            status: '✅ COMPLETED',

            github: null,
            demo: null,

            available: true
        },


        {
            id: 'stock-price-prediction',
            name: 'Stock Price Prediction',

            image: '/projects/thumbnails/robotics/stock-price-prediction.jpg',

            description:
                'A machine learning project that analyzes historical market data and predicts stock prices for multiple assets including Amazon, Apple, Microsoft, NVIDIA, and Gold. The project compares multiple regression models and uses hyperparameter tuning with GridSearchCV to improve model performance. Historical market data is collected using yfinance.',

            topSkills: [
                'Python',
                'Machine Learning',
                'Time Series',
                'Regression',
                'Data Analysis'
            ],

            allSkills: [
                'Python',
                'Pandas',
                'NumPy',
                'yfinance',
                'Scikit-learn',
                'Matplotlib',
                'Seaborn',
                'Linear Regression',
                'Lasso Regression',
                'Ridge Regression',
                'Support Vector Regression (SVR)',
                'GridSearchCV',
                'Hyperparameter Tuning',
                'Data Preprocessing',
                'Feature Engineering',
                'Exploratory Data Analysis',
                'Data Visualization',
                'Model Evaluation',
                'Time-Series Data',
                'Financial Data Analysis'
            ],

            status: '✅ COMPLETED',

            github:
                'https://github.com/lalchandanijatin1-cyber/Stock-Price-Prediction.git',

            demo:
                'https://stock-price-prediction-a7vc.onrender.com/',

            available: true
        }

    ],


    /* =====================================
       GENERATIVE AI / AI APPLICATIONS
    ===================================== */

    'generative-ai': [

        {
            id: 'digital-rakhi',
            name: 'Digital Rakhi | Create • Personalize • Share',

            image: '/projects/thumbnails/robotics/digital-rakhi.jpg',

            description:
                'An AI-powered web application that allows users to generate personalized digital Rakhi designs using Generative AI. Users can create designs from text prompts, customize them using an interactive canvas editor, save their designs, and share or export the final Rakhi.',

            topSkills: [
                'Generative AI',
                'Python',
                'Flask',
                'Hugging Face',
                'AI Image Generation'
            ],

            allSkills: [
                'Python',
                'Flask',
                'Generative AI',
                'Hugging Face Inference API',
                'FLUX.1',
                'AI Image Generation',
                'Prompt Engineering',
                'REST API',
                'HTML',
                'CSS',
                'JavaScript',
                'Canvas API',
                'Image Processing',
                'PIL/Pillow',
                'Frontend Development',
                'Backend Development',
                'UI/UX',
                'File Handling',
                'Environment Variables',
                'Git & GitHub'
            ],

            status: '✅ COMPLETED',

            github:
                'https://github.com/lalchandanijatin1-cyber/digital-rakhi.git',

            demo:
                'https://digital-rakhi-9pc2.onrender.com/',

            available: true
        }

    ],


    /* =====================================
       WEB DEVELOPMENT
    ===================================== */

    'web-development': [

        {
            id: 'minecraft-portfolio',
            name: 'Minecraft / Voxel Portfolio Website',

            image: '/projects/thumbnails/robotics/minecraft-portfolio.jpg',

            description:
                'An interactive 3D portfolio website inspired by Minecraft, where visitors can explore a voxel-based world to discover projects, skills, hobbies, and contact information. Built with animated environments, interactive objects, cinematic transitions, and a game-like navigation experience.',

            topSkills: [
                'Three.js',
                'JavaScript',
                'WebGL',
                '3D Web Development',
                'UI/UX'
            ],

            allSkills: [
                'HTML',
                'CSS',
                'JavaScript',
                'Three.js',
                'WebGL',
                '3D Graphics',
                'Voxel Design',
                '3D Animation',
                'Camera Animation',
                'Interactive UI',
                'Canvas',
                'DOM Manipulation',
                'Responsive Web Design',
                'UI/UX Design',
                'Animation & Transitions',
                'Game-Inspired Web Design',
                'Git & GitHub'
            ],

            status: '🚧 IN DEVELOPMENT',

            github:
                'https://github.com/lalchandanijatin1-cyber/jatin-portfolio.git',

            demo: null,

            available: true
        }

    ]

};