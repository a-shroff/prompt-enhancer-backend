document.getElementById('enhance-button').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt-input').value;

    try {
        const response = await fetch('https://prompt-enhancer-backend.onrender.com/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Backend error');
        }

        const data = await response.json();
        document.getElementById('enhanced-output').innerText = data.enhanced_prompt || "No response from backend";
    } catch (error) {
        document.getElementById('enhanced-output').innerText = 'Error connecting to backend';
        console.error('Fetch error:', error);
    }
});

document.getElementById('copy-button').addEventListener('click', () => {
    const enhancedPrompt = document.getElementById('enhanced-output').innerText;
    navigator.clipboard.writeText(enhancedPrompt);
});
