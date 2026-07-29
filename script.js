
const welcomeScreen = document.getElementById('welcomeScreen');
const enterBtn = document.getElementById('enterBtn');
const mainWebsite = document.getElementById('mainWebsite');


const welcomeParticles = document.getElementById('welcomeParticles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('welcome-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 15) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particle.style.opacity = 0.1 + Math.random() * 0.3;
    welcomeParticles.appendChild(particle);
}


function enterWebsite() {
    welcomeScreen.classList.add('fade-out');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainWebsite.style.display = 'block';
        document.body.style.overflow = 'auto';
        initParticles();
        setTimeout(animateSkillBars, 500);
        setTimeout(animateCounters, 1000);
    }, 800);
}

enterBtn.addEventListener('click', enterWebsite);
welcomeScreen.addEventListener('click', (e) => {
    if (e.target === welcomeScreen || e.target.closest('.welcome-content')) {
        enterWebsite();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && welcomeScreen.style.display !== 'none') {
        enterWebsite();
    }
});


const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});


const canvas = document.getElementById('particleCanvas');
let ctx;

function initParticles() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouseX = null;
    let mouseY = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.6)' : 'rgba(108, 43, 217, 0.4)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            if (mouseX !== null && mouseY !== null) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.03;
                    this.x += dx * force;
                    this.y += dy * force;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const particleCount = Math.min(100, Math.floor(window.innerWidth / 12));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - dist / 150) * 0.3;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
    });
}


const typedTextElement = document.querySelector('.typed-text');
const phrases = [
    '📊 Data Analyst',
    '📈 Data-Driven Problem Solver',
    '🔍 Turning Data into Insights',
    '📉 Statistical Analysis',
    '📊 Business Intelligence'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    if (!typedTextElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

if (typedTextElement) {
    typeEffect();
}


const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.innerHTML = navLinksContainer.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});


const skillBars = document.querySelectorAll('.progress-fill');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width + '%';
    });
}

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.width;
            bar.style.width = width + '%';
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = Math.ceil(target / 40);
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(counter);
    });
}


const projectTags = document.querySelectorAll('.tag');
projectTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05)';
        tag.style.transition = 'transform 0.2s ease';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
    });
});


const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent! 📊';
        btn.style.background = 'linear-gradient(135deg, #00D4FF, #00FF88)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2500);
    }, 2000);
});


const revealElements = document.querySelectorAll('.project-card, .timeline-item, .stat-card, .certificate-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});


const footerP = document.querySelector('footer p');
if (footerP) {
    footerP.innerHTML = 
        `&copy; ${new Date().getFullYear()} Tlhologelo Mmako | Built with <span class="vscode-text"><i class="fas fa-code"></i> Visual Studio Code</span>`;
}

const hero = document.querySelector('.hero');
if (hero) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        const grid = hero.querySelector('.hero-grid-bg');
        if (grid) {
            grid.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}


document.getElementById('downloadCV')?.addEventListener('click', function() {
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Data CV...';
    this.disabled = true;

    const link = document.createElement('a');
    const cvContent = generateCVHTML();
    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'Tlhologelo_Mmako_Data_CV.html';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
        URL.revokeObjectURL(url);
        this.innerHTML = originalText;
        this.disabled = false;
    }, 1500);
});


function generateCVHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Tlhologelo Mmako - Data CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0A0E17;
            color: #E8EDF5;
            padding: 40px;
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .cv-container {
            background: rgba(16, 24, 40, 0.9);
            border-radius: 16px;
            padding: 50px;
            border: 1px solid rgba(0, 212, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .header {
            text-align: center;
            padding-bottom: 30px;
            border-bottom: 2px solid rgba(0, 212, 255, 0.1);
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 2.5rem;
            color: #00D4FF;
            font-weight: 800;
            letter-spacing: -1px;
        }
        .header .title {
            color: #8899AA;
            font-size: 1.1rem;
            margin-top: 5px;
        }
        .header .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 12px;
            color: #8899AA;
            font-size: 0.9rem;
        }
        .header .contact-info span {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #00D4FF;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(0, 212, 255, 0.05);
        }
        .section p, .section li {
            color: #8899AA;
            font-size: 0.95rem;
        }
        .section ul {
            list-style: none;
            padding-left: 0;
        }
        .section ul li {
            padding: 4px 0;
            padding-left: 24px;
            position: relative;
        }
        .section ul li::before {
            content: '📊';
            position: absolute;
            left: 0;
        }
        .item {
            margin-bottom: 16px;
        }
        .item h3 {
            color: #E8EDF5;
            font-size: 1.05rem;
            font-weight: 600;
        }
        .item .sub {
            color: #8899AA;
            font-size: 0.9rem;
            margin: 2px 0 6px;
        }
        .item .date {
            color: #00D4FF;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        .skill-tag {
            background: rgba(0, 212, 255, 0.08);
            border: 1px solid rgba(0, 212, 255, 0.1);
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            color: #E8EDF5;
        }
        .data-highlight {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin: 16px 0;
            padding: 16px;
            background: rgba(0, 212, 255, 0.03);
            border-radius: 8px;
            border: 1px solid rgba(0, 212, 255, 0.05);
        }
        .data-highlight-item {
            text-align: center;
        }
        .data-highlight-item .number {
            font-size: 1.5rem;
            font-weight: 700;
            color: #00D4FF;
            font-family: 'JetBrains Mono', monospace;
        }
        .data-highlight-item .label {
            font-size: 0.7rem;
            color: #8899AA;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cert-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
        }
        .cert-item .badge {
            background: rgba(0, 212, 255, 0.1);
            padding: 2px 12px;
            border-radius: 12px;
            font-size: 0.7rem;
            color: #00D4FF;
            font-weight: 600;
        }
        .project-item {
            margin-bottom: 14px;
            padding: 12px 16px;
            background: rgba(0, 212, 255, 0.02);
            border-radius: 8px;
            border-left: 3px solid #00D4FF;
        }
        .project-item h4 {
            color: #E8EDF5;
            font-size: 1rem;
            font-weight: 600;
        }
        .project-item .tech {
            color: #00D4FF;
            font-size: 0.8rem;
            font-family: 'JetBrains Mono', monospace;
        }
        .project-item p {
            color: #8899AA;
            font-size: 0.9rem;
            margin-top: 4px;
        }
        @media print {
            body { padding: 20px; }
            .cv-container { box-shadow: none; }
        }
        @media (max-width: 600px) {
            .cv-container { padding: 24px; }
            .header h1 { font-size: 1.8rem; }
            .header .contact-info { flex-direction: column; align-items: center; }
            .data-highlight { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1>📊 Tlhologelo Mmako</h1>
            <div class="title">Data Analyst | BSc IT Student</div>
            <div class="contact-info">
                <span>📧 tlhologelocmmako@gmail.com</span>
                <span>📱 +27 68 487 2971</span>
                <span>📍 Johannesburg, South Africa</span>
                <span>🔗 linkedin.com/in/tlhologelo-mmako-64a485200</span>
                <span>💻 github.com/theArchitect27</span>
            </div>
        </div>

        <div class="section">
            <h2>📊 Professional Summary</h2>
            <p>Analytical and data-driven BSc Information Technology student with a strong passion for data analysis, business intelligence, and data-driven decision making. Skilled in transforming raw data into actionable insights using Python, statistical analysis, and data visualization techniques. Experienced in academic projects involving data cleaning, exploratory data analysis, and machine learning. Demonstrates strong communication, teamwork, and problem-solving abilities.</p>
        </div>

        <div class="data-highlight">
            <div class="data-highlight-item">
                <span class="number">5+</span>
                <span class="label">Data Projects</span>
            </div>
            <div class="data-highlight-item">
                <span class="number">6</span>
                <span class="label">Analysis Tools</span>
            </div>
            <div class="data-highlight-item">
                <span class="number">4</span>
                <span class="label">Certifications</span>
            </div>
            <div class="data-highlight-item">
                <span class="number">3</span>
                <span class="label">Team Projects</span>
            </div>
        </div>

        <div class="section">
            <h2>🎓 Education</h2>
            <div class="item">
                <h3>Bachelor of Science in Information Technology</h3>
                <div class="sub">North-West University, Vanderbijlpark</div>
                <div class="date">2023 – Present</div>
                <ul>
                    <li>Data Analysis &amp; Visualization</li>
                    <li>Database Management &amp; SQL</li>
                    <li>Statistical Analysis &amp; Modeling</li>
                    <li>Software Development &amp; Systems Thinking</li>
                </ul>
            </div>
            <div class="item">
                <h3>National Senior Certificate</h3>
                <div class="sub">Brakpan Education Centre</div>
                <div class="date">2018</div>
            </div>
        </div>

        <div class="section">
            <h2>💼 Experience</h2>
            <div class="item">
                <h3>Teaching Assistant &amp; Data Administrator</h3>
                <div class="sub">Department of Education</div>
                <div class="date">2021 – 2022</div>
                <ul>
                    <li>Captured, organized, and maintained student and administrative data</li>
                    <li>Analyzed student performance data to identify trends and insights</li>
                    <li>Performed data quality checks and validation</li>
                    <li>Assisted in coordinating classroom activities</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>📈 Data Projects</h2>
            <div class="project-item">
                <h4>Clustering Fitness Tracker Data</h4>
                <span class="tech">Python · NumPy · Matplotlib · scikit-learn</span>
                <p>Applied KMeans clustering to analyze simulated fitness tracker data, identifying patterns in user activity and sleep behaviour using unsupervised learning techniques.</p>
            </div>
            <div class="project-item">
                <h4>Hope Harvest Data System</h4>
                <span class="tech">UML · Process Modelling · Database Design</span>
                <p>Designed a digital information system for a non-profit, implementing data tracking for food distribution, inventory management, and donor analytics.</p>
            </div>
            <div class="project-item">
                <h4>Network Performance Analytics</h4>
                <span class="tech">Cisco Packet Tracer · VLANs · ACLs · DHCP · DNS</span>
                <p>Designed and analyzed secure enterprise network performance with VLAN segmentation, implementing data flow monitoring and security analytics.</p>
            </div>
            <div class="project-item">
                <h4>MoneyMind Financial Analytics</h4>
                <span class="tech">C# · Xamarin · SQLite · Git</span>
                <p>Cross-platform mobile app with built-in financial analytics, tracking income, expenses, debt patterns, and generating budget insights.</p>
            </div>
            <div class="project-item">
                <h4>Call Center Data Analytics</h4>
                <span class="tech">Java · Linked Lists · Stacks · Queues</span>
                <p>Call management system with data analytics capabilities, analyzing call patterns, resolution times, and operational efficiency metrics.</p>
            </div>
        </div>

        <div class="section">
            <h2>🛠️ Technical Skills</h2>
            <div class="skills-grid">
                <span class="skill-tag">Python (NumPy/Pandas)</span>
                <span class="skill-tag">Data Visualization</span>
                <span class="skill-tag">SQL / Database</span>
                <span class="skill-tag">Statistical Analysis</span>
                <span class="skill-tag">Matplotlib / Seaborn</span>
                <span class="skill-tag">scikit-learn</span>
                <span class="skill-tag">Git &amp; GitHub</span>
                <span class="skill-tag">Java (Foundational)</span>
                <span class="skill-tag">C++ (Foundational)</span>
                <span class="skill-tag">HTML / CSS</span>
            </div>
        </div>

        <div class="section">
            <h2>🎯 Data Skills</h2>
            <div class="skills-grid">
                <span class="skill-tag">📊 Data Storytelling</span>
                <span class="skill-tag">📈 Trend Analysis</span>
                <span class="skill-tag">🧹 Data Cleaning</span>
                <span class="skill-tag">📉 Statistical Modeling</span>
                <span class="skill-tag">📊 Business Intelligence</span>
                <span class="skill-tag">🎯 Problem-Solving</span>
                <span class="skill-tag">🤝 Collaboration</span>
                <span class="skill-tag">💬 Communication</span>
            </div>
        </div>

        <div class="section">
            <h2>📜 Certifications</h2>
            <div class="cert-item">
                <span>FNB App Academy — Full Stack Development &amp; Data Analytics</span>
                <span class="badge">2026</span>
            </div>
            <div class="cert-item">
                <span>WeThinkCode — Generative AI for Data Analysis</span>
                <span class="badge">2026</span>
            </div>
            <div class="cert-item">
                <span>Introduction to CISSP: Security Testing &amp; Data Protection</span>
                <span class="badge">2025</span>
            </div>
            <div class="cert-item">
                <span>Introduction to Cloud Security</span>
                <span class="badge">2025</span>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0, 212, 255, 0.05); color: #8899AA; font-size: 0.8rem;">
            📊 Generated from Tlhologelo Mmako's Data Portfolio • ${new Date().toLocaleDateString()}
        </div>
    </div>
</body>
</html>
    `;
}

console.log('📊 Tlhologelo Mmako - Data Portfolio loaded successfully!');
console.log('📈 Built with HTML, CSS & JavaScript');
console.log('🔍 Turning Data into Insights ');
