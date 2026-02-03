// Browser Storage Utilities
// Simple localStorage management with a button to clear data

// Save data to browser storage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return { success: true, message: 'Data saved to browser storage.' };
    } catch (e) {
        console.error('Error saving to storage:', e);
        return { success: false, message: 'Failed to save data.' };
    }
}

// Load data from browser storage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from storage:', e);
        return null;
    }
}

// Clear all browser storage
function clearAllStorage() {
    if (confirm('Are you sure you want to clear all browser storage? This cannot be undone.')) {
        localStorage.clear();
        alert('All browser storage has been cleared.');
        location.reload();
    }
}

// Save quiz score to browser storage
function saveQuizScore(quizName, score) {
    const scores = loadFromStorage('quizScores') || {};
    scores[quizName] = {
        score: score,
        completedAt: new Date().toISOString()
    };
    saveToStorage('quizScores', scores);
    return { success: true, message: 'Score saved to browser storage!' };
}

// Get user progress from browser storage
function getUserProgress() {
    return loadFromStorage('quizScores') || {};
}

// Create and display clear storage button in navbar
function initStorageUI() {
    const authContainer = document.getElementById('auth-status');
    if (authContainer) {
        authContainer.innerHTML = `
            <button onclick="clearAllStorage()" style="background-color: #f08e80; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#e67d6f';" onmouseout="this.style.backgroundColor='#f08e80';">Clear Storage</button>
        `;
    }
}

// Initialize storage UI on page load
document.addEventListener('DOMContentLoaded', () => {
    initStorageUI();
});
