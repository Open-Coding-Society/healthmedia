---
layout: base
title: Legoland Social Media
search_exclude: true
description: Login and explore our social media hub for everything Legoland
hide: true
---

<style>
  /* Overall page style!*/
  title {
    text-align: left; /* Align title to the left */
    display: block;
  }
  
  body {
    background-color: #fafafa; /* Light gray background for clean look */
    font-family: 'Arial', sans-serif;
    color: #333333;
    margin: 0;
    padding: 0;
  }

  .hero {
    padding: 30px 20px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    background: #ffcc00; /* Subtle Lego yellow background */
    border-radius: 12px;
  }

  button {
    font-size: 1rem;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(45deg, #ffcc00, #f8b400);
    color: white;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    background-size: 400% 400%;
  }

  button:hover {
    background-position: 100% 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  /* Features grid layout */
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature {
    background-color:rgb(255, 235, 155); /* Light background for each feature */
    border: 2px solid #f1c232; /* Light Lego yellow border */
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    overflow: hidden;
  }

  .feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .feature h3 {
    color: #0056b3; /* Lego blue text for headings */
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .feature p {
    color: #555555;
    font-size: 0.95rem;
  }

  /* Hero Section Typewriter Effect */
  h2 {
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
    /*border-right: .15em solid #ffcc00;*/
    animation: typing 3.5s steps(30) 1s 1 normal both, blinkCaret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blinkCaret {
    50% {
      border-color: transparent;
    }
  }

  /* Style Links */
  .feature-link {
    text-decoration: none;
    color: inherit;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .features {
      padding: 20px 15px;
    }

    .feature h3 {
      font-size: 1rem;
    }

    .feature p {
      font-size: 0.85rem;
    }
  }

body, html {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items at the top */
  height: 100%; /* Ensures the container takes up full height */
}

.title-container {
  margin-top: 5px; /* Adjust this to control how high the title is */
}

.fade-in-up {
  font-size: 3rem; /* Increase size */
  font-weight: bold;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1s ease-out forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }

}
</style>

<div class="container">
  <div class="title-container">
    <h1 class="fade-in-up">Welcome to LEGOLAND Media</h1>
  </div>

<div class="container">
  <div class="title-container">
    <h2 class="fade-in-up">Why Us?</h2>
    <p>By providing real-time, data-driven insights, this project helps businesses fine-tune their content strategy for better engagement. It goes beyond simple performance metrics by examining multiple dimensions, from when and how often posts are made to the overall sentiment of user interactions. With these insights, businesses can make informed decisions that directly impact reach and engagement on social media platforms.</p>
  </div>
<br>
<div class="container">
  <div class="title-container">
    <h2 class="fade-in-up">Our Mission</h2>
    <p>This project provides a comprehensive video analytics solution that not only analyzes post length, hashtag effectiveness, and photo brightness, but also delves into post frequency, time of day for posting, and sentiment analysis. The goal is to provide businesses and content creators of Legoland California with a full-spectrum understanding of what drives engagement and how to optimize content strategies.</p>
  </div>

<section id="features" class="features">
  <a href="{{site.baseurl}}/sentiment/analysis/" class="feature-link">
    <div class="feature">
      <h3>Sentiment Analysis</h3>
      <p>Uses data to gauge the sentiment of user comments and interactions, helping businesses understand how their content resonates emotionally with the audience.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/hashtaganalysis" class="feature-link">
    <div class="feature">
      <h3>Hashtag Analysis</h3>
      <p>Measures the impact of hashtags, enabling businesses to identify and utilize the most effective ones for each campaign.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/lengths" class="feature-link">
    <div class="feature">
      <h3>Post Length</h3>
      <p>Automatically determines the optimal post length for maximum engagement, based on historical trends and current data.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/photoanalysis" class="feature-link">
    <div class="feature">
      <h3>Photo Analysis</h3>
      <p>Evaluates the visual qualities of potential post photos, linking these factors to higher engagement rates.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/timeofday" class="feature-link">
    <div class="feature">
      <h3>Post Time Analysis</h3>
      <p>Analyzes the timing of posts to determine when the audience is most active, providing valuable guidance on posting schedules.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/frequencyM" class="feature-link">
    <div class="feature">
      <h3>Post Frequency</h3>
      <p>Tracks how often posts are made and correlates this frequency with user engagement, helping to identify the best posting cadence.</p>
      </div>
      </a>
</section>

