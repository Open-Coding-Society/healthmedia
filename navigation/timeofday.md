---
layout: post
title: Social Media Engagement Analyzer
permalink: /timeofday/
---

<head>
  <title>Social Media Engagement Analyzer</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(to bottom right, #f0f8ff, #e6f7ff);
      margin: 0;
      padding: 2rem;
      color: #333;
    }

    .main-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .main-header h1 {
      font-size: 2.5rem;
      color: #004080;
      margin-bottom: 0.5rem;
    }

    .main-header p {
      font-size: 1.1rem;
      color: #666;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .section {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .section h2 {
      font-size: 1.8rem;
      color: #004080;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    /* Time of Day Analysis Styles */
    .time-container {
      background: #bbbbbb99;
      padding: 15px;
      border-radius: 25px;
      margin-bottom: 2rem;
    }

    .time-input {
      border-radius: 25px;
      padding: 8px 12px;
      border: 1px solid #ccc;
      width: 100%;
      font-size: 1rem;
    }

    #estimateContainer {
      margin-top: 10px;
      padding: 10px;
      background: #f0f8ff;
      border-radius: 10px;
    }

    .top-times {
      margin: 1.5rem 0;
    }

    .top-times ul {
      list-style: none;
      padding: 0;
    }

    .top-times li {
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 12px;
      font-weight: 500;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    table th, table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    /* Frequency Checker Styles */
    .frequency-section label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .frequency-section input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .frequency-section button {
      width: 100%;
      background-color: #0074d9;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 0.75rem;
      cursor: pointer;
      transition: background 0.3s;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .frequency-section button:hover {
      background-color: #005bb5;
    }

    #result {
      font-size: 1.1rem;
      font-weight: 600;
      padding: 0.75rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 1rem;
    }

    .engagement-meter {
      height: 20px;
      background: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .meter-bar {
      height: 100%;
      transition: width 0.5s ease;
    }

    .feedback-box {
      padding: 1rem;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 1rem;
    }

    .tips-section {
      padding: 1rem;
      border-radius: 8px;
      background: rgb(9, 135, 78);
      font-weight: 500;
      color: rgb(238, 230, 230);
      margin-bottom: 1rem;
    }

    .challenge-box {
      padding: 1rem;
      border-radius: 8px;
      background: #d1e7dd;
      color: #0f5132;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1rem;
    }

    .tip-list {
      padding-left: 1.2rem;
      margin-top: 0.5rem;
    }

    .button-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .button-row button {
      flex: 1;
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

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .main-header h1 {
        font-size: 2rem;
      }
      
      body {
        padding: 1rem;
      }
    }
  </style>
</head>

<body>
  <div class="main-header">
    <h1>📊 Social Media Engagement Analyzer</h1>
    <p>Optimize your posting strategy with time analysis and frequency tracking</p>
  </div>

  <div class="container">
    <!-- Time of Day Analysis Section -->
    <div class="section">
      <h2>⏰ Posting Time Analysis</h2>
      
      <!-- Time Input UI -->
      <div class="time-container">
        <label for="timeInput"><strong>Select Time of Day:</strong></label><br><br>
        <input type="time" id="timeInput" name="timeInput" class="time-input">
        <div id="estimateContainer" style="display:none;">
          <p><strong>Estimated Likes/Views:</strong> <span id="estimateOutput">...</span></p>
        </div>
      </div>

      <div class="top-times">
        <h3>🏆 Top 3 Times to Upload</h3>
        <div id="topTimesContainer"></div>
      </div>

      <h3>📈 Hourly Average Likes</h3>
      <table id="averagesTable">
        <thead>
          <tr>
            <th>Hour</th>
            <th>Average Likes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Data will be inserted here -->
        </tbody>
      </table>

      <h3>📋 All Posts by Time of Day</h3>
      <table id="postsTable">
        <thead>
          <tr>
            <th>Time Posted</th>
            <th>Likes</th>
            <th>Post URL</th>
          </tr>
        </thead>
        <tbody>
          <!-- Data gets inserted here -->
        </tbody>
      </table>
    </div>

    <!-- Weekly Upload Frequency Section -->
    <div class="section frequency-section">
      <h2>📊 Weekly Upload Frequency Checker</h2>

      <label for="postsPerWeek">How many times do you upload weekly?</label>
      <input type="number" id="postsPerWeek" min="0" placeholder="Enter a number" />

      <label for="goalPosts">Set your target posts per week (goal):</label>
      <input type="number" id="goalPosts" min="0" placeholder="Enter your goal" />

      <button id="checkBtn" type="button">Check Engagement</button>
      
      <div id="result"></div>

      <div class="engagement-meter">
        <div class="meter-bar" id="meterBar" style="width: 0%; background: #ccc;"></div>
      </div>

      <div class="feedback-box" id="feedbackBox"></div>

      <div class="tips-section" id="tipsSection" style="display:none;"></div>

      <div>
        <label>Want tips on how to improve engagement?</label>
        <div class="button-row">
          <button id="btnYes" type="button">Yes</button>
          <button id="btnNo" type="button">No</button>
        </div>
      </div>

      <div class="challenge-box" id="challengeBox" style="display:none;"></div>
    </div>
  </div>

  <script type="module">
    // Time of Day Analysis Logic
    let hourlyAverages = {};

    // Fetch hourly averages once and store them
    fetch('http://127.0.0.1:8887/api/optimaltime')
      .then(response => response.json())
      .then(data => {
        hourlyAverages = data.hourly_averages;

        const tableBody = document.querySelector('#averagesTable tbody');
        const averages = hourlyAverages;

        const averageEntries = Object.entries(averages).map(([hour, avg]) => [parseInt(hour), avg]);

        const top3 = [...averageEntries].sort((a, b) => b[1] - a[1]).slice(0, 3);
        const rankings = ["1st", "2nd", "3rd"];
        const colors = ["#fff9e6", "#f3f3f3", "#fef5eb"];

        const topList = document.createElement('ul');
        topList.style.listStyle = 'none';
        topList.style.paddingLeft = '0';

        top3.forEach(([hour, avg], index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${rankings[index]}: ${formatHour(hour)} — Avg Likes: ${avg.toFixed(2)}`;
          listItem.style.backgroundColor = colors[index];
          listItem.style.padding = '12px';
          listItem.style.marginBottom = '8px';
          listItem.style.borderRadius = '12px';
          listItem.style.color = '#333';
          listItem.style.fontWeight = '500';
          topList.appendChild(listItem);
        });

        document.getElementById('topTimesContainer').appendChild(topList);

        const sortedHours = averageEntries.sort((a, b) => a[0] - b[0]);

        sortedHours.forEach(([hour, avg]) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${formatHour(hour)}</td>
            <td>${avg.toFixed(2)}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to load average data from the server.');
      });

    fetch('http://127.0.0.1:8887/api/timeofdayposts')
      .then(response => response.json())
      .then(data => {
        const postTable = document.querySelector('#postsTable tbody');
        const posts = data.posts;

        posts.sort((a, b) => a.time_of_day - b.time_of_day);

        posts.forEach(post => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${formatHour(post.time_of_day)}</td>
            <td>${post.likes_views}</td>
            <td><a href="${post.url}" target="_blank">${post.url}</a></td>
          `;
          postTable.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error loading posts table:', error);
      });

    function formatHour(hour) {
      const h = parseInt(hour);
      const period = h >= 12 ? 'PM' : 'AM';
      const formattedHour = h % 12 === 0 ? 12 : h % 12;
      return `${formattedHour} ${period}`;
    }

    // Time input -> show estimate
    const timeInput = document.getElementById('timeInput');
    const estimateContainer = document.getElementById('estimateContainer');
    const estimateOutput = document.getElementById('estimateOutput');

    timeInput.addEventListener('change', () => {
      const time = timeInput.value;
      if (!time) return;

      const hour = parseInt(time.split(':')[0]);
      if (hour in hourlyAverages) {
        const estimate = hourlyAverages[hour];
        estimateOutput.textContent = estimate.toFixed(2);
        estimateContainer.style.display = 'block';
      } else {
        estimateOutput.textContent = 'No data';
        estimateContainer.style.display = 'block';
      }
    });

    // Weekly Frequency Analysis Logic
    let csvData = {};

    async function loadCSV() {
      try {
        const response = await fetch("engagement_data.csv");
        const text = await response.text();
        const rows = text.trim().split('\n').slice(1);
        for (const row of rows) {
          const [timestamp, posts, engagement] = row.split(',');
          csvData[parseInt(posts)] = engagement;
        }
      } catch (error) {
        console.error('Error loading CSV:', error);
        // Fallback data
        csvData = {
          0: "📉 No posts means no engagement. Start posting!",
          1: "📊 Getting started! Try posting more consistently.",
          2: "📈 Good start! Your audience is beginning to notice.",
          3: "🎯 Sweet spot! This frequency works well for most accounts.",
          4: "⭐ Excellent! You're building strong engagement.",
          5: "🚀 Outstanding! Your audience is highly engaged.",
          6: "💪 High performer! Keep up the great work.",
          7: "🔥 Power user! Your content strategy is on point.",
          8: "⚡ Maximum engagement! You're crushing it!",
          9: "⚠️ Might be too much. Consider quality over quantity.",
          10: "🛑 Risk of overwhelming your audience."
        };
      }
    }

    function getFeedback(postsPerWeek) {
      return csvData[postsPerWeek] || "⚠️ No data available for this number.";
    }

    function getBarColor(postsPerWeek) {
      if (postsPerWeek <= 0) return "#999";
      if (postsPerWeek <= 2) return "#f0ad4e";
      if (postsPerWeek <= 5) return "#28a745";
      if (postsPerWeek <= 8) return "#20c997";
      return "#dc3545";
    }

    function getBarWidth(postsPerWeek) {
      if (postsPerWeek <= 0) return "0%";
      if (postsPerWeek <= 2) return "35%";
      if (postsPerWeek <= 5) return "65%";
      if (postsPerWeek <= 8) return "85%";
      return "100%";
    }

    function getTips(postsPerWeek) {
      if (postsPerWeek <= 0) {
        return [
          "Try to post at least once a day to keep your audience engaged.",
          "Use a content calendar to plan posts ahead.",
          "Engage with your followers through comments and stories."
        ];
      } else if (postsPerWeek <= 3) {
        return [
          "Consistency is key—try to post around the same times each day.",
          "Use hashtags relevant to your content to reach more people.",
          "Mix up content types: images, videos, and stories."
        ];
      } else if (postsPerWeek <= 8) {
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

    // Initialize frequency checker
    await loadCSV();

    const checkBtn = document.getElementById("checkBtn");
    const result = document.getElementById("result");
    const meterBar = document.getElementById("meterBar");
    const feedbackBox = document.getElementById("feedbackBox");
    const input = document.getElementById("postsPerWeek");
    const goalInput = document.getElementById("goalPosts");
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
        document.getElementById("challengeBox").style.display = "none";
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

      hideTips();
      displayChallenge(goalVal, val);
    });

    btnYes.addEventListener("click", () => {
      const val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0) {
        alert("Please enter a valid positive number of posts per week first.");
        return;
      }
      const tips = getTips(val);
      displayTips(tips);
    });

    btnNo.addEventListener("click", () => {
      hideTips();
    });
  </script>
</body>