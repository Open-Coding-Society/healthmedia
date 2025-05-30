---
layout: post
title: Time of Day Analysis
permalink: /timeofday/
---

<head>
  <title>Time of Day</title>
  <style>
    .container {
      background: #bbbbbb99;
      padding: 10px;
      width: 50%;
      align-items: center;
      border-radius: 25px;
    }

    select {
      border-radius: 25px;
      padding: 5px;
    }

    #estimateContainer {
      margin-top: 10px;
    }
  </style>
</head>

<body>
  <h1>Posting Time Of Day</h1>

  <!-- Time Selection UI -->
  <div class="container">
    <label for="timeInput"><strong>Select Time of Day:</strong></label><br><br>
    <select id="timeInput" name="timeInput">
      <option value="">-- Select Hour --</option>
    </select>
    <div id="estimateContainer" style="display:none;">
      <p><strong>Estimated Likes/Views:</strong> <span id="estimateOutput">...</span></p>
    </div>
  </div>


  <br>
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

  <br><br>
  <h1>Top 3 times to upload</h1>

  <h1>Hourly Average Likes</h1>
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

  <h1>All Posts by Time of Day</h1>
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

  <script type="module">
    let hourlyAverages = {};

    function formatHour(hour) {
      const h = parseInt(hour);
      const period = h >= 12 ? 'PM' : 'AM';
      const formattedHour = h % 12 === 0 ? 12 : h % 12;
      return `${formattedHour} ${period}`;
    }

    function populateDropdown(averages) {
      const select = document.getElementById('timeInput');
      const sortedHours = Object.keys(averages).map(h => parseInt(h)).sort((a, b) => a - b);

      sortedHours.forEach(hour => {
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = formatHour(hour);
        select.appendChild(option);
      });
    }

    fetch('http://127.0.0.1:8887/api/optimaltime')
      .then(response => response.json())
      .then(data => {
        hourlyAverages = data.hourly_averages;

        populateDropdown(hourlyAverages);

        const tableBody = document.querySelector('#averagesTable tbody');
        const averageEntries = Object.entries(hourlyAverages).map(([hour, avg]) => [parseInt(hour), avg]);

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
          listItem.style.padding = '8px';
          listItem.style.marginBottom = '5px';
          listItem.style.borderRadius = '12px';
          listItem.style.color = '#333';
          listItem.style.fontWeight = '500';
          topList.appendChild(listItem);
        });

        document.querySelector('h1:nth-of-type(2)').after(topList);

        averageEntries.sort((a, b) => a[0] - b[0]).forEach(([hour, avg]) => {
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

    // Show estimated likes/views when hour is selected
    const timeInput = document.getElementById('timeInput');
    const estimateContainer = document.getElementById('estimateContainer');
    const estimateOutput = document.getElementById('estimateOutput');

    timeInput.addEventListener('change', () => {
      const hour = parseInt(timeInput.value);
      if (!isNaN(hour) && hour in hourlyAverages) {
        const estimate = hourlyAverages[hour];
        estimateOutput.textContent = estimate.toFixed(2);
        estimateContainer.style.display = 'block';
      } else {
        estimateContainer.style.display = 'none';
      }
    });
  </script>
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
