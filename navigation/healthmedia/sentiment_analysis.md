---
layout: post
title: Sentiment Analysis 
permalink: sentiment/analysis/
---



### 📊 Instagram Sentiment Dashboard

<div id="sentiment-container">
  Loading sentiment scores...
</div>

<script>
async function fetchSentiment() {
  const sentimentContainer = document.getElementById("sentiment-container");
  sentimentContainer.innerHTML = 'Loading sentiment scores...';

  try {
    const response = await fetch("http://127.0.0.1:5001/api/sentiment");
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log("Sentiment API response:", data);

    const keys = Object.keys(data).slice(0, 3); // Get latest 3
    sentimentContainer.innerHTML = '';

    keys.forEach((shortcode, index) => {
      const score = data[shortcode];
      const sentimentText = getSentimentDescription(score);

      const div = document.createElement("div");
      div.innerHTML = `<strong>Post ${index + 1}</strong> (${shortcode}): ${sentimentText}`;
      sentimentContainer.appendChild(div);
    });

  } catch (err) {
    console.error("Error fetching sentiment data:", err);
    sentimentContainer.innerText = "⚠️ Failed to load sentiment scores.";
  }
}

function getSentimentDescription(score) {
  if (typeof score !== "number") return "Unknown";

  if (score > 0.6) return `Very Positive 😊 (${score.toFixed(2)})`;
  if (score > 0.3) return `Positive 🙂 (${score.toFixed(2)})`;
  if (score > 0.1) return `Neutral 😐 (${score.toFixed(2)})`;
  if (score > 0) return `Negative 🙁 (${score.toFixed(2)})`;
  return `Very Negative 😠 (${score.toFixed(2)})`;
}

fetchSentiment();
</script>
