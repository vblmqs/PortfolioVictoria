document.addEventListener('DOMContentLoaded', () => {
    
    // Seletores
    const pillContainer = document.querySelector('.floating-pill'); 
    const pillLinks = document.querySelectorAll('.floating-pill a');
    const sections = document.querySelectorAll('section, footer');
    const mobileMenu = document.getElementById('nav-links');
    const menuIcon = document.getElementById('mobile-menu-icon');

    // Menu Mobile Toggle
    if(menuIcon){
        menuIcon.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // --- LÓGICA DE SCROLL (Pílula e Active State) ---
    window.addEventListener('scroll', () => {
        
        // 1. Mostrar/Esconder Pílula
        if (window.scrollY > 300) { 
            pillContainer.classList.add('visible');
        } else {
            pillContainer.classList.remove('visible');
        }

        // 2. Mudar link ativo
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Ajuste fino para ativar o link um pouco antes de chegar na seção
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        pillLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- CLIQUE NOS LINKS (ROLAGEM SUAVE) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Fecha menu mobile se estiver aberto
            if(mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- EFEITO TILT 3D (Sobre Mim) ---
    const card = document.getElementById('tilt-card');
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xRotation = -((mouseY - height / 2) / height * 2);
            const yRotation = ((mouseX - width / 2) / width * 2);
            card.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    }
});

// --- FUNÇÃO COPIAR EMAIL (Global) ---
function copyEmail() {
    const email = document.getElementById('email-text').innerText;
    const tooltip = document.getElementById('copy-tooltip');
    
    navigator.clipboard.writeText(email).then(() => {
        tooltip.innerText = "Copiado!";
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => { tooltip.innerText = "Copiar Email"; }, 300);
        }, 2000);
    });
}