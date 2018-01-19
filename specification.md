**Note: The following specification is an MIT-licensed specification that I've created to provide a strict guideline for collorative projects.**

# Moving Forward

This document is a specification on the workflow and operations that all projects moving forward should follow. "Moving Forward" and "The Project" refers to the ranks-tf Repository, its projects and all of its components.

Below is a description of The High Level Goal that this specification is strategized towards.

The pathway described following is the high level strategy that this document plots within in order to move towards The Goal.

## The Goal

- Reduce Developer Debt to nearly nothing by leveraging consistent conventions and powerful develeoper operations.
- Excede the standards upheld by the Open Source Software community in an effort to improve our internal development strategies.

### Actions and Pathway

- Leverage modern development strategies to simplify our development workflow.
  - Docker
  - .NET + C#
    - ASP.NET Core MVC
    - ASP.NET Core WebAPI
    - StyleCop
    - dotnet test (xUnit)
  - Node.js
    - Gulp
  - Refactor
  - Integration
  - Git
    - GitHub Issues
    - GitFlow
  - Consider: PubSub
  - Documentation
    - C# Meta Documentation
    - Knyle Style Sheets
    - TypeDoc
- Leverage modern deployment strategies to reduce deployment stress on developers.
  - Continuous Integration; Continuous Development
  - Auto-Deploy
  - Consider: Opt-In Beta Testing
  - GitFlow
- Leverage modern versioning strategies to improve version structure and control.
  - SemVer
  - GitFlow

## Development

Moving Forward will utilize modern platforms for further development. The platforms of choice are:

- Docker
  - Utilized to "containerize" our entire project. The point of this is to ensure that the environment that our project exists in is consistent across all computers.
- ASP.NET Core
- Node.js
  - Transpiles Sass and Typescript to CSS and Javascript respectively.
  - Lints our Typescript and Sass to ensure consistency and completeness.
- C# 7.1
  - Runs on the server. Does not interact directly with users ever. 
- [Javascript ES6](https://github.com/lukehoban/es6features)
  - Runs on the client. Acts as the mediary between the user and the server.
  - We will *not* depend on client side code for security in any scenario, it only exists as a courtesy to the user.
  - Leverage the standards implemented in [Javascript's ECMAScript 2015](https://github.com/lukehoban/es6features). 
- TypeScript 2.6
  - Transpiles directly to Javascript and has full backwards compatibility with existing javascript code.
  - Working in TypeScript 2.6 has precedence over Javascript. All code that normally would be client-side JS will be created using TypeScript.
  - TypeScript uses very familiar JavaScript and C# Syntax in order to introduce easy strong-typing into web development. 
  - Leverage TypeScript's strong-typing to simplify the debugging process, reducing issue completion time.
- HTML5
- Sass/SCSS/CSS3
- Consider: PubSub
  - Using PubSub will allow us to completely segregate third party integrations from the base feature theyre extending from.
  - For example, Google Sync and Contacts are tightly intertwined and the code thats involved in contacts is more immense and less documentable because of how embedded google syncing is in the process.
    - Utilizing a PubSub paradigm will allow us to separate dependent events like this into categories, and for integrations like Google Sync to subscribe to those category feeds.

## Repository Workflow

### Versioning and Tagging

The Project will not be rolling release. All releases Moving Forward will follow the GitFlow specification described in [Branching](#branching), as well as the tagging specification as described in this section.

 - Versions are to be dictated by the [SemVer Specification](https://semver.org/)
 - Versions less than 1.0.0 are considered "rapid development" and release tags should be release with the "-rapid" suffix. (i.e 0.5.1-rapid).
 - The version should only be changed when a release branch is ready to be merged into develop and master.

### Branching

- Braches are to be dictated by the [GitFlow Specification](https://datasift.github.io/gitflow/IntroducingGitFlow.html) and the ["Successful Branching Model"](http://nvie.com/posts/a-successful-git-branching-model/)
- Merges should utilize --no-ff unless the branch was a fatal branch. This preserves historical informion on branches even if the branch is deleted.
  - GitHub Merges and Pull-Requests use --no-ff by default.
- Delete feature branches that have been merged into stable (master).
- Branch names should begin with a suffix correlative to their type:
  - hotifx-*
  - release-*
  - feature-*
- IF there is a release branch present, hotfixes should merge into that release branch.
- IF there is NOT a release branch present, hotfixes should merge into develop.

### Merging

- All merges should be initiated via a pull request so that the changes can be reviewed by another user.
- The reviewer must ensure that all of the linting, documentation, convention, and testing guidelines have been properly followed.
- The reviewer must also understand the checks done by our CI and our Code Coverage/Quality analysis tools and only approve the merge after those checks have passed.
- If all is good, then the reviewer may approve the pull request. Otherwise, the reviewer should request additional changes or deny the pull request.

## Testing

- New endpoints and changes to the API will be unit tested using dotnet test.
- New features, especially those that exist in the webpage UI, will be tested using integration testing.
- **feature** branches will be tested locally before being merged.
- **release** branches will be tested locally before being merged.
- **hotfix** branches will be tested locally before being merged.
- Consider: Opt-In Beta Testing for users who are willing to test features in our current release branch.

## Deploying

Deploying will, in almost all cases, be automated by Continuous Integration.

- From Release.
   - CICD will compile, review and lint codebase. CICD deploys release into test server if all steps are successful.
- From Stable (master).
  - CICD will compile, review and lint codebase. CICD deploys stable into LIVE SERVER if all steps are successful.
- **Never** commit a file which cannot be diff'd. Binaries and compiled libraries cannot be diff'd by git and therefore are a waste of space on the repository.
  - Additionally, the CICD will compile and deploy the commited codebase and therefore will not rely on binaries stored in the repository.

## Conventions

### C#

- Conventions and Coding Practices are described by the [StyleCop Specification](https://stylecop.pdelvo.com/) and the [Microsoft C# Framework Design Guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/).
- Automatic convention linting will be maintained by the [StyleCop.Analyzers Nuget Package](https://www.nuget.org/packages/StyleCop.Analyzers/)
- Code reviews should **always** be declined if the code does not pass our StyleCop Specification.

### Typescript

- Conventions and Code Practices are described by the [Microsoft Contributor Rules](https://github.com/Microsoft/tslint-microsoft-contrib).
- Automatic convention linting will be maintained by [TSLint](https://github.com/palantir/tslint).
- Code reviews should **always** be declined if the code does not pass our TSLint Rules.
- Client side code will exist **completely separate** from any webpage code.

### SASS

Assuming we're using SASS or SCSS.

- Conventions and Code Practices are described by ...
- Automatic convention linting will be maintained by [Sass Lint](https://github.com/sasstools/sass-lint).
- Stylesheet code will exist **completely separate** from any webpage code.

## Documentation

The following information is a strict guideline that must be followed for any code before it can be merged into develop, release, or stable (master). Code reviews and publishes will be **DENIED** if these guidelines are not met.

Some of our new Documentation rules will be enforced by our linters, but not everything can be automatically enforced.

### Why so serious?

The bit of extra work required to properly document and ensure consistency in documentation is worth it. It will allow us to not only have a better understanding of our own code, but also allow our current and future teammates to easily traverse and understand our code.

In the long haul, it will ensure that teammates both new and old will be able to quickly introduce new features into the codebase as well as fix present bugs and issues.

### Guidelines

All public, protected and internal types and type members in C# will be fully documented using C#'s built in documentation tools. You can see more about C#'s documentation metalanguage [here.](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/xmldoc/recommended-tags-for-documentation-comments) This is enforced by StyleCop.

All S/CSS selectors and types specified by us (and not third party libraries) will be documented using [SassDoc.](http://sassdoc.com/) You can see more about the Knyle Style Sheets documentation metalanguage [here.](http://sassdoc.com/annotations/)

All public and protected modules, types, and type members in TypeScript will be fully documented using [TypeDoc.](http://typedoc.org/) You can see more about TypeDoc's documentation metalanguage [here.](http://typedoc.org/guides/doccomments/)

## Logging
	
- Logging in C# will be done using Phxvyper's fork of the FOSS Logger Implementation. It allows for simple and fast middleware implementing.
  - An implementation of Phxvyper's FOSS Logger fork can be found [here](https://github.com/phxvyper/MilkBot/tree/master/MilkBot.Core).
- Log files should **always** be maintained in the ~/Logs folder, where ~/ is the project's executable path.
- All dates and times in logs will be formatted in ISO at timezone UTC-0. 

## Issues

- Issues will be maintained on the repository's Issues page. (GitHub Issues)
- Issue Tag Colours will follow the [Bestpractice Styleguide](https://robinpowered.com/blog/best-practice-system-for-organizing-and-tagging-github-issues/) described under Label Groups.
- All issues will be tagged according to the proper categorization.