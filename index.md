---
layout: base
title: Flocker Social Media Site
search_exclude: true
description: Login and explore our social media hub for everything DNHS
hide: true
---

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HealthMedia</title>




<section id="features" class="features">

<a href="{{site.baseurl}}/nutrition" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Nutrition Tips</h3>
        <p>Learn how to eat healthier with our expert advice on balanced diets and superfoods.</p>
    </div>
</a>

<a href="{{site.baseurl}}/exercise" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Exercise Routines</h3>
        <p>Discover new workouts to keep you fit, active, and energized every day.</p>
    </div>
</a>

<a href="{{site.baseurl}}/mental-health" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Mental Health</h3>
        <p>Find out how to manage stress and boost your mental well-being with our resources.</p>
    </div>
</a>

<a href="{{site.baseurl}}/blog" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Health Blog</h3>
        <p>Read the latest articles, tips, and research updates on living a healthier life.</p>
    </div>
</a>

<a href="{{site.baseurl}}/contact" style="text-decoration: none; color: inherit;">
    <div class="feature">
        <h3>Contact Us</h3>
        <p>Have questions or feedback? Reach out to our team and let's connect!</p>
    </div>
</a>

</section>

<style>
.hero {
    padding: 30px 20px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

button {
    font-size: 1rem;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(45deg, #2a9d8f, #21867a, #3eb59b, #35a18a);
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

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.feature {
    background:radial-gradient(ellipse at bottom left,rgb(133, 213, 136) 0%, #81C784 30%, transparent 170%), 
                radial-gradient(ellipse at top right,rgb(86, 179, 255) 0%, #64B5F6 40%, transparent 200%);
    background-color:rgba(103, 255, 204, 0.5);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.feature h3 {
    color:rgb(255, 255, 255) !   important;
    margin-bottom: 10px;
}

.feature p {
    color:rgb(230, 230, 230) !important;
    font-size: 0.95rem;
}

/* Optional typewriter for the hero */
h2 {
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
}
</style>
