/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "DracoShivam",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "shivamkumarb2003@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "AI Semantic Recommender — AniSugg",
      tag: "NLP · Vector Search · Live", color: "#e60012", live: true,
      url: "https://ani-sugg.vercel.app",
      cta: "Try it live at ani-sugg.vercel.app →",
      img: "assets/projects/AniSugg.png",
      desc: "Embedded a 10,000+ document corpus into a MongoDB vector store using Sentence-Transformers for nearest-neighbour semantic search, powering content-based 'similar shows' and a personalised 'For You' feed from watch history. 95% PyTest coverage across 40+ unit and integration tests; containerised with Docker and automated via GitHub Actions CI/CD. TypeScript · FastAPI · MongoDB · Sentence-Transformers.",
    },
    {
      title: "Spatial Analytics Dashboard — LILA",
      tag: "Data · Game Analytics · Live", color: "#3dff6e", live: true,
      url: "https://lila-player-viz-ten.vercel.app",
      cta: "Live demo →",
      img: "assets/projects/lila-player-viz.png",
      desc: "Surfaced actionable spatial trends from 89,000+ telemetry data points via a Python ETL pipeline (PyArrow, Parquet) and an HTML5 Canvas dashboard running at 60 FPS. Cut per-query payload 99.9% — 15 MB to 2 KB — deployed serverless on Vercel CDN with O(1) lookups and zero cold-starts. Drag-and-drop Parquet upload, heatmaps, kill/death events across 3 maps. Next.js 16 · TypeScript · PyArrow · Python.",
    },
    {
      title: "Agentic RAG Code Assistant — AI_Refactor",
      tag: "GenAI · Agentic · MLOps", color: "#f1e05a", live: false,
      url: "https://github.com/DracoShivam/AI_Refactor",
      cta: "View on GitHub →",
      img: "assets/projects/AI_Refactor.png",
      desc: "Agentic RAG pipeline indexing codebase context into a vector store to ground Gemini API prompts for context-aware refactoring and auto-generated documentation. Structured JSON schema output enforced via FastAPI; Docker + GitHub Actions CI/CD across 3 zero-regression deployments. Python · FastAPI · Gemini API · React · Docker.",
    },
    {
      title: "Deep Learning Defect Detection",
      tag: "Computer Vision · MLOps", color: "#3572A5", live: false,
      url: "https://github.com/Vizz12345/Defect-Detection-in-Solar-Panel-Array",
      cta: "View on GitHub →",
      img: "assets/projects/defect.png",
      desc: "Vision Transformer & EfficientNet inference pipeline for automated solar panel defect detection achieving >98% accuracy on held-out test data. Benchmark-gated CI/CD in GitHub Actions enforces zero model regressions on every merge — a full MLOps loop from training through deployment. Python · PyTorch · ViT · EfficientNet.",
    },
    {
      title: "Scribbl Team Game",
      tag: "Game Dev · Real-Time", color: "#DA5B0B", live: false,
      url: "https://github.com/DracoShivam/scribbl-team-game",
      cta: "View on GitHub →",
      img: "assets/projects/scribbl-team-game.png",
      desc: "Real-time multiplayer drawing-and-guessing game with team-based gameplay — players take turns sketching a word while their team races to guess it. Full WebSocket event system with room management, score tracking, and a custom word list. Node.js · Socket.io · Express · HTML5 Canvas.",
    },
    {
      title: "WebAR — SIGC Augmented Reality",
      tag: "WebAR · Creative", color: "#e34c26", live: false,
      url: "https://github.com/DracoShivam/Webar-SIGC",
      cta: "View on GitHub →",
      img: "assets/projects/Webar-SIGC.png",
      desc: "Browser-based augmented reality experience built for SIGC — scan a marker and 3D content appears live in the camera feed, no app install required. Built with AR.js and A-Frame on a pure HTML/JS stack for zero-friction access. HTML · JavaScript · AR.js · A-Frame.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "AniSugg",
    "lila-player-viz",
    "AI_Refactor",
    "scribbl-team-game",
    "Webar-SIGC",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "JP-1", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/JP-1",
      description: "Unity game dev project #1 — C# scripting, GameObjects, physics, and basic player controller. Part of a progressive Unity learning series.",
    },
    {
      name: "jp-2", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/jp-2",
      description: "Unity game dev project #2 — expanding on core mechanics with camera systems, animation state machines, and collision handling.",
    },
    {
      name: "jp-3", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/jp-3",
      description: "Unity game dev project #3 — UI systems, scene management, game state, and audio integration in a more complete game loop.",
    },
    {
      name: "jp-4", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/jp-4",
      description: "Unity game dev project #4 — shader experiments, lighting, and optimisation techniques for real-time rendering.",
    },
    {
      name: "jp-5", language: "ShaderLab", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/jp-5",
      description: "Unity ShaderLab project — custom HLSL shaders for visual effects, URP pipeline integration, and GPU-side optimisation.",
    },
    {
      name: "PenFight", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/PenFight",
      description: "Unity game — PenFight simulation with physics-based combat. First project learning version control with Git + Unity collaboration workflow.",
    },
    {
      name: "Junior-Programmer1", language: "C#", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/Junior-Programmer1",
      description: "Unity Junior Programmer pathway — C# scripting foundations, event systems, and game-loop architecture across structured challenges.",
    },
    {
      name: "TellableAR", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/TellableAR",
      description: "WebAR storytelling project — AR.js marker tracking overlaying story content in the browser with zero app download required.",
    },
    {
      name: "Web-AR-website", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/Web-AR-website",
      description: "Full WebAR landing site — A-Frame + AR.js showcase combining 3D models, animations, and interactive markers for in-browser augmented reality.",
    },
    {
      name: "Gemini_Persona5_stats", language: "Python", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/Gemini_Persona5_stats",
      description: "Python + Gemini API experiment — generating Persona 5-style stat cards from natural-language prompts via structured JSON schema output.",
    },
    {
      name: "Alertsapp", language: "Python", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/Alertsapp",
      description: "Automated job-alert bot — scrapes Indian gaming company job boards and delivers Discord notifications for new listings. Extensible config-driven architecture.",
    },
    {
      name: "Portfolio-Website", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/DracoShivam/Portfolio-Website",
      description: "Previous personal portfolio website — the one this Persona 5 experience replaced. Vanilla HTML/CSS/JS, responsive, deployed on GitHub Pages.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219",
    C: "#555", "C++": "#f34b7d", "C#": "#178600", ShaderLab: "#222c37",
    Markdown: "#083fa1", Rust: "#dea584", Go: "#00add8",
  },

  // ---- Skills screen ----
  skills: [
    { group: "AI · ML · GenAI", items: [
      ["PyTorch · TensorFlow · Scikit-learn", 88],
      ["Computer Vision · ViT · EfficientNet", 85],
      ["RAG Pipelines · Agentic AI", 87],
      ["Prompt Engineering · Claude & Gemini APIs", 86],
      ["Sentence-Transformers · NLP · Vector Search", 82],
      ["MLOps · Benchmark-gated CI/CD", 80],
    ]},
    { group: "Full-Stack · Backend", items: [
      ["Python · FastAPI · Flask", 90],
      ["JavaScript / TypeScript · React · Next.js", 84],
      ["Spring Boot · REST APIs · WebSockets", 80],
      ["RabbitMQ · Async Python · Microservices", 82],
      ["PostgreSQL · MongoDB · MongoDB Vector Store", 80],
      ["Docker · GitHub Actions CI/CD · Linux", 85],
    ]},
    { group: "Data Engineering", items: [
      ["Pandas · PyArrow · Parquet · ETL Pipelines", 88],
      ["SQL · Data Visualization · Statistical Analysis", 84],
      ["Protobuf · Lightstreamer · Observability", 76],
      ["Azure (AZ-900) · GCP · Vercel · Serverless", 75],
    ]},
    { group: "Game Development · Systems", items: [
      ["C# · Unity · ShaderLab · HLSL", 80],
      ["C / C++ · OOP · System Design", 78],
      ["WebAR · AR.js · A-Frame", 74],
      ["Node.js · Socket.io · Real-Time Systems", 80],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
