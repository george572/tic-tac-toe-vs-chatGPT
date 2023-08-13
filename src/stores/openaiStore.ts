import { ref } from 'vue';
import { defineStore } from 'pinia';
import { openAiEndpoint, openAiEndpointHeaders, openAiEndpointSettings } from '@/api/openai';
import axios from 'axios';

export const useOpenaiStore = defineStore('useOpenaiStore', () => {
    const gptResponse = ref(undefined);
    const callGptTurn = async () => {
        openAiEndpointSettings.messages = [
            { role: "system", content: 'hey' },
            { role: "user", content: 'what is 2x2?' }
          ];
        const response = await axios.post(
            openAiEndpoint,
            openAiEndpointSettings,
            openAiEndpointHeaders
          );
          console.log(response);
    };
    return { callGptTurn };
});