---
layout: post
title: Photo Analysis
permalink: /photoanalysis/
---

<head>
  <title>Photo Upload - Predict Likes</title>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- AOS for animation -->
  <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>

  <style>
    body, h1, h2, h3, h4, h5, h6, p, span, div, table, th, td, button, input, strong {
      color: #000 !important;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f4f7fa;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 900px;
      margin: 50px auto;
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      text-align: center;
    }

    input[type="file"] {
      margin-top: 20px;
    }

    img#preview {
      display: none;
      margin-top: 15px;
      max-width: 100%;
      border-radius: 10px;
    }

    button {
      margin-top: 15px;
      padding: 10px 20px;
      background-color: #FFD100;
      color: #000;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
      margin-right: 10px;
    }

    button:hover {
      background-color: #e6c000;
    }

    .results {
      margin-top: 20px;
      font-size: 15px;
      transition: background-color 0.5s ease, border 0.3s ease;
    }

    #ratingExplanation {
      background-color: #FFD100;
      border: 2px solid #000;
      border-radius: 10px;
      padding: 12px 16px;
      margin-top: 20px;
      font-size: 14px;
      text-align: left;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
      font-size: 14px;
    }

    table th {
      background-color: #FFD100;
      border-bottom: 2px solid #ccc;
    }

    table td, table th {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    tr.past-row {
      background-color: #f0f0f0 !important;
    }

    tr.rating-Excellent {
      background-color: rgb(36, 211, 36) !important;
    }

    tr.rating-Good {
      background-color: rgb(170, 231, 112) !important;
    }

    tr.rating-Moderate {
      background-color: rgb(255, 229, 82) !important;
    }

    tr.rating-Poor {
      background-color: rgb(255, 82, 82) !important;
    }

    tr.highlight {
      font-weight: bold;
    }
  </style>
</head>


  <div class="container">
    <h2 data-aos="fade-down">Upload a Photo to Predict Likes</h2>

    <input type="file" accept="image/*" id="photoInput">
    <img id="preview" />

    <button id="predictButton">Predict</button>

    <div class="results" id="results" data-aos="fade-up"></div>

    <div style="margin-top: 20px;">
      <button onclick="clearPredictions()">Clear All</button>
      <button onclick="exportToCSV()">Export CSV</button>
    </div>

    <table id="predictionTable" data-aos="fade-up">
      <thead>
        <tr>
          <th>#</th>
          <th>Thumbnail</th>
          <th>Brightness (0–255)</th>
          <th>Saturation (0–1.00)</th>
          <th>Size (Megapixels)</th>
          <th>Predicted Likes</th>
          <th>Rating Score (%)***</th>
          <th>Rating</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody id="tableBody"></tbody>
    </table>

     <div id="ratingExplanation" data-aos="fade-up">
      <strong>***What does Rating Score mean?</strong><br>
      This score compares your photo’s predicted likes to the average in our dataset.<br>
      <strong>100%</strong> = average performance. Higher is better, lower means fewer expected likes. Based on Legoland California's previous posted photos on Instagram, the average number of likes was 1127 likes per post.
    </div>

  </div>

  <script>
    AOS.init();

    const preview = document.getElementById('preview');
    const input = document.getElementById('photoInput');
    const results = document.getElementById('results');
    const predictButton = document.getElementById('predictButton');
    const tableBody = document.getElementById('tableBody');

    let predictions = JSON.parse(localStorage.getItem('predictions')) || [];

    function updateTable() {
      tableBody.innerHTML = '';
      predictions.forEach((item, index) => {
        const row = document.createElement('tr');

        if (index === predictions.length - 1) {
          row.classList.add(`rating-${item.rating}`);
          row.classList.add('highlight');
        } else {
          row.classList.add('past-row');
        }

        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="${item.preview}" alt="thumb" style="height: 40px; border-radius: 4px;"></td>
          <td>${item.brightness.toFixed(2)}</td>
          <td>${item.saturation.toFixed(2)}</td>
          <td>${item.size.toFixed(2)}</td>
          <td>${Math.round(item.predicted_likes)}</td>
          <td>${item.rating_score?.toFixed(2) || ''}</td>
          <td>${item.rating}</td>
          <td>${item.timestamp || ''}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    updateTable();

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

    predictButton.addEventListener('click', predictLikes);

    async function predictLikes() {
      const file = input.files[0];
      if (!file) {
        alert('Please upload a photo first.');
        return;
      }

      predictButton.disabled = true;
      predictButton.textContent = 'Processing...';

      const reader = new FileReader();

      reader.onload = async function (e) {
        const imageDataUrl = e.target.result;
        const formData = new FormData();
        formData.append('image', file);

        try {
          const res = await fetch('http://localhost:8887/api/predict-likes', {
            method: 'POST',
            body: formData
          });

          if (!res.ok) throw new Error(`Server returned status ${res.status}`);
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid JSON response from server');
          }

          const data = await res.json();
          if (data.error) throw new Error(data.error);

          const ratingColors = {
            "Excellent": "rgb(36, 211, 36)",
            "Good": "rgb(170, 231, 112)",
            "Moderate": "rgb(255, 229, 82)",
            "Poor": "rgb(255, 82, 82)"
          };

          const ratingColor = ratingColors[data.rating_label] || "#ccc";

          results.style.backgroundColor = ratingColor;
          results.style.border = '2px solid #000';
          results.style.borderRadius = '10px';
          results.style.padding = '10px';
          results.innerHTML = `
            <strong>Predicted Likes:</strong> ${Math.round(data.predicted_likes)}<br>
            <strong>Rating Score:</strong> ${data.rating_score.toFixed(2)}%<br>
            <strong>Performance:</strong> <span style="font-weight:bold;">${data.rating_label}</span>
          `;

          const newEntry = {
            brightness: data.brightness,
            saturation: data.saturation,
            size: data.size,
            predicted_likes: data.predicted_likes,
            rating_score: data.rating_score,
            rating: data.rating_label,
            preview: imageDataUrl,
            timestamp: new Date().toLocaleString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })
          };

          predictions.push(newEntry);
          localStorage.setItem('predictions', JSON.stringify(predictions));
          updateTable();

        } catch (err) {
          console.error('Error:', err);
          results.style.backgroundColor = 'transparent';
          results.style.border = 'none';
          results.innerHTML = `<span style="color:red;">Unable to contact prediction server: ${err.message}</span>`;
        } finally {
          predictButton.disabled = false;
          predictButton.textContent = 'Predict';
        }
      };

      reader.readAsDataURL(file);
    }

    function clearPredictions() {
      if (confirm("Are you sure you want to clear all predictions?")) {
        localStorage.removeItem('predictions');
        predictions = [];
        updateTable();
        results.innerHTML = '';
        results.style.backgroundColor = 'transparent';
        results.style.border = 'none';
        preview.style.display = 'none';
        input.value = '';
      }
    }

    function exportToCSV() {
      if (predictions.length === 0) {
        alert("No predictions to export.");
        return;
      }

      const header = ['#', 'Brightness', 'Saturation', 'Size (MP)', 'Predicted Likes', 'Rating Score (%)', 'Rating', 'Timestamp'];
      const rows = predictions.map((p, index) => [
        index + 1,
        p.brightness.toFixed(2),
        p.saturation.toFixed(2),
        p.size.toFixed(2),
        Math.round(p.predicted_likes),
        p.rating_score?.toFixed(2) || '',
        p.rating,
        p.timestamp || ''
      ]);

      const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'photo_predictions.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  </script>


