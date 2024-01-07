const drawJoystick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // grand cercle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.strokeStyle = "#FFEB3B";
    ctx.stroke();

    // cercle qui represente le joystick
    ctx.beginPath();
    ctx.arc(joystick.x, joystick.y, joystick.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#4285F4";
    ctx.fill();
    ctx.strokeStyle = "#4285F4";
    ctx.stroke();
    
    
    // cercle qui represente le cercle de référence
    indicatorX = canvas.width / 2 + 150 * Math.cos(indicatorAngle);
    indicatorY = canvas.height / 2 + 150 * Math.sin(indicatorAngle);

    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, point.size, 0, 2 * Math.PI);
    ctx.fillStyle = collision ? "#00FF00" : "#FF0000";
    ctx.fill();
}