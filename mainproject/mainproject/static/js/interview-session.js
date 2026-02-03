// Interview Session specific JavaScript

let currentQuestion = 1;
let totalQuestions = 5;
let timerInterval = null;
let ratings = {};

document.addEventListener('DOMContentLoaded', function() {
    setupInterviewSession();
});

function setupInterviewSession() {
    setupQuestionNavigation();
    setupRatingSystem();
    setupNavigationButtons();
    setupEndInterviewButton();
    startSessionTimer();
    setupQuestionPanel();
}

function setupQuestionNavigation() {
    const questionItems = document.querySelectorAll('.question-item');
    
    questionItems.forEach(item => {
        item.addEventListener('click', function() {
            const questionNum = this.getAttribute('data-question');
            navigateToQuestion(questionNum);
        });
    });
}

function navigateToQuestion(questionNum) {
    currentQuestion = parseInt(questionNum);
    
    // Update active state in question list
    document.querySelectorAll('.question-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-question="${currentQuestion}"]`).classList.add('active');
    
    // Update display
    updateQuestionDisplay();
    updateNavigationButtons();
}

function updateQuestionDisplay() {
    const questions = [
        'Explain the difference between var, let, and const in JavaScript',
        'How do you optimize React component performance?',
        'What is the difference between async/await and promises?',
        'Describe a challenging project you worked on',
        'What are your career goals for the next 5 years?'
    ];

    if (currentQuestion <= questions.length) {
        document.getElementById('currentQuestion').textContent = questions[currentQuestion - 1];
    }

    // Clear previous response if moving to new question
    if (!ratings[currentQuestion]) {
        document.getElementById('responseNotes').value = '';
    }

    updateStats();
}

function updateStats() {
    document.querySelector('.interview-stats p:nth-child(2)').textContent = 
        `<strong>Current:</strong> Question ${currentQuestion} of ${totalQuestions}`;
}

function setupRatingSystem() {
    const ratingBtns = document.querySelectorAll('.rating-btn');
    
    ratingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            ratingBtns.forEach(b => b.classList.remove('selected'));
            // Add selection to clicked button
            this.classList.add('selected');
            // Store rating
            ratings[currentQuestion] = this.getAttribute('data-rating');
        });
    });
}

function setupNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 1) {
                navigateToQuestion(currentQuestion - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion < totalQuestions) {
                navigateToQuestion(currentQuestion + 1);
            } else {
                showNotification('You have reached the last question', 'info');
            }
        });
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 1;
        prevBtn.style.opacity = currentQuestion === 1 ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.textContent = currentQuestion === totalQuestions ? 
            'Review Responses' : 
            'Next <i class="fas fa-chevron-right"></i>';
    }
}

function setupEndInterviewButton() {
    const endBtn = document.getElementById('endBtn');
    const modal = document.getElementById('endInterviewModal');
    const confirmBtn = document.getElementById('confirmEndBtn');
    const cancelBtn = document.getElementById('cancelEndBtn');

    if (endBtn) {
        endBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const finalNotes = document.getElementById('finalNotes').value;
            const selectedStars = document.querySelectorAll('.rating-stars i.selected').length;
            
            console.log('Interview ended with:');
            console.log('- Rating:', selectedStars);
            console.log('- Notes:', finalNotes);
            console.log('- Question ratings:', ratings);
            
            showNotification('Interview saved successfully!', 'success');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = '/interviews/';
            }, 1500);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
}

function startSessionTimer() {
    let seconds = 0;
    const timerDisplay = document.getElementById('timer');

    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function setupQuestionPanel() {
    // Setup star rating for end interview
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
}

// Cleanup timer on page unload
window.addEventListener('beforeunload', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});
