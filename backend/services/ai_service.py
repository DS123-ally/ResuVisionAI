import os
from groq import Groq
from typing import Dict, Any, List
import json
from dotenv import load_dotenv

load_dotenv()

# Configure Groq
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key) if api_key else None

class AIService:
    def __init__(self):
        self.model = "llama-3.3-70b-versatile"

    async def analyze_resume(self, text: str, job_description: str = None) -> Dict[str, Any]:
        """
        Uses Groq to analyze resume text and return structured JSON.
        """
        if not client:
            return self._get_fallback_data("GROQ_API_KEY not found in environment.")

        prompt = f"""
        Analyze the following resume text and provide a structured JSON response.
        If a job description is provided, calculate an ATS score (0-100) based on the match.
        Otherwise, provide a general score.
        
        Extract:
        1. Functional Roles: Categorize experience into Technical, Leadership, Operations, Design, or Other.
        2. Skills: A list of top 5 skills with proficiency levels (0-100).
        3. ATS Score: An integer score.
        4. Feedback: 3-4 specific improvement areas.

        Resume Text: {text[:8000]}
        Job Description: {job_description if job_description else "Not provided"}

        Return ONLY a JSON object in this format:
        {{
            "roles": {{"Technical": 0, "Leadership": 0, "Operations": 0, "Design": 0, "Other": 0}},
            "skills": [{{ "name": "Skill Name", "level": 80 }}],
            "ats_score": 85,
            "feedback": ["feedback 1", "feedback 2"]
        }}
        """
        
        try:
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a professional resume analyzer. Output only valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model=self.model,
                response_format={"type": "json_object"}
            )
            
            return json.loads(chat_completion.choices[0].message.content)
        except Exception as e:
            print(f"Groq Error: {e}")
            return self._get_fallback_data(f"Groq API Error: {str(e)}")

    async def get_career_advice(self, query: str, context: str = "") -> str:
        """
        Provides AI career advice based on user query and resume context.
        """
        if not client:
            return "Groq API Key is missing. Please add it to your .env file."

        try:
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful AI career advisor."
                    },
                    {
                        "role": "user",
                        "content": f"Context (Resume Data): {context}\nUser Question: {query}",
                    }
                ],
                model=self.model,
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            return f"I'm having trouble thinking right now. Error: {e}"

    def _get_fallback_data(self, error_msg: str) -> Dict[str, Any]:
        return {
            "roles": {"Technical": 0, "Leadership": 0, "Operations": 0, "Design": 0, "Other": 0},
            "skills": [{"name": "Error", "level": 0}],
            "ats_score": 0,
            "feedback": [error_msg]
        }

ai_service = AIService()
