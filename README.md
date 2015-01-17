# ATTENDANCE

## Prerequisites
* *MongoDB* - <a href="http://www.mongodb.org/downloads">Download</a> and Install mongodb - <a href="http://docs.mongodb.org/manual">Checkout their manual</a> if you're just starting.
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *Git* - Get git using a package manager or <a href="http://git-scm.com/downloads">download</a> it.
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```
$ npm install -g grunt-cli
```

## Installation

```
$ npm install
$ bower install
```

### Invoke node with Grunt
We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:
```bash
  $ grunt
```
If grunt aborts because of JSHINT errors, these can be overridden with the `force` flag:
```bash
  $ grunt -f
```
Alternatively, when not using `grunt` (and for production environments) you can run:
```bash
  $ node server
```
Then, open a browser and go to:
```bash
  http://localhost:3000
```

### Files structure
The file structure is similar to that of the mean project itself

`Fundamental` Files at the `root` of the package

**Server**

Packages are registered in the **app.js**
Defines package name, version and `mean=true` in the **package.json**

All of the Server side code resides in the `/server` directory.

    Server
    --- config        # Configuration files
    --- controllers   # Server side logic goes here
    --- models        # Database Schema Models
    --- routes        # Rest api endpoints for routing
    --- views         # Swig based html rendering

**Client**

All of the Client side code resides in the `/public` directory.

    public
    --- assets        # Javascript/Css/Images (not aggregated)
    --- controllers   # Angular Controllers
    --- config        # Contains routing files
    --- services      # Angular Services (also directive and filter folders)
    --- views         # Angular views

All javascript within public is automatically aggregated with the exception of files in assets which can be manually added using the `aggregateAsset()` function

### Environmental Settings

To run with a different environment, just specify NODE_ENV as you call grunt:
```bash
    $ NODE_ENV=test grunt
```
If you are using node instead of grunt, it is very similar:
```bash
    $ NODE_ENV=test node server
```
To simply run tests
```bash
    $ npm test
```
> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## More Information
  * Visit us at [Linnovate.net](http://www.linnovate.net/).
  * Visit our [Ninja's Zone](http://www.meanleanstartupmachine.com/) for extended support.

## License
We belive that mean should be free and easy to integrate within your existing projects so we chose the [The MIT License](http://opensource.org/licenses/MIT)
