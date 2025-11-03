document.addEventListener("DOMContentLoaded", function() {
    
    // --- CÓDIGO EXISTENTE DE ANIMAÇÃO FADE-IN ---
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
    // --- FIM DO CÓDIGO EXISTENTE ---


    // --- NOVO CÓDIGO DA LISTA DE COMPRAS ---

    // 1. Verificamos se os elementos da lista existem antes de executar
    const listForm = document.getElementById('list-form');
    
    // Se o formulário não existir nesta página, não faz nada
    if (listForm) {
        
        // 1. Referências aos elementos
        const itemInput = document.getElementById('item-input');
        const quantityInput = document.getElementById('quantity-input');
        const currentList = document.getElementById('current-list');
        const sendListBtn = document.getElementById('send-list-btn');

        // 2. Array para guardar os itens
        let shoppingList = [];

        // 3. Função para renderizar a lista no HTML
        function renderList() {
            // Limpa a lista atual
            currentList.innerHTML = '';
            
            if (shoppingList.length > 0) {
                shoppingList.forEach((item, index) => {
                    const li = document.createElement('li');
                    // Adiciona o item e um botão de remover (com ícone do Font Awesome)
                    li.innerHTML = `
                        <span><strong>${item.quantity}</strong> - ${item.name}</span>
                        <button class="item-remove-btn" data-index="${index}" title="Remover item">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `;
                    currentList.appendChild(li);
                });
            }
            // O placeholder :empty no CSS cuidará de mostrar a mensagem de lista vazia
        }

        // 4. Função para adicionar item (quando o form for enviado)
        listForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o recarregamento da página

            const itemName = itemInput.value.trim();
            const itemQuantity = quantityInput.value.trim();

            // Validação simples
            if (itemName === '' || itemQuantity === '') {
                alert('Por favor, preencha o item e a quantidade.');
                return;
            }

            // Adiciona ao array
            shoppingList.push({ name: itemName, quantity: itemQuantity });

            // Atualiza a lista no HTML
            renderList();

            // Limpa os campos
            itemInput.value = '';
            quantityInput.value = '';
            itemInput.focus(); // Coloca o foco de volta no primeiro campo
        });

        // 5. Função para remover item (usando delegação de evento)
        currentList.addEventListener('click', function(e) {
            // Procura pelo botão de remover mais próximo do clique
            const removeBtn = e.target.closest('.item-remove-btn');
            
            if (removeBtn) {
                const indexToRemove = parseInt(removeBtn.dataset.index, 10);
                // Remove o item do array
                shoppingList.splice(indexToRemove, 1);
                // Renderiza a lista novamente
                renderList();
            }
        });

        // 6. Função para enviar a lista pelo WhatsApp
        sendListBtn.addEventListener('click', function() {
            if (shoppingList.length === 0) {
                alert('Sua lista está vazia! Adicione alguns itens primeiro.');
                return;
            }

            // Número de telefone (do seu HTML)
            const phoneNumber = '5515981340527';
            
            // Monta a mensagem
            let message = "Olá D'Rose! Gostaria de um orçamento para a seguinte lista:\n\n";
            
            shoppingList.forEach(item => {
                // O *...* é para deixar o texto em negrito no WhatsApp
                message += `*${item.quantity}* - ${item.name}\n`;
            });
            
            message += "\nObrigada!";

            // Formata para URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

            // Abre em uma nova aba
            window.open(whatsappUrl, '_blank');
        });
    }
    // --- FIM DO NOVO CÓDIGO ---

}); // Fim do DOMContentLoaded