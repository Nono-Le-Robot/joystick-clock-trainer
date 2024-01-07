const canvas = document.getElementById('joystickCanvas');
const scoreLabel = document.getElementById('scoreLabel');
const speedLabel = document.getElementById('speedLabel');
const speedUpBtn = document.getElementById('btn-speed-up');
const speedDownBtn = document.getElementById('btn-speed-down');

const ctx = canvas.getContext('2d');

const joystick = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    deadzone : 0.1,
    radius: 25,
};

const point = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
};

let indicatorAngle = 0;
let indicatorX, indicatorY;
let indicatorSpeed = ((2 * Math.PI) / 60);
const startRotationThreshold = 0.8;
let rotationFactor = 1;
let timeToRevo = 1
let collision = false;
let score = 0;
let scoreMultiplier = 1;


function handleGamepadInput() {
    const gamepads = navigator.getGamepads();

    if (gamepads && gamepads[0]) {
        const leftStickX = applyDeadzone(gamepads[0].axes[0], joystick.deadzone);
        const leftStickY = applyDeadzone(gamepads[0].axes[1], joystick.deadzone);


        joystick.x = canvas.width / 2 + leftStickX * 150;
        joystick.y = canvas.height / 2 + leftStickY * 150;

        const distance = Math.sqrt((joystick.x - canvas.width / 2) ** 2 + (joystick.y - canvas.height / 2) ** 2);
        if (distance > 150 - joystick.radius) {
            const angle = Math.atan2(joystick.y - canvas.height / 2, joystick.x - canvas.width / 2);
            joystick.x = canvas.width / 2 + (175 - joystick.radius) * Math.cos(angle);
            joystick.y = canvas.height / 2 + (175 - joystick.radius) * Math.sin(angle);
        }

        if(joystickAtCenter(leftStickX, leftStickY)) {
            ctx.beginPath();
            ctx.arc(indicatorX, indicatorY, point.size, 0, 2 * Math.PI);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
        }
    }
}

function joystickAtCenter(joystickX, joystickY) {
    const isAtCenter = joystickX === 0 && joystickY === 0 ? true : false;
    return isAtCenter;
}

function applyDeadzone(value, deadzone){
    return Math.abs(value) < deadzone? 0 : value;
}

function checkCollision() {
    const distance = Math.sqrt((indicatorX - joystick.x) ** 2 + (indicatorY - joystick.y) ** 2);
    if (distance < joystick.radius + point.size) {
        collision = true
        score =  score + scoreMultiplier;
    }
    else {
        collision = false
    }
    scoreLabel.textContent = `Score: ${(score / 10).toFixed(2)}`;   
}

function animateJoystick() {
    const gamepads = navigator.getGamepads();
    drawJoystick();
    handleGamepadInput();

    if (gamepads && gamepads[0] && (Math.abs(gamepads[0].axes[0]) > startRotationThreshold || Math.abs(gamepads[0].axes[1]) > startRotationThreshold)) {
        indicatorAngle += indicatorSpeed * rotationFactor;
        if (indicatorAngle > 2 * Math.PI) {
            indicatorAngle -= 2 * Math.PI;
        }
        checkCollision(); 
    }

    requestAnimationFrame(animateJoystick);
}
function changeSpeed(){
    speedUpBtn?.addEventListener("click", () => {
        timeToRevo = timeToRevo / 2
        scoreMultiplier = scoreMultiplier * 2
        indicatorSpeed = ((2 * Math.PI) / 60) / timeToRevo;
        speedLabel.textContent = `1 Rotation = ${timeToRevo}s`
    })

    speedDownBtn?.addEventListener("click", () => {
        timeToRevo = timeToRevo * 2
        scoreMultiplier = scoreMultiplier / 2
        indicatorSpeed = ((2 * Math.PI) / 60) / timeToRevo;
        speedLabel.textContent = `1 Rotation = ${timeToRevo}s`
    })
}

animateJoystick();
changeSpeed();
