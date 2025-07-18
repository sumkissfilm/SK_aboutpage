/* ========================================
   SUMMER KISSES - CAROUSEL JAVASCRIPT
   ======================================== */

/*
    本檔案負責文字輪播功能：
    - 處理關於我們頁面的文字輪播
    - 提供切換按鈕功能
    - 手動切換功能
*/

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let totalSlides = 0;
let carouselContainer, carouselContent, carouselButtons;

// ===== CAROUSEL FUNCTIONS =====

/**
 * 初始化輪播功能
 */
function initCarousel() {
    carouselContainer = document.querySelector('.text-carousel-container');
    carouselContent = document.querySelector('.carousel-content');
    carouselButtons = document.querySelectorAll('.carousel-btn');
    
    if (!carouselContainer || !carouselContent || carouselButtons.length === 0) {
        console.warn('找不到輪播元素');
        return;
    }
    
    totalSlides = carouselButtons.length;
    
    console.log('初始化輪播功能:', {
        totalSlides,
        carouselContainer: !!carouselContainer,
        carouselContent: !!carouselContent,
        carouselButtons: carouselButtons.length
    });
    
    // 綁定按鈕事件
    carouselButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 初始顯示第一張
    showSlide(0);
}

/**
 * 切換到指定幻燈片
 */
function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) {
        console.warn('無效的幻燈片索引:', slideIndex);
        return;
    }
    
    currentSlide = slideIndex;
    showSlide(currentSlide);
    updateButtons();
    
    // 在手機版下，自動滾動到文字區域的頂部
    scrollToTextTop();
    
    console.log('切換到幻燈片:', currentSlide);
}

/**
 * 顯示指定幻燈片
 */
function showSlide(slideIndex) {
    const messages = document.querySelectorAll('.message-content');
    const buttons = document.querySelectorAll('.carousel-btn');
    
    // 隱藏所有訊息
    messages.forEach(message => {
        message.classList.remove('active');
    });
    
    // 移除所有按鈕的 active 狀態
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 顯示指定訊息
    if (messages[slideIndex]) {
        messages[slideIndex].classList.add('active');
    }
    
    // 啟用指定按鈕
    if (buttons[slideIndex]) {
        buttons[slideIndex].classList.add('active');
    }
}

/**
 * 更新按鈕狀態
 */
function updateButtons() {
    carouselButtons.forEach((button, index) => {
        if (index === currentSlide) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * 下一張幻燈片
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    updateButtons();
    
    // 在手機版下，自動滾動到文字區域的頂部
    scrollToTextTop();
}

/**
 * 上一張幻燈片
 */
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    updateButtons();
    
    // 在手機版下，自動滾動到文字區域的頂部
    scrollToTextTop();
}

/**
 * 處理鍵盤事件
 */
function handleKeyboard(e) {
    if (!carouselContainer) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
    }
}

/**
 * 滾動到文字區域頂部
 */
function scrollToTextTop() {
    const teamTextElement = document.querySelector('.team-text');
    if (teamTextElement) {
        // 先強制滾動到文字容器頂部重置位置（所有斷點都適用）
        teamTextElement.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        
        // 檢查是否為手機版（螢幕寬度小於768px）
        if (window.innerWidth <= 768) {
            // 獲取元素位置
            const elementTop = teamTextElement.offsetTop;
            // 添加偏移量避免被header遮住（約5px的間距）
            const offset = 5;
            
            // 使用setTimeout確保重置完成後再滾動到目標位置
            setTimeout(() => {
                window.scrollTo({
                    top: elementTop - offset,
                    behavior: 'smooth'
                });
            }, 50);
        }
    }
}

// ===== EVENT LISTENERS =====

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化輪播功能');
    initCarousel();
});

// 綁定鍵盤事件
document.addEventListener('keydown', handleKeyboard);

// ===== EXPORT FOR MODULE SYSTEMS =====
// 如果使用模組系統，可以匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCarousel,
        goToSlide,
        nextSlide,
        prevSlide
    };
} 