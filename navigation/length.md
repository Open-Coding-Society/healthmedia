---
layout: post
title: Video Length and Engagement Insights!
permalink: /lengths
menu: nav/home.html
search_exclude: true
---

<style>
.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #218838;
}

#resultBox {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f1f1f1;
    font-size: 1.2em;
}
</style>

<div class="container">
    <h1>Video Engagement Lookup</h1>

    <form id="lookupForm">
        <label for="videoLength">Enter a Video Length (in minutes):</label>
        <input type="number" id="videoLength" required>
        <button type="submit">Fetch Engagement Insight</button>
    </form>

    <div id="errorMsg" style="color: red; margin-top: 10px;"></div>

    <div id="resultBox"></div>
</div>

<script>
document.getElementById('lookupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const videoLength = parseFloat(document.getElementById('videoLength').value);
    const resultBox = document.getElementById('resultBox');
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.innerText = '';
    resultBox.innerText = 'Analyzing engagement potential...';

    setTimeout(() => {
        let message;

        if (videoLength <= 0) {
            message = "Please enter a valid video length greater than zero.";
        } else if (videoLength < 1) {
            message = "Very short videos may not provide enough time to engage viewers.";
        } else if (videoLength >= 1 && videoLength < 2) {
            message = "Short-form videos like this often get quick engagement — great for grabbing attention.";
        } else if (videoLength >= 2 && videoLength <= 3) {
            message = "This is a strong duration for social media — likely to maximize engagement.";
        } else if (videoLength > 3 && videoLength <= 5) {
            message = "Slightly longer videos can perform well if the content remains tight and focused.";
        } else if (videoLength > 5 && videoLength <= 8) {
            message = "Longer content can still perform if it's high quality, but attention may drop off.";
        } else {
            message = "This video may be too long for typical platforms like Instagram — consider trimming for better engagement.";
        }

        resultBox.innerText = `For a ${videoLength}-minute video: ${message}`;
    }, 800);
});
</script>
