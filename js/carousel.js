// Text Carousel Functionality
(function() {
    'use strict';
    
    function initCarousel() {
        console.log('開始初始化輪播...');
        
        const carouselButtons = document.querySelectorAll('.carousel-btn');
        const messageContents = document.querySelectorAll('.message-content');
        
        console.log('找到按鈕:', carouselButtons.length, '個');
        console.log('找到內容:', messageContents.length, '個');
        
        // 檢查按鈕內容
        carouselButtons.forEach((btn, i) => {
            console.log(`按鈕 ${i}:`, btn.textContent.trim(), btn.className);
        });
        
        if (carouselButtons.length === 0) {
            console.error('未找到輪播按鈕！');
            return;
        }
        
        if (messageContents.length === 0) {
            console.error('未找到輪播內容！');
            return;
        }
        
        function showSlide(slideIndex) {
            console.log('顯示第', slideIndex + 1, '段');
            
            // 移除所有活動狀態
            carouselButtons.forEach(btn => btn.classList.remove('active'));
            messageContents.forEach(content => content.classList.remove('active'));
            
            // 設置當前活動狀態
            if (carouselButtons[slideIndex]) {
                carouselButtons[slideIndex].classList.add('active');
                console.log('按鈕已設置為活動狀態');
            }
            
            if (messageContents[slideIndex]) {
                messageContents[slideIndex].classList.add('active');
                console.log('內容已設置為活動狀態');
            }
        }
        
        // 為每個按鈕添加點擊事件
        carouselButtons.forEach((button, index) => {
            console.log(`為按鈕 ${index} 添加點擊事件`);
            
            button.onclick = function(e) {
                console.log('按鈕被點擊！', index);
                e.preventDefault();
                e.stopPropagation();
                showSlide(index);
            };
            
            // 測試按鈕是否可點擊
            button.style.cursor = 'pointer';
        });
        
        // 初始化顯示第一段
        showSlide(0);
        console.log('輪播初始化完成');
    }
    
    // 等待 DOM 準備就緒
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        // DOM 已經準備就緒，直接初始化
        setTimeout(initCarousel, 100);
    }
})(); 