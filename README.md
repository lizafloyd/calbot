# calbot
Calbian Transportation Authority Helper

## Setup
Please use a modern node version. I'm using node v18.15.0.
(If you want to use a different node version for this repo, I recommend using a version manager like (nvm)[https://github.com/nvm-sh/nvm].)
Once you have this repo cloned, run:
`npm install`

## Running the App
Now you should be able to use the commands below!
`npm run hello` - Calbot, Calbia's v1 Fare Helper, will return a health check message
`npm run calculateFare <fare> <coins>` - pass in your fare followed by a comma delimited list of the coins you have available
For example, `npm run calculateFare 7 1,6`
`npm run test` - runs the Jest test suite

## Remaining to Be Done
Unfortunately, I do have a bug. My recursion is not properly handling the case where the first coin needs to be ejected if the second coin is a relatively large denomination. My next step on this would be to talk through the problem with a coworker or friend who is more used to writing complex logic. 


# Thanks for reading!