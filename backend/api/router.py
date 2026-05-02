from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
import os
from typing import Optional, List, Dict
from backend.services.resume_parser import extract_text_from_pdf, extract_text_from_docx
from backend.services.ai_service import ai_service

api_router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

class Skill(BaseModel):
    name: str
    level: int

class AnalysisResponse(BaseModel):
    filename: str
    roles: Dict[str, int]
    skills: List[Skill]
    ats_score: int
    feedback: List[str]
    status: str

@api_router.get("/health")
async def health_check():
    return {"status": "healthy"}

@api_router.get("/chatbot/advice")
async def get_mock_advice():
    """Fallback for chatbot advice"""
    return {
        "advice": [
            "Tailor your resume for each specific job description.",
            "Focus on quantifying your achievements."
        ]
    }

@api_router.post("/v1/analyze", response_model=AnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None)
):
    """
    Real-time analysis endpoint using Gemini AI.
    """
    extension = os.path.splitext(file.filename)[1].lower()
    if extension not in [".pdf", ".docx"]:
        raise HTTPException(status_code=400, detail="Invalid file type.")
    
    file_content = await file.read()
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB.")
    
    temp_path = f"temp_{file.filename}"
    try:
        with open(temp_path, "wb") as buffer:
            buffer.write(file_content)
        
        text = extract_text_from_pdf(temp_path) if extension == ".pdf" else extract_text_from_docx(temp_path)
        os.remove(temp_path)

        if not text:
            raise HTTPException(status_code=500, detail="Failed to extract text.")

        # 4. Call Real AI Service
        analysis = await ai_service.analyze_resume(text, job_description)

        return AnalysisResponse(
            filename=file.filename,
            roles=analysis.get("roles", {}),
            skills=[Skill(**s) for s in analysis.get("skills", [])],
            ats_score=analysis.get("ats_score", 0),
            feedback=analysis.get("feedback", []),
            status="success"
        )
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/v1/chat")
async def chat_with_ai(query: str = Form(...), context: Optional[str] = Form("")):
    """Real-time chat endpoint using Gemini AI"""
    response = await ai_service.get_career_advice(query, context)
    return {"response": response}
