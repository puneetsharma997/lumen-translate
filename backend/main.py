from fastapi import FastAPI         # to manage routing, request handling, and server behavior
from fastapi.responses import JSONResponse    # to send JSON responses
from fastapi import status
import uvicorn
from pydantic import BaseModel      # it validates incoming (JSON requests / API body) automatically
from deep_translator import GoogleTranslator       # it used to translate text from one lang to another
from fastapi.middleware.cors import CORSMiddleware
import requests
from fastapi.responses import StreamingResponse

app = FastAPI()     # initialize FastAPI app

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
    expose_headers=["*"],
)

# define the request model using Pydantic model
class TranslatePayload(BaseModel):
  text: str
  target: str = 'en'
  source: str = 'hi'

# function to get supported language list as dictionary
@app.get('/languages')      # get route of this endpoint
async def get_languages():
  try:
    translator = GoogleTranslator(source='auto', target='en')
    languages = translator.get_supported_languages(as_dict=True)
    return JSONResponse(
      status_code = status.HTTP_200_OK,
      content = {
        'status': status.HTTP_200_OK,
        'success': True,
        'languages': languages,
      }
    )
  except Exception as e:
    return JSONResponse(
      status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
      content = { 'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'success': False, 'error': str(e) }
    )


# function to translate text from one language to another
@app.post('/translate')         # make a post route of this endpoint
async def translate_text(payload: TranslatePayload):
  try:
    result = GoogleTranslator(source=payload.source, target=payload.target).translate(payload.text)
    return JSONResponse(
      status_code = status.HTTP_200_OK,
      content = {
        'status': status.HTTP_200_OK,
        'success': True,
        'translated_text': result,
      }
    )
  except Exception as e:
    return JSONResponse(
      status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
      content = { 'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'success': False, 'error': str(e) }
    )


# function to get supported language list as dictionary
@app.get('/speak')     # get route of this endpoint
async def tts(text: str, lang: str):
  try:
    tts_url = ("https://translate.google.com/translate_tts"f"?ie=UTF-8&q={text}&tl={lang}&client=tw-ob")

    headers = {
        "User-Agent": "Mozilla/5.0",
    }

    audio = requests.get(tts_url, headers = headers)

    return StreamingResponse(
        iter([audio.content]),
        media_type="audio/mpeg"
    )
  except Exception as e:
    return JSONResponse(
      status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
      content = { 'status': status.HTTP_500_INTERNAL_SERVER_ERROR, 'success': False, 'error': str(e) }
    )
    
if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)