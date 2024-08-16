/*
Run this model in Javascript

> npm install @azure-rest/ai-inference @azure/core-auth @azure/core-sse
*/
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env["GITHUB_TOKEN"];

const client = new ModelClient(
    "https://models.inference.ai.azure.com",
    new AzureKeyCredential(token)
);

async function getInput() {
    const userInput = document.getElementById("userInput").value;
    return userInput
}

async function getAIResponse(userInput){
    const getuserInput = await getInput();
    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "" },
                { role: "user", content: getuserInput }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 406,
            top_p: 1
        }
    });

    const GenAIResponse = response.body.choices[0].message.content
    return GenAIResponse
}

async function getResponse(newGenAIResponse) {
    const genaiResponse = document.getElementById("response");
    const newGenAIResponse = await getAIResponse();
    genaiResponse.innerHTML = newGenAIResponse;
}

console.log("response:", GenAIResponse, "newGenAIResponse:", newGenAIResponse);