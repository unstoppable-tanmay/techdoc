const readme_sm = (desc) => {
    let md = `
# Project Name 🚀

## Description 📝

${desc}

## Table of Contents 📑

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Features](#features)
- [Documentation](#documentation)
- [Contribution](#contribution)
- [License](#license)

## Installation 🌐

Comprehensive installation instructions, including prerequisites, dependencies, and any special considerations.

## Getting Started 🚀

Extensive guidance on how users can quickly start using the project, including examples, configurations, and important steps.

## Features 💡

A detailed list of project features, functionalities, and capabilities. Include screenshots or examples if possible.

## Documentation 📚

Link to the full project documentation. This section can include API reference, architecture overview, or any other relevant documentation.

## Contribution 🤝

In-depth guidelines for contributing to the project. Include information about coding standards, issue tracking, and pull request processes.

## License 📋

Details about the project's license, including any restrictions, permissions, and obligations for users.    
`
    return md
}

const readme_md = (desc) => {
    let md = `
# Project Name 🚀

## Overview 🌐

Welcome to the extraordinary project that solves [insert problem] for [target audience] using cutting-edge technology and innovative solutions.

## Table of Contents 📑

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Detailed Documentation](#detailed-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Support](#support)

## Introduction 📝

${desc}

## Key Features 💡

An extensive list of features, functionalities, and innovative aspects of the project.

## Getting Started 🚀

An elaborate guide on how to quickly set up and start using the project for different environments.

## Installation 🌐

A comprehensive installation guide, including dependencies, configurations, and advanced setup options.

## Usage 🎬

In-depth usage instructions, including advanced features, best practices, and real-world examples.

## Detailed Documentation 📚

Link to the project's extensive documentation, including API reference, architecture, and usage scenarios.

## Contributing 🤝

Guidelines and instructions for potential contributors, code of conduct, and collaboration opportunities.

## License 📋

Information about the project's licensing terms, permissions, and obligations.

## Acknowledgments 🙌

Acknowledgment and appreciation for contributors, libraries, and any third-party resources.

## Contact 📧

Ways to get in touch with the project maintainers, including email and social media.

## Support 🌐

Details about support channels, community forums, and avenues for seeking help or assistance.    
`
    return md
}

const readme_lg = (desc) => {
    let md = `
# Project Name 🚀

## Welcome to the Epic Project! 🌟

## Table of Contents 📑

- [Project Overview](#project-overview)
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Installation Guide](#installation-guide)
- [Usage and Examples](#usage-and-examples)
- [Extensive Documentation](#extensive-documentation)
- [Contributing Guidelines](#contributing-guidelines)
- [License Information](#license-information)
- [Acknowledgments and Credits](#acknowledgments-and-credits)
- [Contact Information](#contact-information)
- [Community and Support](#community-and-support)

## Project Overview 🚀

${desc}

## Introduction 📝

An elaborate introduction, narrating the project's origin, significance, and its potential impact on the world.

## Key Features 💡

A detailed and comprehensive list of features, each explained with examples and use cases.

## Getting Started 🚀

Extensive guides and tutorials to help users quickly get started with the project.

## Installation Guide 🌐

An exhaustive installation guide, covering various environments, configurations, and potential challenges.

## Usage and Examples 🎬

Extensive usage instructions, code examples, and real-world scenarios showcasing the project's capabilities.

## Extensive Documentation 📚

Links to a vast pool of documentation, including API reference, advanced guides, and best practices.

## Contributing Guidelines 🤝

In-depth instructions for contributors, coding standards, pull request guidelines, and collaboration policies.

## License Information 📋

A detailed explanation of the project's licensing terms, permissions, and any legal obligations.

## Acknowledgments and Credits 🙌

A comprehensive section expressing gratitude to contributors, third-party libraries, and influences.

## Contact Information 📧

Multiple ways to reach out to the project maintainers, including email, social media, and official channels.

## Community and Support 🌐

Details about community forums, support channels, and how users can connect and seek assistance.    
`; return md
}

module.exports = {readme_lg,readme_md,readme_sm}