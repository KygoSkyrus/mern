# Contributing to SKYBLOG

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owner of this repository before making a change.


## Table of Contents

- [Setting Up the project locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up the project locally

To install the project you need to have `node` and `npm`

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone
    your fork:

    ```sh
    # Clone your fork
    git clone https://github.com/<your-username>/react-skyblog.git

    # Navigate to the newly cloned directory
    cd react-skyblog
    ```

2.  Your environment needs to be running `node` version = 16.20.2 and `npm` version = 8.19.2

3.  from the root of the project: `npm install` to install all server side dependencies

4.  from the *client* folder of the project: `npm install` to install all client side dependencies

    - make sure you have latest `npm` version

5.  from the root of the project: `npm start` or `npm run dev` to the server.

6.  from the client folder of the project: `npm run start` to the run the react app.

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/KygoSkyrus/react-skyblog.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it.
