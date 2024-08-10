/*
Run this model in Javascript

> npm install @azure-rest/ai-inference @azure/core-auth @azure/core-sse
*/
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env["GITHUB_TOKEN"];

async function getResponse() {
    const client = new ModelClient(
        "https://models.inference.ai.azure.com",
        new AzureKeyCredential(token)
    );

    const userInput = document.getElementById("userInput").value;
    const genaiResponse = document.getElementById("response");

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "" },
                { role: "user", content: userInput }
            ],
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 406,
            top_p: 1
        }
    });

    if (response.status !== "200") {
        throw response.body.error;
    }
    const aiResponse = response.body.choices[0].message.content
    genaiResponse.innerHTML = aiResponse;
}

getResponse().catch((err) => {
    console.error("The sample encountered an error:", err);
});

