
import os
import traceback
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

load_dotenv()

app = FastAPI(title="NOVA AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key) if api_key else None


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "NOVA AI backend is running",
    }


@app.get("/health")
def health():
    return {
        "backend": "running",
        "groq_api_key_configured": client is not None,
    }


@app.post("/chat")
def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty",
        )

    if client is None:
        raise HTTPException(
            status_code=500,
            detail="Groq API key is missing. Check backend/.env",
        )

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are NOVA, a helpful AI assistant. "
                        "Answer clearly and naturally."
                    ),
                },
                {
                    "role": "user",
                    "content": request.message,
                },
            ],
        )

        reply = response.choices[0].message.content

        return {"reply": reply or "I could not generate a response."}

    except Exception as e:
         print("GROQ API ERROR:", repr(e))
    import traceback
    traceback.print_exc()
    raise HTTPException(
        status_code=502,
        detail=f"Groq API error: {str(e)}",
    )
