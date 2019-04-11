---
layout: post
title: "Gender Politics"
date: 2019-04-10 20:00 -0500
comments: false
---
<script type="text/javascript" src="{{'js/d3.js' | relative_url }}"></script>
I was reading [this](https://www.theatlantic.com/magazine/archive/2019/01/authoritarian-sexism-trump-duterte/576382/)[^1] article in [The Atlantic](https://www.theatlantic.com), and I was struck by the statistics near the end of the article.  Particularly, this section:
>In 2018, the Organization for Economic Cooperation and Development published the amount of time per day that women and men spent doing unpaid household chores such as cleaning, shopping, and child care. If you calculate the gender gap in each country, a pattern emerges. There is a striking correlation between countries where women and men behave more equally in the home and countries where women are more equally represented in government. Take Sweden, 44 percent of whose parliamentarians are women. There, the gap between the amount of housework done by men and that done by women is less than an hour a day. In the U.S., where women will soon make up roughly 23 percent of Congress, the housework gender gap is an hour and a half. In Hungary, where women account for 10 percent of parliament, it is well over two hours.

I decided to take a page out of Alberto Cairo's book and create some visualizations from the raw OECD data cited in the article.  (Cairo literally did a similar exercise in Chapter 1 of his book [The Functional Art](http://www.thefunctionalart.com/p/about-book.html).  He takes inspiration from fertility statistics in *The Rational Optimist: How Prosperity Evolves* by Matt Ridley to create visualizations that verify the Ridley's claims.)

First, I looked went to the [OECD](https://data.oecd.org/) website to get the raw data for the amount of [unpaid work performed by gender](https://stats.oecd.org/index.aspx?queryid=54757) and the [number of female legislators](https://data.oecd.org/inequality/women-in-politics.htm) in each reported country.

I am learning [D3.js](https://d3js.org/) and I thought this project would be a good way to try out my new skills and create some fun interactive visualizations.

I decided to start out with an interactive map, to visually compare unpaid work performed by men and women between the ages of 15 and 64.
<div class="drop-down" id="map"></div>
<div class="section" id="viz1"></div>
<script type="text/javascript" src="{{'js/gender_map.js' | relative_url }}"></script>

The bar chart below is a side-by-side comparison of the percentage of unpaid work performed by women and the percent of female parliamentarians for each country.  

<div class="drop-down" id="chart">Sort by: </div>
<div class ="section" id="viz2"></div>
<script type="text/javascript" src="{{'js/gender_barchart.js' | relative_url }}"></script>

Around the world, women are still doing more than half of all unpaid household work.  But while the sortable bar chart is nice, it is difficult to see the "striking correlation" referenced in *The Atlantic* article in this visualization.

This same data can be visualized in another way using a scatterplot.

<div class ="section" id="viz3"></div>
<script type="text/javascript" src="{{'js/gender_scatterplot.js' | relative_url }}"></script>

Now we can see that for countries where there is a more equitable division of household labor, there is a noticeably larger proportion of female legislators.

And indeed, there is a correlation of -0.54 between the two variables.  The linear regression analysis has an R<sup>2</sup> value of 0.29, which means that the percent of domestic labor done by women explains about 30% of the total variance in the number of women legislators by country.  So this isn't the whole story, but it is certainly a part of it.

----------------------------------------------------------------

[^1]: [The New Authoritarians Are Waging War on Women](https://www.theatlantic.com/magazine/archive/2019/01/authoritarian-sexism-trump-duterte/576382/) by Peter Beinart.  Published in the January/February 2019 issue.



