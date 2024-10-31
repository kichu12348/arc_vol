const endpoint = '/users';

async function getUsers() {
    try {
        const res = await fetch(endpoint);
        const users = await res.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        
        if (users.length === 0) {
            userList.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>No users found. Add your first user!</p>
                </div>
            `;
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <button onclick="deleteUser('${user._id}')" class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="user-info">
                    <div class="user-avatar">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="user-details">
                        <h3>${user.name}</h3>
                        <p>${user.email}</p>
                        <div class="user-meta">
                            <span>Age: ${user.age || 'N/A'}</span>
                            <span>City: ${user.city || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `;
            userList.appendChild(userCard);
        });
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
}

async function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value;

    try {
        await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age, city })
        });

        clearForm();
        getUsers();
        toggleForm(); // Hide form after successful submission
    } catch (error) {
        console.error('Failed to add user:', error);
    }
}

async function deleteUser(id) {
    try {
        await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
        getUsers();
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('city').value = '';
}

function toggleForm() {
    const userForm = document.getElementById('user-form');
    userForm.classList.toggle('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    const addUserToggle = document.getElementById('add-user-toggle');
    const form = document.querySelector('form');

    addUserToggle.addEventListener('click', toggleForm);
    form.addEventListener('submit', addUser);
    getUsers();
});