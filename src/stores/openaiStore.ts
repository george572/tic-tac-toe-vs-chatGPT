import { ref } from 'vue';
import { defineStore } from 'pinia';
import { openAiEndpoint, openAiEndpointHeaders, openAiEndpointSettings } from '@/api/openai';
import { gptInstructions } from '@/utils/constants/gptInstructions';
import axios from 'axios';

export const useOpenaiStore = defineStore('useOpenaiStore', () => {
    const messages = ref<{}[]>([]);
    const callGptTurn = async (currentBoard: object) => {
        // if (openAiEndpointSettings.messages) {
        //     openAiEndpointSettings.messages.push(messages.value);
        // } 
        openAiEndpointSettings.messages = [
            { role: "system", content: gptInstructions },
            { role: "user", content: JSON.stringify(currentBoard) }
          ];
        const response = await axios.post(
            openAiEndpoint,
            openAiEndpointSettings,
            openAiEndpointHeaders
          );
        if ( response && response.data && response.data.choices ) {
            console.log(response.data.choices[0].message.content);
            messages.value.push(response.data.choices[0].message.content);
        }
    };
    return { callGptTurn };
});