# ec-app
- A single-page client-side application that allows a teacher to browse homework assignments and submissions.

### Current Version: 1.1.1

## Notice:
If cloning this repository, please note that there are two bugs with the dependencies:
1. Materialize has a bug with the tabs indicator when coupled with angular.  The code to calculate the positioning of the indicator fires before the tabs are loaded.  The bug is corrected in the production version, but if you download the dependencies via bower you can expect this bug to persist.
2. Angular-Materialize has a bug with the modal when closing an error will appear in console.  This has been fixed in the production version, but if you are cloning the repository and downloading dependencies via bower you can expect this error to appear.

## Getting Started
1. ```$ npm install```
3. ```$ bower install```
2. ```$ npm start```
3. Open browser to http://localhost:3000

## Default Usage
https://whispering-brook-13648.herokuapp.com/#/

## Alternative Usage
```$ grunt serve-dev```

## Changelog
- v1.1.1 (3/27/2016)
	- release
- v0.1.1 (3/26/2016)
	- fixes uncaught reference error
- v0.1.0 (3/24/2016)
	- initial commit