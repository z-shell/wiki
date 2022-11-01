# Branching

## Quick Legend

|Instance|Branch|Description, Instructions, Notes|
| :---: | :---: | :--- |
|Stable| 	stable| 	Accepts merges from Working and Hotfixes|
| Working | main | Working 	master 	Accepts merges from Features/Issues and Hotfixes|
|Hotfix |	hotfix-* |	Always branch off Stable|

## Main Branches

The main repository will always hold two evergreen branches:

* `main`
* `stable`

The main branch should be considered `origin/main` and will be the main branch where the source code of `HEAD` always reflects a state with the latest delivered development changes for the next release. As a developer, you will be branching and merging from `main`.

Consider `origin/stable` to always represent the latest code deployed to production. During day to day development, the `stable` branch will not be interacted with.

When the source code in the `main` branch is stable and has been deployed, all of the changes will be merged into `stable` and tagged with a release number. *How this is done in detail will be discussed later.*

## Supporting Branches

Supporting branches are used to aid parallel development between team members, ease tracking of features, and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

* Feature branches
* Bug branches
* Hotfix branches

Each of these branches have a specific purpose and are bound to strict rules as to which branches may be their originating branch and which branches must be their merge targets. Each branch and its usage is explained below.

### Feature Branches

Feature branches are used when developing a new feature or enhancement which has the potential of a development lifespan longer than a single deployment. When starting development, the deployment in which this feature will be released may not be known. No matter when the feature branch will be finished, it will always be merged back into the main branch.

During the lifespan of the feature development, the lead should watch the `main` branch (network tool or branch tool in GitHub) to see if there have been commits since the feature was branched. Any and all changes to `main` should be merged into the feature before merging back to `main`; this can be done at various times during the project or at the end, but time to handle merge conflicts should be accounted for.

`<tbd number>` represents the project to which Project Management will be tracked.

* Must branch from: `main`
* Must merge back into: `main`
* Branch naming convention: `feature-<tbd number>`

#### Working with a feature branch

If the branch does not exist yet (check with the Lead), create the branch locally and then push to GitHub. A feature branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

```sh
git checkout -b feature-id main                   // creates a local branch for the new feature
git push origin feature-id                        // makes the new feature remotely available
```

Periodically, changes made to `main` (if any) should be merged back into your feature branch.

```sh
git merge main                                  // merges changes from main into feature branch
```

When development on the feature is complete, the lead (or engineer in charge) should merge changes into `main` and then make sure the remote branch is deleted.

```sh
git checkout main                                 // change to the main branch  
git merge --no-ff feature-id                      // makes sure to create a commit object during merge
git push origin main                              // push merge changes
git push origin :feature-id                       // deletes the remote branch
```

### Bug Branches

Bug branches differ from feature branches only semantically. Bug branches will be created when there is a bug on the live site that should be fixed and merged into the next deployment. For that reason, a bug branch typically will not last longer than one deployment cycle. Additionally, bug branches are used to explicitly track the difference between bug development and feature development. No matter when the bug branch will be finished, it will always be merged back into `main`.

Although likelihood will be less, during the lifespan of the bug development, the lead should watch the `main` branch (network tool or branch tool in GitHub) to see if there have been commits since the bug was branched. Any and all changes to `main` should be merged into the bug before merging back to `main`; this can be done at various times during the project or at the end, but time to handle merge conflicts should be accounted for.

`<tbd number>` represents the Basecamp project to which Project Management will be tracked. 

* Must branch from: `main`
* Must merge back into: `main`
* Branch naming convention: `bug-<tbd number>`

#### Working with a bug branch

If the branch does not exist yet (check with the Lead), create the branch locally and then push to GitHub. A bug branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

```sh
git checkout -b bug-id main                       // creates a local branch for the new bug
git push origin bug-id                            // makes the new bug remotely available
```

Periodically, changes made to `main` (if any) should be merged back into your bug branch.

```sh
git merge main                                      // merges changes from main into bug branch
```

When development on the bug is complete, [the Lead] should merge changes into `main` and then make sure the remote branch is deleted.

```sh
git checkout main                                 // change to the main branch  
git merge --no-ff bug-id                          // makes sure to create a commit object during merge
git push origin main                              // push merge changes
git push origin :bug-id                           // deletes the remote branch
```

### Hotfix Branches

A hotfix branch comes from the need to act immediately upon an undesired state of a live production version. Additionally, because of the urgency, a hotfix is not required to be be pushed during a scheduled deployment. Due to these requirements, a hotfix branch is always branched from a tagged `stable` branch. This is done for two reasons:

* Development on the `main` branch can continue while the hotfix is being addressed.
* A tagged `stable` branch still represents what is in production. At the point in time where a hotfix is needed, there could have been multiple commits to `main` which would then no longer represent production.

`<tbd number>` represents the Basecamp project to which Project Management will be tracked. 

* Must branch from: tagged `stable`
* Must merge back into: `main` and `stable`
* Branch naming convention: `hotfix-<tbd number>`

#### Working with a hotfix branch

If the branch does not exist yet (check with the Lead), create the branch locally and then push to GitHub. A hotfix branch should always be 'publicly' available. That is, development should never exist in just one developer's local branch.

```sh
git checkout -b hotfix-id stable                  // creates a local branch for the new hotfix
git push origin hotfix-id                         // makes the new hotfix remotely available
```

When development on the hotfix is complete, [the Lead] should merge changes into `stable` and then update the tag.

```sh
git checkout stable                               // change to the stable branch
git merge --no-ff hotfix-id                       // forces creation of commit object during merge
git tag -a <tag>                                  // tags the fix
git push origin stable --tags                     // push tag changes
```

Merge changes into `main` so not to lose the hotfix and then delete the remote hotfix branch.

```sh
git checkout main                                 // change to the main branch
git merge --no-ff hotfix-id                       // forces creation of commit object during merge
git push origin main                              // push merge changes
git push origin :hotfix-id                        // deletes the remote branch
```
