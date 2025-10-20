from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/', methods=['GET'])
def home():
    return "Prompt Enhancer Backend is Live!"

@app.route('/enhance', methods=['POST'])
def enhance_prompt():
    try:
        data = request.get_json()
        user_prompt = data.get("prompt", "")

        if not user_prompt:
            return jsonify({"error": "No prompt provided"}), 400

        system_prompt = (
            "You are an elite prompt engineer tasked with transforming vague or short prompts "
            "into highly detailed, structured, and actionable prompts for AI tools. "
            "Your enhanced prompt should:\n"
            "- Clearly define the task and expected output\n"
            "- Specify tone, style, format, and audience\n"
            "- Include context, constraints, and examples where relevant\n"
            "- Be long enough (150–250 words) and ready to copy-paste into AI tools\n"
            "- Never answer the prompt itself — only rewrite it\n\n"
            "Now improve the following user prompt into a perfect prompt:"
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        improved_prompt = response.choices[0].message.content.strip()
        return jsonify({"enhanced_prompt": improved_prompt})

    except Exception as e:
        print("Error in /enhance route:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
