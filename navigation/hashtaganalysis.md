<head>
  <title>Hashtag View Predictor</title>
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
    <h2>Hashtag View Predictor</h2>
    <textarea id="hashtagInput" rows="4">#legoland #legolandcalifornia #buildthefun #familyadventure #themeparkfun #miniland #bricklife</textarea>
    <br />
    <button onclick="analyzeHashtags()">Predict Views</button>
    <div id="result">Predicted Views: --</div>
  </div>

  <script>
    async function analyzeHashtags() {
      const input = document.getElementById('hashtagInput').value;

      try {
        const res = await fetch('/api/hashtag-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hashtags: input })
        });

        const data = await res.json();
        document.getElementById('result').textContent = `Predicted Views: ${data.views.toLocaleString()}`;
      } catch (err) {
        document.getElementById('result').textContent = 'Error predicting views.';
        console.error('Failed to fetch prediction:', err);
      }
    }
  </script>
</body>
