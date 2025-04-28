---
layout: post
title: Sentiment Analysis 
permalink: sentiment/analysis/
---

### 📊 Instagram Sentiment Dashboard

<style>
  #sentiment-container {
    font-family: 'Segoe UI', sans-serif;
    padding: 1rem;
    color: black; /* Ensure all text is black */
  }

  .sentiment-box {
    background: linear-gradient(135deg, #a8e6cf, #a0cfe7);
    border-radius: 12px;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: black; /* Ensure text inside box is black */
  }

  .sentiment-box strong {
    font-size: 1.2rem;
    color: black;
  }

  .shortcode {
    font-family: monospace;
    background-color: #f2f2f2;
    padding: 0.2rem 0.4rem;
    border-radius: 5px;
    color: black;
  }

  .emoji {
    font-size: 1.3rem;
  }

  .score, .interpretation, .description {
    margin: 0.4rem 0;
    color: black;
  }
</style>

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
      const { label, emoji, message } = getSentimentDetails(score);

      const box = document.createElement("div");
      box.className = "sentiment-box";

      box.innerHTML = `
        <div><strong>📸 Post ${index + 1}</strong></div>
        <div class="score"><strong>Shortcode:</strong> <span class="shortcode">${shortcode}</span></div>
        <div class="score"><strong>Sentiment Score:</strong> ${score.toFixed(3)}</div>
        <div class="interpretation"><strong>Interpretation:</strong> ${label} <span class="emoji">${emoji}</span></div>
        <div class="description">${message}</div>
      `;
      sentimentContainer.appendChild(box);
    });

  } catch (err) {
    console.error("Error fetching sentiment data:", err);
    sentimentContainer.innerText = "⚠️ Failed to load sentiment scores.";
  }
}

function getSentimentDetails(score) {
  if (typeof score !== "number") return { label: "Unknown", emoji: "❓", message: "No data available." };

  if (score > 0.6) return {
    label: "Very Positive", emoji: "🥰",
    message: "This post was received extremely well with lots of enthusiasm and positivity!"
  };
  if (score > 0.3) return {
    label: "Positive", emoji: "🙂",
    message: "The post received generally positive feedback with some enthusiastic reactions."
  };
  if (score > 0.1) return {
    label: "Neutral", emoji: "😐",
    message: "This post is seen neutrally. Not much strong emotion either way."
  };
  if (score > 0) return {
    label: "Negative", emoji: "🙁",
    message: "This post triggered some slightly negative reactions, but nothing too harsh."
  };
  return {
    label: "Very Negative", emoji: "😠",
    message: "The response to this post was largely negative with notable disapproval."
  };
}

fetchSentiment();
</script>
