---
layout: post
title: Sentiment Analysis 
permalink: sentiment/analysis/
---

# Instagram Sentiment Analysis

<div class="sentiment-container">
    <h1>Instagram Comments Sentiment Analysis</h1>
    
    <div class="input-section">
        <h2>Upload CSV File</h2>
        <div class="input-group">
            <label for="csv-file">Upload CSV file containing comments: This can be obtained at the website https://easycomment.ai/en/export-instagram-comments. Enter the instagram post shortcode Example: Instagram.com/p/DKSeWbvy9rU, DKSeWbvy9rU would be the shortcode..</label>
            <input type="file" id="csv-file" accept=".csv" />
            <small>CSV format: Name,ProfileUrl,ProfileId,Avatar,Comment,Likes,Date</small>
        </div>
        <button id="analyze-csv">Analyze Comments</button>
        <div id="loading">Loading... Analyzing comments sentiment...</div>
    </div>

    <div id="results" style="display: none;">
        <h2>Sentiment Analysis Results</h2>
        
        <div class="sentiment-summary">
            <h3>Overall Summary</h3>
            <p>Total comments analyzed: <span id="total-comments"></span></p>
            <p>Average polarity: <span id="average-polarity"></span></p>
            <p>Average subjectivity: <span id="average-subjectivity"></span></p>
            <div class="sentiment-breakdown">
                <p>Positive comments: <span id="positive-count"></span> (<span id="positive-percent"></span>%)</p>
                <p>Neutral comments: <span id="neutral-count"></span> (<span id="neutral-percent"></span>%)</p>
                <p>Negative comments: <span id="negative-count"></span> (<span id="negative-percent"></span>%)</p>
            </div>
            <div class="chart-container">
                <canvas id="sentimentChart"></canvas>
            </div>
        </div>

        <div class="comments-section">
            <h3>Individual Comment Analysis</h3>
            <div class="filter-section">
                <label for="sentiment-filter">Filter by sentiment:</label>
                <select id="sentiment-filter">
                    <option value="all">All Comments</option>
                    <option value="positive">Positive Only</option>
                    <option value="neutral">Neutral Only</option>
                    <option value="negative">Negative Only</option>
                </select>
                <label for="sort-by">Sort by:</label>
                <select id="sort-by">
                    <option value="polarity-desc">Most Positive First</option>
                    <option value="polarity-asc">Most Negative First</option>
                    <option value="likes-desc">Most Liked First</option>
                    <option value="date-desc">Most Recent First</option>
                </select>
            </div>
            <div id="comments-container">
                <!-- Individual comment results will be inserted here -->
            </div>
        </div>
    </div>
</div>

<style>
/* Scoped styles for the sentiment analysis tool */
.sentiment-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
}

.sentiment-container h1,
.sentiment-container h2,
.sentiment-container h3,
.sentiment-container h4,
.sentiment-container p,
.sentiment-container span,
.sentiment-container div {
    color: #000;
}

.sentiment-container .input-section {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.sentiment-container .input-group {
    margin-bottom: 15px;
}

.sentiment-container label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #000;
}

.sentiment-container input[type="file"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    color: #000;
}

.sentiment-container select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #000;
    margin-right: 10px;
}

.sentiment-container small {
    color: #666;
    font-style: italic;
}

.sentiment-container button {
    background-color: #4267B2;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.sentiment-container button:hover {
    background-color: #365899;
}

.sentiment-container button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.sentiment-container #loading {
    display: none;
    text-align: center;
    margin: 20px 0;
    color: #000;
    font-style: italic;
}

.sentiment-container .sentiment-summary {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.sentiment-container .sentiment-breakdown {
    margin: 15px 0;
}

.sentiment-container .chart-container {
    margin-top: 20px;
    height: 300px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
}

.sentiment-container .comments-section {
    margin-top: 30px;
}

.sentiment-container .filter-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
}

.sentiment-container .comment-item {
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #fff;
}

.sentiment-container .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
}

.sentiment-container .comment-author {
    font-weight: bold;
    color: #4267B2;
}

.sentiment-container .comment-stats {
    display: flex;
    gap: 10px;
    align-items: center;
}

.sentiment-container .comment-text {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.4;
}

.sentiment-container .comment-sentiment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

.sentiment-container .sentiment-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 11px;
}

.sentiment-container .positive {
    background-color: rgba(76, 175, 80, 0.2);
    color: #2e7d32;
}

.sentiment-container .neutral {
    background-color: rgba(255, 235, 59, 0.2);
    color: #f9a825;
}

.sentiment-container .negative {
    background-color: rgba(244, 67, 54, 0.2);
    color: #c62828;
}

.sentiment-container .sentiment-scores {
    font-family: monospace;
    color: #666;
    font-size: 11px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
    .sentiment-container .filter-section {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .sentiment-container .comment-sentiment {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
    
    .sentiment-container .chart-container {
        height: 250px;
    }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Define pythonURI locally
    const pythonURI = (location.hostname === "localhost" || location.hostname === "127.0.0.1") 
        ? "http://localhost:8891" 
        : "https://healthmedia.opencodingsociety.com";

    const fileInput = document.getElementById('csv-file');
    const analyzeButton = document.getElementById('analyze-csv');
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const commentsContainer = document.getElementById('comments-container');
    const sentimentFilter = document.getElementById('sentiment-filter');
    const sortBy = document.getElementById('sort-by');
    
    let analysisResults = [];
    let sentimentChart = null;
    
    const API_BASE_URL = pythonURI;
    
    // Test API connection
    async function testAPIConnection() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`);
            if (!response.ok) {
                console.error('API Health Check Failed:', response.status);
                return false;
            }
            const data = await response.json();
            console.log('API Connection OK:', data);
            return true;
        } catch (error) {
            console.error('API Connection Error:', error);
            return false;
        }
    }

    analyzeButton.addEventListener('click', async function() {
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a CSV file first');
            return;
        }
        
        if (!file.name.toLowerCase().endsWith('.csv')) {
            alert('Please select a valid CSV file');
            return;
        }
        
        // Test API connection first
        const apiConnected = await testAPIConnection();
        if (!apiConnected) {
            alert('Cannot connect to the backend API. Please make sure your backend server is running and the API_BASE_URL is correct.');
            return;
        }
        
        loadingDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        analyzeButton.disabled = true;
        
        try {
            // Create FormData to send file
            const formData = new FormData();
            formData.append('file', file);
            
            console.log('Sending file to:', `${API_BASE_URL}/api/sentiment/upload`);
            
            // Send file to backend API
            const response = await fetch(`${API_BASE_URL}/api/sentiment/upload`, {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header - let browser set it for FormData
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                const responseText = await response.text();
                console.error('Error response:', responseText);
                
                // Try to parse as JSON, fallback to text
                let errorMessage;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || 'Server error occurred';
                } catch {
                    errorMessage = `Server returned HTML instead of JSON. Check if your backend is running correctly. Status: ${response.status}`;
                }
                throw new Error(errorMessage);
            }
            
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                throw new Error('Server returned invalid JSON. Please check if your backend is running correctly.');
            }
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Store results for filtering and sorting
            analysisResults = data;
            
            // Display results
            displayResults();
            
        } catch (error) {
            console.error('Full error:', error);
            alert('Error: ' + error.message);
        } finally {
            loadingDiv.style.display = 'none';
            analyzeButton.disabled = false;
        }
    });
    
    function displayResults() {
        const summary = analysisResults.summary;
        const comments = analysisResults.comments;
        
        // Update summary display
        document.getElementById('total-comments').textContent = summary.total_comments;
        document.getElementById('average-polarity').textContent = summary.average_polarity;
        document.getElementById('average-subjectivity').textContent = summary.average_subjectivity;
        document.getElementById('positive-count').textContent = summary.sentiment_counts.positive;
        document.getElementById('positive-percent').textContent = summary.sentiment_percentages.positive;
        document.getElementById('neutral-count').textContent = summary.sentiment_counts.neutral;
        document.getElementById('neutral-percent').textContent = summary.sentiment_percentages.neutral;
        document.getElementById('negative-count').textContent = summary.sentiment_counts.negative;
        document.getElementById('negative-percent').textContent = summary.sentiment_percentages.negative;
        
        // Create chart
        createSentimentChart(summary.sentiment_counts);
        
        // Display individual comments
        displayComments();
        
        // Show results
        resultsDiv.style.display = 'block';
    }
    
    function createSentimentChart(counts) {
        const ctx = document.getElementById('sentimentChart').getContext('2d');
        
        if (sentimentChart) {
            sentimentChart.destroy();
        }
        
        sentimentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [counts.positive, counts.neutral, counts.negative],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(255, 235, 59, 0.7)',
                        'rgba(244, 67, 54, 0.7)'
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(255, 235, 59, 1)',
                        'rgba(244, 67, 54, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Sentiment Distribution'
                    }
                }
            }
        });
    }
    
    function displayComments(filterType = 'all', sortType = 'polarity-desc') {
        let filteredResults = filterType === 'all' ? 
            [...analysisResults.comments] : 
            analysisResults.comments.filter(item => item.category === filterType);
        
        // Sort results
        filteredResults.sort((a, b) => {
            switch(sortType) {
                case 'polarity-desc':
                    return b.polarity - a.polarity;
                case 'polarity-asc':
                    return a.polarity - b.polarity;
                case 'likes-desc':
                    return (b.likes || 0) - (a.likes || 0);
                case 'date-desc':
                    return new Date(b.date || 0) - new Date(a.date || 0);
                default:
                    return 0;
            }
        });
        
        commentsContainer.innerHTML = '';
        
        filteredResults.forEach(item => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            
            const headerHtml = `
                <div class="comment-header">
                    <span class="comment-author">${item.name || 'Anonymous'}</span>
                    <div class="comment-stats">
                        ${item.likes ? `<span>❤️ ${item.likes}</span>` : ''}
                        ${item.date ? `<span>${item.date}</span>` : ''}
                    </div>
                </div>
            `;
            
            commentDiv.innerHTML = `
                ${headerHtml}
                <div class="comment-text">"${item.comment}"</div>
                <div class="comment-sentiment">
                    <span class="sentiment-badge ${item.category}">
                        ${item.category.toUpperCase()}
                    </span>
                    <span class="sentiment-scores">
                        Polarity: ${item.polarity} | Subjectivity: ${item.subjectivity}
                    </span>
                </div>
            `;
            
            commentsContainer.appendChild(commentDiv);
        });
        
        if (filteredResults.length === 0) {
            commentsContainer.innerHTML = '<p>No comments match the selected filter.</p>';
        }
    }
    
    // Filter and sort functionality
    sentimentFilter.addEventListener('change', function() {
        displayComments(this.value, sortBy.value);
    });
    
    sortBy.addEventListener('change', function() {
        displayComments(sentimentFilter.value, this.value);
    });
});
</script>