const table = document.getElementById("GalaxyTable");

function changeWidth(width) 
{
  table.style.width = width;
}

function changeBorder(size) 
{
  // 改整個表格的格線（含 th & td）
  table.querySelectorAll("th, td").forEach(cell => {
    cell.style.borderWidth = size;
    cell.style.borderStyle = "solid";
  });
}

function changeColor() 
{
  // 隨機產生背景色
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // 只改 td，不改 th
  table.querySelectorAll("td").forEach(td => {
    td.style.backgroundColor = randomColor;
  });
}

function resetTable() 
{
  // 寬度回預設
  table.style.width = "auto";

  // 邊框回預設
  table.querySelectorAll("th, td").forEach(cell => {
    cell.style.borderWidth = "1px";
    cell.style.borderStyle = "solid";
    cell.style.borderColor = "black";
  });

  // 背景色回白
  table.querySelectorAll("td").forEach(td => {
    td.style.backgroundColor = "white";
  });
}




const images = 
[
  "Milky Way.jpg",
  "Andromeda.jpg",
  "Whirlpool.jpg",
  "Triangulum.jpg",
  "Pinwheel.jpg"
];
const GalaxyName = 
[
  "Milky Way",
  "Andromeda",
  "Whirlpool(M51)",
  "Triangulum(M33)",
  "Pinwheel(M101)"
];
let current = 0;


const imgEl = document.getElementById("Galaxy_Photo");
const Galaxy_Name = document.getElementById("Galaxy_Name");
const counterEl = document.getElementById("counter");
const prevBtn = document.getElementById("Prev");
const nextBtn = document.getElementById("Next");


function render() 
{
  imgEl.src = images[current];
  Galaxy_Name.textContent = GalaxyName[current];
  counterEl.textContent = `Image ${current + 1} of ${images.length}`;
}
prevBtn.addEventListener("click", () => 
{
  current = (current - 1 + images.length) % images.length;
  render();
});
nextBtn.addEventListener("click", () => 
{
  current = (current + 1) % images.length;
  render();
});

render();