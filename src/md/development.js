const development_sm = (desc, tree, dependencies) => {
    let md = `
## Overview 🌐

${desc}

## Table of Contents 📑

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Integration Points](#integration-points)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Appendix](#appendix)

## Introduction 📝

An introduction to the project, its purpose, goals, and how it addresses specific challenges or requirements.

## Project Structure 🏗️

\`\`\`
${tree}
\`\`\`

## Dependencies 📦

${dependencies}

## Configuration ⚙️

Details about project configuration, environment variables, and any customizable settings.

## API Reference 📘

Comprehensive documentation of the project's APIs, including endpoints, request/response examples, and authentication details.

## Database Schema 🛢️

Documentation of the database schema, including tables, relationships, and data types.

## Integration Points 🔄

Information about any external services or systems the project integrates with.

## Deployment 🚀

Guidelines and steps for deploying the project to different environments, including production.

## Troubleshooting 🛠️

Common issues and solutions, troubleshooting tips, and known limitations.

## Appendix 📑

Additional resources, glossary, and any other supplementary information.
`
    return md
}

const development_md = (desc, tree, dependencies) => {
    let md = `
# Project Name 📚

## Table of Contents 📑

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Components and Modules](#components-and-modules)
- [Dependencies and Technologies](#dependencies-and-technologies)
- [Configuration and Settings](#configuration-and-settings)
- [API Documentation](#api-documentation)
- [Database Design and Schema](#database-design-and-schema)
- [Integration Points and Interfaces](#integration-points-and-interfaces)
- [Deployment Strategies](#deployment-strategies)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Appendix and Additional Resources](#appendix-and-additional-resources)

## Introduction 📝

An extensive introduction to the project, its background, and the purpose of this documentation.

## Project Overview 🚀

${desc}

## Architecture 🏛️

Detailed information about the project's architecture, including design patterns, methodologies, and key concepts.

## Components and Modules 🧩

\`\`\`
${tree}
\`\`\`

## Dependencies and Technologies 📦

${dependencies}

## Configuration and Settings ⚙️

Configuration details, settings, and how to customize the project for different environments.

## API Documentation 📘

Comprehensive documentation for APIs, endpoints, request/response examples, and authentication details.

## Database Design and Schema 🛢️

In-depth information about the database design, schema, relationships, and data models.

## Integration Points and Interfaces 🔄

Details about how the project integrates with external services, APIs, and other systems.

## Deployment Strategies 🚀

Guidelines and strategies for deploying the project in different environments, including production.

## Troubleshooting Guide 🛠️

A comprehensive guide to troubleshooting common issues, debugging tips, and resolutions.

## Appendix and Additional Resources 📑

Supplementary resources, glossary, links to external documentation, and any other relevant information.
`
    return md
}

const development_lg = (desc, tree, dependencies) => {
    let md = `
# Project Name 📚

## Welcome to the Ultimate Project Documentation Experience! 🚀📑

## Table of Contents 📑

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Architecture and Design Philosophy](#architecture-and-design-philosophy)
- [Components, Modules, and Microservices](#components-modules-and-microservices)
- [Dependencies, Libraries, and Technologies](#dependencies-libraries-and-technologies)
- [Configuration, Customization, and Extensibility](#configuration-customization-and-extensibility)
- [API Reference and Endpoints](#api-reference-and-endpoints)
- [Database Design, Schema, and Advanced Querying](#database-design-schema-and-advanced-querying)
- [Integration Points, Webhooks, and External Interfaces](#integration-points-webhooks-and-external-interfaces)
- [Deployment Strategies, Orchestration, and Scaling](#deployment-strategies-orchestration-and-scaling)
- [Troubleshooting Guide, Debugging Techniques, and Advanced Solutions](#troubleshooting-guide-debugging-techniques-and-advanced-solutions)
- [Appendix, Glossary, and Additional Resources](#appendix-glossary-and-additional-resources)

## Introduction 📝

A warm and detailed introduction to the project, its origins, and the purpose of this extensive documentation.

## Project Overview 🌐

${desc}

## Project Structure 🏗️

\`\`\`
${tree}
\`\`\`

## Architecture and Design Philosophy 🏛️

A deep dive into the project's architectural decisions, design principles, and the philosophy driving development.

## Components, Modules, and Microservices 🧩

An exhaustive breakdown of the project into various components, modules, and the microservices architecture.

## Dependencies, Libraries, and Technologies 📦

${dependencies}

## Configuration, Customization, and Extensibility ⚙️

An in-depth guide on configuring the project, customizing features, and extending functionalities.

## API Reference and Endpoints 📘

Extensive documentation for APIs, endpoints, data models, authentication, and examples of API usage.

## Database Design, Schema, and Advanced Querying 🛢️

Advanced insights into the database design, schema considerations, and complex query scenarios.

## Integration Points, Webhooks, and External Interfaces 🔄

A detailed overview of integration points, webhooks, and interfaces connecting the project with external systems.

## Deployment Strategies, Orchestration, and Scaling 🚀

Guidelines for deploying the project, orchestrating services, and strategies for scaling in various environments.

## Troubleshooting Guide, Debugging Techniques, and Advanced Solutions 🛠️

A comprehensive guide to troubleshooting, advanced debugging techniques, and solutions for complex issues.

## Appendix, Glossary, and Additional Resources 📑

Supplementary materials, a comprehensive glossary, and links to additional resources for further exploration.
`; return md
}

module.exports = { development_lg, development_md, development_sm }