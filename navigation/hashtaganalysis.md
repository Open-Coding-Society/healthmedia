---
layout: post
title: Hashtag Analysis
permalink: /hashtaganalysis/
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hashtag Likes Predictor</title>
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
      font-size: 18px;
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>Hashtag Likes Predictor</h2>
    <textarea id="hashtagInput" rows="4">#legoland #legolandcalifornia #buildthefun #familyadventure #themeparkfun #miniland #bricklife</textarea>
    <br />
    <button onclick="analyzeHashtags()">Predict Likes</button>
    <div id="result">Predicted Likes: --</div>
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
      document.getElementById('result').textContent = `Predicted Likes: ${data.views.toLocaleString()}`;
    } catch (err) {
      document.getElementById('result').textContent = 'Error predicting likes.';
      console.error('Failed to fetch prediction:', err);
    }
  }
</script>
</body>
</html>
