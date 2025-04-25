---
layout: post
title: Video Length and Engagement Insights!
permalink: /lengths
menu: nav/home.html
search_exclude: true
---

<style>
/* same styles as before — no changes needed here */
</style>

<div class="container">
    <div class="earth-icon"></div>
    <h1>Video Length and Engagement Insights!</h1>
    <div class="form-container">
        <h2>Add a New Video Length Insight</h2>
        <form id="lengthForm">
            <label for="videoLength">Video Length (in minutes):</label>
            <input type="number" step="0.1" id="videoLength" name="videoLength" required>
            <label for="engagement">Engagement (likes + comments + shares):</label>
            <input type="number" id="engagement" name="engagement" required>
            <button type="submit">Add Insight</button>
        </form>
    </div>
    <div class="best-length" id="bestLengthBox">
        <h2>🔥 Most Efficient Length</h2>
        <p id="bestLengthText">Loading...</p>
    </div>

    <div class="chart-container">
        <h2>📊 Engagement vs Length</h2>
        <canvas id="lengthChart"></canvas>
    </div>

    <div class="length-grid" id="lengthGrid"></div>

    
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const API_BASE = "http://127.0.0.1:8402/api";

    async function fetchLengths() {
        const res = await fetch(`${API_BASE}/lengths`);
        const data = await res.json();
        displayLengths(data);
        drawChart(data);
    }

    async function fetchBestLength() {
        const res = await fetch(`${API_BASE}/lengths/best`);
        const data = await res.json();
        const bestText = data.video_length
            ? `${data.video_length} minutes with ${data.efficiency.toFixed(2)} engagement/min`
            : "No best length found.";
        document.getElementById('bestLengthText').textContent = bestText;
    }

    function displayLengths(lengths) {
        const grid = document.getElementById('lengthGrid');
        grid.innerHTML = '';
        lengths.forEach(length => {
            const card = document.createElement('div');
            card.className = 'length-card';
            card.innerHTML = `
                <h2>${length.video_length} min</h2>
                <p>Engagement: ${length.engagement}</p>`;
            grid.appendChild(card);
        });
    }

    function drawChart(lengths) {
        const ctx = document.getElementById('lengthChart').getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Engagement vs Video Length',
                    data: lengths.map(d => ({ x: d.video_length, y: d.engagement })),
                    backgroundColor: '#4CAF50'
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Video Length (minutes)' }},
                    y: { title: { display: true, text: 'Engagement' }}
                }
            }
        });
    }

    document.getElementById('lengthForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const videoLength = parseFloat(document.getElementById('videoLength').value);
        const engagement = parseInt(document.getElementById('engagement').value);
        await fetch(`${API_BASE}/lengths`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ video_length: videoLength, engagement: engagement })
        });
        fetchLengths();
        fetchBestLength();
        document.getElementById('lengthForm').reset();
    });

    fetchLengths();
    fetchBestLength();
</script>
