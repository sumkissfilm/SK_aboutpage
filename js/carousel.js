// Text Carousel Functionality
(function() {
    'use strict';
    
    function initCarousel() {
        const carouselButtons = document.querySelectorAll('.carousel-btn');
        const messageContents = document.querySelectorAll('.message-content');
        
        if (carouselButtons.length === 0 || messageContents.length === 0) {
            return;
        }
        
        function showSlide(slideIndex) {
            // 移除所有活動狀態
            carouselButtons.forEach(btn => btn.classList.remove('active'));
            messageContents.forEach(content => content.classList.remove('active'));
            
            // 設置當前活動狀態
            if (carouselButtons[slideIndex]) {
                carouselButtons[slideIndex].classList.add('active');
            }
            
            if (messageContents[slideIndex]) {
                messageContents[slideIndex].classList.add('active');
            }
        }
        
        // 為每個按鈕添加點擊事件
        carouselButtons.forEach((button, index) => {
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(index);
            };
            
            button.style.cursor = 'pointer';
        });
        
        // 初始化顯示第一段
        showSlide(0);
    }
    
    // 等待 DOM 準備就緒
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        setTimeout(initCarousel, 100);
    }
})(); 