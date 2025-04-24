---
layout: page
title: Photo Analysis
permalink: /photoanalysis/
---

#### Upload a photo you would like to post, and receive a prediction of how many likes it will get (media performance)!

<head>
  <title>Photo Upload with Likes</title>
  <style>
    .container {
      width: 300px;
      margin: auto;
      text-align: center;
      border: 2px dashed #aaa;
      padding: 20px;
      border-radius: 10px;
    }
    img {
      max-width: 100%;
      margin-top: 10px;
      display: none;
    }
    button {
      margin-top: 10px;
      padding: 8px 12px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>Upload a Photo</h2>
    <input type="file" accept="image/*" id="photoInput" />
    <img id="preview" />
    <div>
      <button onclick="likePhoto()">Like</button>
      <p>Likes: <span id="likeCounter">Loading...</span></p>
    </div>
  </div>

  <script>
    const likeCounter = document.getElementById('likeCounter');
    const preview = document.getElementById('preview');
    const input = document.getElementById('photoInput');

    // Load like count from backend
    async function fetchLikes() {
      try {
        const res = await fetch('/api/likes');
        const data = await res.json();
        likeCounter.textContent = data.likes;
      } catch (err) {
        likeCounter.textContent = 'Error';
        console.error('Failed to fetch likes:', err);
      }
    }

    // Send like to backend
    async function likePhoto() {
      try {
        const res = await fetch('/api/like', { method: 'POST' });
        const data = await res.json();
        likeCounter.textContent = data.likes;
      } catch (err) {
        console.error('Failed to like photo:', err);
      }
    }

    // Preview uploaded photo
    input.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    // Initial fetch
    fetchLikes();
  </script>
</body>