---
layout: post
title: Hashtag Analysis
permalink: /hashtaganalysis/
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hashtag Engagement Analyzer</title>
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
    input, textarea {
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
    }
    #result {
      margin-top: 20px;
      font-size: 16px;
    }
    .metric {
      margin-top: 10px;
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
    </div>
  </div>

  <script>
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
          document.getElementById('likes').textContent = `Average Likes: ${data.average_likes.toLocaleString()}`;
          document.getElementById('views').textContent = `Total Estimated Views: ${data.total_estimated_views.toLocaleString()}`;
          document.getElementById('score').textContent = `Average Success Score: ${data.average_hashtag_success_score} / 10`;
        } else {
          document.getElementById('likes').textContent = 'Error: ' + (data.error || 'Invalid input');
          document.getElementById('views').textContent = '';
          document.getElementById('score').textContent = '';
          console.error('API response error:', data);
        }
      } catch (err) {
        document.getElementById('likes').textContent = 'Error analyzing hashtags.';
        document.getElementById('views').textContent = '';
        document.getElementById('score').textContent = '';
        console.error('Fetch error:', err);
      }
    }
  </script>
</body>
</html>