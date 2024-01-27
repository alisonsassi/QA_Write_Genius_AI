
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
        document.getElementById("botaoValidar").style.backgroundColor = "green";
        document.getElementById("modeloTexto").innerHTML = '<strong style="color: green;">Model OK</strong>';
        document.getElementById("botaoValidar").disabled = false;
    } else {
        document.getElementById("botaoValidar").style.backgroundColor = "gray";
        document.getElementById("modeloTexto").style.display = "block";
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

        disableEnableFeedbackButtons('enable');
        document.getElementById("loadingSpinner").style.display = "block";
    
        var typedText = document.getElementById("textoEntrada").value;
    
        try {
            const response = await fetch("http://127.0.0.1:8000/suggestion-of-TestCase-typed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ typedText: typedText, userIdCookie: getCookie("userId") }),
            });
    
            if (response.ok) {

                let responseData = await response.json();
                const responseDataJSON = JSON.parse(responseData);
                const textResponse = responseDataJSON.text_response;

                document.getElementById("textoSaida").value = textResponse;
                document.getElementById("textoSaida").style.display = "block";
                document.getElementById("buttons-feedback").style.display = "block";
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
            document.getElementById("mensageErrorServer").innerText = "Error in method ShowSuggestion. Try again";
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
            body: JSON.stringify({ typedText: typedText, userIdCookie: getCookie("userId")}),
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
        document.getElementById("loadingSpinnerOpinion_AI").style.display = "none";
    }
}

/**
 * Function for check the Cookie.
 * @var {userId} - user generate for indetification.
 * @var {newUserId} - New user generate for indetification.
 */
function checkCookie() {
    var userId = getCookie("userId");
    if (userId) {
        console.log("Usuário já possui um ID:", userId);
    } else {
        var newUserId = 'User_Write_Genius_' + Math.random().toString(36).substr(2, 9);
        console.log("Novo ID gerado para o usuário:", newUserId);
        setCookie("userId", newUserId, 365);
        return userId
    }
}

/**
 * Function for get the Cookie.
 * @var {cookieName} - name cookie.
 * @var {cookies} - list of cookie.
 */
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
/**
 * Function for set the Cookie in the browser.
 * @param {name} - name cookie.
 * @param {value} - name cookie.
 * @param {days} - days of cookie.
 * @var {expires} - number for expire Cookie.
 * @var {date} - date actual.
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * Function for send requisition for API.
 * @var {textareaId} - text of justification.
 * @var {modalId} - date actual.
 */
async function sendFeedbackWithData(modalId, justification) {

    var textIn = document.getElementById("textoEntrada").value;
    var textOut = document.getElementById("textoSaida").value;
    var fieldOpinion = document.getElementById("FieldHTML");
    var userIdCookie = getCookie("userId");

    try {
        const response = await fetch("http://127.0.0.1:8000/send-feedback-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ modalId: modalId, justification: justification, textIn: textIn, textOut: textOut, fieldOpinion: fieldOpinion.innerText,  userIdCookie: userIdCookie}),
        });

        if (response.ok) {
            try {
                $('#' + modalId + ' .form-control').val('');
                $('#' + modalId).modal('hide');
                showThanksModal('Your contribution is very important to us. We appreciate you sharing your feedback! 🌟', 'success');
                setTimeout(function() {
                    $('#modalThanks').modal('hide');
                }, 4000);

            } catch (error) {
                console.error("Error in request send Feedback, error:", error);
                showThanksModal('An error occurred. Please try again.', 'error');
            }
            
        } else {
            console.error("Error in request send Feedback, error:", error);
            showThanksModal('An error occurred. Please try again.', 'error');
        }
    } catch (error) {
        console.error("Error in request send Feedback, error:", error);
        showThanksModal('An error occurred. Please try again.', 'error');
    }
}

function showThanksModal(message, messageType) {
    var modalThanks = $('#modalThanks');
    var modalBody = modalThanks.find('.modal-body');
    var modalHeader = modalThanks.find('.modal-header');
    
    modalBody.text(message);
    if (messageType === 'success') {
        modalHeader.css({
                    'background-color': '#87CEEB', // LightBlue color for background
                    'style': 'black' // Set the text color to black
                });

    } else if (messageType === 'error') {
        modalHeader.css({
            'background-color': '#DC143C', // Crimson color for error
            'color': 'black' // Set the text color to black
        });
    }

    modalThanks.modal('show');
}       

/**
 * Function for success of the requisition.
 * @var {textareaId} - text of justification.
 * @var {modalId} - date actual.
 */
function onAjaxSuccess() {
    var textareaId = $(this).closest('.modal').find('.form-control').attr('id');
    var modalId = $(this).closest('.modal').attr('id');

    $('#' + textareaId).val('');
    $('#' + modalId).modal('hide');
    showThanksModal('Thank You for Your Feedback! 🌟', 'success');
    setTimeout(function() {
        $('#modalThanks').modal('hide');
    }, 4000);
}
/**
 * Function for success of the requisition.
 * @var {textareaId} - text of justification.
 * @var {modalId} - date actual.
 */
function onAjaxError() {
    showThanksModal('An error occurred. Please try again.', 'error');
}

function showThanksModal(message, messageType) {
    var modalThanks = $('#modalThanks');
    var modalBody = modalThanks.find('.modal-body');
    var modalHeader = modalThanks.find('.modal-header');
    
    modalBody.text(message);
    if (messageType === 'success') {
        modalHeader.css('background-color', '#87CEEB');
    } else if (messageType === 'error') {
        modalHeader.css('background-color', '#DC143C');
    }

    modalThanks.modal('show');
}

function disableEnableFeedbackButtons(argument) {
    var feedbackButtons = $('#buttons-feedback button');
    if(argument == 'disabled'){
        feedbackButtons.prop('disabled', true);
        feedbackButtons.addClass('disabled-button');
    }
    if(argument == 'enable'){
        feedbackButtons.prop('disabled', false);
        feedbackButtons.removeClass('disabled-button');
    }
}
