let ADMIN_PASS = ''; // เปลี่ยนจาก const เป็น let และเว้นว่างไว้ก่อน
// ดึงรหัสจาก Firebase มาเก็บไว้ในตัวแปร ADMIN_PASS ทันทีที่โหลดแอป
function fetchAdminPass() {
    if (db) {
        db.ref('adminconfig/pass').on('value', snap => {
            ADMIN_PASS = snap.val() ? snap.val().toString() : '';
        });
    } else {
        setTimeout(fetchAdminPass, 500); // ถ้า Firebase ยังไม่มา ให้รอ 0.5 วินาทีแล้วลองใหม่
    }
}
fetchAdminPass();
const SHEETS_URL='https://script.google.com/macros/s/AKfycbz-HrdJNSm-9MuNrFfQv8ujx5bKuVk7CXUJ9PCU8A3jx3hU5HPEdOlRg1Jrm7AlHPGD/exec';
const PALETTES=[
  ['#c9a86c','#d4614a','#7a9e7e','#4a6fa5','#b5835a','#8b5e52'],
  ['#a8956c','#7c9e8a','#c4835a','#6a7fa0','#b08060','#8a7060'],
  ['#e8352a','#f5c842','#3a7bd5','#e85d04','#6d2b8a','#1a1209'],
  ['#f4a7b9','#b8d8d8','#f7dc6f','#a8d8a8','#d4a5c7','#f0c080'],
  ['#ff006e','#3a0ca3','#4cc9f0','#f72585','#7209b7','#4361ee'],
];
let names=[],colors=[],images=[],weights=[],imageCache=[];
let spinLimitEnabled=false,spinLimitMax=1,userSpinCount=0;
let activePalette=[...PALETTES[0]];
let currentUser={name:'',phone:''},currentWinner='',spinResults=[];
let uCtx,uW,uH,uR,uAngle=0,uSpinning=false;
let aCtx,aW,aH,aR,aAngle=0,aSpinning=false;

function showPage(id){
  ['pageRegister','pageUser','pageAdmin'].forEach(p=>{
    const el=document.getElementById(p);
    el.classList.remove('active');el.style.display='none';
  });
  const el=document.getElementById(id);
  el.style.display='flex';el.classList.add('active');
}
function registerUser(){
  const name=document.getElementById('regName').value.trim();
  const phone=document.getElementById('regPhone').value.trim();
  if(!name||!phone){document.getElementById('regErr').style.display='block';return;}
  currentUser={name,phone};
  document.getElementById('userChip').textContent='👤 '+name;
  showPage('pageUser');initUserCanvas();loadWheelData();drawWheel('user');updateUserSpinStatus();
}
document.getElementById('regName').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('regPhone').focus();});
document.getElementById('regPhone').addEventListener('keydown',e=>{if(e.key==='Enter')registerUser();});

function showAdminLogin(){
  document.getElementById('adminLoginOverlay').classList.add('show');
  document.getElementById('adminPassInput').value='';
  document.getElementById('loginError').style.display='none';
  setTimeout(()=>document.getElementById('adminPassInput').focus(),100);
}
function closeAdminLogin(){document.getElementById('adminLoginOverlay').classList.remove('show');}
function checkAdminPass(){
  const inputVal = document.getElementById('adminPassInput').value;
  // เช็คว่ารหัสที่พิมพ์ ตรงกับ ADMIN_PASS ที่ดึงมาจาก Firebase หรือไม่
  if(inputVal === ADMIN_PASS && ADMIN_PASS !== ''){
    closeAdminLogin(); showPage('pageAdmin');
    initAdminCanvas(); loadWheelData(); drawWheel('admin');
    renderAdminNameList(); buildPaletteUI(); renderOrders();
  } else {
    document.getElementById('loginError').style.display='block';
    document.getElementById('adminPassInput').value='';
    document.getElementById('adminPassInput').focus();
  }
}
document.getElementById('adminPassInput').addEventListener('keydown',e=>{if(e.key==='Enter')checkAdminPass();});
document.getElementById('adminLoginOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('adminLoginOverlay'))closeAdminLogin();});
function adminLogout(){showPage('pageUser');drawWheel('user');}
function goUserPage(){showPage('pageUser');drawWheel('user');}

function setProgress(pct,txt){
  const t=document.getElementById('ldTxt');
  if(t&&txt)t.textContent=txt;
}
function hideLoader(){
  if(hideLoader._done)return;
  hideLoader._done=true;
  setProgress(100,'พร้อมแล้ว!');
  setTimeout(()=>{
    const el=document.getElementById('loadingScreen');
    if(el){el.classList.add('hide');setTimeout(()=>el.style.display='none',500);}
  },300);
}
// fallback: ถ้า Firebase โหลดช้าเกิน 6 วินาที บังคับเข้าหน้าปกติ
setTimeout(()=>hideLoader(),6000);
function loadWheelData(){
  if(!db){setTimeout(loadWheelData,200);return;}
  db.ref('wheelConfig').on('value',snap=>{
    const d=snap.val();if(!d)return;
    names=d.names||[];colors=d.colors||[];images=d.images||[];weights=d.weights||[];
    spinLimitEnabled=d.spinLimitEnabled||false;spinLimitMax=d.spinLimitMax||1;
    preloadImages();drawWheel('user');updateUserSpinStatus();
    const tog=document.getElementById('unlimitedToggle');
    if(tog){tog.checked=!spinLimitEnabled;updateToggleUI();}
    if(document.getElementById('limitVal'))document.getElementById('limitVal').textContent=spinLimitMax;
    if(document.getElementById('limitDisplay'))document.getElementById('limitDisplay').textContent=spinLimitMax;
    renderAdminNameList();drawWheel('admin');
  },err=>console.error('Firebase:',err));
}
function publishWheel(){
  if(!db){alert('Firebase ยังไม่พร้อม รอสักครู่');return;}
  db.ref('wheelConfig').set({names,colors,images,weights,spinLimitEnabled,spinLimitMax})
    .then(()=>{
      db.ref('spinCounts').remove();userSpinCount=0;
      const m=document.getElementById('saveMsg');m.style.display='block';
      setTimeout(()=>m.style.display='none',3000);
    }).catch(e=>alert('บันทึกไม่สำเร็จ: '+e.message));
}
function preloadImages(){
  imageCache=images.map(src=>{if(!src)return null;const img=new Image();img.src=src;return img;});
}
function saveOrder(o){
  if(db)db.ref('orders').push(o);
  if(SHEETS_URL&&SHEETS_URL!=='YOUR_APPS_SCRIPT_URL_HERE'){
    fetch(SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)}).catch(()=>{});
  }
}
function initUserCanvas(){
  const c=document.getElementById('userWheel'),ctx=c.getContext('2d');
  const D=Math.min(460,window.innerWidth-32),DPR=window.devicePixelRatio||2;
  c.width=D*DPR;c.height=D*DPR;c.style.width=D+'px';c.style.height=D+'px';ctx.scale(DPR,DPR);
  uCtx=ctx;uW=D;uH=D;uR=D/2-10;
}
function initAdminCanvas(){
  const c=document.getElementById('adminWheel'),ctx=c.getContext('2d');
  const D=Math.min(400,window.innerWidth-80),DPR=window.devicePixelRatio||2;
  c.width=D*DPR;c.height=D*DPR;c.style.width=D+'px';c.style.height=D+'px';ctx.scale(DPR,DPR);
  aCtx=ctx;aW=D;aH=D;aR=D/2-10;
}
function drawWheel(target){
  const u=target==='user';
  const ctx=u?uCtx:aCtx,W=u?uW:aW,H=u?uH:aH,R=u?uR:aR,angle=u?uAngle:aAngle;
  if(!ctx)return;
  ctx.clearRect(0,0,W,H);
  const n=names.length;
  if(n===0){
    ctx.fillStyle='#1a2e44';ctx.beginPath();ctx.arc(W/2,H/2,R,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#5a88aa';ctx.font='600 14px Kanit,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('เพิ่มชื่อก่อนเริ่ม',W/2,H/2);return;
  }
  const arc=(2*Math.PI)/n;
  ctx.save();ctx.translate(W/2,H/2);ctx.rotate(angle);
  for(let i=0;i<n;i++){
    const s=i*arc,e=(i+1)*arc,a=e-s;
    ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,s,e);ctx.closePath();
    ctx.fillStyle='#0d1b2a';ctx.fill();
    ctx.strokeStyle='rgba(79,195,247,.25)';ctx.lineWidth=2;ctx.stroke();
    ctx.save();ctx.rotate(s+a/2);
    if(imageCache[i]&&imageCache[i].complete&&imageCache[i].naturalWidth>0){
      ctx.save();ctx.rotate(-(s+a/2));
      ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R-2,s,e);ctx.closePath();ctx.clip();
      const iw=imageCache[i].naturalWidth,ih=imageCache[i].naturalHeight;
      const sc=Math.max((2*R*Math.sin(a/2))/iw,R/ih);
      const dw=iw*sc,dh=ih*sc,mx=Math.cos(s+a/2)*(R*.6),my=Math.sin(s+a/2)*(R*.6);
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(imageCache[i],mx-dw/2,my-dh/2,dw,dh);ctx.restore();
    }else{
      const sz=Math.min(28,Math.max(10,185/n));
      ctx.save();ctx.translate(R*.55,0);ctx.fillStyle='rgba(255,255,255,.55)';
      ctx.beginPath();ctx.moveTo(-sz*.5,-sz*.15);ctx.lineTo(-sz*.5,sz*.55);ctx.lineTo(sz*.5,sz*.55);ctx.lineTo(sz*.5,-sz*.15);ctx.lineTo(sz*.8,-sz*.5);ctx.lineTo(sz*.5,-sz*.5);ctx.lineTo(sz*.2,-sz*.15);ctx.quadraticCurveTo(0,sz*.05,-sz*.2,-sz*.15);ctx.lineTo(-sz*.5,-sz*.5);ctx.lineTo(-sz*.8,-sz*.5);ctx.closePath();ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.strokeStyle='rgba(79,195,247,.2)';ctx.lineWidth=4;ctx.stroke();
  ctx.restore();
  const bh=R*.38,tipY=-(R-4),baseY=tipY-R*.7;
  ctx.save();ctx.translate(W/2,H/2);
  ctx.beginPath();ctx.moveTo(0,tipY);ctx.lineTo(-bh,baseY);ctx.lineTo(bh,baseY);ctx.closePath();
  ctx.fillStyle='#4fc3f7';ctx.shadowColor='rgba(79,195,247,1)';ctx.shadowBlur=24;ctx.fill();
  ctx.beginPath();ctx.moveTo(0,tipY+12);ctx.lineTo(-bh*.4,baseY+16);ctx.lineTo(bh*.4,baseY+16);ctx.closePath();
  ctx.fillStyle='rgba(255,255,255,.25)';ctx.shadowBlur=0;ctx.fill();
  ctx.restore();
}
function doSpin(target,onWin){
  const u=target==='user';
  if(u?uSpinning:aSpinning)return;
  if(names.length<2)return;
  if(u)uSpinning=true;else aSpinning=true;
  const btn=document.getElementById(u?'userSpinBtn':'adminSpinBtn');
  btn.disabled=true;btn.textContent='... SPINNING';
  const n=names.length,rw=weights.reduce((a,b)=>a+b,0),tw=rw>0?rw:n;
  let rand=Math.random()*tw,wIdx=0;
  for(let i=0;i<n;i++){rand-=rw>0?(weights[i]||0):1;if(rand<=0){wIdx=i;break;}}
  const segArc=(2*Math.PI)/n,wc=(wIdx+.5)*segArc,tgt=-Math.PI/2-wc;
  const ca=u?uAngle:aAngle,spins=5+Math.floor(Math.random()*5);
  const tr=spins*2*Math.PI+((tgt-ca%(2*Math.PI)+4*Math.PI)%(2*Math.PI));
  const sa=ca,dur=4500+Math.random()*1500,t0=performance.now();
  function ease(t){return 1-Math.pow(1-t,4);}
  (function animate(now){
    const t=Math.min((now-t0)/dur,1),a=sa+ease(t)*tr;
    if(u)uAngle=a;else aAngle=a;drawWheel(target);
    if(t<1){requestAnimationFrame(animate);}
    else{
      const f=(sa+tr)%(2*Math.PI);if(u)uAngle=f;else aAngle=f;
      if(u)uSpinning=false;else aSpinning=false;
      btn.disabled=false;btn.textContent=u?'▶ SPIN THE WHEEL':'▶ TEST SPIN';
      onWin(wIdx);
    }
  })(performance.now());
}
function userSpin(){
  if(spinLimitEnabled&&db){
    const key=currentUser.phone||'guest';
    db.ref('spinCounts/'+key).once('value').then(snap=>{
      userSpinCount=snap.val()||0;
      if(userSpinCount>=spinLimitMax){showSpinLimitMsg();return;}
      doSpin('user',idx=>{
        if(spinLimitEnabled){db.ref('spinCounts/'+key).set(userSpinCount+1);userSpinCount++;updateUserSpinStatus();}
        document.getElementById('claimBtn').style.display='block';showWin(idx,true);
      });
    });
    return;
  }
  doSpin('user',idx=>{document.getElementById('claimBtn').style.display='block';showWin(idx,true);});
}
function adminSpin(){
  doSpin('admin',idx=>{spinResults.push({name:names[idx],color:colors[idx]});renderSpinResults();document.getElementById('claimBtn').style.display='none';showWin(idx,false);});
}
function showWin(idx,showClaim){
  currentWinner=names[idx];const img=images[idx],color=colors[idx]||'#4a6fa5';
  if(img){document.getElementById('winImg').src=img;document.getElementById('winImgWrap').style.display='block';document.getElementById('winColor').style.display='none';}
  else{document.getElementById('winImgWrap').style.display='none';document.getElementById('winColor').style.display='block';document.getElementById('winColor').style.background=color;}
  document.getElementById('winName').textContent=currentWinner;
  document.getElementById('claimBtn').style.display=showClaim?'block':'none';
  document.getElementById('winModal').classList.add('show');
  launchConfetti(color);
}
function closeWin(){document.getElementById('winModal').classList.remove('show');}
function openClaim(){
  document.getElementById('winModal').classList.remove('show');
  document.getElementById('claimName').value=currentUser.name;
  document.getElementById('claimPhone').value=currentUser.phone;
  document.getElementById('claimNote').value='';
  document.getElementById('claimErr').style.display='none';
  document.getElementById('claimModal').classList.add('show');
}
function closeClaim(){document.getElementById('claimModal').classList.remove('show');}
function submitClaim(){
  const name=document.getElementById('claimName').value.trim(),phone=document.getElementById('claimPhone').value.trim(),note=document.getElementById('claimNote').value.trim();
  if(!name||!phone){document.getElementById('claimErr').style.display='block';return;}
  saveOrder({name,phone,note,item:currentWinner,time:new Date().toLocaleString('th-TH')});
  document.getElementById('claimModal').classList.remove('show');
  document.getElementById('successModal').classList.add('show');
}
function closeSuccess(){document.getElementById('successModal').classList.remove('show');}
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toggleUnlimited(){spinLimitEnabled=!document.getElementById('unlimitedToggle').checked;updateToggleUI();}
function updateToggleUI(){
  const on=spinLimitEnabled;
  const slider=document.getElementById('toggleSlider'),dot=document.getElementById('toggleDot');
  const row=document.getElementById('limitRow'),status=document.getElementById('spinLimitStatus');
  if(slider){slider.style.background=on?'#1565c0':'var(--surface2)';slider.style.borderColor=on?'#4fc3f7':'rgba(79,195,247,.15)';}
  if(dot){dot.style.transform=on?'translateX(20px)':'translateX(0)';dot.style.background=on?'#90caf9':'var(--muted)';}
  if(row)row.style.display=on?'flex':'none';
  if(status)status.style.display=on?'block':'none';
}
function refreshSpinStats(){
  const wrap=document.getElementById('spinStatsWrap');if(!wrap||!db)return;
  db.ref('spinCounts').once('value').then(snap=>{
    const data=snap.val();
    if(!data){wrap.innerHTML='<div style="font-size:.72rem;color:var(--muted);text-align:center;padding:8px;">ยังไม่มีข้อมูล</div>';return;}
    const stats=Object.entries(data).map(([phone,used])=>({phone,used})).sort((a,b)=>b.used-a.used);
    wrap.innerHTML=stats.map(s=>{
      const pct=Math.min(100,Math.round((s.used/spinLimitMax)*100)),over=s.used>=spinLimitMax;
      return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid rgba(79,195,247,.06);">
        <div style="font-size:.72rem;color:var(--ink2);flex:1;">📞 ${escHtml(s.phone)}</div>
        <div style="font-size:.7rem;color:${over?'#ef5350':'#4fc3f7'};font-weight:700;">${s.used}/${spinLimitMax}</div>
        <div style="width:40px;height:6px;background:var(--surface);border-radius:3px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${over?'#ef5350':'#4fc3f7'};border-radius:3px;"></div>
        </div>
      </div>`;
    }).join('');
  });
}
function resetAllSpins(){
  if(!db)return;
  if(!confirm('รีเซ็ตสปินทุกคน?\nทุกคนจะหมุนได้ใหม่'))return;
  db.ref('spinCounts').remove().then(()=>{userSpinCount=0;refreshSpinStats();updateUserSpinStatus();});
}
function changeLimit(d){
  spinLimitMax=Math.max(1,Math.min(99,spinLimitMax+d));
  document.getElementById('limitVal').textContent=spinLimitMax;
  document.getElementById('limitDisplay').textContent=spinLimitMax;
}
function updateUserSpinStatus(){
  const el=document.getElementById('userSpinStatus');if(!el)return;
  if(!spinLimitEnabled||!db){el.textContent='';return;}
  const key=currentUser.phone||'guest';
  db.ref('spinCounts/'+key).once('value').then(snap=>{
    const used=snap.val()||0,left=spinLimitMax-used;
    if(left<=0){
      el.innerHTML='<span style="color:#ef5350;">❌ คุณใช้สปินครบแล้ว</span>';
      document.getElementById('userSpinBtn').disabled=true;
      document.getElementById('userSpinBtn').textContent='หมดสิทธิ์สปิน';
    }else{
      el.innerHTML=`เหลือสปิน <span style="color:#4fc3f7;font-weight:700;">${left}/${spinLimitMax}</span> ครั้ง`;
      document.getElementById('userSpinBtn').disabled=false;
      document.getElementById('userSpinBtn').textContent='▶ SPIN THE WHEEL';
    }
  });
}
function showSpinLimitMsg(){
  const el=document.getElementById('userSpinStatus');
  if(el)el.innerHTML='<span style="color:#ef5350;font-size:.85rem;">❌ คุณใช้สปินครบแล้ว</span>';
  document.getElementById('userSpinBtn').disabled=true;
  document.getElementById('userSpinBtn').textContent='หมดสิทธิ์สปิน';
}
function addName(){
  const inp=document.getElementById('adminNameInput'),name=inp.value.trim();if(!name)return;
  names.push(name);colors.push(activePalette[names.length%activePalette.length]||activePalette[0]);
  images.push(null);imageCache.push(null);weights.push(0);inp.value='';
  renderAdminNameList();drawWheel('admin');
}
document.getElementById('adminNameInput').addEventListener('keydown',e=>{if(e.key==='Enter')addName();});
function removeName(i){names.splice(i,1);colors.splice(i,1);images.splice(i,1);imageCache.splice(i,1);weights.splice(i,1);renderAdminNameList();drawWheel('admin');}
function clearAll(){if(names.length&&!confirm('ลบทั้งหมด?'))return;names=[];colors=[];images=[];imageCache=[];weights=[];renderAdminNameList();drawWheel('admin');}
function loadDefault(){names=['เสื้อ A','เสื้อ B','เสื้อ C','เสื้อ D','เสื้อ E','เสื้อ F'];colors=names.map((_,i)=>activePalette[i%activePalette.length]);images=names.map(()=>null);imageCache=names.map(()=>null);weights=names.map(()=>0);renderAdminNameList();drawWheel('admin');}
function changeWeight(i,v){weights[i]=Math.min(100,Math.max(0,parseFloat(v)||0));}
function changeColor(i,c){colors[i]=c;drawWheel('admin');}
function uploadImage(i,inp){
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=400,scale=Math.min(MAX/img.width,MAX/img.height,1);
      const canvas=document.createElement('canvas');
      canvas.width=img.width*scale;canvas.height=img.height*scale;
      canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
      images[i]=canvas.toDataURL('image/jpeg',.7);imageCache[i]=img;
      drawWheel('admin');renderAdminNameList();
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}
function clearImage(i){images[i]=null;imageCache[i]=null;renderAdminNameList();drawWheel('admin');}
function renderAdminNameList(){
  const list=document.getElementById('adminNameList');
  if(!names.length){list.innerHTML='<div class="empty-state">ยังไม่มีรายการ</div>';return;}
  list.innerHTML=names.map((n,i)=>{
    const c=colors[i]||'#ccc',hasImg=!!images[i];
    return `<div class="name-item">
      <div class="color-swatch" style="background:${c}"><input type="color" value="${c}" oninput="changeColor(${i},this.value);this.parentElement.style.background=this.value"></div>
      <span class="name-text" title="${escHtml(n)}">${escHtml(n)}</span>
      <div class="weight-wrap"><input class="weight-input" type="number" min="0" max="100" step="1" value="${weights[i]}" oninput="changeWeight(${i},this.value)"><span class="weight-pct">%</span></div>
      <label class="img-btn ${hasImg?'has-img':''}">${hasImg?`<img src="${images[i]}" style="width:100%;height:100%;object-fit:cover;">`:'📷'}<input type="file" accept="image/*" style="display:none" onchange="uploadImage(${i},this)"></label>
      ${hasImg?`<button class="name-del" onclick="clearImage(${i})">✕</button>`:''}
      <button class="name-del" onclick="removeName(${i})">🗑</button>
    </div>`;
  }).join('');
}
function buildPaletteUI(){
  const c=document.getElementById('palettePicker');c.innerHTML='';
  PALETTES.forEach(pal=>{
    const div=document.createElement('div');div.className='palette-preset';
    div.innerHTML=pal.map(c=>`<div class="palette-swatch" style="background:${c}"></div>`).join('');
    div.onclick=()=>{activePalette=[...pal];colors=names.map((_,i)=>pal[i%pal.length]);renderAdminNameList();drawWheel('admin');};
    c.appendChild(div);
  });
}
function renderOrders(){
  const el=document.getElementById('adminOrdersList'),cnt=document.getElementById('orderCount');
  if(!el||!db)return;
  db.ref('orders').on('value',snap=>{
    const data=snap.val(),orders=data?Object.values(data):[];
    cnt.textContent=`รวม ${orders.length} คำสั่ง`;
    if(!orders.length){el.innerHTML='<div class="empty-state">ยังไม่มีคำสั่ง</div>';return;}
    el.innerHTML=[...orders].reverse().map(o=>`<div class="order-card"><div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-family:'Bebas Neue',cursive;color:#4fc3f7;letter-spacing:2px;font-size:.88rem;">${escHtml(o.name)}</span><span style="font-size:.66rem;color:var(--muted);">${o.time}</span></div><div style="font-size:.76rem;color:#90caf9;">📞 ${escHtml(o.phone)}</div><div style="font-size:.73rem;color:var(--muted);">🎁 ${escHtml(o.item)}${o.note?' · '+escHtml(o.note):''}</div></div>`).join('');
  });
}
function clearOrders(){if(!db||!confirm('ลบคำสั่งทั้งหมด?'))return;db.ref('orders').remove();}
function renderSpinResults(){
  const el=document.getElementById('adminResults');
  if(!spinResults.length){el.innerHTML='<div class="empty-state">ยังไม่มีผล</div>';return;}
  el.innerHTML=[...spinResults].reverse().map((r,i)=>`<div style="display:flex;align-items:center;gap:8px;background:var(--surface2);border-radius:8px;padding:7px 10px;"><div style="width:9px;height:9px;border-radius:50%;background:${r.color};flex-shrink:0;"></div><span style="font-size:.83rem;color:var(--ink2);font-weight:600;">${escHtml(r.name)}</span><span style="font-size:.66rem;color:var(--muted);margin-left:auto;">#${spinResults.length-i}</span></div>`).join('');
}
function launchConfetti(mc){
  const c=document.getElementById('confetti');c.width=window.innerWidth;c.height=window.innerHeight;
  const cx=c.getContext('2d'),cols=[mc,'#4fc3f7','#1565c0','#90caf9','#38bdf8'];
  const ps=Array.from({length:90},()=>({x:Math.random()*c.width,y:-10,w:4+Math.random()*8,h:4+Math.random()*8,col:cols[Math.floor(Math.random()*cols.length)],sp:3+Math.random()*5,spin:(Math.random()-.5)*.14,ang:Math.random()*Math.PI*2,dr:(Math.random()-.5)*1.5}));
  let f=0;(function draw(){cx.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.y+=p.sp;p.x+=p.dr;p.ang+=p.spin;cx.save();cx.translate(p.x,p.y);cx.rotate(p.ang);cx.fillStyle=p.col;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();});if(++f<100)requestAnimationFrame(draw);else cx.clearRect(0,0,c.width,c.height);})();
}

// แสดงหน้าทันที ไม่รอ Firebase เลย
let db=null;
// โหลด Firebase หลังจาก browser render หน้าเสร็จแล้ว
function loadFirebase(){
  setProgress(20,'กำลังเชื่อมต่อ...');
  const s1=document.createElement('script');
  s1.src='https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
  s1.onload=()=>{
    setProgress(50,'โหลด Firebase...');
    const s2=document.createElement('script');
    s2.src='https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js';
    s2.onload=()=>{
    setProgress(75,'เชื่อมต่อฐานข้อมูล...');
      firebase.initializeApp({apiKey:"AIzaSyCVbVFhL7BTS-R2LvIgapRnitnOwzZ9i-Q",authDomain:"justshrit.firebaseapp.com",databaseURL:"https://justshrit-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"justshrit",storageBucket:"justshrit.firebasestorage.app",messagingSenderId:"266485761926",appId:"1:266485761926:web:6b435c2232352913828e07"});
      db=firebase.database();
      setProgress(90,'โหลดข้อมูลวงล้อ...');
      // โหลด wheel config จาก Firebase
      db.ref('wheelConfig').once('value').then(snap=>{
        const d=snap.val();
        if(d){names=d.names||[];colors=d.colors||[];images=d.images||[];weights=d.weights||[];spinLimitEnabled=d.spinLimitEnabled||false;spinLimitMax=d.spinLimitMax||1;preloadImages();drawWheel('user');}
        // subscribe realtime
        hideLoader();
        loadWheelData();
      }).catch(()=>{hideLoader();});
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
}
// รอ browser วาดหน้าเสร็จก่อน (~100ms) แล้วค่อยโหลด Firebase
setProgress(10,'เริ่มต้น...');
requestAnimationFrame(()=>setTimeout(loadFirebase,100));
