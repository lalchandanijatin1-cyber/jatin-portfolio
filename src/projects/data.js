/* =========================================
   PROJECTS DATA

   PROJECTS: the 20-row list. Only the two
   with `available: true` are clickable and
   have a matching entry in PROJECT_DETAILS.

   PROJECT_DETAILS: the "EDIT WORLD"-style
   detail screen content, keyed by the same
   `key` used in PROJECTS.
========================================= */

export const PROJECTS = [
    { id: 1, key: 'digital-rakhi', name: 'DIGITAL RAKHI', available: true },
    { id: 2, key: 'stock-price-predictor', name: 'STOCK PRICE PREDICTOR', available: true },

    // 18 locked placeholder slots
    ...Array.from({ length: 18 }, (_, i) => ({
        id: i + 3,
        key: null,
        name: 'COMING SOON',
        available: false
    }))
];


export const PROJECT_DETAILS = {

    'digital-rakhi': {
        projectName: 'Digital Rakhi',

        // Place your project photo at:
        // public/projects/thumbnails/digital-rakhi.jpg
        thumbnail: '/projects/thumbnails/digital-rakhi.jpg',

        topSkills: ['Python', 'Flask', 'Hugging Face', 'JavaScript'],

        allSkills: [
            'Python', 'JavaScript', 'HTML', 'CSS', 'Flask',
            'Hugging Face', 'FLUX.1', 'REST API', 'PIL (Pillow)', 'Git & GitHub'
        ],

        github: 'https://github.com/lalchandanijatin1-cyber/digital-rakhi.git',
        demo: 'https://digital-rakhi-9pc2.onrender.com/',
        feedback: 'https://lnkd.in/p/dPVtmuQF'
    },

    'stock-price-predictor': {
        projectName: 'stock-price-predictor',

        // Place your project photo at:
        // public/projects/thumbnails/stock-price-predictor.jpg
        thumbnail: '/projects/thumbnails/stock-price-predictor.jpg',

        topSkills: ['Python', 'Pandas', 'Scikit-learn', 'yFinance'],

        allSkills: [
            'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn',
            'Scikit-learn', 'yFinance', 'Linear Regression',
            'Lasso & Ridge Regression', 'SVR (Support Vector Regression)'
        ],

        github: 'https://github.com/lalchandanijatin1-cyber/Stock-Price-Prediction.git',
        demo: 'https://stock-price-prediction-a7vc.onrender.com/',
        feedback: 'https://lnkd.in/p/dNFJH4SH'
    }
};