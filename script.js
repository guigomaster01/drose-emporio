document.addEventListener("DOMContentLoaded", function() {
    
    // Função para a animação de surgimento suave dos elementos ao rolar a página
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // usa a viewport como área de observação
        rootMargin: '0px',
        threshold: 0.1 // O elemento é considerado visível quando 10% dele está na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' para ativar a animação CSS
                entry.target.classList.add('visible');
                // Para de observar o elemento para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cada elemento com a classe '.fade-in'
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

});