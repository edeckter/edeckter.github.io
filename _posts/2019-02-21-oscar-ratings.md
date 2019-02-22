---
layout: post
title: "Oscar Ratings Analysis"
date: 2019-02-21 22:24 -0500
tags: R, data visualization
comments: false
---
In anticipation of the Academy Awards this weekend, I did an analysis to investigate what factors influence ratings of the annual ratings telecast.  I performed this analysis using R and the [ggplot2](https://ggplot2.tidyverse.org/) package.

The Academy of Motion Pictures Arts and Sciences (AMPAS) has been giving out the Academy Awards, also known as the Oscars, for the last 90 years.  In the last decade, the Academy has made a number of changes to the awards and ceremony in an effort to maintain cultural relevance, including announcing (and then quickly retracting) a new "Best Popular Film" category in 2018.  The idea of this new category prompted me to investigate the following research question: What factors influence the ratings of the annual Oscars telecast?

Why ratings?  The more people (specifically Americans in this investigation) watch a live event on television, the more likely that event is to dominate the cultural conversation in the time period around the event.  In addition, ratings can be equated pretty easily into revenue.  ABC currently has the rights to broadcast the Oscars telecast in the US through 2028.  The higher the anticipated ratings, the more ABC can charge for advertising during the broadcast.  And in turn ABC's expected ad revenue sets the price the network pays to AMPAS for the broadcast rights.

First, let's look at how the ratings have changed year-over-year from 2001 to 2018.

<img src="{{'images/oscars_yoy.jpeg' | relative_url }}">

And now we can compare the Oscar ratings to ratings to other awards shows and even sports (the Summer and Winter Olympics opening ceremony).

<img src="{{'images/ratings_comparison.jpeg' | relative_url }}">

There is enough evidence of a correlation that this trend warrants further investigation.


Factors Contributing to Oscar Ratings
=====================================
One possible factor in the decline of live network television ratings is the rise of streaming.  This next visualization compares the Oscar ratings from 2011 through 2018 with the number of Netflix subscribers in the US over the same period.  

<img src="{{'images/oscars_vs_netflix.jpeg' | relative_url }}">

So, are people even going to the movies anymore?  And if they are, does that have an impact on Oscar ratings?  To answer this question, I looked at the overall movie tickets sales for the prior year and compared that to the Oscar telecast ratings.

<img src="{{'images/box_office.jpeg' | relative_url }}">

Finally, I looked at the specific box office performance of the movies nominated for Best Picture.  First, I trended the domestic gross box office to 2018 US dollars.  Then I looked at which years had at least one Best Picture that made over $200M at the box office.

<img src="{{'images/ratings_boxplot.jpeg' | relative_url }}">

There is certainly reason to believe that nominating movies a lot of people have seen will increase the ratings of the Oscars telecast.  So maybe the "Popular Film" category wasn't such a bad idea after all.

Future Research
===============
While I examined a number of factors that might influence Oscar ratings, there are many other potential factors.  Here is a sample of other factors to investigate in the future:   
* Choice of Oscar host (or no host as we will have in 2019)
* Musical performances on the telecast (and the related Best Original Song category)
* Genres of nominated films
* Diversity of nominees (e.g., #OscarsSoWhite)
* Total number of films represented in nominees (Are there a few films with all the nominations or is it more evenly spread across many films?)
* Cultural factors (such as politics and campaigns like #MeToo)
* Release dates of nominees (e.g., summer vs. winter release)
* Availability of nominees on streaming/DVD prior to the awards ceremony 

Data Sources
============
The primary source for the ratings information is Nielsen; however, I obtained the actual data through a number of secondary sources.  Statistica was used to collect the [Oscars](http://www.statista.com/statistics/253743/academy-awards--number-of-viewers/), [Golden Globes](http://www.statista.com/statistics/266669/golden-globes--number-of-viewers/) and [Emmys](http://www.statista.com/statistics/260428/emmy-awards--number-of-viewers/) ratings, as well as the Olympics opening ceremony ratings (both [Summer](http://www.statista.com/statistics/237448/viewers-of-the-summer-olympics-opening-ceremony-in-the-us/) and [Winter](http://www.statista.com/statistics/587463/winter-olympics-opening-ceremony-number-viewers-usa/)).  Ratings for the Grammy Awards were found at TV by the Numbers [here](http://tvbythenumbers.zap2it.com/reference/grammy-awards-tv-ratings/40427/), [here](http://tvbythenumbers.zap2it.com/more-tv-news/the-grammys-are-having-a-pretty-good-decade-in-the-ratings/) and [here](http://tvbythenumbers.zap2it.com/daily-ratings/tv-ratings-sunday-jan-28-2018/) and [Forbes](http://www.forbes.com/sites/bizblog/2010/02/01/grammy-ratings-soar/#370a185b7a17).  Netflix subscriber information was found at [Recode](http://www.recode.net/2018/1/22/16920150/netflix-q4-2017-earnings-subscribers).  

Historical information on Oscar Best Picture nominees was accessed from the [Official Academy Awards Database](http://awardsdatabase.oscars.org/) with additional information about each film coming from [IMDB](http://www.imdb.com).  Box office figures were from [Box Office Mojo](https://www.boxofficemojo.com/yearly/) and [Kaggle](http://www.kaggle.com/eliasdabbas/boxofficemojo-alltime-domestic-data) (although I did spot-check the formatted data from Kaggle from the original Box Office Mojo source).  All box office values were trended to 2018 US dollars, using inflation data from the Federeal Reserve Bank of Minneapolis [website](http://www.minneapolisfed.org/community/financial-and-economic-education/cpi-calculator-information/consumer-price-index-and-inflation-rates-1913).  

A note on year: The Oscars telecast airs in February/March and awards movies that were released in the previous calendar year.  For example, the Oscars that are set to air on February 24, 2019 will give out awards for movies released in 2018.  In order to remain consistent with ratings information, the year for all nominated films has been aligned with the year of the corresponding telecast (e.g., box office figures for the year "2000" in all visualizations correspond to movies released during the 1999 calendar year).