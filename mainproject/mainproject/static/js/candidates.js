// Candidates page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupCandidatesPage();
});

function setupCandidatesPage() {
    setupAddCandidateButton();
    setupAddCandidateForm();
    setupSearchAndFilter();
    setupTableActions();
}

function setupAddCandidateButton() {
    const addBtn = document.getElementById('addCandidateBtn');
    const modal = document.getElementById('addCandidateModal');
    const cancelBtn = document.getElementById('cancelCandidateBtn');

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

function setupAddCandidateForm() {
    const form = document.getElementById('addCandidateForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(form)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const formData = new FormData(form);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                positionApplied: formData.get('positionApplied'),
                resume: formData.get('resume'),
                notes: formData.get('notes')
            };

            console.log('Adding candidate:', data);
            showNotification('Candidate added successfully!', 'success');
            
            form.reset();
            document.getElementById('addCandidateModal').classList.remove('active');
        });
    }
}

function setupSearchAndFilter() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterCandidates();
        });
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterCandidates();
        });
    }
}

function filterCandidates() {
    const searchTerm = document.querySelector('.search-input')?.value.toLowerCase() || '';
    const statusFilter = document.querySelector('.filter-select')?.value || '';
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const name = row.cells[0]?.textContent.toLowerCase() || '';
        const statusCell = row.cells[5]?.textContent.toLowerCase() || '';
        
        const matchesSearch = name.includes(searchTerm);
        const matchesStatus = !statusFilter || statusCell.includes(statusFilter);

        if (matchesSearch && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function setupTableActions() {
    const viewButtons = document.querySelectorAll('tbody tr button:nth-child(1)');
    const editButtons = document.querySelectorAll('tbody tr button:nth-child(2)');
    const deleteButtons = document.querySelectorAll('tbody tr button:nth-child(3)');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const candidateName = this.closest('tr').cells[0].textContent;
            showNotification(`Viewing details for ${candidateName}`, 'info');
        });
    });

    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const candidateName = this.closest('tr').cells[0].textContent;
            showNotification(`Editing ${candidateName}`, 'info');
        });
    });

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const candidateName = this.closest('tr').cells[0].textContent;
            if (confirm(`Are you sure you want to delete ${candidateName}?`)) {
                showNotification(`${candidateName} deleted successfully`, 'success');
            }
        });
    });
}
