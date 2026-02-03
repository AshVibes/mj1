// Interviews page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupInterviewsPage();
});

function setupInterviewsPage() {
    setupNewInterviewButton();
    setupNewInterviewForm();
    setupSearchAndFilter();
}

function setupNewInterviewButton() {
    const newInterviewBtn = document.getElementById('newInterviewBtn');
    const modal = document.getElementById('newInterviewModal');
    const cancelBtn = document.getElementById('cancelBtn');

    if (newInterviewBtn) {
        newInterviewBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
}

function setupNewInterviewForm() {
    const form = document.getElementById('newInterviewForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(form)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const formData = new FormData(form);
            const data = {
                candidateName: formData.get('candidateName'),
                position: formData.get('position'),
                interviewDate: formData.get('interviewDate'),
                questionSet: formData.get('questionSet')
            };

            console.log('Creating interview:', data);
            showNotification('Interview created successfully!', 'success');
            
            // Reset form and close modal
            form.reset();
            document.getElementById('newInterviewModal').classList.remove('active');
        });
    }
}

function setupSearchAndFilter() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterInterviews();
        });
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterInterviews();
        });
    }
}

function filterInterviews() {
    const searchTerm = document.querySelector('.search-input')?.value.toLowerCase() || '';
    const statusFilter = document.querySelector('.filter-select')?.value || '';
    const cards = document.querySelectorAll('.interview-card');

    cards.forEach(card => {
        const name = card.querySelector('.card-header h3')?.textContent.toLowerCase() || '';
        const status = card.querySelector('.status-badge')?.textContent.toLowerCase() || '';
        
        const matchesSearch = name.includes(searchTerm);
        const matchesStatus = !statusFilter || status.includes(statusFilter);

        if (matchesSearch && matchesStatus) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}
