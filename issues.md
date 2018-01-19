# Issues

In the Moving Forward Project, we leverage Github issues to efficantly translate work done into documentable efforts.

## Issue Assignments

In the olde days of chat issues, devs would accept issues that were created by the CS team. Instead, developers assign github issues to themselves and document changes in the comment section, closing the issue upon completion.

## Issue Types

There are two types of issues.

### Support

- Created by the Customer Service team and is eventually translated into a Developer issue with more a more elaborate selection of relevent labels, milestones and projects.
- Notated with the `team:support` label.

### Developer

- Created by a developer to keep track of work that has been done and what work needs to be done.
- Notated with the `team:developer` label.

## Labels

### Team (#006B75)

The team that initialized the issue.

- `team:support`
  - a member of the Customer Service team created this issue.
- `team:developer`
  - a member of the Developer team created this issue.

### Addition (#91CA55)

Brand new functionality. New pages, workflows, endpoints, etc.

- `addition:feature`
  - this issue is intended to be a new feature.

### Environment (#FAD8C7)

Server environment, With good QA, you'll identify issues on test and staging deployments.

- `environment:staging`
  - this issue pertains to a release that is currently in staging.
- `environment:test`
  - this issue pertains to our local testing environment.

### Experience (#FFC274)

Affect user’s comprehension, or overall enjoyment of the product. These can be both opportunities and “UX bugs”.

- `experience:design`
  - this issue pertains to the way something looks.
- `experience:ux`
  - this issue pertains to user flow.

### Feedback (#CC317C)

Requires further conversation to figure out the action steps. Most feature ideas start here.

- `feedback:discussion`
  - by default, all `team:support` issues are `feedback:discussion` issues.
  - also used for developers if they want to document a discussion.
- `feedback:question`
  - this issue is a question about functionality.
- `feedback:request`
  - this issue is a request for new or different functionality.

### Improvement (#5EBEFF)

Iterations on existing features or infrastructure. Generally these update speed, or improve the quality of results. Adding a new “Owner” field to an existing “Calendar” model in the API, for example.

- `improve:enhance`
  - this issue pertains to improving upon an existing feature
- `improve:optimize`
  - this issue pertains to improving the efficiancy or performance of a feature.
- `improve:docs`
  - this issue pertains to improving existing documentation or adding new documentation.

### Inactive (#D2DAE1)

No action needed or possible. The issue is either fixed, addressed better by other issues, or just out of product scope.

- `inactive:duplicate`
  - this issue is a duplicate of another issue
- `inactive:invalid`
  - this issue is simply invalid in our project's scope.
- `inactive:wontfix`
  - this issue described intended functionality or a bug which will never be fixed.

### Mindless (#FEF2C0)

Converting measurements, reorganizing folder structure, and other necessary (but less impactful) tasks.

- `mindless:chore`
  - any mindless/chore task, especially things like sysadmin.
- `mindless:legal`
  - changes made to the website in respect to a legal request or responsibility.

### Pending (#FBCA04)

Taking action, but need a few things to happen first. A feature that needs dependencies merged, or a bug that needs further data.

- `pending:in progress`
  - this issue has work thats begun on it but something else has to happen before this issue can be completed.
- `pending:on hold`
  - something else has to happen before work on this issue can begin.
- `pending:watchlist`
  - this issue needs more information before we can act.

### Platform (#BFD4F2)

If the repository covers multiple parts, this is how we designate where the issue lives. (i.e. web, mobile).

- `platform:chrome`
- `platform:edge`
- `platform:firefox`
- `platform:safari`

### Project (#F496FF)

This is how we designate what specific set of features this issue is pertinent to.

- `project:google sync`
- `project:leads`
- `project:call list`
- `project:check list`
- `project:calendar`

### Problem (#EE3F46)

Issues that make the product feel broken. High priority, especially if its present in production.

- `problem:bug`
  - this issue pertains to unexpected behaviour in the project.
- `problem:security`
  - this issue pertains to a security flaw like exposure to XSS, SQL Injection, Insecure Connections (i.e non-SSL), etc.
- `problem:fatal`
  - this issue is of the upmost importance in regards to other problems. This issue pertains to something that is causing fatal errors, website crashes, massive security flaws, et cetera.

### Version (#5319E7)

The effect an issue has on the versioning of the release of the project.

- `version:compatible`
  - this issue does not create a change that would not require another application to update their usage of our API or application. (i.e an endpoint takes the same parameters and returns the same data, but was changed to perform better)
- `version:incompatible`
  - this issue creates a change that would break if another application didn't update their usage of our API. (i.e an endpoint is removed or replaced)