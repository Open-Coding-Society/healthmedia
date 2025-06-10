---
layout: post
title: Video Length & Engagement Analysis
permalink: /lengths
menu: nav/home.html
search_exclude: true
---

<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap" rel="stylesheet">

<style>
  body {
    background: #f9fcfb;
    font-family: 'Quicksand', sans-serif;
    color: #004d40;
    padding: 2rem 1rem;
  }

  .container {
    max-width: 700px;
    margin: auto;
    background: #e0f2f1;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 150, 136, 0.2);
    padding: 2rem;
  }

  h1 {
    color: #00796b;
    text-align: center;
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  label {
    font-weight: 600;
  }

  input[type="number"] {
    padding: 0.6rem;
    border: 2px solid #80cbc4;
    border-radius: 12px;
    font-size: 1rem;
    color: black !important;
  }

  button {
    background: #26a69a;
    color: white;
    border: none;
    padding: 0.7rem;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background: #009688;
  }

  #results {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    color: black !important;
  }

  #results h2 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #004d40;
  }

  .metric {
    margin-bottom: 0.4rem;
  }

  canvas {
    margin-top: 2rem;
    max-width: 100%;
  }

  /* FORCE ALL TEXT INSIDE #RESULTS TO BE BLACK */
  #results, #results * {
    color: black !important;
  }
</style>

<div class="container">
  <h1>📊 Predict Video Engagement</h1>

  <form id="predictForm" aria-label="Video length input form">
    <label for="video_length">Enter video length (seconds):</label>
    <input 
      type="number" 
      id="video_length" 
      min="1" max="3600" 
      placeholder="e.g. 60" 
      required 
      aria-required="true"
    >
    <button type="submit" aria-label="Analyze video engagement">Analyze</button>
  </form>

  <div id="results" style="display:none;" aria-live="polite" aria-atomic="true">
    <!-- Results and charts will appear here -->
  </div>
</div>

<!-- Load Chart.js from CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script type="module">
  // Define pythonURI locally
  const pythonURI = (location.hostname === "localhost" || location.hostname === "127.0.0.1") 
      ? "http://localhost:8891" 
      : "https://healthmedia.opencodingsociety.com";

  const API_URL = `${pythonURI}/api/lengths/predict`;
  const form = document.getElementById("predictForm");
  const resultsDiv = document.getElementById("results");
  let engagementChart, sentimentChart;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const lengthInput = document.getElementById("video_length");
    const length = lengthInput.value.trim();

    if (!length || length < 1 || length > 3600) {
      resultsDiv.style.display = "block";
      resultsDiv.innerHTML = `<p style="color:red;">❌ Please enter a valid video length between 1 and 3600 seconds.</p>`;
      return;
    }

    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(`${API_URL}?video_length_seconds=${length}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Build HTML results summary!
      const summaryHTML = `
        <h2>Engagement Overview</h2>
        <p class="metric"><strong>Closest Match:</strong> ${data.closest_match} sec</p>
        <p class="metric"><strong>Engagement Quality:</strong> ${data.engagement_quality}</p>
        <p class="metric"><strong>Views:</strong> ${data.views.toLocaleString()}</p>
        <p class="metric"><strong>Likes:</strong> ${data.likes.toLocaleString()}</p>
        <p class="metric"><strong>Comments:</strong> ${data.comments.toLocaleString()}</p>
        <p class="metric"><strong>Watch Time:</strong> ${data.watch_time_seconds} sec</p>

        <h2>Audience Metrics</h2>
        <p class="metric"><strong>Retention:</strong> ${data.avg_retention_percent}%</p>
        <p class="metric"><strong>Drop-off Rate:</strong> ${data.drop_off_rate}%</p>

        <h2>Performance</h2>
        <p class="metric"><strong>Click-Through Rate (CTR):</strong> ${data.click_through_rate_percent}%</p>
        <p class="metric"><strong>Weekly Views Increase:</strong> ${data.avg_weekly_views_increase}</p>
        <p class="metric"><strong>Share Rate:</strong> ${data.share_rate_percent}%</p>

        <h2>Metadata</h2>
        <p class="metric"><strong>Tags:</strong> ${data.tags || "N/A"}</p>
        <p class="metric"><strong>Category:</strong> ${data.category || "N/A"}</p>
        <p class="metric"><strong>Thumbnail CTR:</strong> ${data.thumbnail_click_rate_percent}%</p>
        <p class="metric"><strong>Contains Hook:</strong> ${data.contains_hook ? "Yes" : "No"}</p>
      `;

      // Sentiment HTML summary
      const sentimentHTML = `
        <h2>Sentiment Summary</h2>
        <canvas id="sentimentChart" aria-label="Sentiment distribution chart" role="img"></canvas>
      `;

      // Engagement metrics chart
      const engagementHTML = `
        <h2>Engagement Metrics Chart</h2>
        <canvas id="engagementChart" aria-label="Engagement metrics chart" role="img"></canvas>
      `;

      resultsDiv.innerHTML = summaryHTML + sentimentHTML + engagementHTML;

      // Setup Sentiment Pie Chart
      const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
      if (sentimentChart) sentimentChart.destroy();
      sentimentChart = new Chart(sentimentCtx, {
        type: 'pie',
        data: {
          labels: ['Positive 👍', 'Neutral 😐', 'Negative 👎'],
          datasets: [{
            data: [
              data.sentiment.positive || 0,
              data.sentiment.neutral || 0,
              data.sentiment.negative || 0
            ],
            backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
            title: {
              display: false,
              text: 'Sentiment Distribution'
            }
          }
        }
      });

      // Setup Engagement Bar Chart
      const engagementCtx = document.getElementById('engagementChart').getContext('2d');
      if (engagementChart) engagementChart.destroy();
      engagementChart = new Chart(engagementCtx, {
        type: 'bar',
        data: {
          labels: ['Views', 'Likes', 'Comments', 'Watch Time (sec)', 'Retention %', 'Drop-off %', 'CTR %', 'Share Rate %'],
          datasets: [{
            label: 'Metrics',
            data: [
              data.views,
              data.likes,
              data.comments,
              data.watch_time_seconds,
              data.avg_retention_percent,
              data.drop_off_rate,
              data.click_through_rate_percent,
              data.share_rate_percent
            ],
            backgroundColor: '#26a69a'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Format big numbers nicely
                callback: function(value) {
                  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                  return value;
                }
              }
            }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: false,
            }
          }
        }
      });

    } catch (error) {
      resultsDiv.innerHTML = `<p style="color:red;">❌ Error: ${error.message}</p>`;
      console.error(error);
    }
  });
</script>