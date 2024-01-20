import json
from openai import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from configAI import OpenIA

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

@app.post("/suggestion-of-TestCase-typed", tags=["AQA Write Genius AI"])

def get_text_and_send_return_suggestion(json_data: dict = None):
    """
    Endpoint para receber dados em formato JSON e retornar ao campo o texto gerado
    """

    if json_data is None:
        raise HTTPException(status_code=400, detail="JSON não recebido na API.")
    
    inputDescription = json.dumps(json_data)
    suggestionAI = openIArefactory(inputDescription)

    print(suggestionAI)
    print("=====================================")
    print(json.dumps({"text_response": suggestionAI}))

    return json.dumps({"text_response": suggestionAI})

def openIArefactory(description):

    client = OpenAI(api_key=OpenIA.api_key)
    
    Teach_chat_1 = "Copy this typed message, and standardize it according to the test case rules."
    Teach_chat_2 = "After the words 'ART/Squad:', 'Sprint:', 'User Story:', and 'Localization:' in the text, there must be a text of at least 5 letters. If it is empty, add the message in red: 'This item is blank. Add the correct information for.' + Name item"
    Teach_Chat_3 = "After the word 'Goal:' in the text, write a concise and direct sentence for better understanding. For example: 'As a user, I want to visualize the batch and the expiration date on stock movement when I register a consigned material as a loss. If it is empty, add the message in red: 'This item is blank. Add the correct information for.' + Name item"
    Teach_Chat_4 = "After the word 'Prerequisites:' in the text, there should be a sequence of numbers to define each requirement. For example: '1- Material record: Have a medication record as 'Consigned' on the record material screen where you can select if the material is consigned, not consigned, or both. 2- Core Table Settings: Have a 'Rule for generating supplier batch' with the medication registered (Quantity to generate = Stock / Invoice Rule = Yes / Rule for Barcode on the Material = No / Rule of the receiving inspection = Yes. 3- Core Table Settings: Have a 'Stock operation' (Incoming/Outgoing = Incoming / Type of operation = Purchase invoice / Consigned type = Consigned purchase with material / Consumption = Does not affect / Cost calculation = Participate in average cost / Checkbox marked = Account for consigned consumption / Allows editing / Active Status / Summary column = Purchase.' If it is empty, add the message in red: 'This item is blank. Add the correct information for.' + Name item"
    Teach_Chat_5 = "After the word 'Step:' in the text, there should be a sequence of function names and commands to guide how to perform the test. For example: 'Chemotherapy > Pharmacy > Cabin feeding > Select the medicine > Right-click button > Settle material as loss > Hamburger menu > Functions > Stock Management > Movement > Stock movement > Filter by the medicine`.' If it is empty, add the message in red: 'This item is blank. Add the correct information for.' + Name item"
    Teach_Chat_6 = "Deliver all information in a text format, with spacing between each item with break line, and each item in bold. Place each item in front of the sentence with the colon."
    Teach_Chat_7 = "In light of the rules, write a clearer test case without modifying the information provided in this test case:"

    
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": Teach_chat_1},
        {"role": "system", "content": Teach_chat_2},
        {"role": "system", "content": Teach_Chat_3},
        {"role": "system", "content": Teach_Chat_4},
        {"role": "system", "content": Teach_Chat_5},
        {"role": "system", "content": Teach_Chat_6},
        {"role": "system", "content": Teach_Chat_7},
        {"role": "user", "content": description}
    ]
    )
    return completion.choices[0].message.content


@app.post("/opinion-of-TestCase-typed", tags=["AQA Write Genius AI"])

def get_text_and_send_return_opinion(json_data: dict = None):
    """
    Endpoint para receber dados em formato JSON e retornar ao campo o texto gerado
    """

    if json_data is None:
        raise HTTPException(status_code=400, detail="JSON não recebido na API.")
    
    inputDescription = json.dumps(json_data)
    returnOpinionAI = opinionTestCaseTyped(inputDescription)
    print(returnOpinionAI)
    print("=====================================")

    return json.dumps({"html_response": returnOpinionAI})


def opinionTestCaseTyped(description):

    client = OpenAI(api_key=OpenIA.api_key)
    
    Teach_chat_1 = "return in model HTML with color when is written bad, and bold when opinion. The tips write in color blue. The title is in model: '<h3>What do I understand from your writing?</h3>' and rest text in '<p>', but when need destaque, edit this HTML."
    Teach_chat_2 = "With the following text, being a test case, answer with reasons whether this test case is well written, and tips on how to improve it."

    
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": Teach_chat_1},
        {"role": "system", "content": Teach_chat_2},
        {"role": "user", "content": description}
    ]
    )
    return completion.choices[0].message.content

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)






