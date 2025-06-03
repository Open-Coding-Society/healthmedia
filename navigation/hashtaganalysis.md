---
layout: post
title: Hashtag Analysis
permalink: /hashtaganalysis/
---

<html lang="en">

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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

    .gauge {
      position: relative;
      width: 200px;
      height: 100px;
      margin: 30px auto 10px;
    }
    .gauge svg {
      width: 100%;
      height: 100%;
    }
    .gauge-text {
      font-size: 20px;
      font-weight: bold;
      position: absolute;
      top: 55px;
      left: 50%;
      transform: translateX(-50%);
    }
  </style>



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

    <div class="gauge">
      <svg viewBox="0 0 100 50">
        <path id="gauge-arc" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eee" stroke-width="10"/>
        <path id="gauge-fill" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#00cc66" stroke-width="10" stroke-dasharray="0 251" />
      </svg>
      <div class="gauge-text" id="gaugeLabel">-- / 10</div>
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
          const avgLikes = data.average_likes;
          const estViews = data.total_estimated_views;
          const score = data.average_hashtag_success_score;

          document.getElementById('likes').textContent = `Average Likes: ${avgLikes.toLocaleString()}`;
          document.getElementById('views').textContent = `Total Estimated Views: ${estViews.toLocaleString()}`;
          document.getElementById('score').textContent = `Average Success Score: ${score} / 10`;

          // Update gauge
          const gauge = document.getElementById('gauge-fill');
          const dash = (score / 10) * 251;
          gauge.setAttribute('stroke-dasharray', `${dash} 251`);

          // Optional: change color based on score
          let color = "#ff4d4d"; // red
          if (score >= 7) color = "#00cc66"; // green
          else if (score >= 4) color = "#ffcc00"; // yellow
          gauge.setAttribute('stroke', color);

          document.getElementById('gaugeLabel').textContent = `${score} / 10`;

        } else {
          document.getElementById('likes').textContent = 'Error: ' + (data.error || 'Invalid input');
          document.getElementById('views').textContent = '';
          document.getElementById('score').textContent = '';
          document.getElementById('gauge-fill').setAttribute('stroke-dasharray', `0 251`);
          document.getElementById('gaugeLabel').textContent = '-- / 10';
        }
      } catch (err) {
        console.error('Fetch error:', err);
        document.getElementById('likes').textContent = 'Error analyzing hashtags.';
        document.getElementById('views').textContent = '';
        document.getElementById('score').textContent = '';
        document.getElementById('gauge-fill').setAttribute('stroke-dasharray', `0 251`);
        document.getElementById('gaugeLabel').textContent = '-- / 10';
      }
    }
  </script>

</html>