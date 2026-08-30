/* =========================================
   PROJECTS (Worlds tab)
========================================= */

export const PROJECTS = [
    {
        id: 1,
        name: 'STOCK-PREDICTOR',
        url: 'https://stock-price-prediction-a7vc.onrender.com/',
        available: true
    },
    {
        id: 2,
        name: 'DIGITAL-RAKHI',
        url: 'https://digital-rakhi-9pc2.onrender.com',
        available: true
    },

    // 18 locked placeholder slots
    ...Array.from({ length: 18 }, (_, i) => ({
        id: i + 3,
        name: 'COMING SOON',
        url: null,
        available: false
    }))
];


/* =========================================
   SKILLS 
========================================= */

export const SKILLS = {

    'ai-ml': {
        label: 'AI / ML',
        know: [
            'Python', 'NumPy', 'Pandas', 'Matplotlib',
            'Scikit-learn', 'Machine Learning', 'Flask', 'Hugging Face'
        ],
        yetToLearn: [
            'Statistics & Probability', 'Deep Learning', 'PyTorch',
            'Computer Vision', 'NLP', 'Generative AI', 'LLMs',
            'RAG', 'AI Agents', 'MLOps'
        ]
    },

    'web-dev': {
        label: 'WEB DEVELOPMENT',
        know: [
            'HTML', 'CSS', 'JavaScript', 'REST APIs', 'Flask'
        ],
        yetToLearn: [
            'React', 'TypeScript', 'Node.js', 'SQL',
            'Authentication', 'Docker', 'Cloud'
        ]
    },

    'mobile': {
        label: 'MOBILE APP DEVELOPMENT',
        know: [],
        yetToLearn: [
            'Dart', 'Flutter', 'Firebase', 'Android Studio',
            'State Management', 'API Integration', 'App Deployment'
        ]
    },

    'electronics': {
        label: 'ELECTRONICS / EMBEDDED',
        know: [
            'EasyEDA', 'KiCad', 'ESP32', 'PCB Design', 'PID Control', 'Robotics'
        ],
        yetToLearn: [
            'C / C++', 'STM32', 'Embedded Systems', 'FreeRTOS',
            'Communication Protocols', 'Embedded Linux'
        ]
    },

    '3d-cad': {
        label: '3D / CAD',
        know: [
            'Fusion 360', '3D Modeling', '3D Printing'
        ],
        yetToLearn: []
    },

    'tools': {
        label: 'TOOLS',
        know: [
            'VS Code', 'Jupyter Notebook', 'Git', 'GitHub'
        ],
        yetToLearn: []
    }
};


/* =========================================
   SERVICES 
========================================= */

export const SERVICES = [
    {
        id: 'coming-soon',
        name: 'COMING SOON',
        sub: null,
        action: 'placeholder'
    },
    {
        id: 'mecha-dojo',
        name: 'MECHA DOJO',
        sub: '(COLLEGE-PROJECTS)',
        action: 'link',
        url: 'https://www.linkedin.com/company/mecha-dojo/?viewAsMember=true'
    }
];