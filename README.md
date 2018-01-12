# ranks-tf

Please read specification.md for more information about contribution and development guidelines.

## Project

The project consists of several parts, the core of the project is in .NET Core, utilizing Node.js as a helper process during compilation.

- Docker Container
    - WebAPI
        - Interacts with the database and handles a RESTful API.
        - Entirely serverside C#
    - MVC Website
        - Interacts with the WebAPI and servers content to users.
        - Serverside C#
        - Clientside Webpages
    - Node.js
        - Transpiles clientside Typescript for webpages
        - Transpiles clientside SCSS for webpages

## Getting Started

The MFP utilizes certain third party frameworks and libraries that have to be installed prior to working in or building this project.

- [Docker](https://www.docker.com)
- [.NET Core 2](https://www.microsoft.com/net/download/macos)
- [Doxygen](http://www.stack.nl/~dimitri/doxygen/download.html)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

You can install all of the NPM dependencies by running `npm install` the following command in the project root.

You also might want to install Gulp globally so that you have access to it at command line.
```
sudo npm install --global gulp
```

If installing globally isn't an option then you can use the following command in place of the `gulp` command line utility.
```
npm run gulp

# For example
npm run gulp lint
npm run gulp docs
npm run gulp build
```

**If any of these dependencies are missing, you will not be able to fully build this project.**

## Building, Cleaning, Testing, Etc

We use Gulp 4 in order to simplify our build process. This is similar to Makefiles and CMakefiles, except Gulp is a Nodejs framework which allows us to asynchronously stage the build and deploy process for our project.

The following are the basic gulp commands we've set up for developing on this project, and you'll likely not have to use any of the advanced options that aren't documented here.

### gulp clean
> Cleans up files produced during building and docbuilding, as well as any files downloading to assist with building.

### gulp lint
> Runs sasslint and tslint across .scss and .ts files, outputting information on the linted validity and consistency of our code.
>
> C# linting is done via stylecop in Visual Studio.

### gulp docs
> Generates HTML documentation for SCSS, Typescript and C# thats been documented. Outputs generated docs to the `docs/` folder.

### gulp build
> Transpiles typescript in `src/ts/` to ES2015 JavaScript in `wwwroot/js/`, then uses browserify and babelify to generate compatible ES5 web JavaScript.
>
> Transpiles SCSS in `src/sass/` to CSS in `wwwroot/css/`.
>
> Builds the RanksTF solution using MSBuild and the .NET Core `dotnet` command line utility.

### gulp test
> Uses the builtin `dotnet test` command line utility to run xUnit tests across our test projects - if any exist.

### gulp full
> Runs `clean`, `docs`, and `build` in series.

### gulp fulltest
> Runs `clean`, `docs`, `build`, and `test` in series.

### gulp
> Same as `gulp fulltest`.

## Contributing

Consider using Visual Studio Code to work in this project. We recommend installing the C# and Docker extensions.

### Branches

We utilize Git Flow for our branching strategies. Please see [specification.md](specification.md) for more information on branching and contributing.

- The stable branch is used to deploy from, and is considered the "master" branch that represents the live website.
- The master branch is an idle branch that may be used in the future as a replacement for stable if we decide to make stable the operative testing branch for users.