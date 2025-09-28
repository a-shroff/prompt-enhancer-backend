document.getElementById('enhanceBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('userPrompt').value;
  const output = document.getElementById('output');
  output.textContent = 'Thinking...';

  try {
    const response = await fetch('http://127.0.0.1:5000/enhance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    output.textContent = data.enhanced_prompt || data.error;
  } catch (err) {
    output.textContent = 'Error connecting to backend';
  }
});

// Copy button functionality
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('output').textContent;
  if (text && text !== '...' && text !== 'Thinking...') {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Enhanced prompt copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy text.');
      });
  } else {
    alert('No enhanced prompt to copy yet.');
  }
});
