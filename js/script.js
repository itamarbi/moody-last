// date loader for index.html
const date_paragraph = document.getElementById("date_paragraph");

const today = new Date();
date_paragraph.innerText = `${today.getDate()}/${
  today.getMonth() + 1
}/${today.getFullYear()}`;

async function API() {
   // alert(askChatGPT("whas the biggest country in th world? answer in hebrew"));
        const prompt = "How costs humster? answer in hebrew";
        const responseElement = document.getElementById('responseText');

 //       responseElement.textContent = "Thinking...";

        try {
//          const answer = await askChatGPT(prompt);
          const answer = await askCohere(prompt);
          responseElement.textContent = answer;
          //alert(answer);
        } catch (error) {
          // responseElement.textContent = "Error: " + error.message;
  }
}
async function askChatGPT(prompt) {
  const apiKey = "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"; // Replace with your actual API key

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1", // or "gpt-4" if you have access
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function askCohere(prompt) {
      const apiKey = 'fhsxP90vLVRL42pPglN772MMVN1yMAYRX246HgAQ'; // Replace with your Cohere key

      const url = "https://api.cohere.ai/v1/chat";
      const body = {
        message: prompt,
        model: "command-r-plus", // Latest multilingual chat model
        temperature: 0.7
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        const reply = data.text || "No response.";
        return reply;

      } catch (err) {
          throw new Error(`Cohere error: ${err.message}`);
      }
    }