---
layout: page
title: Photo Analysis
permalink: /photoanalysis/
---

#### Upload a photo you would like to post, and receive a prediction of how many likes it will get (media performance)!

<head>
  <title>Photo Upload - Predict Likes</title>
  <style>
    .container {
      width: 350px;
      margin: 50px auto;
      text-align: center;
      border: 2px dashed #aaa;
      padding: 20px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
    }
    img {
      max-width: 100%;
      margin-top: 10px;
      display: none;
      border-radius: 6px;
    }
    button {
      margin-top: 15px;
      padding: 10px 15px;
      font-weight: bold;
      cursor: pointer;
    }
    .results {
      margin-top: 15px;
      font-size: 14px;
      color: #333;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>Upload a Photo to Predict Likes</h2>
    <input type="file" accept="image/*" id="photoInput" />
    <img id="preview" />
    <button onclick="predictLikes()">Predict</button>
    <div class="results" id="results"></div>
  </div>

  <script>
    const preview = document.getElementById('preview');
    const input = document.getElementById('photoInput');
    const results = document.getElementById('results');

    // Preview uploaded photo
    input.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = 'block';
          results.textContent = '';
        };
        reader.readAsDataURL(file);
      }
    });

    // Send photo to backend and display predicted likes
    async function predictLikes() {
      const file = input.files[0];
      if (!file) {
        alert('Please upload a photo first.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('http://localhost:5001/api/predict-likes', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (data.error) {
          results.innerHTML = `<span style="color:red;">Error: ${data.error}</span>`;
          return;
        }

        results.innerHTML = `
          <strong>Predicted Likes:</strong> ${data.predicted_likes.toFixed(2)}<br>
