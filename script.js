
// Variables globales para las unidades y el número máximo de ceros
let units = ["unidades", "decenas", "centenas", "unidades de millar"]; // Valor por defecto
let maxZeros = 3;

// Función para generar una pregunta aleatoria
function generateRandomQuestion() {
    const unitIndex = Math.floor(Math.random() * units.length);
    const unit = units[unitIndex];

    // Genera un número aleatorio entre 1 y 100
    const number = Math.floor(Math.random() * 100) + 1;

    const resultNumber = number * Math.pow(10, unitIndex);
    const question = `¿Cuántas ${unit} tiene ${formatNumberWithSpaces(resultNumber)}?`;
    const answer = number;
    return { question, answer };
}

// Función para dar formato al número con espacios de mil
function formatNumberWithSpaces(number) {
    // Convierte el número a una cadena
    const numberStr = number.toString();

    // Si el número tiene cuatro cifras, no separamos con espacios
    if (numberStr.length === 4) {
        return numberStr;
    }

    // Divide la cadena en grupos de tres cifras desde el final
    const groups = [];
    let i = numberStr.length;
    while (i > 0) {
        groups.push(numberStr.slice(Math.max(0, i - 3), i));
        i -= 3;
    }

    // Une los grupos con espacios y devuelve el resultado
    return groups.reverse().join(' ');
}

// Función para mostrar una nueva pregunta
function displayQuestion() {
    currentQuestion = generateRandomQuestion();
    questionText.textContent = currentQuestion.question;
    userAnswer.value = "";
    result.textContent = "";
}

// Función para comprobar la respuesta del usuario
function checkAnswer() {
    const userResponse = parseFloat(userAnswer.value.trim());
    const correctAnswer = currentQuestion.answer;

    if (userResponse === correctAnswer) {
        result.textContent = "¡Respuesta Correcta!";
        result.style.color = "green";
    } else {
        result.textContent = "Respuesta Incorrecta. La respuesta correcta es " + formatNumberWithSpaces(correctAnswer) + ".";
        result.style.color = "red";
    }

    checkAnswerButton.disabled = true;
    nextQuestionButton.style.display = "block";
}

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    displayQuestion();
    checkAnswerButton.disabled = false;
    nextQuestionButton.style.display = "none";
}

// Escucha el evento de cambio en los radios de selección de ceros
const radioButtons = document.getElementsByName("maxZeros");
for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", function () {
        maxZeros = parseInt(this.value);
        updateUnits();
        displayQuestion();
        checkAnswerButton.disabled = false; // Habilitar el botón "Comprobar" después de cambiar las unidades
    });
}

// Función para actualizar la matriz de unidades en función de maxZeros
function updateUnits() {
    units = [
        "unidades", "decenas", "centenas", "unidades de millar"
    ];

    if (maxZeros >= 6) {
        units.push("decenas de millar", "centenas de millar", "unidades de millón");
    }
    if (maxZeros >= 9) {
        units.push("decenas de millón", "centenas de millón", "unidades de millardo");
    }
    if (maxZeros >= 12) {
        units.push("decenas de millardo", "centenas de millardo", "unidades de billón");
    }
}

// Elementos HTML
const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const checkAnswerButton = document.getElementById("check-answer");
const result = document.getElementById("result");
const nextQuestionButton = document.getElementById("next-question");

// Mostrar la primera pregunta
displayQuestion();

// Eventos de los botones
checkAnswerButton.addEventListener("click", checkAnswer);
nextQuestionButton.addEventListener("click", nextQuestion);
