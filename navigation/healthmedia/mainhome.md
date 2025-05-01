---
layout: post
title: About the park 
permalink: aboutthepark/home/
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LEGOLAND California</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .animated-title {
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  </style>
</head>
<body class="bg-yellow-50 font-sans text-gray-800">
  <div class="max-w-6xl mx-auto px-4 py-10">
    
    <!-- Logo with spacing -->
    <div class="flex justify-center mb-10">
      <img src="{{ site.baseurl }}/images/logo.jpg" alt="LEGOLAND Logo" class="max-w-xs w-full">
    </div>

    <!-- Text and Images Layout -->
    <div class="grid md:grid-cols-2 gap-12 items-start">
      <div class="space-y-6 text-lg leading-relaxed">
        <p>
          Ready to unleash your inner kid (or just <em>be</em> a kid)? 😄 At LEGOLAND California in sunny Carlsbad, you’ll find a brick-built wonderland packed with over 60 rides, jaw-dropping attractions, and totally LEGO-tastic experiences.
        </p>
        <p>
          Whether you're racing through LEGO® NINJAGO® World 🥷, exploring pirate-infested waters 🚤, or getting soaked at the Water Park 💦 — it’s non-stop fun for all ages.
        </p>
        <p>
          Don’t miss MINILAND USA, where entire cities are recreated with millions of LEGO bricks 🏙️. You can even sleep like royalty at the LEGOLAND Hotels 🏰 for a 24/7 LEGO adventure!
        </p>
        <p>
          From rollercoasters to robots to ridiculously awesome brick builds—LEGOLAND CA is more than a theme park. It's your next epic adventure. Let’s goooo! 🚀🎈
        </p>
      </div>

      <!-- Centered Image Grid -->
      <div class="grid grid-cols-2 gap-4 justify-items-center">
        <img src="{{ site.baseurl }}/images/park.webp" alt="LEGOLAND fun">
        <img src="{{ site.baseurl }}/images/legoland...jpg" alt="Water Park fun" class="rounded-xl shadow-lg w-48 md:w-60 h-auto">
        <img src="{{ site.baseurl }}/images/vv.webp" alt="Dragon Coaster" class="rounded-xl shadow-lg w-48 md:w-60 h-auto">
        <img src="{{ site.baseurl }}/images/california.jpg" alt="MINILAND USA" class="rounded-xl shadow-lg w-48 md:w-60 h-auto">
      </div>
    </div>
  </div>
</body>
</html>
