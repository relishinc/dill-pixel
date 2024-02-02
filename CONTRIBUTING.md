# Contributing to Dill Pixel

Thanks for joining us here and we look forward to hearing from you! We welcome feedback, input, suggestions, code improvements, whatever you are up for bringing to the table.  

What follows are guidelines to help you successfully be part of the Dill Pixel experience.  

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I just have a question, how do I get in touch?](#i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)

[Development/Release Process](#development-release-process)
  * [Feature Development](#feature-development)
  * [Releases](#new-version-release)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [devops@reli.sh](mailto:devops@reli.sh).

## I just have a question!!!

If you just have a question, for now, just email as at [devops@reli.sh](mailto:devops@reli.sh) and we'll make sure the question gets to the right people.


## What should I know before I get started?

This project has been through the hands of many developers within our studio over many many years. While it is an opinionated approach to game development, we are open to feedback and improvements. 

## How Can I Contribute?

### Reporting Bugs

Fidn something wrong? Then submit a bug report for Dill Pixel. Use these guidelines to help us understand your report, reproduce the behaviour, and find related reports.

Before creating bug reports, please check the [open bugs](https://github.com/relishinc/dill-pixel/issues) to see if you need to create a new one or just contribute to an existing report. When you are creating a bug report, please [include as many details as possible](#submit-a-good-bug-report). 

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Submit A Good Bug Report!

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). You can find the Dill Pixel bugs [here](https://github.com/relishinc/dill-pixel/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of Dill Pixel are you using?** check your project's package.json to find out.
* **What's the name and version of the OS you're using**?

### Suggesting Enhancements

If you have a suggestoin for new features or minor improvements to existing functionality, follow these guidelines to help make your suggestion:  

Before creating enhancement suggestions, please check [this list](https://github.com/relishinc/dill-pixel/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement+) as you might find others who've made the same request.  

When you are creating a suggestion, please [include as many details as possible](#submitting-a-good-enhancement-suggestion). 


#### Submitting A Good Enhancement Suggestion

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Head over [here](https://github.com/relishinc/dill-pixel/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement+) to create an issue and try to provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Atom which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most Dill Pixel users and isn't something that should be just part of the boilerplate project or a standalone package. Why does it improve the game development experience for everyone?


### Your First Code Contribution

Unsure where to begin contributing to Dill Pixel? You can start by looking through these `beginner` and `help-wanted` issues:

* [Good First Issues][https://github.com/relishinc/dill-pixel/labels/good%20first%20issue] - issues which should only require a few lines of code.
* [Help wanted issues][https://github.com/relishinc/dill-pixel/labels/help%20wanted] - issues that are more involved or complex than `beginner` issues.

### Pull Requests

Using pull requests will help maintain the quality of the project and provides a sustainable way for maintainers to review bug fixes and updates. Please ensure your code and commits follow the [styleguides](#styleguides)


## Styleguides

### Git Commit Messages
Commits should follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/). This will allow us to automate the release process and generate the changelog.

### Development / Release Process

#### Feature development

1. Develop your features in a separate branch in a feature or fix folder, E.G.: `git checkout -b feature/feature-name` or `git checkout -b fix/fix-name`.
2. As you're working on your feature, commit the branch to origin, E.G.: `git push -u origin feature/feature-name` (first commit) or `git push` (subsequent commits).
3. When ready with the feature or fix, create a PR against develop for others to review.
4. Fix any merge conflicts
5. When PR the is approved a project maintainer will merge the feature branch into develop.

#### New Version Release

1. When a release is ready, create a release branch off develop, E.G.: `git checkout develop && git pull`,
   then `git checkout -b release/release-name`.
2. Test and fix any bugs.
4. Make a PR of the `release` branch into `main`.
5. The release Github Action should trigger Semantic Release on the main branch. Semantic Release will analyze the commit messages, increment the version number, generate the changelog, and publish the new version.