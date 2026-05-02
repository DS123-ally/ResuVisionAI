import fitz  # PyMuPDF
import docx
from typing import Optional

def extract_text_from_pdf(pdf_path: str) -> Optional[str]:
    """
    Extracts plain text from a PDF file using PyMuPDF.
    """
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None

def extract_text_from_docx(docx_path: str) -> Optional[str]:
    """
    Extracts text from a .docx file using python-docx.
    """
    try:
        doc = docx.Document(docx_path)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print(f"Error extracting text from DOCX: {e}")
        return None

def parse_resume_content(text: str) -> dict:
    """
    Initial placeholder for parsing resume content (skills, experience, etc.)
    In a real implementation, this would use LLM logic or complex regex.
    """
    return {
        "raw_text": text,
        "length": len(text),
        "status": "parsed"
    }
