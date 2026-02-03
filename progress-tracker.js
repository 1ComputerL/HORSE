// Progress tracking utilities
// Saves quiz scores using browser storage

// Add score for a quiz
function addQuizScore(quizName, score) {
    return saveQuizScore(quizName, score);
}

// Get all scores
function getAllScores() {
    const scores = loadFromStorage('quizScores') || {};
    return scores;
}

// Get statistics
function getStatistics() {
    const scores = loadFromStorage('quizScores') || {};

    const quizzes = ['quiz-1-general', 'quiz-2-breeds', 'quiz-3-history', 'quiz-4-behavior', 'quiz-5-anatomy', 'quiz-6-famous-horses', 'quiz-7-care-training', 'quiz-8-sports', 'quiz-9-nutrition', 'quiz-10-reproduction', 'quiz-11-wild-horses'];

    const completedQuizzes = [];
    const incompletedQuizzes = [];
    
    quizzes.forEach(quiz => {
        if (scores[quiz]) {
            completedQuizzes.push({
                name: quiz,
                score: scores[quiz].score,
                completedAt: scores[quiz].completedAt
            });
        } else {
            incompletedQuizzes.push(quiz);
        }
    });

    const totalScore = completedQuizzes.reduce((sum, q) => sum + q.score, 0);
    const averageScore = completedQuizzes.length > 0 ? Math.round(totalScore / completedQuizzes.length * 100) / 100 : 0;

    return {
        totalCompleted: completedQuizzes.length,
        totalIncomplete: incompletedQuizzes.length,
        averageScore: averageScore,
        completedQuizzes: completedQuizzes,
        incompletedQuizzes: incompletedQuizzes,
        completionPercentage: Math.round((completedQuizzes.length / quizzes.length) * 100)
    };
}

// Format score for display
function formatScore(score) {
    return `${Math.round(score * 10)}/10`;
}

// Get quiz name from ID
function getQuizNameFromId(id) {
    const names = {
        'quiz-1-general': 'General Horse Facts',
        'quiz-2-breeds': 'Horse Breeds',
        'quiz-3-history': 'Horse History & Legends',
        'quiz-4-behavior': 'Behavior & Communication',
        'quiz-5-anatomy': 'Anatomy & Physiology',
        'quiz-6-famous-horses': 'Famous Horses',
        'quiz-7-care-training': 'Horse Care & Training',
        'quiz-8-sports': 'Equestrian Sports',
        'quiz-9-nutrition': 'Nutrition & Diet',
        'quiz-10-reproduction': 'Reproduction & Life Cycle',
        'quiz-11-wild-horses': 'Wild Horses & Conservation'
    };
    return names[id] || id;
}
