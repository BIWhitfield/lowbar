# lowbar
A re-implementation of some of the functions from the JS library Underscore.

## Installation

You will need to have Node.js installed to run this. Check if you have Node installed by typing the following in your terminal:

``node -v``

You should see `v8.1.3` if not you may need to upgrade your version to run this.

If you do not have Node installed follow this guide - https://nodejs.org/en/download/package-manager/#osx

You will also need npm installed. Check your version:

``npm -v``

Again the version used in this project is `4.6.1` and you should see this, or a variation of it, if you have it installed

To install npm follow this guide - https://docs.npmjs.com/getting-started/installing-node


Clone the repository to your own machine and install dependencies.

``git clone https://github.com/BIWhitfield/lowbar``

``npm i``

## Run Tests

``npm t`` 

## About

This project is made up of two parts. The first is an implementation of some of the more simple Underscore methods. The code for these can be found in the Lowbar.js file. The second is an implementation of some of the more advanced Underscore methods. The code for these can be found in the advancedLowbar.js file.

## Lowbar

* identity
* first
* last
* each
* indexOf (including binary search)
* filter
* reject
* uniq
* map
* pluck
* reduce
* contains
* every
* some
* extends
* defaults

## Advanced Lowbar

* once
* memoize
* delay
* shuffle
* invoke
* sortBy 
* zip
* sortedIndex
* flatten
* intersection
* difference
* throttle
