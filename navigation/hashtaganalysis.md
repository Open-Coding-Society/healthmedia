---
layout: post
title: Hashtag Analysis
permalink: /hashtaganalysis/
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hashtag Engagement Analyzer</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    .container {
      width: 400px;
      margin: auto;
      text-align: center;
      border: 2px dashed #aaa;
      padding: 20px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
    }
    textarea {
      width: 90%;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      margin-top: 15px;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    #result {
      margin-top: 20px;
      font-size: 16px;
    }
    .metric {
      margin-top: 10px;
    }
    #barChart {
      margin-top: 30px;
      width: 100%;
      max-width: 380px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>Hashtag Engagement Analyzer</h2>
    <textarea id="hashtagInput" rows="4">#legoland #legolandcalifornia #buildthefun #familyadventure #themeparkfun #miniland #bricklife</textarea>
    <br />
    <button onclick="analyzeHashtags()">Analyze Hashtags</button>

    <div id="result">
      <div class="metric" id="likes">Average Likes: --</div>
      <div class="metric" id="views">Total Estimated Views: --</div>
      <div class="metric" id="score">Average Success Score: --</div>
      <canvas id="barChart"></canvas>
    </div>
  </div>

  <script>
    let chartInstance = null;

    async function analyzeHashtags() {
      const input = document.getElementById('hashtagInput').value;

      try {
        const res = await fetch('http://localhost:8887/api/hashtag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hashtags: input })
        });

        const data = await res.json();

        if (res.ok) {
          const avgLikes = data.average_likes;
          const estViews = data.total_estimated_views;
          const score = data.average_hashtag_success_score;

          document.getElementById('likes').textContent = `Average Likes: ${avgLikes.toLocaleString()}`;
          document.getElementById('views').textContent = `Total Estimated Views: ${estViews.toLocaleString()}`;
          document.getElementById('score').textContent = `Average Success Score: ${score} / 10`;

          // Draw or update chart
          const ctx = document.getElementById('barChart').getContext('2d');
          if (chartInstance) chartInstance.destroy();

          chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Avg Likes', 'Est. Views', 'Success Score'],
              datasets: [{
                label: 'Hashtag Performance',
                data: [avgLikes, estViews, score],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                  }
                }
              }
            }
          });
        } else {
          document.getElementById('likes').textContent = 'Error: ' + (data.error || 'Invalid input');
          document.getElementById('views').textContent = '';
          document.getElementById('score').textContent = '';
          if (chartInstance) chartInstance.destroy();
        }
      } catch (err) {
        document.getElementById('likes').textContent = 'Error analyzing hashtags.';
        document.getElementById('views').textContent = '';
        document.getElementById('score').textContent = '';
        console.error('Fetch error:', err);
        if (chartInstance) chartInstance.destroy();
      }
    }
  </script>
</body>
</html>