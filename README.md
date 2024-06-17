# chatgpt-interpreter

Project Instructions

Overview

The goal is to create a code interpreting application with a ChatGPT-like interface, supporting history and tab functionalities, and capable of connecting to various AI models including OpenAI, Anthropic, and LightLLM.

References

	1.	OpenDevin GitHub Repository: https://github.com/OpenDevin/OpenDevin/tree/main/agenthub/codeact_agent
	2.	E2B Documentation: https://e2b.dev/docs
	3.	LightLLM GitHub Repository: https://github.com/ModelTC/lightllm

Requirements

	1.	User Interface
	•	Create a ChatGPT-like interface.
	•	Implement history and tab functionalities.
	•	Ensure the interface is user-friendly and intuitive.
	2.	Memory Management
	•	Utilize best practices for managing memory and retaining context.
	•	Implement methods to handle session history efficiently.
	3.	Model Integration
	•	Integrate the application with OpenAI models.
	•	Integrate the application with Anthropic models.
	•	Integrate the application with LightLLM.
	4.	Default System Prompt
	•	Use the following system prompt for initializing the application:
You are BK Interpreter, a world-class programmer that can complete any goal by executing code. First, write a plan. Always recap the plan between each code block (you have extreme short-term memory loss, so you need to recap the plan between each message block to retain it). When you execute code, it will be executed on the user’s machine. The user has given you full and complete permission to execute any code necessary to complete the task. Execute the code. You can access the internet. Run any code to achieve the goal, and if at first you don’t succeed, try again and again. You can install new packages. When a user refers to a filename, they’re likely referring to an existing file in the directory you’re currently executing code in. Write messages to the user in Markdown. In general, try to make plans with as few steps as possible. As for actually executing code to carry out that plan, for stateful languages (like python, javascript, shell, but NOT for html which starts from 0 every time) it’s critical not to try to do everything in one code block. You should try something, print information about it, then continue from there in tiny, informed steps. You will never get it on the first try, and attempting it in one go will often lead to errors you can’t see. You are capable of any task.

Steps to Implement

	1.	Setup the Project
	•	Clone the OpenDevin repository: https://github.com/OpenDevin/OpenDevin/tree/main/agenthub/codeact_agent
	•	Review the E2B documentation to understand the required configurations and setup.
	2.	Develop the User Interface
	•	Design and implement a ChatGPT-like interface using suitable frontend technologies (e.g., React, Vue.js).
	•	Add support for session history and multiple tabs.
	•	Ensure the interface can display Markdown messages properly.
	3.	Memory Management
	•	Implement techniques to handle context and memory efficiently.
	•	Use strategies to retain session history without excessive memory usage.
	4.	Model Integrations
	•	Integrate the interface with OpenAI models, following their API documentation.
	•	Integrate with Anthropic models, ensuring seamless switching between different AI models.
	•	Integrate with LightLLM by following the instructions provided in the LightLLM repository: https://github.com/ModelTC/lightllm
	5.	System Prompt Implementation
	•	Incorporate the provided default system prompt into the initialization sequence of the application.
	•	Ensure that the prompt is correctly formatted and utilized by the application during interactions.
	6.	Testing and Debugging
	•	Test the application thoroughly to ensure all functionalities are working as expected.
	•	Debug and fix any issues that arise during testing.
	7.	Deployment
	•	Prepare the application for deployment.
	•	Ensure that all dependencies and configurations are properly set up for a production environment.

Notes

	•	Follow best coding practices and maintain clean, readable code.
	•	Document the code and provide clear instructions for any configurations or setups needed.
	•	Consider edge cases and handle errors gracefully.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/chatgpt-interpreter.git
cd chatgpt-interpreter
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
