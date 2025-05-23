---
layout: post
title: Frequency Engagement Measurer 
permalink: /frequencyM/
---


<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title> Weekly Upload Engagement Checker</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(to bottom right, #f0f8ff, #e6f7ff);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      margin: 0;
    }
    .card {
      max-width: 500px;
      width: 100%;
      padding: 2rem;
      border-radius: 16px;
      background: white;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #004080;
    }
    label, input, button {
      width: 100%;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    input {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    button {
      background-color: #0074d9;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 0.75rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background-color: #005bb5;
    }
    #result {
      font-size: 1.1rem;
      font-weight: 600;
      padding: 0.5rem;
      border-radius: 8px;
    }
    .engagement-meter {
      margin-top: 1rem;
      height: 20px;
      background: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
    }
    .meter-bar {
      height: 100%;
      transition: width 0.5s ease;
    }
    .feedback-box {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
    }
    .shake {
      animation: shake 0.4s;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      50% { transform: translateX(4px); }
      75% { transform: translateX(-2px); }
    }
    .tips-section {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #eef6ff;
      font-weight: 500;
      color:rgb(0, 0, 0);
    }
    .challenge-box {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #d1e7dd;
      color: #0f5132;
      font-weight: 600;
      text-align: center;
    }
    .tip-list {
      padding-left: 1.2rem;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <h1>📊 Weekly Upload Engagement Checker</h1>

  <div class="card">
    <label for="postsPerDay">How many times do you upload in a weekly?</label>
    <input type="number" id="postsPerDay" min="0" placeholder="Enter a number" />

  <label for="goalPosts">Set your target posts per weekly (goal):</label>
    <input type="number" id="goalPosts" min="0" placeholder="Enter your goal" />

  <button id="checkBtn" type="button">Check Engagement</button>
    <div id="result"></div>

  <div class="engagement-meter">
      <div class="meter-bar" id="meterBar" style="width: 0%; background: #ccc;"></div>
    </div>

   <div class="feedback-box" id="feedbackBox"></div>

   <div class="tips-section" id="tipsSection" style="display:none;"></div>

  <div style="margin-top:1rem;">
      <label>Want tips on how to improve engagement?</label><br/>
      <button id="btnYes" type="button" style="width:48%; margin-right:4%;">Yes</button>
      <button id="btnNo" type="button" style="width:48%;">No</button>
    </div>

  <div class="challenge-box" id="challengeBox" style="display:none;"></div>
  </div>

  <script>
    let csvData = {};

    async function loadCSV() {
      const response = await fetch("engagement_data.csv");
      const text = await response.text();
      const rows = text.trim().split('\n').slice(1);
      for (const row of rows) {
        const [timestamp, posts, engagement] = row.split(',');
        csvData[parseInt(posts)] = engagement;
      }
    }

    function getFeedback(postsPerDay) {
      return csvData[postsPerDay] || "⚠️ No data available for this number.";
    }

    function getBarColor(postsPerDay) {
      if (postsPerDay <= 0) return "#999";
      if (postsPerDay <= 2) return "#f0ad4e";
      if (postsPerDay <= 5) return "#28a745";
      if (postsPerDay <= 8) return "#20c997";
      return "#dc3545";
    }

    function getBarWidth(postsPerDay) {
      if (postsPerDay <= 0) return "0%";
      if (postsPerDay <= 2) return "35%";
      if (postsPerDay <= 5) return "65%";
      if (postsPerDay <= 8) return "85%";
      return "100%";
    }

    function getTips(postsPerDay) {
      if (postsPerDay <= 0) {
        return [
          "Try to post at least once a day to keep your audience engaged.",
          "Use a content calendar to plan posts ahead.",
          "Engage with your followers through comments and stories."
        ];
      } else if (postsPerDay <= 3) {
        return [
          "Consistency is key—try to post around the same times each day.",
          "Use hashtags relevant to your content to reach more people.",
          "Mix up content types: images, videos, and stories."
        ];
      } else if (postsPerDay <= 8) {
        return [
          "Great job posting frequently! Make sure your content quality remains high.",
          "Analyze your best-performing posts to replicate success.",
          "Engage with followers by replying to comments and DMs."
        ];
      } else {
        return [
          "Be careful not to overwhelm your audience with too many posts.",
          "Focus on quality over quantity—fewer, better posts work best.",
          "Use analytics tools to track which posts perform well."
        ];
      }
    }

    function displayTips(tips) {
      const tipsSection = document.getElementById("tipsSection");
      tipsSection.innerHTML = "<strong>Tips to improve engagement:</strong><ul class='tip-list'>" + tips.map(t => `<li>${t}</li>`).join("") + "</ul>";
      tipsSection.style.display = "block";
    }

    function hideTips() {
      const tipsSection = document.getElementById("tipsSection");
      tipsSection.style.display = "none";
    }

    function displayChallenge(goal, current) {
      const challengeBox = document.getElementById("challengeBox");
      if (current >= goal && goal > 0) {
        challengeBox.textContent = "🎉 Awesome! You met or exceeded your posting goal. Try posting consistently every day this week for even better growth!";
        challengeBox.style.display = "block";
      } else {
        challengeBox.style.display = "none";
      }
    }

    document.addEventListener("DOMContentLoaded", async () => {
      await loadCSV();

      const checkBtn = document.getElementById("checkBtn");
      const result = document.getElementById("result");
      const meterBar = document.getElementById("meterBar");
      const feedbackBox = document.getElementById("feedbackBox");
      const input = document.getElementById("postsPerDay");
      const goalInput = document.getElementById("goalPosts");
      const tipsSection = document.getElementById("tipsSection");
      const challengeBox = document.getElementById("challengeBox");

      const btnYes = document.getElementById("btnYes");
      const btnNo = document.getElementById("btnNo");

      checkBtn.addEventListener("click", () => {
        const val = parseInt(input.value, 10);
        const goalVal = parseInt(goalInput.value, 10);

        if (isNaN(val) || val < 0) {
          result.textContent = "⚠️ Please enter a valid positive number.";
          result.classList.add("shake");
          setTimeout(() => result.classList.remove("shake"), 400);
          meterBar.style.width = "0%";
          meterBar.style.background = "#ccc";
          feedbackBox.textContent = "";
          feedbackBox.style.background = "transparent";
          hideTips();
          challengeBox.style.display = "none";
          return;
        }

        const feedback = getFeedback(val);
        const color = getBarColor(val);
        const width = getBarWidth(val);

        result.textContent = `Engagement Score: ${val * 10}`;
        result.style.color = color;

        meterBar.style.width = width;
        meterBar.style.background = color;

        feedbackBox.textContent = feedback;
        feedbackBox.style.background = color + "20";
        feedbackBox.style.color = "#000";

        hideTips(); // Hide tips when new check happens
        displayChallenge(goalVal, val);
      });

      btnYes.addEventListener("click", () => {
        const val = parseInt(input.value, 10);
        if (isNaN(val) || val < 0) {
          alert("Please enter a valid positive number of posts per day first.");
          return;
        }
        const tips = getTips(val);
        displayTips(tips);
      });

      btnNo.addEventListener("click", () => {
        hideTips();
      });
    });
  </script>
</body>
</html>

