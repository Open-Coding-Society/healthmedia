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
</body>
