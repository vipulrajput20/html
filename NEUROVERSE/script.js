/* ==========================================
   NEUROVERSE AI — JAVASCRIPT
   Interactive website functionality
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ---------- SELECT HTML ELEMENTS ----------

    const startBtn = document.getElementById("startBtn");
    const exploreBtn = document.getElementById("exploreBtn");
    const analyzeBtn = document.getElementById("analyzeBtn");

    const ideaInput = document.getElementById("ideaInput");
    const ideaMessage = document.getElementById("ideaMessage");

    const universeVisual = document.getElementById("universeVisual");

    // ---------- BUTTON: START EXPLORING ----------

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const ideaSection = document.getElementById("about");

            if (ideaSection) {
                ideaSection.scrollIntoView({
                    behavior: "smooth"
                });

                setTimeout(() => {
                    if (ideaInput) {
                        ideaInput.focus();
                    }
                }, 700);
            }
        });
    }

    // ---------- BUTTON: EXPLORE UNIVERSE ----------

    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            const universeSection = document.getElementById("universe");

            if (universeSection) {
                universeSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            showNotification("Welcome to your universe ✨");
        });
    }

    // ---------- NOTIFICATION SYSTEM ----------

    function showNotification(message) {

        let notification = document.getElementById("neuroNotification");

        if (!notification) {
            notification = document.createElement("div");
            notification.id = "neuroNotification";

            Object.assign(notification.style, {
                position: "fixed",
                top: "100px",
                right: "20px",
                zIndex: "9999",
                maxWidth: "calc(100vw - 40px)",
                padding: "15px 22px",
                color: "#ffffff",
                background: "rgba(24, 16, 45, 0.96)",
                border: "1px solid rgba(168, 85, 247, 0.6)",
                borderRadius: "12px",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
                backdropFilter: "blur(15px)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                opacity: "0",
                transform: "translateY(-10px)",
                transition: "opacity 0.3s ease, transform 0.3s ease"
            });

            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";

        clearTimeout(notification.hideTimer);

        notification.hideTimer = setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateY(-10px)";
        }, 3000);
    }

    // ---------- IDEA ANALYZER ----------

    if (analyzeBtn && ideaInput && ideaMessage) {

        analyzeBtn.addEventListener("click", analyzeIdea);

        // Also support Ctrl + Enter in the textarea.
        ideaInput.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === "Enter") {
                analyzeIdea();
            }
        });
    }

    function analyzeIdea() {

        const idea = ideaInput.value.trim();

        // Check empty input.
        if (idea.length === 0) {
            ideaMessage.textContent =
                "Please enter an idea first. Your universe is waiting! ✨";

            ideaInput.focus();
            return;
        }

        // Keep the analysis manageable.
        if (idea.length > 2000) {
            ideaMessage.textContent =
                "Please keep your idea under 2000 characters.";

            return;
        }

        // Show loading state.
        analyzeBtn.disabled = true;
        analyzeBtn.style.opacity = "0.7";
        analyzeBtn.textContent = "Analyzing...";

        ideaMessage.textContent =
            "Exploring your idea and generating insights... 🔮";

        // This is a local, rule-based demo — not an actual AI API call.
        setTimeout(() => {

            const result = generateIdeaInsights(idea);

            displayIdeaResults(result);

            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = "1";
            analyzeBtn.textContent = "Analyze My Idea ↗";

        }, 1200);
    }

    // ---------- GENERATE DEMO INSIGHTS ----------

    function generateIdeaInsights(idea) {

        const words = idea
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .split(/\s+/)
            .filter(Boolean);

        const wordCount = words.length;

        const uniqueWords = new Set(words);

        const keywords = [
            "ai", "artificial intelligence", "website",
            "app", "business", "education", "health",
            "gaming", "game", "technology", "coding",
            "student", "design", "social", "finance",
            "robot", "automation", "learning"
        ];

        const matchedKeywords = keywords.filter(keyword =>
            idea.toLowerCase().includes(keyword)
        );

        let category = "Creative Concept";
        let nextStep = "Write down the main problem your idea will solve.";

        if (
            idea.toLowerCase().includes("ai") ||
            idea.toLowerCase().includes("artificial intelligence") ||
            idea.toLowerCase().includes("robot") ||
            idea.toLowerCase().includes("automation")
        ) {
            category = "AI & Innovation";
            nextStep =
                "Define the AI feature, identify its users, and build a small prototype.";
        } else if (
            idea.toLowerCase().includes("website") ||
            idea.toLowerCase().includes("app") ||
            idea.toLowerCase().includes("coding")
        ) {
            category = "Software & Technology";
            nextStep =
                "Create a simple MVP with one core feature, then test it with real users.";
        } else if (
            idea.toLowerCase().includes("business") ||
            idea.toLowerCase().includes("finance")
        ) {
            category = "Business & Entrepreneurship";
            nextStep =
                "Identify your target customer, validate demand, and estimate basic costs.";
        } else if (
            idea.toLowerCase().includes("education") ||
            idea.toLowerCase().includes("student") ||
            idea.toLowerCase().includes("learning")
        ) {
            category = "Education & Learning";
            nextStep =
                "Choose your target learners and design one useful learning experience.";
        } else if (
            idea.toLowerCase().includes("health")
        ) {
            category = "Health & Wellbeing";
            nextStep =
                "Define the user need and research safe, reliable ways to address it.";
        }

        let clarity = "Developing";

        if (wordCount >= 20) {
            clarity = "Detailed concept";
        } else if (wordCount >= 8) {
            clarity = "Good starting point";
        }

        return {
            originalIdea: idea,
            wordCount,
            uniqueWords: uniqueWords.size,
            category,
            clarity,
            nextStep,
            keywords: matchedKeywords
        };
    }

    // ---------- DISPLAY RESULTS ----------

    function displayIdeaResults(result) {

        let resultBox = document.getElementById("ideaResults");

        if (!resultBox) {

            resultBox = document.createElement("div");
            resultBox.id = "ideaResults";

            Object.assign(resultBox.style, {
                marginTop: "24px",
                padding: "25px",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                borderRadius: "18px",
                background: "rgba(12, 10, 28, 0.85)",
                color: "#f8fafc",
                lineHeight: "1.8",
                overflowWrap: "anywhere"
            });

            ideaMessage.insertAdjacentElement("afterend", resultBox);
        }

        // Build elements safely; don't inject user input as HTML.
        resultBox.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Your Idea Insights ✨";

        Object.assign(heading.style, {
            marginBottom: "18px",
            fontSize: "1.35rem",
            color: "#c084fc"
        });

        resultBox.appendChild(heading);

        addResultLine(
            resultBox,
            "Category",
            result.category
        );

        addResultLine(
            resultBox,
            "Concept detail",
            result.clarity
        );

        addResultLine(
            resultBox,
            "Words in your idea",
            String(result.wordCount)
        );

        addResultLine(
            resultBox,
            "Unique words",
            String(result.uniqueWords)
        );

        addResultLine(
            resultBox,
            "Suggested next step",
            result.nextStep
        );

        const note = document.createElement("p");

        note.textContent =
            "Demo insight only: this version uses simple keyword rules, not a real AI model.";

        Object.assign(note.style, {
            marginTop: "18px",
            color: "#9696b5",
            fontSize: "0.8rem"
        });

        resultBox.appendChild(note);

        resultBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    function addResultLine(container, label, value) {

        const row = document.createElement("p");
        row.style.marginBottom = "12px";

        const strong = document.createElement("strong");
        strong.textContent = `${label}: `;
        strong.style.color = "#93c5fd";

        const text = document.createElement("span");
        text.textContent = value;

        row.append(strong, text);
        container.appendChild(row);
    }

    // ---------- INTERACTIVE UNIVERSE ----------

    if (universeVisual) {

        universeVisual.addEventListener("pointermove", (event) => {

            // Don't apply mouse tilt on touch screens.
            if (event.pointerType !== "mouse") {
                return;
            }

            const rect = universeVisual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const rotateY = (x - 0.5) * 8;
            const rotateX = (0.5 - y) * 8;

            universeVisual.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        universeVisual.addEventListener("pointerleave", () => {
            universeVisual.style.transform = "";
        });
    }

    // ---------- TEXTAREA CHARACTER COUNTER ----------

    if (ideaInput) {

        let counter = document.getElementById("ideaCounter");

        if (!counter) {

            counter = document.createElement("p");
            counter.id = "ideaCounter";

            Object.assign(counter.style, {
                marginTop: "8px",
                color: "#9696b5",
                fontSize: "0.75rem",
                textAlign: "right"
            });

            ideaInput.insertAdjacentElement("afterend", counter);
        }

        function updateCounter() {
            counter.textContent = `${ideaInput.value.length}/2000 characters`;
        }

        ideaInput.addEventListener("input", updateCounter);

        updateCounter();
    }

    // ---------- NAVIGATION ACTIVE STATE ----------

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(navLink => {
                navLink.style.color = "";
            });

            link.style.color = "#c084fc";
        });
    });

    // ---------- CONSOLE MESSAGE ----------

    console.log(
        "%c NEUROVERSE AI ",
        "background: #7c3aed; color: white; font-size: 20px; padding: 10px;"
    );

    console.log(
        "%cYour universe is ready to explore.",
        "color: #c084fc; font-size: 13px;"
    );
    
// ==========================================
// NEUROVERSE AI — 3D UNIVERSE ENGINE
// Powered by Three.js
// ==========================================

function initNeuroverse3D() {

    const container = document.getElementById("threeContainer");

    if (!container) {
        console.warn("3D container missing. Add #threeContainer to index.html.");
        return;
    }

    if (typeof THREE === "undefined") {
        console.error("Three.js not loaded. Check the script tag in index.html.");
        return;
    }

    // Prevent duplicate initialization
    if (container.dataset.initialized === "true") return;
    container.dataset.initialized = "true";

    // ---------- SCENE ----------

    const scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0x05050b, 0.035);

    // ---------- CAMERA ----------

    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 8);

    // ---------- RENDERER ----------

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // ---------- CENTRAL ENERGY PLANET ----------

    const planetGeometry = new THREE.SphereGeometry(1.15, 64, 64);

    const planetMaterial = new THREE.MeshStandardMaterial({
        color: 0x7528e8,
        emissive: 0x4610a8,
        emissiveIntensity: 1.1,
        roughness: 0.3,
        metalness: 0.4
    });

    const planet = new THREE.Mesh(
        planetGeometry,
        planetMaterial
    );

    scene.add(planet);

    // ---------- INNER GLOW ----------

    const glowGeometry = new THREE.SphereGeometry(1.3, 48, 48);

    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x963cff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
    });

    const glow = new THREE.Mesh(
        glowGeometry,
        glowMaterial
    );

    planet.add(glow);

    // ---------- LIGHTING ----------

    const ambientLight = new THREE.AmbientLight(
        0x8b7cff,
        1.5
    );

    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(
        0xa855f7,
        35,
        30
    );

    purpleLight.position.set(3, 3, 4);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(
        0x38bdf8,
        20,
        25
    );

    blueLight.position.set(-4, -2, 3);
    scene.add(blueLight);

    // ---------- STAR FIELD ----------

    const starCount = 1600;

    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {

        const i3 = i * 3;

        starPositions[i3] = (Math.random() - 0.5) * 35;
        starPositions[i3 + 1] = (Math.random() - 0.5) * 25;
        starPositions[i3 + 2] = (Math.random() - 0.5) * 25;
    }

    const starGeometry = new THREE.BufferGeometry();

    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
        color: 0xc4b5fd,
        size: 0.035,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(
        starGeometry,
        starMaterial
    );

    scene.add(stars);

    // ---------- ORBITING PARTICLES ----------

    const particleCount = 220;

    const particlePositions = new Float32Array(
        particleCount * 3
    );

    const particleColors = new Float32Array(
        particleCount * 3
    );

    for (let i = 0; i < particleCount; i++) {

        const angle = Math.random() * Math.PI * 2;

        const radius = 1.8 + Math.random() * 1.6;

        const height = (Math.random() - 0.5) * 1.2;

        const i3 = i * 3;

        particlePositions[i3] = Math.cos(angle) * radius;
        particlePositions[i3 + 1] = height;
        particlePositions[i3 + 2] = Math.sin(angle) * radius;

        const isPurple = Math.random() > 0.5;

        particleColors[i3] = isPurple ? 0.7 : 0.2;
        particleColors[i3 + 1] = isPurple ? 0.3 : 0.7;
        particleColors[i3 + 2] = 1.0;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
    );

    particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    scene.add(particles);

    // ---------- MOUSE INTERACTION ----------

    let mouseX = 0;
    let mouseY = 0;

    container.addEventListener("pointermove", (event) => {

        const rect = container.getBoundingClientRect();

        mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;

        mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    container.addEventListener("pointerleave", () => {
        mouseX = 0;
        mouseY = 0;
    });

    // ---------- ANIMATION LOOP ----------

    const clock = new THREE.Clock();

    let animationFrameId;

    function animate() {

        animationFrameId = requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        // Planet rotation
        planet.rotation.y = elapsed * 0.18;
        planet.rotation.x = Math.sin(elapsed * 0.25) * 0.08;

        // Glow pulse
        const pulse = 1 + Math.sin(elapsed * 1.5) * 0.025;

        glow.scale.setScalar(pulse);

        // Star movement
        stars.rotation.y = elapsed * 0.008;
        stars.rotation.x = Math.sin(elapsed * 0.1) * 0.02;

        // Particle orbit
        particles.rotation.y = elapsed * 0.12;
        particles.rotation.x = Math.sin(elapsed * 0.3) * 0.1;

        // Smooth camera movement
        camera.position.x +=
            (mouseX * 0.65 - camera.position.x) * 0.025;

        camera.position.y +=
            (-mouseY * 0.45 - camera.position.y) * 0.025;

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    // ---------- RESPONSIVE RESIZING ----------

    function resizeRenderer() {

        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    const resizeObserver = new ResizeObserver(resizeRenderer);

    resizeObserver.observe(container);

    // ---------- CLEANUP SUPPORT ----------

    container.disposeNeuroverse3D = () => {

        cancelAnimationFrame(animationFrameId);

        resizeObserver.disconnect();

        planetGeometry.dispose();
        planetMaterial.dispose();

        glowGeometry.dispose();
        glowMaterial.dispose();

        starGeometry.dispose();
        starMaterial.dispose();

        particleGeometry.dispose();
        particleMaterial.dispose();

        renderer.dispose();

        renderer.domElement.remove();

        container.dataset.initialized = "false";
    };

    // Start animation
    animate();

    console.log("NEUROVERSE 3D Universe initialized successfully! 🌌");
}

// Run after the existing page setup
initNeuroverse3D();


});

