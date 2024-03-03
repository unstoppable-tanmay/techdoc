const contributing_sm = (desc) => {
    let md = `
# Contributing Rules

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

Please discuss changes via issue, email, or any other method with the owners before making a change. We have a [code of conduct](https://github.com/kefranabg/readme-md-generator/blob/master/.github/CODE_OF_CONDUCT.md), please follow it in all interactions.

## Table of Contents

- [Setting Up Locally](#setting-up-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up Locally

To install, you need \`node\` and \`npm\`.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork:

    \`\`\`sh
    git clone https://github.com/<your-username>/readme-md-generator.git
    cd readme-md-generator
    \`\`\`

2. Ensure \`node\` >= 9.3.0 and \`npm\` >= 5.5.0.

3. From the root of the project: \`npm install\` to install all dependencies.

4. From the root of the project: \`npm start\` to run the CLI.

> Tip: Keep \`master\` pointing at the original repository and make pull requests from branches on your fork.

## Submitting a Pull Request

Check existing issues and pull requests. Run tests and lint before committing:

\`\`\`sh
npm run test
npm run lint
\`\`\`sh
`
    return md
}

const contributing_md = (desc) => {
    let md = `
# Contributing Rules

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing, discuss changes via issue, email, or any other method with the owners before making a change. Please note we have a [code of conduct](https://github.com/kefranabg/readme-md-generator/blob/master/.github/CODE_OF_CONDUCT.md), please follow it in all interactions.

## Table of Contents

- [Setting Up the Project Locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up the Project Locally

To install, you need \`node\` and \`npm\`.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork:

    \`\`\`sh
    git clone https://github.com/<your-username>/readme-md-generator.git
    cd readme-md-generator
    \`\`\`

2. Ensure your environment has \`node\` version >= 9.3.0 and \`npm\` version >= 5.5.0.

3. From the root of the project: \`npm install\` to install all dependencies.

4. From the root of the project: \`npm start\` to run the CLI.

> Tip: Keep your \`master\` branch pointing at the original repository and make pull requests from branches on your fork.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it.

Also, make sure to run the tests and lint the code before you commit your changes.

\`\`\`sh
npm run test
npm run lint
`
    return md
}

const contributing_lg = (desc) => {
    let md = `
# Contributing Rules

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Please note we have a [code of conduct](https://github.com/kefranabg/readme-md-generator/blob/master/.github/CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Table of Contents

- [Setting Up the Project Locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up the Project Locally

To install the project you need to have \`node\` and \`npm\`.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork:

    \`\`\`sh
    git clone https://github.com/<your-username>/readme-md-generator.git
    cd readme-md-generator
    \`\`\`

2. Your environment needs to be running \`node\` version >= 9.3.0 and \`npm\` version >= 5.5.0.

3. From the root of the project: \`npm install\` to install all dependencies.

    - Make sure you have the latest \`npm\` version.

4. From the root of the project: \`npm start\` to run the CLI.

> Tip: Keep your \`master\` branch pointing at the original repository and make pull requests from branches on your fork. To do this, run:

\`\`\`sh
git remote add upstream https://github.com/kefranabg/readme-md-generator.git
git fetch upstream
git branch --set-upstream-to=upstream/master master
`; return md
}

module.exports = { contributing_lg, contributing_md, contributing_sm }