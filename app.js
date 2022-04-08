const canvas = document.getElementById("canvasJs");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("js_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const  DEFAULT_STYLE = "#2c2c2c"; // 색 디폴트 값

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = DEFAULT_STYLE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.lineWidth = "2.5";

let painting = false;
let filling =false;

function stopPainting () { // 그만 그리기
    painting = false;
    console.log(painting);
}

function onMouseMove (e) {  // 마우스 오버 => 위치 파악 밑 시작점 등등
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
        ctx.moveTo(x, y);
        ctx.beginPath();
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
}

function startPainting (e) { // 패인팅 트루
    painting = true;
    console.log(painting);
}

function changeColor (e) { // 색 변경
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
    console.log(color);
}
 
function chageRange (e) { // 브러쉬 굵기 변경
    const range = e.target.value;
    ctx.lineWidth = range;

}

function modeChange() { // fill, paint 모드 변경
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function canvasClick () { // FILLing이 트루일 때만 화면 배경을 바꿈
    if(filling === true) {
        ctx.fillRect(0, 0, 700, 700);
    }
}

function handleSave () {
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img; // 다운로드 할 이미지 (1줄에 있는)
    link.download = "my painting"; // 링크 다운로드 이름
    link.click();

}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // 마우스 움직일 때
    canvas.addEventListener("mousedown", startPainting); // 클릭 할 때
    canvas.addEventListener("mouseup", stopPainting); // 클릭을 땔 때
    canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖으로 나갈 때
    canvas.addEventListener("click", canvasClick); // 캔버스 클릭시 (fill을 위해)
}


Array.from(color).forEach(ele => ele.addEventListener("click", changeColor)); // 색 선택 메뉴 이벤트 등록

if(range) {
    range.addEventListener("input", chageRange); // 브러쉬 굵기 이벤트 등록
}

if(mode) {
    mode.addEventListener("click", modeChange); // fill, painting 변경 이벤트 등록
}
if(saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}