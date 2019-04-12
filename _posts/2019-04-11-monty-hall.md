---
layout: post
title: 'Simulating the "Monty Hall Problem"'
date: 2019-04-11 10:30 -0500
comments: false
---
Back when I was first learning R, I decided to write a simulation to solve the age-old "Monty Hall problem."

For those of you who don't remember the old television program *Let's Make a Deal* hosted by Monty Hall, here is the setup.

You are a contestant on *Let's Make a Deal* hosted by Monty Hall.  Monty offers you a prize hidden behind 1 of 3 doors.  Two of the doors hide a goat (joke prize) and one door hides a car.  Once you pick, Monty will reveal a goat behind one of the doors not picked.  Should you stick with your original door or switch to the remaining door?  

Why Simulation?
================
While this problem can be solved with statistics, sometimes showing is better than telling.  If you simulate a large number of runs, you should reach convergence.  Simulation is a great way to get a lot of data for a given problem without having to wait to collect it in real time.  For example, if you wanted to have 10,000 years of hurricane history, you could either become immortal and wait 10,000 years, or you could run a simulation.

The key to simulation is to utilize randomization.  In the Monty Hall simulation, I randomize which door hides the car (door 1, 2 or 3) and then I also randomize which door the simulated contestant selects for each iteration.  This randomization avoids bias in my simulation.

The Code
==============
~~~ R
#Set number of simulations
n <- 10000

#Create data frame for win outcome (whether you win a car or a goat)
outcome <- data.frame(matrix(ncol=2, nrow=n))
names(outcome) <- c("stick","switch")

for (i in 1:n) {
  #Prize vector
  prize <- c("goat","goat","goat")

  #Randomly place car behind one door
  prize[sample(1:3,1)] <- "car"

  #Pick a door
  door <- sample(1:3,1)

  #Monty reveals a goat ("known_goat" door is the door Monty opens)
  goat_doors <- data.frame(door = which(prize=="goat"), picked = which(prize=="goat") == door)
  known_goat <- ifelse(goat_doors$picked[1]==FALSE && goat_doors$picked[2]==FALSE,goat_doors$door[1],goat_doors$door[goat_doors$picked==FALSE])


  #Prize won
  outcome[i,] <- c(prize[door],prize[-c(door,known_goat)]) #prize behind original door and prize behind remaining door
}

#Calculate winning percentage for sticking with the original door vs. switching doors
win_odds <- c(stick = sum(outcome$stick=="car")/n, switch = sum(outcome$switch=="car")/n)
~~~

Outcome
===========
The bar chart below shows the percentage of simulations the car is won depending on whether the contestant decided to stick with the original door choice or switch to the other door.

<img src="{{'images/monty_hall.jpeg' | relative_url }}">

As you can see, you are twice as likely to win if you switch doors after Monty reveals a goat!



