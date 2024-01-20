

// Array de palavras chaves
var modelo = ["ART/Squad:", "Sprint:", "User story:", "Localization:", "Goal:", "Prerequisites:", "Step:"];


function validateText() {

 var texto = document.getElementById("textoEntrada").value.toLowerCase();
 var modeloFormatado = '';
 var modeloTextoDiv = document.getElementById("modeloTexto");


modelo.forEach(function(palavra) {
    var div = document.createElement("div");
    div.className = "modelo-palavra";
    div.textContent = palavra;
    modeloTextoDiv.appendChild(div);
});

 modelo.forEach(function (palavra) {
     var corClasse = texto.includes(palavra.toLowerCase()) ? 'modelo-verde' : 'modelo-vermelho';
     var classeEsconder = texto.includes(palavra.toLowerCase()) ? 'style="display:none;"' : '';
     modeloFormatado += '<div class="modelo-palavra ' + corClasse + '"' + classeEsconder + '>' + palavra + '</div>';
 });

 document.getElementById("modeloTexto").innerHTML = '<strong>Model:</strong><br>' + modeloFormatado;

 var todasPalavrasEscondidas = modelo.every(function (palavra) {
     return texto.includes(palavra.toLowerCase());
 });

 if (todasPalavrasEscondidas) {
     document.getElementById("modeloTexto").innerHTML = '<strong style="color: green;">Model OK</strong>';
     document.getElementById("botaoValidar").disabled = false;
 } else {
     document.getElementById("botaoValidar").disabled = true;
 }
}

// Função para criar os elementos HTML dinamicamente
function createModeloElements() {
    var modeloTextoDiv = document.getElementById("modeloTexto");

    modelo.forEach(function(palavra) {
        var div = document.createElement("div");
        div.className = "modelo-palavra";
        div.textContent = palavra;
        modeloTextoDiv.appendChild(div);
    });
}

// Executa a função quando a página é carregada
window.addEventListener("load", function() {
    createModeloElements();
    validateText(); // Chama a função validateText
});
    
async function mostrarSugestao() {
        document.getElementById("loadingSpinner").style.display = "block";
    
        var textoDigitado = document.getElementById("textoEntrada").value;
    
        try {
            const response = await fetch("http://127.0.0.1:8000/receive-human-writing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ textoDigitado: textoDigitado }),
            });
    
            if (response.ok) {

                let responseData = await response.text();
                
                responseData = responseData.replace(/^"|"$/g, '');
                responseData = responseData.replace(/\\n/g, '\n');

                document.getElementById("textoSaida").value = responseData;
                document.getElementById("textoSaida").style.display = "block";

                document.getElementById("labelSaida").style.display = "block";
                document.getElementById("textoSaida").style.display = "block";
                document.getElementById("modeloTexto").style.display = "none";
                document.getElementById("textoEntrada").addEventListener("input", validateText);
            } else {
                document.getElementById("mensagemErro").style.color = "red";
                document.getElementById("mensagemErro").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
            }
        } catch (error) {
            console.error("Erro na solicitação ao servidor Python:", error);
            // Adiciona uma mensagem de erro em vermelho para o usuário
            document.getElementById("mensagemErro").style.color = "red";
            document.getElementById("mensagemErro").innerText = "Erro na solicitação ao servidor Python. Verifique a conexão ou tente novamente.";
        } finally {
            document.getElementById("loadingSpinner").style.display = "none";
            document.getElementById("textoSaida").readOnly = false;
            document.getElementById("textoSaida").select();
        }
    }


/*
ART/Squad: DTP - Odin
Sprint: Iris 3
User Storie: 276266
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
