---
layout: post
title: 'Using Natural Language Processing to Score Movie Reviews'
date: 2020-01-06 4:30 -0500
comments: false
---
The idea to create a potential improvement over Rotten Tomatoes' method of aggregating movie reviews has been kicking around in my head for a few years, but it wasn't until I learned Natural Language Processing (NLP) techniques that I was really able to implement the idea.  Rotten Tomatoes creates its 
aggregated movie review scores by assigning a binary sentiment
label to each review for a film ("fresh" for positive and "rotten" for
negative) and taking an average of the
binary scores to come up with an aggregated score between 0% and
100%.  For example, if a movie’s reviews were all mildly positive, Rotten
Tomatoes would assign a sentiment of positive to every review,
resulting in a score of 100%. In contrast, if a movie had very polarizing
reviews, for example, 50 very positive and 50 very negative
reviews, this methodology would result in a potentially misleading
50% aggregated score.

My idea is that rather than use a binary sentiment classification, a continuous score between 0 and 1.0 can be assigned to each movie review.  The aggregate score would then be based on an average of these ratings.

Unfortunately, many publications do not append handy scores to their reviews in order to use them in aggregation. Human taggers can read each review
and assign a score based on the content of the review; however, this is extremely inefficient when hundreds of movies are released each year and many publications write reviews of these movies. This is
where NLP comes in: machine learning can be used automatically assign a review score based on the text content of the headline and review, and that is exactly what I did.

In order to test a number of methods, I used three different types of models: a simple linear regression model, a recurrent neural network (RNN) model and a 1-dimensional convolutional neural network (CNN) model.  The linear regression model used term frequency-inverse document frequency (TF-IDF) to convert the review text into numerical features a model could use.  The RNN and CNN models both used word embeddings (learned during model training) to convert the text into model features.

All models were trained on a subset of data from the [Stanford Network Analysis Project] (https://snap.stanford.edu/data/web-Movies.html), which consists of approximately 8 million Amazon user reviews of over 250,000 movies.  Once the models were trained, I tested it on actual movie reviews from newspaper and websites for four movies and created individual review and aggregate review scores for the four movies.

The full code for this project can be found as a Jupyter notebook [here](https://github.com/edeckter/movie_ratings/blob/master/Deckter_CS584_Project.ipynb).  In addition, there is a paper describing the full experiment and the results [here](https://github.com/edeckter/movie_ratings/blob/master/Deckter_CS584_ProjectReport.pdf).



