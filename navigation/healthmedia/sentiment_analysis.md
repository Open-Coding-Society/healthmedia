---
layout: post
title: Sentiment Analysis 
permalink: sentiment/analysis/
---

# Instagram Sentiment Analysis

<div class="sentiment-container">
    <h1>Instagram Comments Sentiment Analysis</h1>
    
    <div class="input-section">
        <h2>Analyze by Username</h2>
        <div class="input-group">
            <label for="username">Instagram Username:</label>
            <input type="text" id="username" placeholder="Enter Instagram username (without @)">
        </div>
        <button id="analyze-username">Analyze Last 3 Posts</button>
        <div id="loading">Loading... This may take a moment to fetch and analyze the comments.</div>
    </div>

    <div id="results" style="display: none;">
        <h2>Results for <span id="result-username"></span></h2>
        
        <div id="posts-container">
            <!-- Posts will be inserted here dynamically -->
        </div>

        <div class="sentiment-summary">
            <h3>Overall Sentiment Summary</h3>
            <p>Average sentiment across all posts: <span id="average-sentiment"></span></p>
            <p>Total comments analyzed: <span id="total-comments"></span></p>
            <div class="chart-container">
                <canvas id="sentimentChart"></canvas>
            </div>
        </div>
    </div>
</div>

<style>
/* Scoped styles for the sentiment analysis tool - only affects elements inside .sentiment-container */
.sentiment-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #000;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
}

/* Scope all typography styles to only affect elements inside the container */
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

.sentiment-container .sentiment-box {
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    font-weight: bold;
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

.sentiment-container .input-group {
    margin-bottom: 15px;
}

.sentiment-container label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #000;
}

.sentiment-container input,
.sentiment-container select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    color: #000;
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

.sentiment-container .sentiment-result {
    margin-top: 20px;
    color: #000;
}

.sentiment-container .post-container {
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #000;
}

.sentiment-container .post-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    color: #000;
}

.sentiment-container .sentiment-summary {
    margin-top: 30px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #eee;
    color: #000;
}

.sentiment-container #loading {
    display: none;
    text-align: center;
    margin: 20px 0;
    color: #000;
    font-style: italic;
}

.sentiment-container .chart-container {
    margin-top: 20px;
    height: 300px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #eee;
}

.sentiment-container a {
    color: #4267B2;
    text-decoration: none;
}

.sentiment-container a:hover {
    text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 600px) {
    .sentiment-container .post-header {
        flex-direction: column;
    }
    
    .sentiment-container .chart-container {
        height: 250px;
    }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyze-username');
    const usernameInput = document.getElementById('username');
    const resultsDiv = document.getElementById('results');
    const resultUsername = document.getElementById('result-username');
    const postsContainer = document.getElementById('posts-container');
    const averageSentiment = document.getElementById('average-sentiment');
    const totalComments = document.getElementById('total-comments');
    const loadingDiv = document.getElementById('loading');
    
    let sentimentChart = null;
    
    // Change this to your deployed backend URL when you have one
    const BACKEND_URL = 'https://your-backend-url.com';

    analyzeButton.addEventListener('click', async function() {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('Please enter a valid Instagram username');
            return;
        }
        
        // Show loading indicator
        loadingDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        postsContainer.innerHTML = '';
        
        try {
            // For GitHub Pages demo, we'll use mock data initially
            // In production, replace this with your actual API call
            // const response = await fetch(`${BACKEND_URL}/api/analyze-user-posts?username=${username}`);
            
            // DEMO DATA - Replace with actual API call when backend is deployed
            const data = getMockData(username);
            
            // Hide loading indicator
            loadingDiv.style.display = 'none';
            
            if (data.error) {
                alert(data.error);
                return;
            }
            
            // Show results
            resultUsername.textContent = username;
            resultsDiv.style.display = 'block';
            
            // Process and display each post
            let allSentiments = [];
            let totalCommentCount = 0;
            
            data.posts.forEach((post, index) => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post-container';
                
                // Create post header
                const postHeader = document.createElement('div');
                postHeader.className = 'post-header';
                postHeader.innerHTML = `
                    <h3>Post #${index + 1}</h3>
                    <span>Date: ${new Date(post.timestamp * 1000).toLocaleDateString()}</span>
                `;
                
                // Create sentiment info
                const sentimentInfo = document.createElement('div');
                sentimentInfo.className = 'sentiment-result';
                
                let sentimentClass = '';
                if (post.average_sentiment > 0.05) sentimentClass = 'positive';
                else if (post.average_sentiment < -0.05) sentimentClass = 'negative';
                else sentimentClass = 'neutral';
                
                sentimentInfo.innerHTML = `
                    <p>Analyzed ${post.comments.length} comments</p>
                    <p>Post URL: <a href="${post.post_url}" target="_blank">${post.post_url}</a></p>
                    <div class="sentiment-box ${sentimentClass}">
                        Average Sentiment: ${post.average_sentiment.toFixed(2)}
                        (${sentimentClass.charAt(0).toUpperCase() + sentimentClass.slice(1)})
                    </div>
                `;
                
                // Add comments summary
                const commentsSummary = document.createElement('div');
                commentsSummary.innerHTML = `
                    <h4>Comments Breakdown:</h4>
                    <p>Positive comments: ${post.sentiment_counts.positive}</p>
                    <p>Neutral comments: ${post.sentiment_counts.neutral}</p>
                    <p>Negative comments: ${post.sentiment_counts.negative}</p>
                `;
                
                // Combine all elements
                postDiv.appendChild(postHeader);
                postDiv.appendChild(sentimentInfo);
                postDiv.appendChild(commentsSummary);
                postsContainer.appendChild(postDiv);
                
                // Collect data for overall summary
                allSentiments.push(post.average_sentiment);
                totalCommentCount += post.comments.length;
                
                // Store sentiment data for each comment
                post.comments.forEach(comment => {
                    allSentiments.push(comment.sentiment);
                });
            });
            
            // Calculate and display overall average
            const overallAverage = allSentiments.reduce((acc, val) => acc + val, 0) / allSentiments.length;
            let overallSentimentText = '';
            
            if (overallAverage > 0.05) overallSentimentText = 'Positive';
            else if (overallAverage < -0.05) overallSentimentText = 'Negative';
            else overallSentimentText = 'Neutral';
            
            averageSentiment.textContent = `${overallAverage.toFixed(2)} (${overallSentimentText})`;
            totalComments.textContent = totalCommentCount;
            
            // Create chart
            createSentimentChart(data.posts);
            
        } catch (error) {
            loadingDiv.style.display = 'none';
            alert('Error: ' + error.message);
        }
    });
    
    function createSentimentChart(posts) {
        const ctx = document.getElementById('sentimentChart').getContext('2d');
        
        // Destroy previous chart if it exists
        if (sentimentChart) {
            sentimentChart.destroy();
        }
        
        // Prepare data for chart
        const labels = posts.map((_, index) => `Post ${index + 1}`);
        const sentimentData = posts.map(post => post.average_sentiment);
        const positiveData = posts.map(post => post.sentiment_counts.positive);
        const neutralData = posts.map(post => post.sentiment_counts.neutral);
        const negativeData = posts.map(post => post.sentiment_counts.negative);
        
        // Create new chart
        sentimentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Average Sentiment',
                        data: sentimentData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        type: 'line',
                        yAxisID: 'y1'
                    },
                    {
                        label: 'Positive Comments',
                        data: positiveData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Neutral Comments',
                        data: neutralData,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Negative Comments',
                        data: negativeData,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Comments'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: false,
                        min: -1,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Sentiment Score'
                        }
                    }
                }
            }
        });
    }
    
    // Function to generate mock data for demo purposes
    // Remove this when connecting to a real backend
    function getMockData(username) {
        const now = Math.floor(Date.now() / 1000);
        
        // For demo purposes, generating random data
        function generateMockComments(count) {
            const mockComments = [];
            const sampleTexts = [
                "This is amazing! Love your content!",
                "Not sure about this one...",
                "Absolutely fantastic post",
                "Could be better honestly",
                "Just ok",
                "This changed my perspective!",
                "Meh, seen better",
                "You always deliver quality content!",
                "Disappointing content",
                "Can't believe how good this is"
            ];
            
            for (let i = 0; i < count; i++) {
                const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
                let sentiment;
                
                // Assign sentiment based on text content
                if (text.includes("amazing") || text.includes("fantastic") || 
                    text.includes("Love") || text.includes("quality") || 
                    text.includes("good") || text.includes("changed my perspective")) {
                    sentiment = Math.random() * 0.5 + 0.3; // Random from 0.3 to 0.8
                } else if (text.includes("better") || text.includes("Meh") || 
                           text.includes("Disappointing") || text.includes("Not sure")) {
                    sentiment = Math.random() * -0.6 - 0.1; // Random from -0.1 to -0.7
                } else {
                    sentiment = Math.random() * 0.2 - 0.1; // Random from -0.1 to 0.1
                }
                
                mockComments.push({
                    text: text,
                    username: "user" + Math.floor(Math.random() * 1000),
                    timestamp: now - (i * 3600),
                    sentiment: sentiment,
                    category: sentiment > 0.05 ? "positive" : 
                              sentiment < -0.05 ? "negative" : "neutral"
                });
            }
            
            return mockComments;
        }
        
        // Generate 3 mock posts with random comments
        const posts = [];
        for (let i = 0; i < 3; i++) {
            const commentsCount = Math.floor(Math.random() * 10) + 5; // 5-15 comments
            const comments = generateMockComments(commentsCount);
            
            // Calculate sentiment counts
            const sentimentCounts = {
                positive: comments.filter(c => c.category === "positive").length,
                neutral: comments.filter(c => c.category === "neutral").length,
                negative: comments.filter(c => c.category === "negative").length
            };
            
            // Calculate average sentiment
            const avgSentiment = comments.reduce((sum, c) => sum + c.sentiment, 0) / comments.length;
            
            posts.push({
                shortcode: `fake_shortcode_${username}_${i}`,
                post_url: `https://www.instagram.com/p/fake_${username}_${i}/`,
                timestamp: now - ((i + 1) * 86400), // 1 day apart
                comments: comments,
                average_sentiment: avgSentiment,
                sentiment_counts: sentimentCounts
            });
        }
        
        return { posts };
    }
});
</script>