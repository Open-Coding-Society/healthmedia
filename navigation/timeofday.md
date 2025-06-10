---
layout: post
title: Social Media Engagement Analyzer
permalink: /timeofday/
---

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
    /* All the existing styles remain the same... */
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

    .full-width-section {
      grid-column: 1 / -1;
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

    /* Post Length Analysis Styles */
    .post-length-section {
      margin-top: 2rem;
    }

    .length-display {
      background: #f0f8ff;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.2rem;
      text-align: center;
      margin-top: 1rem;
    }

    .prediction-result {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .prediction-score {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .prediction-label {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .length-insights {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .insight-card {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      border-left: 4px solid #0074d9;
    }

    .insight-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #0074d9;
    }

    .insight-label {
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .recommendations {
      background: #e8f5e8;
      border: 1px solid #c3e6c3;
      border-radius: 8px;
      padding: 1rem;
    }

    .recommendations h4 {
      color: #2d5a2d;
      margin-bottom: 0.75rem;
    }

    .recommendations ul {
      margin: 0;
      padding-left: 1.2rem;
    }

    .recommendations li {
      color: #2d5a2d;
      margin-bottom: 0.5rem;
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

  <!-- Post Length Analysis Section -->
  <div class="container">
    <div class="section full-width-section post-length-section">
      <h2>🎬 Video Post Length Analysis</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div>
          <label for="videoLength"><strong>Video Length (seconds):</strong></label>
          <input type="number" id="videoLength" min="1" max="3600" placeholder="Enter video duration in seconds" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; box-sizing: border-box;">
          
          <label for="videoType"><strong>Video Type:</strong></label>
          <select id="videoType" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; box-sizing: border-box;">
            <option value="story">Story/Short</option>
            <option value="reel">Reel</option>
            <option value="post">Regular Post</option>
            <option value="igtv">IGTV/Long Form</option>
          </select>
        </div>
        
        <div>
          <label for="platform"><strong>Platform:</strong></label>
          <select id="platform" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #