export const openAiEndpoint = "https://api.openai.com/v1/chat/completions";
export const openAiEndpointSettings = {
  model: "gpt-3.5-turbo-16k",
  max_tokens: 15000,
  n: 1,
  stop: null,
  temperature: 1,
  presence_penalty: 2,
  messages: {}
};
export const openAiEndpointHeaders = {
  headers: {
    Authorization: "Bearer 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",
    "Content-Type": "application/json"
  }
};