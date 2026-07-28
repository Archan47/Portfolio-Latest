/* ============================================================
   SINGLE SOURCE OF TRUTH for projects & blogs.
   - Add/edit/remove entries here.
   - index.html automatically shows only the first 3 of each.
   - allProjects.html / allBlogs.html automatically show ALL of them.
   Order matters: the first 3 items in PROJECTS/BLOGS are what
   show up on the homepage.
   ============================================================ */

const PROJECTS = [
  {
    title: "AI Therapist (LangChain & RAG)",
    desc: "React + Flask app with an LLM backend using LangChain and Retrieval-Augmented Generation, prompt engineering, hallucination mitigation, and an admin dashboard with BLEU/semantic-similarity evaluation.",
    image: "images/ai-therapist.png",
    link: "#",
    linkLabel: "Github",
    tags: ["React", "Flask", "LangChain", "RAG", "JWT"]
  },
  {
    title: "Facial Expression Recognition",
    desc: "CNN / transfer-learning classifier in TensorFlow with a full preprocessing and hyperparameter-tuning pipeline, improving accuracy from 42% (EfficientNetB0 baseline) to 66% on a 7-class FER dataset.",
    image: "images/face.jpeg",
    link: "https://www.kaggle.com/code/archankunduchowdhury/facial-expression-detection-cnn-vs-efficientnetb0",
    linkLabel: "Kaggle",
    tags: ["Python", "TensorFlow", "CNN", "Kaggle"]
  },
  {
    title: "Talkative — Real-Time Group Chat",
    desc: "Full-stack Spring Boot, React, and MongoDB app with REST APIs powering private/public rooms, post/like/comment features, and a User/Admin module with an Admin Monitoring System.",
    image: "images/chat-logo.png",
    link: "",
    linkLabel: "Github",
    tags: ["Spring Boot", "React", "MongoDB", "JWT", "Spring Security"]
  },
  {
    title: "Agroveda - Farmers' App",
    desc: "Developing a Python-based backend integrating ML Computer Vision, and IoT sensor data (soil moisture, PIR) to power crop recommendations and plant disease detection via image processing",
    image:"images/agroveda.png",
    link: "https://github.com/AgroVeda-The-Farmers-App",
    linkLabel: "Github",
    tags: ["Python", "Flask", "React.js", "MongoDB", "IoT" ,"Aurdino IDE", "Machine Learning", "JWT"]
  },
  {
    title: "Online Bakrey",
    desc: "Royal Terrace — a combined ecommerce storefront and blog built with PHP and vanilla Javascript.",
    image:"images/bakery.jpg",
    link: "https://github.com/Online-Bakery-Shop",
    linkLabel: "Github",
    tags: ["Java", "Spring Boot" , "React.js" , "MySQL"]
  },
  {
    title: "JDBC Transaction System",
    desc: "Core JDBC based Transactio System which can deposit , withdraw , view balance and transaction history for users and created a seperate Exception class for invalid account number.",
    placeholderBg: "#aca1e7",
    placeholderText: "Transaction System",
    link: "https://github.com/Archan47/JDBC-TransactionSystem",
    linkLabel: "Github",
    tags: ["Java", "JDBC","MySQL"]
  },
  {
    title: "Spam SMS Classifier",
    desc: "Implemented using KNN, SVC, Naive Bayes, AdaBoost. Final Multinomial Naive Bayes model achieving 97% accuracy & 100% precision with Streamlit interface.",
    image:"images/spam-detection.jpg",
    link: "https://github.com/Archan47/Spam-SMS-Classifier",
    linkLabel: "Github",
    tags: ["Python", "NLP","Machine Learning", "Classification", "Streamlit"]
  },
  {
    title: "Movie recommendation System",
    desc: "Complete NLP-based system suggesting movies using content-based filtering with intuitive Streamlit UI for seamless user experience.",
    image:"images/movie-recommender.png",
    link: "https://github.com/Archan47/Movie-Recommendation-System",
    linkLabel: "Github",
    tags: ["Python", "NLP", "Streamlit"]
  }
];

const BLOGS = [
  {
    topic: "Machine Learning",
    title: "Gaussian Naive Bayes From Scratch — The Computation Behind Every Prediction",
    desc: "Short one to two line summary of what this post covers goes here — replace with your actual excerpt.",
    image:"images/nb.png",
    publication: "Towards AI",
    meta: "Jul 2", 
    url: "https://medium.com/towards-artificial-intelligence/gaussian-naive-bayes-from-scratch-the-computation-behind-every-prediction-ccfaffb7ceff"
  },
  {
    topic: "Machine Learning",
    title: "K-Nearest Neighbors From Scratch: Understanding the Core Idea, Then Benchmarking It Against Scikit-learn",
    desc: "A first-principles look at how KNN actually works, followed by a head-to-head benchmark against the standard library version.",
    image:"images/knn.png",
    publication: "",
    meta: "Jun 24",
    url: "https://medium.com/@chowdhuryarchan76/k-nearest-neighbors-from-scratch-understanding-the-core-idea-then-benchmarking-it-against-b95b70072b57"
  }
];

/* ---------------- render helpers ---------------- */

function projectCardHTML(p) {
  const banner = p.image
    ? `<img class="proj-banner" src="${p.image}" alt="${p.title} screenshot">`
    : `<div class="proj-banner" style="background:${p.placeholderBg || "#f3f3f3"};display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;font-weight:600;">${p.placeholderText || p.title}</div>`;

  const pills = p.tags.map(t => `<span class="pill" data-tag="${t}">${t}</span>`).join("");
  const ghBtn = p.link ? `<button class="gh-btn" data-url="${p.link}">${p.linkLabel || "Github"}</button>` : "";

  return `
    <div class="proj-card" data-tags="${p.tags.join(" ")}">
      ${banner}
      <div class="proj-body">
        <div class="proj-title-row"><h4>${p.title}</h4>${ghBtn}</div>
        <p class="proj-desc">${p.desc || ""}</p>
        <div class="pill-row">${pills}</div>
      </div>
    </div>`;
}

function blogCardHTML(b) {
  const source = b.publication ? `Published in ${b.publication}` : "Medium";
  const banner = b.image
    ? `<img class="blog-banner" src="${b.image}" alt="${b.title} cover image">`
    : `<div class="blog-banner"></div>`;
  return `
    <div class="blog-card">
      ${banner}
      <div class="blog-body">
        <span class="blog-topic">${b.topic}</span>
        <h4>${b.title}</h4>
        <p>${b.desc}</p>
        <span class="blog-meta">${source} · ${b.meta}</span>
        <a class="blog-link" href="${b.url}" target="_blank" rel="noopener">Read on Medium ↗</a>
      </div>
    </div>`;
}

/**
 * Renders projects into a container.
 * @param {string} containerId - id of the grid element
 * @param {number} [limit] - if set, only render the first N projects (used on index.html)
 */
function renderProjects(containerId, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  el.innerHTML = list.map(projectCardHTML).join("");
  el.querySelectorAll(".gh-btn[data-url]").forEach(btn => {
    btn.addEventListener("click", () => window.open(btn.dataset.url, "_blank", "noopener"));
  });
}

/**
 * Renders blogs into a container.
 * @param {string} containerId - id of the grid element
 * @param {number} [limit] - if set, only render the first N blogs (used on index.html)
 */
function renderBlogs(containerId, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = limit ? BLOGS.slice(0, limit) : BLOGS;
  el.innerHTML = list.map(blogCardHTML).join("");
}

/**
 * Lets the small in-card tag pills filter the cards on the page they're
 * rendered on (used on index.html, where the whole "click a tag" tip lives).
 */
function attachInCardPillFilter(gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  let activeTag = null;

  grid.addEventListener("click", e => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    const tag = pill.dataset.tag;
    const cards = grid.querySelectorAll(".proj-card");
    const pills = grid.querySelectorAll(".pill");

    if (activeTag === tag) {
      activeTag = null;
      pills.forEach(p => p.classList.remove("on"));
      cards.forEach(c => (c.style.display = ""));
    } else {
      activeTag = tag;
      pills.forEach(p => p.classList.toggle("on", p.dataset.tag === tag));
      cards.forEach(c => {
        c.style.display = c.dataset.tags.split(" ").includes(tag) ? "" : "none";
      });
    }
  });
}

/**
 * Builds the top filter-pill row on allProjects.html automatically from
 * whatever tags exist across PROJECTS, then wires it up to filter the grid.
 */
function renderFilterBar(filterBarId, gridId, emptyMsgId) {
  const bar = document.getElementById(filterBarId);
  const grid = document.getElementById(gridId);
  const emptyMsg = document.getElementById(emptyMsgId);
  if (!bar || !grid) return;

  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags)));
  bar.innerHTML =
    `<button class="filter-pill on" data-tag="all">All</button>` +
    allTags.map(t => `<button class="filter-pill" data-tag="${t}">${t}</button>`).join("");

  bar.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
      const tag = btn.dataset.tag;
      const cards = grid.querySelectorAll(".proj-card");
      let visible = 0;
      cards.forEach(c => {
        const show = tag === "all" || c.dataset.tags.split(" ").includes(tag);
        c.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (emptyMsg) emptyMsg.style.display = visible === 0 ? "block" : "none";
    });
  });
}