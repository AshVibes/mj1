// Questions page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupQuestionsPage();
});

function setupQuestionsPage() {
    setupAddQuestionButton();
    setupAddQuestionForm();
    setupSearchAndFilter();
    setupQuestionActions();
}

function setupAddQuestionButton() {
    const addBtn = document.getElementById('addQuestionBtn');
    const modal = document.getElementById('addQuestionModal');
    const cancelBtn = document.getElementById('cancelQuestionBtn');

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
}

function setupAddQuestionForm() {
    const form = document.getElementById('addQuestionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(form)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const formData = new FormData(form);
            const data = {
                questionText: formData.get('questionText'),
                category: formData.get('category'),
                difficulty: formData.get('difficulty'),
                tags: formData.get('tags'),
                expectedAnswer: formData.get('expectedAnswer')
            };

            console.log('Adding question:', data);
            showNotification('Question added successfully!', 'success');
            
            form.reset();
            document.getElementById('addQuestionModal').classList.remove('active');
        });
    }
}

function setupSearchAndFilter() {
    const searchInput = document.querySelector('.search-input');
    const categoryFilter = document.querySelectorAll('.filter-select')[0];
    const difficultyFilter = document.querySelectorAll('.filter-select')[1];

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterQuestions();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterQuestions();
        });
    }

    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', function() {
            filterQuestions();
        });
    }
}

function filterQuestions() {
    const searchTerm = document.querySelector('.search-input')?.value.toLowerCase() || '';
    const categoryFilter = document.querySelectorAll('.filter-select')[0]?.value || '';
    const difficultyFilter = document.querySelectorAll('.filter-select')[1]?.value || '';
    const cards = document.querySelectorAll('.question-card');

    cards.forEach(card => {
        const title = card.querySelector('.question-header h3')?.textContent.toLowerCase() || '';
        const categoryBadge = card.querySelector('.badge.category')?.textContent.toLowerCase() || '';
        const difficultyBadge = card.querySelector('.badge.difficulty')?.textContent.toLowerCase() || '';
        
        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = !categoryFilter || categoryBadge.includes(categoryFilter);
        const matchesDifficulty = !difficultyFilter || difficultyBadge.includes(difficultyFilter);

        if (matchesSearch && matchesCategory && matchesDifficulty) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupQuestionActions() {
    const cards = document.querySelectorAll('.question-card');
    
    cards.forEach(card => {
        const buttons = card.querySelectorAll('.question-footer button');
        const questionTitle = card.querySelector('.question-header h3')?.textContent || 'Question';

        if (buttons[0]) {
            buttons[0].addEventListener('click', function() {
                showNotification(`Viewing: ${questionTitle}`, 'info');
            });
        }

        if (buttons[1]) {
            buttons[1].addEventListener('click', function() {
                showNotification(`Editing: ${questionTitle}`, 'info');
            });
        }

        if (buttons[2]) {
            buttons[2].addEventListener('click', function() {
                if (confirm(`Delete this question?\n\n"${questionTitle}"`)) {
                    card.style.display = 'none';
                    showNotification('Question deleted successfully!', 'success');
                }
            });
        }
    });
}
