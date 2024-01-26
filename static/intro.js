
    function hideFields() {
        document.getElementById('buttons-feedback').style.display = 'none';
        document.getElementById('FieldHTML').style.display = 'none';
        document.getElementById('textoSaida').style.display = 'none';
    }

    function showFields() {
        document.getElementById('buttons-feedback').style.display = 'block';
        document.getElementById('textoSaida').style.display = 'block';
        document.getElementById('FieldHTML').style.display = 'block';
        document.getElementById('FieldHTML').innerHTML = `<h3>What do I understand from your writing?</h3> <br> <p>This particular section serves as the realm where the website's sophisticated artificial intelligence delves into the nuances of your text, deciphering its intricacies to provide you with insightful and tailored recommendations for potential alterations. It operates as a virtual interpreter, analyzing the content with precision and offering nuanced insights.</p> <br> <p><span style="color: blue;"> <b>Tip:</b> </span> When shaping a task or project description, enrich the content by specifying the task's overarching goal, detailing the necessary steps to be taken, and outlining any essential prerequisites or specific requirements. This additional information will significantly enhance comprehension and collaboration.</p>`;
    }

    function isDontShowAgainSet() {
        return document.cookie.includes('dontShowAgain=true');
    }

    
    if(!isDontShowAgainSet())  {
        
        showFields()
        introJs().setOption("dontShowAgain", true).setOptions({
            tooltipClass: 'customTooltip',
            steps: [
            {
                title: 'Welcome to QA Write Genius AI! 👋',
                element: document.querySelector('.container text-center mt-5'),
                intro: `<p>My name is <em>QA Writer Genius</em>, <b>your dedicated assistant</b> in creating test cases. <br> My main goals are:
                        <ul><li><b>Standardize</b> the text for consistency.</li><li>Enhance the quality of writing in your test cases.
                        </li><li>Speed up <b>review and correction</b> processes.</li><li>Efficiently identify key terms.
                        </li><li>Provide <b>personalized suggestions</b> to optimize clarity and precision.</li></ul>
                        For more information, check our <a href="https://github.com/alisonsassi/QA_Write_Genius_AI" target="_blank"><span style="color: blue;">documentation here</span></a>.`,

                position: 'top'
            },
            {
                
                title: 'Do your ready? 💪',
                element: document.querySelector('.container text-center mt-5'),
                intro: `<div style="width:100%;height:0;padding-bottom:94%;position:relative;"><iframe src="https://giphy.com/embed/CjmvTCZf2U3p09Cn0h" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                        <br><br>
                        <span style="color: red;">Let's now explore the tutorial.</span></p>`,
                position: 'top'
            },
            {
                title: 'Essential Keywords 📝',
                element: document.getElementById('modeloTexto'),
                intro: `<p>In this field, <strong>observe</strong> the list of predefined <strong>keywords</strong> that need to be present in your test case. <br><br>
                        <b> <span style="color: blue;">Simply follow the template!</span></b></p>`,
                position: 'top'
            },
            {
                title: 'AI Analysis and Opinion 🤖',
                element: document.getElementById('FieldHTML'),
                intro: `<p>Here, I'll write what <b> I've understood from your test case writing</b>, <em>suggesting</em> modifications.<br><br>
                        It's an <b>opinion based</b> on my understanding; <span style="color: red;">please analyze </span>, and check if it makes sense.</p>`,
                position: 'right'
            },
            {
                title: 'Editing Your Test Cases 🖊️',
                element: document.getElementById('textoEntrada'),
                intro: `<p>This section is designed for <b>entering your test case</b> while adhering to the provided template. Feel free to edit and enhance your test case writing in this space.</p>`,
                position: 'top'
            },
            {
                title: 'AI Suggestions Preview 👀',
                element: document.getElementById('textoSaida'),
                intro: `<p>This field reflects your input, and adjustments will be made through AI training. <br><br>
                        Please note that this text is a <strong>suggestion</strong>, <span style="color: red;">so analyze it</span> to ensure it makes sense.</p>`,
                position: 'left'
            },
            {
                title: '🌟Evaluate My Generated Suggestion! PARTICIPATE🌟',
                element: document.getElementById('buttons-feedback'),
                intro: `<p>I implore you to <strong>evaluate</strong> my suggestion. Your feedback is crucial; it helps me understand areas for improvement and refinement.</p>
                        <p>Please, with your input, I can better tailor my responses to your needs.</p>`,
                position: 'bottom'
            },
            {
                title: '',
                element: document.getElementById('buttons-feedback'),
                intro: `<div style="width:100%;height:0;padding-bottom:83%;position:relative;"><iframe src="https://giphy.com/embed/yq4eR6yr2kk54STqme" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                        <br><br>
                        <p><b>Please</b>, with your input, I can better tailor my responses to your needs.</p>`,
                position: 'bottom'
            }]
        }).oncomplete(function () {
            hideFields()
        }).onexit(function () {
            const dontShowAgainCheckbox = document.getElementById('dontShowAgainCheckbox');
            if (dontShowAgainCheckbox && dontShowAgainCheckbox.checked) {
                document.cookie = 'dontShowAgain=true;';
            }

            hideFields();
        }).start();
    }
