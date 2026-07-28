console.log('website run')

const form = document.getElementById('passwordForm')
const car = document.getElementById('car')
const condoms = document.getElementById('condoms')
const emojis = document.getElementById('emoji')
const tggifts = document.getElementById('tggifts')
const map = document.getElementById('map')
const invisible = document.getElementById('invisible')
const light = document.getElementById('light')

const input = document.getElementById('passwordInput')
const ruKeyboard = document.getElementById('ruKeyboard');
const enKeyboard = document.getElementById('enKeyboard');


function hideAll() {
    emojis.style.display = 'none';
    invisible.style.display = 'none'
    light.style.display = 'none';
    tggifts.style.display = 'none';
    map.style.display = 'none';

    car.style.display = 'none';
    condoms.style.display = 'none';
    
}
function fastHide() {
    car.style.display = 'none';
    condoms.style.display = 'none';

    tggifts.style.display = 'none';
}

function enter(){

    const password = input.value.toLowerCase().trim(); 

    if (password === '') return;

    console.log('password', password, "entered")
    input.value = "";

    switch(password){
        case "мормышка":
            event.preventDefault();
            hideAll();
            emojis.style.display = 'flex';
            break;
        case "honiroth":
            event.preventDefault();
            hideAll();
            invisible.style.display = 'flex';
            break;
        case "фуфайка":
            hideAll();
            light.style.display = 'flex';
            break;
        case "dark":
            event.preventDefault();
            hideAll();
            tggifts.style.display = 'flex';
            break;

        case "code":
            event.preventDefault();
            hideAll();
            // link to memores map
            map.style.display = 'flex';
            break;
        case "car":
            event.preventDefault();
            hideAll();
            // video starts
            car.style.display = 'flex';

            break;
        
        case "трахендроп":
            event.preventDefault();
            hideAll();
            condoms.style.display = 'flex';
            break;

        default:
            const headText = document.getElementById('passwordHint');
            const wrongMessage = [
                "неаа))...",
                "думай, думай...",
                "уже почти (неа)..."
            ]
            input.classList.add('shake');
            const newHead = wrongMessage[Math.floor(Math.random() * wrongMessage.length)]
            headText.innerText = newHead;

            setTimeout(function() {
                input.classList.remove('shake');
                headText.innerText = 'вводи пароль))';
            }, 1500)
            break;

    }
};

const hintsList = [
    { text: "ну ка зайди в тг", window: "emojis", isUsed: false},
    { text: "хорошо, посмотри стикерпак", window: "emojis", isUsed: false},
    { text: "посмотри, здесь что-что выделяется", window: "light", isUsed: false},
    { text: "посмотри на картинки еще разок", window: "tggifts", isUsed: false},
    { text: "открой тг, ничего не напомниает?", window: "tggifts", isUsed: false},
    { text: "опять придется взять подарок", window: "code", isUsed: false},
    { text: "видишь поле?", window: "code", isUsed: false},
    { text: "этот код сможет получить только настоящий программист", window: "condoms", isUsed: false},
    { text: "здесь подсказки закончились, но у тебя есть я))", window: "condoms", isUsed: false}
];



function switchLanguage() {
    ruKeyboard.classList.toggle('hidden');
    enKeyboard.classList.toggle('hidden');
    input.focus(); // Возвращаем фокус на поле ввода
}     
function backspace(){
    input.value = input.value.slice(0, -1);
    input.focus();
}
car.addEventListener('click', function(){
    fastHide();
});
condoms.addEventListener('click', function(){
    fastHide();
});

document.querySelectorAll('.key').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.classList.contains('lang-btn') || button.classList.contains('enter') || button.classList.contains('backspace')) return;

        input.value += button.textContent;
        input.focus();
    });
});



const container = document.querySelector('.descriptions');

const correctOrder = ["humster", "shit", "redbull", "deer", "astronaut"];

function checkGiftsOrder() {

    const currentOrder = Array.from(container.querySelectorAll('img')).map(img => img.id);
    console.log(currentOrder)
    const isCorrect = currentOrder.every((id, index) => id == correctOrder[index]);
    if (isCorrect) {
        alert('congratulation');
         // replace for animation of gifts raising and creating of a pass
    }
}


const descriptions = document.querySelector('.descriptions');
const empty = document.querySelectorAll('.empty');
const drags = document.querySelectorAll('.drag');    

let itemAppended = null;
let dragCurrent = null;
let dragBase = null;

descriptions.addEventListener('touchstart', dragIdentify);
descriptions.addEventListener('touchmove', dragMove); //dragMove - functions name
descriptions.addEventListener('touchend', dragDrop);


function dragIdentify(event){
    event.preventDefault();
    
    let touch = event.targetTouches[0]; // 1 finger touch

    drags.forEach(item => {
        if (
            touch.clientY > item.getBoundingClientRect().top  &&
            touch.clientY < item.getBoundingClientRect().bottom  &&
            touch.clientX > item.getBoundingClientRect().left  &&
            touch.clientX < item.getBoundingClientRect().right 
        ){
            dragCurrent = item;
            dragCurrent.classList.add('currentdrag')
            dragBase = item.closest('.empty');
        }
    });
}

function dragMove(event) {
    event.preventDefault();
    
    if (!dragCurrent) return;

    let touch = event.targetTouches[0]; // 1 finger touch

    dragCurrent.style.top = `${touch.pageY - descriptions.offsetTop - dragCurrent.clientWidth/0.5}px`;
    dragCurrent.style.left = `${touch.pageX - descriptions.offsetLeft - dragCurrent.clientHeight/2}px`; 

    empty.forEach(item =>{
        if (
            dragCurrent.getBoundingClientRect().top + dragCurrent.clientWidth/2 < item.getBoundingClientRect().bottom  &&
            dragCurrent.getBoundingClientRect().right - dragCurrent.clientWidth/2> item.getBoundingClientRect().left  &&
            dragCurrent.getBoundingClientRect().bottom - dragCurrent.clientWidth/2> item.getBoundingClientRect().top  &&
            dragCurrent.getBoundingClientRect().left + dragCurrent.clientWidth/2< item.getBoundingClientRect().right 
        ){
            item.classList.add('active');
            itemAppended = item;
        }
        else {
            item.classList.remove('active');
        }
    })

}

function dragDrop(event) {
    event.preventDefault();

    if (itemAppended && itemAppended.classList.contains('active') && dragCurrent){
        let tmpDrag = itemAppended.querySelector('.drag');
        
        itemAppended.append(dragCurrent);
        dragBase.append(tmpDrag);

        dragCurrent.style.top = `${itemAppended.offsetTop}px`;
        dragCurrent.style.left = `${itemAppended.offsetLeft}px`;

        tmpDrag.style.top = `${dragBase.offsetTop}px`;
        tmpDrag.style.left = `${dragBase.offsetLeft}px`;
    }else{
        dragCurrent.style.top = `${dragBase.offsetTop}px`;
        dragCurrent.style.left = `${dragBase.offsetLeft}px`;
    }

    dragCurrent.classList.remove('currentdrag')
    dragCurrent = null;
    itemAppended = null;
    dragBase = null;

    checkGiftsOrder();

}



//wheel of fortune

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const closeBtn = document.getElementById('closeBtn');
const wheelWidget = document.getElementById('wheelWidget');
const resultDiv = document.getElementById('result');

const colors = [
    '#2e2c49', '#27b2d1', '#4e9683', '#e9ae30', '#a454bd',
    '#1c3483', '#130a25', '#224fb1', '#f5f5e5', '#ad83a8'
];

let currentSectors = [
    { text: "Кидаешь фото пяточек", message: "Кидаешь фото пяточек", removeAfterWin: true },
    { text: "танцуешь стриптиз", message: "танцуешь мне стриптиз", removeAfterWin: true }, // nomination
    { text: "браслетики nomination", message: "делаем браслетики               nomination (и ты его носишь!!!!)", removeAfterWin: true }, // striptease
    { text: "покупаешь мороженки", message: "покупаешь нам мороженки", removeAfterWin: true },    
    { text: "10 поцелуйчиков", message: "10 поцелуйчиков", removeAfterWin: false },
    { text: "целуешь в лобик", message: "целуешь в лобик", removeAfterWin: false },
    { text: "потом придумаем 1", message: "потом придумаем 1", removeAfterWin: false }
];

const extraSectors = [
    { text: "потом придумаем 2", message: "потом придумаем 1", removeAfterWin: false },
    { text: "делаешь массаж", message: "дома сделаешь мне проффэшнл массаж", removeAfterWin: true },
    { text: "потом придумаем 3", message: "потом придумаем 1", removeAfterWin: false },
    { text: "потом придумаем 4", message: "потом придумаем 1", removeAfterWin: false },
    { text: "катаешь на спине", message: "катаешь на спине", removeAfterWin: true }
];

let sectorsData = []; 
let startAngle = 0;   
let isSpinning = false;
let pendingRemovalIndex = null; 

const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

function rebuildWheelStructure() {
    
    if (pendingRemovalIndex !== null) {
        currentSectors.splice(pendingRemovalIndex, 1);
        pendingRemovalIndex = null;
    }
    
    while (currentSectors.length < 5 && extraSectors.length > 0) {
        currentSectors.push(extraSectors.shift());
    }
    
    if (currentSectors.length === 0) return;

    let totalWeight = 0;
    const tempSectors = currentSectors.map(sector => {
        const weight = randomRange(20, 150);
        totalWeight += weight;
        return { ...sector, weight };
    });
    
    const shuffledColors = shuffle([...colors]);

    let currentAngleSum = 0;
    sectorsData = tempSectors.map((sector, index) => {
        const sectorAngle = (sector.weight / totalWeight) * (2 * Math.PI);
        const start = currentAngleSum;
        const end = currentAngleSum + sectorAngle;
        currentAngleSum = end;
        
        return {
            ...sector,
            startAngle: start,
            endAngle: end,
            color: shuffledColors[index % shuffledColors.length]
        };
    });
    
}

function drawWheel() {
    if (sectorsData.length === 0) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    sectorsData.forEach(sector => {
        const sAngle = sector.startAngle + startAngle;
        const eAngle = sector.endAngle + startAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, sAngle, eAngle);
        ctx.closePath();
        ctx.fillStyle = sector.color;
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        const middleAngle = sAngle + (eAngle - sAngle) / 2;
        ctx.rotate(middleAngle);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.font = "bold 20px Arial";
        
        ctx.fillText(sector.text, radius - 15, 5);
        ctx.restore();
    });
    
}

function spin() {
    if (isSpinning) return;
    
    rebuildWheelStructure();
    startAngle = 0;
    drawWheel();
    
    isSpinning = true;
    spinBtn.disabled = true;
    
    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 2000 ;
    
    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotate();
            return;
        }
        const change = spinAngleStart * (1 - easeOutQuad(spinTime, 0, 1, spinTimeTotal));
        startAngle += (change * Math.PI / 180);
        drawWheel();
        requestAnimationFrame(rotateWheel);
    }
    
    rotateWheel();
    
}

function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
}


function stopRotate() {
    isSpinning = false;
    spinBtn.disabled = false;

    const pointerAngle = (3 * Math.PI / 2) - (startAngle % (2 * Math.PI));
    let targetAngle = pointerAngle;
    while (targetAngle < 0) targetAngle += 2 * Math.PI;
    while (targetAngle > 2 * Math.PI) targetAngle -= 2 * Math.PI;

    const winningSector = sectorsData.find(sector => targetAngle >= sector.startAngle && targetAngle <= sector.endAngle);

    if (winningSector) {
        resultDiv.textContent = `${winningSector.message}`;

        
        if (winningSector.removeAfterWin) {
            const index = currentSectors.findIndex(s => s.text === winningSector.text);
            if (index !== -1) {
                pendingRemovalIndex = index; 
                
            }
        }
    }
}

closeBtn.addEventListener("click", () => {
    if (isSpinning) return; 

    wheelWidget.style.display = 'none';
    resultDiv.textContent = "";

    rebuildWheelStructure();
    startAngle = 0;
    
});

helpBtn = document.getElementById('helpBtn');
helpBtn.addEventListener("click", () => {
    wheelWidget.style.display = 'flex';
});

spinBtn.addEventListener("click", spin);
rebuildWheelStructure();
drawWheel();