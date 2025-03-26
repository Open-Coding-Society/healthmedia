---
layout: post
title: Team Teach 
permalink: teamteach/home/
---
{% include healthmediatheme.html %}
<style>

.button {
    background:radial-gradient(ellipse at bottom left,rgb(133, 213, 136) 0%, #81C784 30%, transparent 170%), 
                radial-gradient(ellipse at top right,rgb(86, 179, 255) 0%, #64B5F6 40%, transparent 200%);
    background-color:rgba(103, 255, 204, 0.5);
    display: inline-block;
    color: white !important;
    padding: 20px 40px;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    font-size: 20px;
    border: none; 
    margin: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}
.button button {
    background: inherit;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 0;
    margin: 0;  
}
.button-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.button:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

</style>

<h2>
Period 1: Table 6's lessons will be on Big Idea 3 Binary Base 2 Math & Logic Gates. Choose which to visit!
<h2>

<div class="button-container">
<a href="{{site.baseurl}}/teamteach/binarymath" class="button" style="background-color:rgb(108, 221, 100);">
    Binary Base 2 Math
</a>

<div class="button-container">
<a href="{{site.baseurl}}/teamteach/logicgates" class="button" style="background-color:rgb(108, 221, 100);">
    Logic Gates
</a>