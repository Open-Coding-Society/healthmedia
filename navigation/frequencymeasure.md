---
layout: post
title: Frequency Engagement Measurer
permalink: /frequencyM/
---
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daily Upload Engagement Checker</title>
  <style>
    body{
      font-family:Arial, sans-serif;
      display:flex;
      flex-direction:column;
      align-items:center;
      padding:2rem;
    }
    .card{
      max-width:400px;
      width:100%;
      padding:1.5rem;
      border-radius:12px;
      box-shadow:0 2px 8px rgba(0,0,0,.1);
    }
    label,input,button,p{
      width:100%;
      margin-bottom:1rem;
      font-size:1rem;
    }
    button{
      padding:.5rem 1rem;
      border:none;
      border-radius:8px;
      cursor:pointer;
    }
    /* -------- NEW: make feedback stand out -------- */
    #result{
      color:#0074d9;   /* change this hex code to any color you prefer */
      font-weight:600; /* semi‑bold */
    }
  </style>
</head>
<body>
  <h1>Daily Upload Engagement Checker</h1>
  <div class="card">
    <label for="postsPerDay">How many times do you upload in a day?</label>
    <input type="number" id="postsPerDay" min="0" placeholder="Enter a number" />
    <button id="checkBtn" type="button">Check Engagement</button>
    <p id="result"></p>
  </div>
  <script>
    /* ---------- core logic ---------- */
    function engagementFeedback(n){
      if(n<=0) return "No engagement — try posting something!";
      if(n<=3) return "Good: consistent posting frequency.";
      if(n<=8) return "Great: you’re maximizing engagement potential.";
      return "Careful: you may overwhelm followers; consider trimming back.";
    }
    /* ---------- event wiring ---------- */
    document.addEventListener("DOMContentLoaded",()=>{
      document.getElementById("checkBtn").addEventListener("click",()=>{
        const val = parseInt(document.getElementById("postsPerDay").value,10);
        document.getElementById("result").textContent =
          isNaN(val) ? "Please enter a whole number."
                     : engagementFeedback(val);
      });
    });
  </script>
</body>
</html>








