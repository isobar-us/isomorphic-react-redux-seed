# Isomorphic React/Redux Seed

An isomorphic project seed to provide project structure, tooling, and tests. Intended to be modified according to the needs of a project. The app seed utilizes:

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/en/)
* [MongoDB](https://docs.mongodb.org/manual/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Immutable](https://facebook.github.io/immutable-js/)
* [React Router](https://github.com/rackt/react-router)
* [superagent-bluebird-promise](https://github.com/KyleAMathews/superagent-bluebird-promise)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Isparta](https://github.com/douglasduteil/isparta)

In addition to a base project structure, this seed also includes a tooling kit for task management:

* Manage tasks via Gulp and Webpack for development and production
* Transpiles ES6, JSX, and dependency management, and bundles via Babel and Webpack
* Compiles SASS into CSS
* Provides support for sourcemaps
* Compresses images for production
* Provides a configurable source and distribution folder structure
* Enforces code quality via ESLint and an .editorconfig file
* Provides a testing suite based on Mocha/Chai, with code coverage that includes es6 and jsx support via Isparta

## Installation

First, make sure to install [MongoDB](https://docs.mongodb.org/manual/) and create a database.

```
cd C:\MongoDB\bin
mongod --dbpath C:\[app-path]\data
mongo
use isomorphic-poc
```

Add a categories collection.
```
db.categories.insert([{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}])
```

Add a products collection.
```
db.products.insert([{"name":"Bedtime Math","price":10.79,"image":"bedtime.jpg","id":17,"categories":[2]},{"name":"Cowpoke Clyde and Dirty Dawg","price":13.05,"image":"cowpoke.jpg","id":8,"categories":[1]},{"name":"Daredevil: The Daring Life of Betty Skelton","price":12.23,"image":"daredevil.jpg","id":13,"categories":[1,2]},{"name":"Exclamation Mark","price":14.11,"image":"exclamation.jpg","id":7,"categories":[1]},{"name":"Flora and the Flamingo","price":12.74,"image":"flora.jpg","id":12,"categories":[1]},{"name":"Goodnight, Goodnight Construction Site","price":8.1,"image":"construction.jpg","id":15,"categories":[2]},{"name":"If You Want to See a Whale","price":10.56,"image":"whale.jpg","id":4,"categories":[1]},{"name":"Oh, the Places You'll Go!","price":11.44,"image":"places.jpg","id":16,"categories":[2]},{"name":"Ol' Mama Squirrel","price":12.84,"image":"squirrel.jpg","id":11,"categories":[1]},{"name":"Open This Little Book","price":12.9,"image":"littlebook.jpg","id":10,"categories":[1,2]},{"name":"Ribbit!","price":12.05,"image":"ribbit.jpg","id":5,"categories":[1]},{"name":"Steam Train, Dream Train","price":9.93,"image":"steam.jpg","id":2,"categories":[1,2]},{"name":"That Is Not a Good Idea!","price":12.15,"image":"notagoodidea.jpg","id":3,"categories":[1]},{"name":"The Day the Crayons Quit","price":10.37,"image":"crayons.jpg","id":1,"categories":[1]},{"name":"The Going-To-Bed Book","price":5.39,"image":"goingtobed.jpg","id":18,"categories":[2]},{"name":"The Matchbox Diary","price":12.92,"image":"matchbox.jpg","id":9,"categories":[1]},{"name":"The Story of Fish and Snail","price":9.93,"image":"fishandsnail.jpg","id":6,"categories":[1]},{"name":"The Very Hungry Caterpillar","price":16.78,"image":"caterpillar.jpg","id":14,"categories":[1]}])
```

Install node modules.
```
npm install
```

## Compile Assets

### Development

```
gulp watch
```

### Production (will run tests)

```
gulp build
```

## Start the App

```
npm start
```

## Run tests

```
npm test
```

## Generate code coverage

```
npm run-script coverage
```

View in the browser at: <code>http://localhost:3000/</code>
