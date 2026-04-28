import * as FileSystem from 'expo-file-system/legacy';

const GEMINI_API_KEY = (process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'dummy_gemini_key').trim();

// We process the audio directly through Gemini 1.5 Flash (bypassing Groq)
export const processAudioToJSON = async (audioUri: string) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'dummy_gemini_key') {
    console.warn("Using mock JSON generation due to missing API key");
    return {
      client_name: "Mock Client (No API Key)",
      items: [
        { desc: "Consulting (Mock Data)", price: 150, qty: 2 },
        { desc: "Software License", price: 500, qty: 1 }
      ],
      total: 800,
      tax: 80
    };
  }

  try {
    // 1. Read audio file as base64
    const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
      encoding: 'base64',
    });

    // 2. Prepare the prompt for Gemini
    const prompt = `
You are a bilingual (Swedish and English) B2B SaaS assistant for an invoicing application. 
Listen to the attached audio. The user might speak in Swedish or English.
Extract the following details from the spoken text and return ONLY a valid JSON object.

Details needed: 
- client_name (string, try to guess or use "Unknown Client" if not mentioned)
- items (array of objects, each with desc (string), price (number), qty (number). If no items are mentioned, create a dummy item based on what they said)
- total (number, sum of price * qty)
- tax (number, calculate assuming 10% tax rate)
- debug_transcript (string, write EXACTLY what you heard the user say in the audio, word for word)

CRITICAL INSTRUCTION: Never return an error. Always return the JSON format above. If the audio is completely silent, put "SILENT_AUDIO" in the debug_transcript.
    `;

    // 3. Send audio + prompt to Gemini (with automatic retry for 503 errors)
    let response;
    let retries = 3;
    while (retries > 0) {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "audio/mp4",
                    data: base64Audio
                  }
                }
              ]
            }
          ],
          generationConfig: { response_mime_type: "application/json" }
        })
      });

      if (response.status === 503) {
        console.warn("Google servers overloaded (503). Retrying...");
        retries--;
        await new Promise(resolve => setTimeout(resolve, 1500)); // wait 1.5s
        continue;
      }
      break;
    }

    if (!response || !response.ok) {
      const errText = await response?.text() || "Unknown error";
      console.error("Gemini API Error:", errText);
      throw new Error("Gemini API Error: " + (response?.statusText || "503"));
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Gemini unexpected response structure:", JSON.stringify(data, null, 2));
      throw new Error("Gemini returned an empty or blocked response. Check logs.");
    }

    const jsonText = data.candidates[0].content.parts[0].text;
    return JSON.parse(jsonText);
  } catch (err: any) {
    console.error("Audio processing error", err.message || err);
    return { error: "Failed to process audio into a quote. Please try again." };
  }
};
