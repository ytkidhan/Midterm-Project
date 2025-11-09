const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// ------- 先畫「天空、太陽、海面」 -------
const seaTop = canvas.height * 0.62; // 海平線 y

// 天空
const sky = ctx.createLinearGradient(0, 0, 0, seaTop);  //建立線性漸層物件，createLinearGradient(起點x, 起點y,終點x, 終點y)
sky.addColorStop(0, '#f7a56a');
sky.addColorStop(1, '#d44b5d');
ctx.fillStyle = sky;
ctx.fillRect(0, 0, canvas.width, seaTop);               //填滿範圍，fillRect(起點x, 起點y,終點x, 終點y)

// 太陽
const sunX = canvas.width * 0.4;
const sunY = seaTop - 40;
const sunR = 28;
ctx.beginPath();
ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);              //arc(圓心x,圓心y,圓半徑,徑度起點,徑度終點)
ctx.fillStyle = '#ffe28a';
ctx.fill();

// 海
const sea = ctx.createLinearGradient(0, seaTop, 0, canvas.height);  //建立線性漸層物件，createLinearGradient(起點x, 起點y,終點x, 終點y)
sea.addColorStop(0, '#b14a66');
sea.addColorStop(1, '#2f4c96');
ctx.fillStyle = sea;
ctx.fillRect(0, seaTop, canvas.width, canvas.height - seaTop);      //填滿範圍，fillRect(起點x, 起點y,終點x, 終點y)

// ------- 關鍵：太陽倒影 -------
drawSunReflection(ctx, {sunX, sunY, sunR, seaTop,bottom: canvas.height});

function drawSunReflection(ctx, { sunX, sunY, sunR, seaTop, bottom })
{
  const topY = seaTop + 2;             // 倒影起點（略低於海平線）
  const topHalfW = sunR * 0.35;        // 上緣半寬（窄）
  const bottomHalfW = sunR * 1.7;      // 下緣半寬（寬）

  ctx.save();

  // 1) 做「上窄下寬」的裁切區域（梯形）
  ctx.beginPath();
  ctx.moveTo(sunX - topHalfW,    topY);
  ctx.lineTo(sunX + topHalfW,    topY);
  ctx.lineTo(sunX + bottomHalfW, bottom);
  ctx.lineTo(sunX - bottomHalfW, bottom);
  ctx.closePath();
  ctx.clip();   //把之後的繪圖都限制在這個梯形內。

  // 2) 垂直漸層：亮黃 → 透明
  const grad = ctx.createLinearGradient(sunX, topY, sunX, bottom);
  grad.addColorStop(0.00, 'rgba(255, 230, 140, 0.85)');
  grad.addColorStop(0.40, 'rgba(255, 230, 140, 0.35)');
  grad.addColorStop(1.00, 'rgba(255, 230, 140, 0.00)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, topY, ctx.canvas.width, bottom - topY);

  // 3) 水平閃光（短亮線）
  ctx.globalCompositeOperation = 'lighter';                     //把混色模式改成 lighter，多次疊加會更亮（適合畫光)
  ctx.lineWidth = 1.2;                                          //設定之後畫線的線寬。
  for (let y = topY + 12; y < bottom; y += 14)                  //從倒影上緣開始，每 14px 畫一條水平亮線，模擬水面「閃光」
  {
        const t = (y - topY) / (bottom - topY);                 // 讓 t 隨高度從 0 漸漸變到 1，用來計算「這一層的最大寬度」
        const halfW = topHalfW + (bottomHalfW - topHalfW) * t;  // 從窄到寬
        const w = (0.3 + Math.random() * 0.7) * halfW;          // 每條線不同長度
        ctx.strokeStyle = 'rgba(255, 240, 180, 0.35)';        //亮線的顏色與透明度，strokeStyle:畫筆風格
        ctx.beginPath();
        ctx.moveTo(sunX - w, y);
        ctx.lineTo(sunX + w, y);
        ctx.stroke();                                           //把線畫出來
  }
  ctx.globalCompositeOperation = 'source-over';                 //混色模式改回預設

  ctx.restore();                                                //還原到 save() 之前的整體狀態
}
