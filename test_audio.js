const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "AIzaSyBrN-0jjoyQl9aU-8qtJG8VBr0OefUmQNg";

async function testModel(modelName) {
  console.log(`\nTesting ${modelName}...`);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Hello" }
            ]
          }
        ],
        generationConfig: { response_mime_type: "application/json" }
      })
    });
    const errText = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response: ${errText.substring(0, 200)}`);
  } catch (err) {
    console.error(err);
  }
}

async function run() {
  await testModel("gemini-2.5-flash");
  await testModel("gemini-2.0-flash");
  await testModel("gemini-1.5-flash");
  await testModel("gemini-flash-latest");
}
run();
