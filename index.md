---
layout: base
title: Flocker Social Media Site
search_exclude: true
description: Login and explore our social media hub for everything Legoland
hide: true
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Legoland Media</title>

<section id="features" class="features">
  <a href="{{site.baseurl}}/nutrition" class="feature-link">
    <div class="feature">
      <h3>Build Your Adventure</h3>
      <p>Explore new Lego sets and create your own LEGO world with our building guides.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/exercise" class="feature-link">
    <div class="feature">
      <h3>LEGO Parks & Rides</h3>
      <p>Discover the best attractions at Legoland and plan your next family adventure.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/mental-health" class="feature-link">
    <div class="feature">
      <h3>LEGO News & Updates</h3>
      <p>Stay up-to-date with the latest happenings from Legoland, new sets, and park events.</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/blog" class="feature-link">
    <div class="feature">
      <h3>LEGO Blog</h3>
      <p>Read articles, tips, and community stories about all things Legoland and LEGO building!</p>
    </div>
  </a>

  <a href="{{site.baseurl}}/contact" class="feature-link">
    <div class="feature">
      <h3>Contact Us</h3>
      <p>Have a question or want to share your Lego creations? Reach out to our team!</p>
    </div>
  </a>
</section>

<style>
  /* Overall page style */
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
    background-color: #f7f7f7; /* Light background for each feature */
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
    border-right: .15em solid #ffcc00;
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
</style>
