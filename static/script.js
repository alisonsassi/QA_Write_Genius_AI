// WELCOME in my code :D
checkCookie();
/**
 * Add here the words for VALIDATION
 * @var {modelo} - Variable for usage for validation of key words of Test Case.
 */
var modelo = ["ART/Squad:", "Sprint:", "SO:", "User story:", "Localization:", "Goal:", "Prerequisites:", "Step:"];
/**
 * Function for validate Text inputed of Test Case
 * @var {reciveTextofElement} - get Text Input.
 * @var {formatedModel} - text formated.
 * @var {modelTextDiv} - Model Div created beafore.
 */
function validateText() {

 var reciveTextofElement = document.getElementById("textoEntrada").value.toLowerCase();
 var formatedModel = '';
 var modelTextDiv = document.getElementById("modeloTexto");

modelo.forEach(function(key_work) {
    var div = document.createElement("div");
    div.className = "modelo-palavra";
    div.textContent = key_work;
    modelTextDiv.appendChild(div);
});

 modelo.forEach(function (key_work) {
     var classColor = reciveTextofElement.includes(key_work.toLowerCase()) ? 'modelo-verde' : 'modelo-vermelho';
     var classHide = reciveTextofElement.includes(key_work.toLowerCase()) ? 'style="display:none;"' : '';
     formatedModel += '<div class="modelo-palavra ' + classColor + '"' + classHide + '>' + key_work + '</div>';
 });

 document.getElementById("modeloTexto").innerHTML = '<strong>Model:</strong><br>' + formatedModel;

 var allWordsHide = modelo.every(function (palavra) {
     return reciveTextofElement.includes(palavra.toLowerCase());
 });

 if (allWordsHide) {
     document.getElementById("modeloTexto").innerHTML = '<strong style="color: green;">Model OK</strong>';
     document.getElementById("botaoValidar").disabled = false;
 } else {
     document.getElementById("botaoValidar").disabled = true;
 }

}

/**
 * Function to create HTML elements dynamically 
 * @var {modelTextDiv} - get Text Input.
 * @var {div} - create an element with this variable.
 */
function createModeloElements() {
    var modelTextDiv = document.getElementById("modeloTexto");

    modelo.forEach(function(palavra) {
        var div = document.createElement("div");
        div.className = "modelo-palavra";
        div.textContent = palavra;
        modelTextDiv.appendChild(div);
    });
}

/**
 * Function to execute when HTML is beginning.
 * @return {createModeloElements} - function for created elements in display.
 * @return {validateText} - function for executable in beginning display.
 */
window.addEventListener("load", function() {
    createModeloElements();
    validateText();
});

/**
 * Function to show suggestions of AI, using Chat GPT.
 * @var {typedText} - text typed by a human about your test case.
 * @const {responseData} - data returned by API Open AI.
 */
async function ShowSuggestion() {
        document.getElementById("loadingSpinner").style.display = "block";
    
        var typedText = document.getElementById("textoEntrada").value;
    
        try {
            const response = await fetch("http://127.0.0.1:8000/suggestion-of-TestCase-typed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ typedText: typedText }),
            });
    
            if (response.ok) {

                let responseData = await response.json();
                const responseDataJSON = JSON.parse(responseData);
                const textResponse = responseDataJSON.text_response;

                document.getElementById("textoSaida").value = textResponse;
                document.getElementById("textoSaida").style.display = "block";
                document.getElementById("buttons-feedback").style.display = "block";
                document.getElementById("feedback-message").style.display = "block";
                document.getElementById("labelSaida").style.display = "block";
                document.getElementById("modeloTexto").style.display = "none";
                document.getElementById("textoEntrada").addEventListener("input", validateText);
            } else {
                console.log("Error in Response of Servidor: ", responseData ) // adicionar essa mensagem na Base de dados
                document.getElementById("mensageErrorServer").style.color = "red";
                document.getElementById("mensageErrorServer").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
            }
        } catch (error) {
            console.error("Error in try-catch:", error); // adicionar essa mensagem na Base de dados
            document.getElementById("mensageErrorServer").style.color = "red";
            document.getElementById("mensageErrorServer").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
        } finally {
            document.getElementById("loadingSpinner").style.display = "none";
            document.getElementById("textoSaida").readOnly = false;
            document.getElementById("textoSaida").select();
        }
}


/**
 * Function for showing the Opinion of AI, using Chat 
 * @var {FieldHTML} - get Text Input.
 * @var {newData} - text received of AI.
 * @var {responseDatainHTML} - data returned by API Open AI. 
 */
async function ShowOpinionIAinHTML() {
    var FieldHTML = document.getElementById("FieldHTML");
    
    document.getElementById("loadingSpinnerOpinion_AI").style.display = "block";
    
    document.getElementById("loadingSpinner").style.display = "block";
    
    var typedText = document.getElementById("textoEntrada").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/opinion-of-TestCase-typed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ typedText: typedText }),
        });

        if (response.ok) {
            try {
                const responseData = await response.json();
                const responseDataJSON = JSON.parse(responseData);
                const htmlResponse = responseDataJSON.html_response;
                FieldHTML.innerHTML = htmlResponse
                FieldHTML.style.display = "block";

            } catch (error) {
                console.error('Erro ao processar a resposta JSON:', error);
            }
            
        } else {
            document.getElementById("mensageErrorServer").style.color = "red";
            document.getElementById("mensageErrorServer").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
        }
    } catch (error) {
        console.error("Erro na solicitação ao servidor Python:", error);
        document.getElementById("mensageErrorServer").style.color = "red";
        document.getElementById("mensageErrorServer").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
    } finally {
            // remove Spinner the display  
        document.getElementById("loadingSpinnerOpinion_AI").style.display = "none";
    }
}

/*
ART/Squad: DTP - Odin
Sprint: Iris 3
User story: 276266
SO: 12345
Localization: Global

Goal: As a user, I want to visualize the batch and the expiration date on stock movement when I register a consigned material as a loss.

Prerequisites:

1- Material record: Have a medication record as "Consigned" on the record material screen where select if the material is consigned, not consigned, or both.

2- Core Table Settings: Have a "Rule for generating supplier batch" with the medication registered (Quantity to generate = Stock / Invoice Rule = Yes / Rule for Barcode on the Material = No / Rule of the receiving inspection = Yes

3- Core Table Settings: Have a "Stock operation" (Incoming/Outgoing = Incoming / Type of operation = Purchase invoice / Consigned type = Consigned purchase with material / Consumption = Does not affect / Cost calculation = Participate in average cost / Checkbox marked = Account for consigned consumption / Allows editing / Active Status / Summary column = Purchase)

4- Core Table Settings: Have a "Invoice operation" (Stock operation = same registered on previous step / Checkbox marked = Integrates accounts receivable / It is a purchase bill / Establishment stock transfer / Active status / Date rule of the Invoice accounting = Stock update / Generation of the invoice number = Manual / Retains Service Tax = Depends existence ISS on NF / Type of electronic invoice = Not an e-Invoice / Requires purchase order = No / Requires cost center when direct stock location = Requires cost center for direct location (Tasy default)

5- Invoice: Have an Invoice with the same stock operation registered before, an Item (material = medicine) with the amount, cost center, batch, and expiration. (Right-click button > Update invoice total > Calculate invoice)

6- Stock Management: Supplier batch > Search for the medicine from the invoice > The sequence plus the check digit make the code. Example: Sequence = 288876 and Check digit = 9 so the code is 00002888769 (the zeros before are to complete the code that must have eleven digits)

7- Chemotherapy > Pharmacy > Cabin feeding: Have an item added to the cabin. (Use the code with eleven digits to add the medicine)

8- System Administration: Function parameters > Chemotherapy > Parameter 181 = Yes and Parameter 306 = Yes.

Step: Chemotherapy > Pharmacy > Cabin feeding > Select the medicine > Right click button > Settle material as loss > Hamburger menu > Functions > Stock Management > Movement > Stock movement > Filter by the medicine`;


=====================================================================================

Send requested exams/tests to external Support Laboratory for processing through HL7 message.
The HL7 message shall be sent to the configured recipient.
The HL7 message was sent to the configured recipient.
The HL7 message was not sent to the configured recipient.

ART/Squad: Odin
Sprint: Sprint 1
User story: 275637
Localization: Brasil
SO: 3126905

Goal: Upon release of the medical prescription for exams, Tasy must send the exams to the external Support laboratory when configured.

Prerequisites:

Access TIE > Routes > Click “SEL” button on upper right corner > Type: “Standard Lab Integration (HL7)” > Click the Configure button next to the “standard.lab.hl7.send.exam.router” route > Save

On Tasy, have an encounter with an order with at least one laboratorial exam/test.

Step:

Have an order with the “Released” status.

Patient Registration > Encounter > Encounter data > Orders > Exams/Tests > Laboratorial > Released order.
*/

// Função para verificar se o cookie com o ID do usuário existe
function checkCookie() {
    var userId = getCookie("userId");

    if (userId) {
        console.log("Usuário já possui um ID:", userId);
    } else {
        // Gerar um ID único para o usuário
        var newUserId = generateUniqueId();

        // Exibir o ID gerado
        console.log("Novo ID gerado para o usuário:", newUserId);

        // Armazenar o ID em um cookie (o cookie expira em 365 dias)
        setCookie("userId", newUserId, 365);
    }
}

// Função para obter o valor de um cookie
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Função para definir um cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Função para gerar um ID único simples (pode ser aprimorado para uso real)
function generateUniqueId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}
