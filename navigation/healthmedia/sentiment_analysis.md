---
layout: post
title: Sentiment Analysis 
permalink: sentiment/analysis/
---

<style>
  body {
    color: black !important;
    background-color: white;
  }

  #sentiment-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Arial, sans-serif;
    margin-top: 20px;
  }

  .sentiment-box {
    background-color: #f0f0f0;
    border-left: 6px solid #333;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  }

  .sentiment-box strong {
    font-size: 1.1em;
  }

  .score, .interpretation {
    margin-top: 5px;
  }

  .emoji {
    font-size: 1.2em;
    margin-left: 5px;
  }

  .description {
    font-size: 0.95em;
    margin-top: 10px;
    color: #333;
  }
</style>

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
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    console.log("Sentiment API response:", data);

    const keys = Object.keys(data).slice(0, 3); // Most recent 3
    sentimentContainer.innerHTML = '';

    keys.forEach((shortcode, index) => {
      const score = data[shortcode];
      const details = getSentimentDetails(score);

      const div = document.createElement("div");
      div.className = "sentiment-box";
      div.innerHTML = `
        <strong>📸 Post ${index + 1}</strong> (shortcode: <code>${shortcode}</code>)
        <div class="score"><strong>Sentiment Score:</strong> ${score.toFixed(3)}</div>
        <div class="interpretation"><strong>Interpretation:</strong> ${details.label} <span class="emoji">${details.emoji}</span></div>
        <div class="description">${details.message}</div>
      `;
      sentimentContainer.appendChild(div);
    });

    // 🔮 Add prediction block
    if (keys.length >= 3) {
      const s1 = data[keys[0]];
      const s2 = data[keys[1]];
      const s3 = data[keys[2]];

      const predictedScore = 0.5 * s1 + 0.3 * s2 + 0.2 * s3;
      const predictionDetails = getSentimentDetails(predictedScore);

      const predictionBox = document.createElement("div");
      predictionBox.className = "sentiment-box";
      predictionBox.style.background = "#ffeaa7";

      predictionBox.innerHTML = `
        <strong>🔮 Predicted Next Post Sentiment</strong>
        <div class="score"><strong>Estimated Sentiment Score:</strong> ${predictedScore.toFixed(3)}</div>
        <div class="interpretation"><strong>Interpretation:</strong> ${predictionDetails.label} <span class="emoji">${predictionDetails.emoji}</span></div>
        <div class="description">${predictionDetails.message}</div>
      `;
      sentimentContainer.appendChild(predictionBox);
    }

  } catch (err) {
    console.error("Error fetching sentiment data:", err);
    sentimentContainer.innerHTML = "<div class='sentiment-box' style='background: #ffcccc;'>⚠️ Failed to load sentiment scores.</div>";
  }
}

function getSentimentDetails(score) {
  if (typeof score !== "number") return { label: "Unknown", emoji: "❓", message: "No data available for analysis." };

  if (score > 0.6) return {
    label: "Very Positive",
    emoji: "😊",
    message: "Your content is resonating deeply with your audience. Comments likely include praise, excitement, and emotional positivity. Consider doubling down on the tone, format, or topic of this post — you're on the right track!"
  };
  if (score > 0.3) return {
    label: "Positive",
    emoji: "🙂",
    message: "Followers are generally pleased. The post may include compliments, light enthusiasm, or agreement. You may want to explore deeper engagement next time — perhaps through storytelling, call-to-action, or questions."
  };
  if (score > 0.1) return {
    label: "Neutral",
    emoji: "😐",
    message: "Audience response is flat or mixed. You might see comments with limited emotional language — neither praise nor critique. This is a sign to experiment more boldly, change the topic, or inject more personality into the post."
  };
  if (score > 0) return {
    label: "Negative",
    emoji: "🙁",
    message: "This post sparked a slightly negative tone. Maybe users questioned the message, disagreed, or felt disconnected. Review your wording or context — was something unclear or too controversial?"
  };
  return {
    label: "Very Negative",
    emoji: "😠",
    message: "There’s likely backlash, criticism, or emotional resistance in the comments. Consider reevaluating how the post could be interpreted — was it sarcastic, polarizing, or misaligned with your audience’s values?"
  };
}

fetchSentiment();
</script>
