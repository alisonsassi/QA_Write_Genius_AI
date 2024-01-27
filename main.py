import json, time, re
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from training_AI import TrainingModelAI
from connectionDatabase import DatabaseManager

class SharedState:
    def __init__(self):
        self.globalOpinionTypedAPI = None

shared_state = SharedState()

app = FastAPI(
    title="QA Write Genius AI",
    description="Validation of QA Write Genius AI",
    version="1.0",
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", tags=["QA Write Genius AI"])
def read_root():
    """
        Function for beginner API. This function renders an HTML.
    """
    file_path = Path("static") / "index.html"
    return FileResponse(file_path, media_type="text/html")

def transformHTMLinText(html_response):
    """
    Esta função recebe um texto HTML e retorna o mesmo texto sem as tags HTML.
    """
    # Remove as tags HTML usando expressões regulares
    clean_text = re.sub(r"<[^>]*>", "", html_response)
    return clean_text

@app.post("/send-feedback-data", tags=["QA Write Genius AI"])

def get_data_feedback_and_all(json_data: dict = None):
    """
    Endpoint para receber dados em formato JSON.
    """

    if json_data is None:
        raise HTTPException(status_code=400, detail="JSON não recebido na API.")
    
    DatabaseManager.DataBaseInsert({'TEXT_ORIGINAL': json_data['textIn'],
                                    'SUGGESTION': json_data['textOut'],
                                    'FEEDBACK': json_data['modalId'],
                                    'IDENTIFICATION': json_data['userIdCookie'],
                                    'OPINION': json_data['fieldOpinion'],
                                    'OBSERVATION': json_data['justification'],
                                    })

    return HTTPException(status_code=400, detail="JSON não recebido na API.")

@app.post("/suggestion-of-TestCase-typed", tags=["QA Write Genius AI"])

def get_text_and_send_return_suggestion(json_data: dict = None):
    """
    Endpoint para receber dados em formato JSON e retornar ao campo o texto gerado
    """

    if json_data is None:
        raise HTTPException(status_code=400, detail="JSON não recebido na API.")
    
    inputDescription = json.dumps(json_data['typedText'])

    userIdCookie = json.dumps(json_data['userIdCookie'])

    suggestionAI = TrainingModelAI.suggestionOpenAI(inputDescription)
    
    attempts = 0
    while attempts < 10 and shared_state.globalOpinionTypedAPI is None:
        attempts += 1
        shared_state.globalOpinionTypedAPI
        time.sleep(1)

    DatabaseManager.DataBaseInsert({'TEXT_ORIGINAL': "Typed Text: {}\n".format(json_data.get("typedText", "")),
                                    'SUGGESTION': suggestionAI,
                                    'IDENTIFICATION': userIdCookie,
                                    'OPINION': shared_state.globalOpinionTypedAPI,
                                    'OBSERVATION': 'Clicked on the Validate button'
                                    })
   
    return json.dumps({"text_response": suggestionAI})


@app.post("/opinion-of-TestCase-typed", tags=["AQA Write Genius AI"])

def get_text_and_send_return_opinion(json_data: dict = None):
    """
    Endpoint para receber dados em formato JSON e retornar ao campo o texto gerado
    """

    if json_data is None:
        raise HTTPException(status_code=400, detail="JSON não recebido na API.")
    
    inputDescriptionTypedText = json.dumps(json_data['typedText'])
    returnOpinionAI = TrainingModelAI.opinionTestCaseTyped(inputDescriptionTypedText)
    shared_state.globalOpinionTypedAPI = transformHTMLinText(returnOpinionAI)

    return json.dumps({"html_response": returnOpinionAI})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)