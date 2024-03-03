#!/usr/bin/env node

const dree = require('dree');
var clc = require("cli-color");
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const openai = require("openai").default

const { development_sm, development_md, development_lg } = require('./md/development');
const { readme_sm, readme_md, readme_lg } = require('./md/readme');
const { research_sm, research_lg, research_md } = require('./md/research');
const { contributing_lg, contributing_sm, contributing_md } = require('./md/contributing');

const [, , ...arg] = process.argv;
const dirPath = process.cwd();

function getDependencies(packageJsonPath) {
    try {
        // Read the content of the package.json file
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');

        // Parse the JSON content
        const packageJson = JSON.parse(packageJsonContent);

        // Extract dependencies
        const dependencies = packageJson.dependencies || {};

        // Extract devDependencies
        const devDependencies = packageJson.devDependencies || {};

        // Merge dependencies and devDependencies
        const allDependencies = { ...dependencies, ...devDependencies };

        // Convert the dependencies object to a string
        const dependenciesString = Object.entries(allDependencies)
            .map(([package, version]) => `${package}: ${version}`)
            .join('\n');

        return dependenciesString;
    } catch (error) {
        console.error('Error reading or parsing package.json:', error.message);
        return null;
    }
}

function readJsonFile(filePath) {
    try {
        // Read the content of the JSON file
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON content
        const jsonData = JSON.parse(fileContent);

        return jsonData;
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error.message);
        return null;
    }
}

function getDotStartingFolder(dirPath) {
  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(dirPath);

    // Filter out folders that start with a dot
    const dotStartingFolders = contents.filter(item => fs.statSync(path.join(dirPath, item)).isDirectory() && item.startsWith('.'));

    return dotStartingFolders.map(folder => `/${folder}/`);
  } catch (error) {
    console.error('Error reading directory:', error.message);
    return null;
  }
}

function createMarkdownFile(fileName, mdContent, filePath) {
    try {
        // Combine the filePath and fileName to create the complete file path
        const fullPath = `${filePath}/${fileName}.md`;

        // Write the markdown content to the file
        fs.writeFileSync(fullPath, mdContent, 'utf8');

        console.log(clc.bold.green(`File "${fileName}.md" created successfully - now change accordingly"`));
    } catch (error) {
        console.error('Error creating Markdown file:', error.message);
    }
}

async function generateMarkdownWithAI(description, mdTemplate, api_key, fileName) {
    console.log(clc.yellow("Loading..."))

    const prompt = mdTemplate + "\n\n" + `Populate the full markdown template given above with the description - ${description}`

    const OpenAI = new openai({ baseURL: 'https://api.openai.com/v1/chat', apiKey: api_key })

    OpenAI.completions.create({ model: 'gpt-3.5-turbo', messages: [{ role: "user", content: prompt }], max_tokens: prompt.length, temperature: 0.2 }).then(response => {
        const generatedContent = response.choices[0].message.content;
        createMarkdownFile(fileName, generatedContent, dirPath);
    }).catch(error => {
        console.error(clc.red('Error from OpenAI API:', error.message));
    })
}

const StartProcess = async () => {
    const prompt = inquirer.createPromptModule();

    const dependencies = getDependencies("./package.json")

    if (fs.existsSync(dirPath + "/techdoc.json")) {

        let type = await prompt({
            type: "list",
            name: "type",
            loop: false,
            message: "✔ Which Markdown You Want",
            choices: ["🚀 Development", "📖 Readme", "🧪 Research", "🚀 Development AI", "📖 Readme AI", "🧪 Research AI", "🤝 Contributing", "❌ Exit"]
        })
        type = type.type

        const prevSavedData = readJsonFile("techdoc.json")

        const folders = prevSavedData.excludeFolders

        const tree = folders.length ? dree.parse(dirPath, {
            depth: 3,
            exclude: [/node_modules/, ...folders.map(str => new RegExp(str.slice(1, -1))), , ...getDotStartingFolder(dirPath).map(str => new RegExp(str.slice(1, -1)))]
        }) : dree.parse(dirPath, {
            depth: 3,
            exclude: [/node_modules/, ...getDotStartingFolder(dirPath).map(str => new RegExp(str.slice(1, -1)))]
        })

        if (type == "❌ Exit") {
            process.exit();
        }
        else if (type == "🚀 Development") {
            createMarkdownFile("DEVELOPMENT", prevSavedData.size == "🌱 sm" ? development_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? development_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? development_lg(prevSavedData.desc, tree, dependencies) : ``, dirPath)
        }
        else if (type == "📖 Readme") {
            createMarkdownFile("README", prevSavedData.size == "🌱 sm" ? readme_sm(prevSavedData.desc) : prevSavedData.size == "🌲 md" ? readme_md(prevSavedData.desc) : prevSavedData.size == "🎄 lg" ? readme_lg(prevSavedData.desc) : ``, dirPath)
        }
        else if (type == "🧪 Research") {
            createMarkdownFile("RESEARCH", prevSavedData.size == "🌱 sm" ? research_sm() : prevSavedData.size == "🌲 md" ? research_md() : prevSavedData.size == "🎄 lg" ? research_lg() : ``, dirPath)
        }
        else if (type == "🤝 Contributing") {
            createMarkdownFile("CONTRIBUTION", prevSavedData.size == "🌱 sm" ? contributing_sm() : prevSavedData.size == "🌲 md" ? contributing_md() : prevSavedData.size == "🎄 lg" ? contributing_lg() : ``, dirPath)
        }

        // AI
        else if (type == "🚀 Development AI") {
            if ('api_key' in prevSavedData && prevSavedData.desc != "") {
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? development_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? development_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? development_lg(prevSavedData.desc, tree, dependencies) : ``, prevSavedData.api_key, "DEVELOPMENT")
            } else {
                let api_key = await prompt({
                    type: "password",
                    name: "api_key",
                    message: "🔑 Enter Your API Key:"
                })
                fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? development_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? development_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? development_lg(prevSavedData.desc, tree, dependencies) : ``, api_key, "DEVELOPMENT")
            }
        }
        else if (type == "📖 Readme AI") {
            if ('api_key' in prevSavedData && prevSavedData.desc != "") {
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? readme_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? readme_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? readme_lg(prevSavedData.desc, tree, dependencies) : ``, prevSavedData.api_key, "README")
            } else {
                let api_key = await prompt({
                    type: "password",
                    name: "api_key",
                    message: "🔑 Enter Your API Key:"
                })
                fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? readme_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? readme_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? readme_lg(prevSavedData.desc, tree, dependencies) : ``, api_key, "README")
            }
        }
        else if (type == "🧪 Research AI") {
            if ('api_key' in prevSavedData && prevSavedData.desc != "") {
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? research_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? research_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? research_lg(prevSavedData.desc, tree, dependencies) : ``, prevSavedData.api_key, "RESEARCH")
            } else {
                let api_key = await prompt({
                    type: "password",
                    name: "api_key",
                    message: "🔑 Enter Your API Key:"
                })
                fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))
                generateMarkdownWithAI(prevSavedData.desc, prevSavedData.size == "🌱 sm" ? research_sm(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🌲 md" ? research_md(prevSavedData.desc, tree, dependencies) : prevSavedData.size == "🎄 lg" ? research_lg(prevSavedData.desc, tree, dependencies) : ``, api_key, "RESEARCH")
            }
        }

    } else {

        let desc = await prompt({
            type: "input",
            name: "desc",
            message: "📃 What Is The Project Description(You May Edit It Later)"
        })

        let excludeFolders = await prompt({
            type: "input",
            name: "excludeFolders",
            message: "📁 Excluded Folders (like .git - write by space)"
        })

        let size = await prompt({
            type: "list",
            name: "size",
            default: "./src",
            choices: ["🌱 sm", "🌲 md", "🎄 lg"],
            message: "📏What Is Your Project Size"
        })

        let type = await prompt({
            type: "list",
            name: "type",
            loop: false,
            message: "✔ Which Markdown You Want",
            choices: ["🚀 Development", "📖 Readme", "🧪 Research", "🚀 Development AI", "📖 Readme AI", "🧪 Research AI", "🤝 Contributing", "❌ Exit"]
        })

        fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...desc, ...size, excludeFolders: excludeFolders.excludeFolders ? excludeFolders.excludeFolders.split(' ') : [] }, null, 2))

        type = type.type
        size = size.size
        desc=desc.desc

        const prevSavedData = readJsonFile("techdoc.json")

        const folders = prevSavedData.excludeFolders

        const tree = folders.length ? dree.parse(dirPath, {
            depth: 3,
            exclude: [/node_modules/, ...folders.map(str => new RegExp(str.slice(1, -1))), , ...getDotStartingFolder(dirPath).map(str => new RegExp(str.slice(1, -1)))]
        }) : dree.parse(dirPath, {
            depth: 3,
            exclude: [/node_modules/, ...getDotStartingFolder(dirPath).map(str => new RegExp(str.slice(1, -1)))]
        })

        if (type == "❌ Exit") {
            process.exit();
        }
        else if (type == "🚀 Development") {
            createMarkdownFile("DEVELOPMENT", size == "🌱 sm" ? development_sm(desc, tree, dependencies) : size == "🌲 md" ? development_md(desc, tree, dependencies) : size == "🎄 lg" ? development_lg(desc, tree, dependencies) : ``, dirPath)
        }
        else if (type == "📖 Readme") {
            createMarkdownFile("README", size == "🌱 sm" ? readme_sm(desc) : size == "🌲 md" ? readme_md(desc) : size == "🎄 lg" ? readme_lg(desc) : ``, dirPath)
        }
        else if (type == "🧪 Research") {
            createMarkdownFile("RESEARCH", size == "🌱 sm" ? research_sm() : size == "🌲 md" ? research_md() : size == "🎄 lg" ? research_lg() : ``, dirPath)
        }
        else if (type == "🤝 Contributing") {
            createMarkdownFile("CONTRIBUTION", size == "🌱 sm" ? contributing_sm() : size == "🌲 md" ? contributing_md() : size == "🎄 lg" ? contributing_lg() : ``, dirPath)
        }

        // Ai
        else if (type == "🚀 Development AI") {
            let api_key = await prompt({
                type: "password",
                name: "api_key",
                message: "🔑 Enter Your API Key:"
            })
            fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))

            generateMarkdownWithAI(prevSavedData.desc, size == "🌱 sm" ? development_sm(desc, tree, dependencies) : size == "🌲 md" ? development_md(desc, tree, dependencies) : size == "🎄 lg" ? development_lg(desc, tree, dependencies) : ``, api_key.api_key, "DEVELOPMENT")
        }
        else if (type == "📖 Readme AI") {
            let api_key = await prompt({
                type: "password",
                name: "api_key",
                message: "🔑 Enter Your API Key:"
            })
            fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))

            generateMarkdownWithAI(prevSavedData.desc, size == "🌱 sm" ? readme_sm(desc, tree, dependencies) : size == "🌲 md" ? readme_md(desc, tree, dependencies) : size == "🎄 lg" ? readme_lg(desc, tree, dependencies) : ``, api_key.api_key, "README")
        }
        else if (type == "🧪 Research AI") {
            let api_key = await prompt({
                type: "password",
                name: "api_key",
                message: "🔑 Enter Your API Key:"
            })
            fs.writeFileSync(dirPath + '/techdoc.json', JSON.stringify({ ...prevSavedData, ...api_key }, null, 2))

            generateMarkdownWithAI(prevSavedData.desc, size == "🌱 sm" ? research_sm(desc, tree, dependencies) : size == "🌲 md" ? research_md(desc, tree, dependencies) : size == "🎄 lg" ? research_lg(desc, tree, dependencies) : ``, api_key.api_key, "RESEARCH")
        }

    }
}

const main = () => {
    if (arg.length == 1) {
        if (arg[0].startsWith('--help')) {
            console.log("Commands:\n\t" + clc.yellowBright("   init") + " - Initializes the project.\n\t" + clc.blackBright(" --help") + " - Show The Commands And About\n\t")
        } else if (arg[0] == 'init') {
            try {
                StartProcess()
            } catch (error) {
                console.log(clc.red(error.message))
            }
        }
    } else {
        console.log(clc.red("Error: Please provide a command."))
        console.log("Commands:\n\t" + clc.yellowBright("   init") + " - Initializes the project.\n\t" + clc.blackBright(" --help") + " - Show The Commands And About\n\t")
    }
}

main()