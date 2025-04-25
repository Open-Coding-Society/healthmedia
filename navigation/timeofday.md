---
permalink: /timeofday/
---

<head>
  <title>Time of Day</title>
  <style>
    .container{
        background:#bbbbbb99;
        padding:10px;
        width:50%;
        align-items:center;
        border-radius: 25px;
    }
    input{
        border-radius: 25px;
    }
    
  </style>
</head>

<body>
    <h1>Posting Time Of Day</h1>
    <br>
    <br>
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
  fetch('http://127.0.0.1:8887/api/optimaltime')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#averagesTable tbody');
      const averages = data.hourly_averages;

      // Convert to array of [hour, avg] pairs
      const averageEntries = Object.entries(averages).map(([hour, avg]) => [parseInt(hour), avg]);

      // Get top 3 highest averages
      const top3 = [...averageEntries].sort((a, b) => b[1] - a[1]).slice(0, 3);

      // Rank labels and subtle tint colors
      const rankings = ["1st", "2nd", "3rd"];
      const colors = ["#fff9e6", "#f3f3f3", "#fef5eb"]; // gold, silver, bronze tints

      // Create and style the top 3 list
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

      // Inject after the "Top 3 times to upload" heading
      document.querySelector('h1:nth-of-type(2)').after(topList);

      // Sort hours ascending and render the table
      const sortedHours = averageEntries.sort((a, b) => a[0] - b[0]);

      sortedHours.forEach(([hour, avg]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${formatHour(hour)}</td>
          <td>${avg.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });

      // Helper: 24h to 12h with AM/PM
      function formatHour(hour) {
        const h = parseInt(hour);
        const period = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 === 0 ? 12 : h % 12;
        return `${formattedHour} ${period}`;
      }
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

    // Sort posts by time_of_day
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

// Reuse the same formatHour helper function
function formatHour(hour) {
  const h = parseInt(hour);
  const period = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour} ${period}`;
}

</script>


</body>
