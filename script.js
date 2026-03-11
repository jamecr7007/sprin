/* @license Copyright 2025 JUSTSHRT. All rights reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential. Protected by international copyright law.
 */
;(function(_p,_q){var _r=function(_s){while(--_s){_p['push'](_p['shift']());}};_r(++_q);}([]  ,0));
const ADMIN_PASS='\x31\x32\x33';
const SHEETS_URL='https://script.google.com/macros/s/AKfycbz-HrdJNSm-9MuNrFfQv8ujx5bKuVk7CXUJ9PCU8A3jx3hU5HPEdOlRg1Jrm7AlHPGD/exec';
const PALETTES=[
['#c9a86c','#d4614a','#7a9e7e','#4a6fa5','#b5835a','#8b5e52'],
['#a8956c','#7c9e8a','#c4835a','#6a7fa0','#b08060','#8a7060'],
['#e8352a','#f5c842','#3a7bd5','#e85d04','#6d2b8a','#1a1209'],
['#f4a7b9','#b8d8d8','#f7dc6f','#a8d8a8','#d4a5c7','#f0c080'],
['#ff006e','#3a0ca3','#4cc9f0','#f72585','#7209b7','#4361ee'],
];
let _0x640ca4=[],_0xb8601e=[],_0xe8d922=[],_0x4ecde3=[],_0x31ce69=[];
let _0x2edfce=false,_0x0b5ecd=1,_0xc4c1dd=0;
let _0x3d74c3=[...PALETTES[0]];
let _0x035df4={name:'',phone:''},_0xa6f8f1='',_0xf2f416=[];
let _0xb59869,_0x4b0e8b,_0xba51a5,_0x5db446,_0x6426fa=0,_0xe94804=false;
let _0x69a773,_0x7ec218,_0xa5dca3,_0x3037d1,_0x6a3b73=0,_0xa0cc16=false;
function _0xa47ed1(id){
['pageRegister','pageUser','pageAdmin'].forEach(p=>{
const el=document.getElementById(p);
el.classList.remove('active');el.style.display='none';
});
const el=document.getElementById(id);
el.style.display='flex';el.classList.add('active');
}
function _0xa043ba(){
const name=document.getElementById('regName').value.trim();
const phone=document.getElementById('regPhone').value.trim();
if(!name||!phone){document.getElementById('regErr').style.display='block';return;}
_0x035df4={name,phone};
document.getElementById('userChip').textContent='👤 '+name;
_0xa47ed1('pageUser');_0xe5a6e7();_0xa5534e();_0x63f810('user');_0xbaf165();
}
document.getElementById('regName').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('regPhone').focus();});
document.getElementById('regPhone').addEventListener('keydown',e=>{if(e.key==='Enter')_0xa043ba();});
function _0xe16038(){
document.getElementById('adminLoginOverlay').classList.add('show');
document.getElementById('adminPassInput').value='';
document.getElementById('loginError').style.display='none';
setTimeout(()=>document.getElementById('adminPassInput').focus(),100);
}
function _0x03a839(){document.getElementById('adminLoginOverlay').classList.remove('show');}
function _0xc0cb52(){
if(document.getElementById('adminPassInput').value===ADMIN_PASS){
_0x03a839();_0xa47ed1('pageAdmin');
_0x43849e();_0xa5534e();_0x63f810('admin');
_0x698e3b();_0x36a45c();_0x17ff13();
}else{
document.getElementById('loginError').style.display='block';
document.getElementById('adminPassInput').value='';
document.getElementById('adminPassInput').focus();
}
}
document.getElementById('adminPassInput').addEventListener('keydown',e=>{if(e.key==='Enter')_0xc0cb52();});
document.getElementById('adminLoginOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('adminLoginOverlay'))_0x03a839();});
function _0xf511d9(){_0xa47ed1('pageUser');_0x63f810('user');}
function _0xcb8f68(){_0xa47ed1('pageUser');_0x63f810('user');}
function _0xd9d9b0(pct,txt){
const t=document.getElementById('ldTxt');
if(t&&txt)t.textContent=txt;
}
function _0x341314(){
if(_0x341314._done)return;
_0x341314._done=true;
_0xd9d9b0(100,'พร้อมแล้ว!');
setTimeout(()=>{
const el=document.getElementById('loadingScreen');
if(el){el.classList.add('hide');setTimeout(()=>el.style.display='none',500);}
},300);
}
setTimeout(()=>_0x341314(),6000);
function _0xa5534e(){
if(!db){setTimeout(_0xa5534e,200);return;}
db.ref('wheelConfig').on('value',snap=>{
const d=snap.val();if(!d)return;
_0x640ca4=d._0x640ca4||[];_0xb8601e=d._0xb8601e||[];_0xe8d922=d._0xe8d922||[];_0x4ecde3=d._0x4ecde3||[];
_0x2edfce=d._0x2edfce||false;_0x0b5ecd=d._0x0b5ecd||1;
_0xfa8adc();_0x63f810('user');_0xbaf165();
const tog=document.getElementById('unlimitedToggle');
if(tog){tog.checked=!_0x2edfce;_0x59331a();}
if(document.getElementById('limitVal'))document.getElementById('limitVal').textContent=_0x0b5ecd;
if(document.getElementById('limitDisplay'))document.getElementById('limitDisplay').textContent=_0x0b5ecd;
_0x698e3b();_0x63f810('admin');
},err=>console.error('Firebase:',err));
}
function _0xa92b26(){
if(!db){alert('Firebase ยังไม่พร้อม รอสักครู่');return;}
db.ref('wheelConfig').set({_0x640ca4,_0xb8601e,_0xe8d922,_0x4ecde3,_0x2edfce,_0x0b5ecd})
.then(()=>{
db.ref('spinCounts').remove();_0xc4c1dd=0;
const m=document.getElementById('saveMsg');m.style.display='block';
setTimeout(()=>m.style.display='none',3000);
}).catch(e=>alert('บันทึกไม่สำเร็จ: '+e.message));
}
function _0xfa8adc(){
_0x31ce69=_0xe8d922.map(src=>{if(!src)return null;const img=new Image();img.src=src;return img;});
}
function _0x30543f(o){
if(db)db.ref('orders').push(o);
if(SHEETS_URL&&SHEETS_URL!=='YOUR_APPS_SCRIPT_URL_HERE'){
fetch(SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)}).catch(()=>{});
}
}
function _0xe5a6e7(){
const c=document.getElementById('userWheel'),ctx=c.getContext('2d');
const D=Math.min(460,window.innerWidth-32),DPR=window.devicePixelRatio||2;
c.width=D*DPR;c.height=D*DPR;c.style.width=D+'px';c.style.height=D+'px';ctx.scale(DPR,DPR);
_0xb59869=ctx;_0x4b0e8b=D;_0xba51a5=D;_0x5db446=D/2-10;
}
function _0x43849e(){
const c=document.getElementById('adminWheel'),ctx=c.getContext('2d');
const D=Math.min(400,window.innerWidth-80),DPR=window.devicePixelRatio||2;
c.width=D*DPR;c.height=D*DPR;c.style.width=D+'px';c.style.height=D+'px';ctx.scale(DPR,DPR);
_0x69a773=ctx;_0x7ec218=D;_0xa5dca3=D;_0x3037d1=D/2-10;
}
function _0x63f810(target){
const u=target==='user';
const ctx=u?_0xb59869:_0x69a773,W=u?_0x4b0e8b:_0x7ec218,H=u?_0xba51a5:_0xa5dca3,R=u?_0x5db446:_0x3037d1,angle=u?_0x6426fa:_0x6a3b73;
if(!ctx)return;
ctx.clearRect(0,0,W,H);
const n=_0x640ca4.length;
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
if(_0x31ce69[i]&&_0x31ce69[i].complete&&_0x31ce69[i].naturalWidth>0){
ctx.save();ctx.rotate(-(s+a/2));
ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R-2,s,e);ctx.closePath();ctx.clip();
const iw=_0x31ce69[i].naturalWidth,ih=_0x31ce69[i].naturalHeight;
const sc=Math.max((2*R*Math.sin(a/2))/iw,R/ih);
const dw=iw*sc,dh=ih*sc,mx=Math.cos(s+a/2)*(R*.6),my=Math.sin(s+a/2)*(R*.6);
ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
ctx.drawImage(_0x31ce69[i],mx-dw/2,my-dh/2,dw,dh);ctx.restore();
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
function _0x1ac616(target,onWin){
const u=target==='user';
if(u?_0xe94804:_0xa0cc16)return;
if(_0x640ca4.length<2)return;
if(u)_0xe94804=true;else _0xa0cc16=true;
const btn=document.getElementById(u?'userSpinBtn':'adminSpinBtn');
btn.disabled=true;btn.textContent='... SPINNING';
const n=_0x640ca4.length,rw=_0x4ecde3.reduce((a,b)=>a+b,0),tw=rw>0?rw:n;
let rand=Math.random()*tw,wIdx=0;
for(let i=0;i<n;i++){rand-=rw>0?(_0x4ecde3[i]||0):1;if(rand<=0){wIdx=i;break;}}
const segArc=(2*Math.PI)/n,wc=(wIdx+.5)*segArc,tgt=-Math.PI/2-wc;
const ca=u?_0x6426fa:_0x6a3b73,spins=5+Math.floor(Math.random()*5);
const tr=spins*2*Math.PI+((tgt-ca%(2*Math.PI)+4*Math.PI)%(2*Math.PI));
const sa=ca,dur=4500+Math.random()*1500,t0=performance.now();
function ease(t){return 1-Math.pow(1-t,4);}
(function animate(now){
const t=Math.min((now-t0)/dur,1),a=sa+ease(t)*tr;
if(u)_0x6426fa=a;else _0x6a3b73=a;_0x63f810(target);
if(t<1){requestAnimationFrame(animate);}
else{
const f=(sa+tr)%(2*Math.PI);if(u)_0x6426fa=f;else _0x6a3b73=f;
if(u)_0xe94804=false;else _0xa0cc16=false;
btn.disabled=false;btn.textContent=u?'▶ SPIN THE WHEEL':'▶ TEST SPIN';
onWin(wIdx);
}
})(performance.now());
}
function _0xf8fd0b(){
if(_0x2edfce&&db){
const key=_0x035df4.phone||'guest';
db.ref('spinCounts/'+key).once('value').then(snap=>{
_0xc4c1dd=snap.val()||0;
if(_0xc4c1dd>=_0x0b5ecd){_0xd33764();return;}
_0x1ac616('user',idx=>{
if(_0x2edfce){db.ref('spinCounts/'+key).set(_0xc4c1dd+1);_0xc4c1dd++;_0xbaf165();}
document.getElementById('claimBtn').style.display='block';_0x7fe482(idx,true);
});
});
return;
}
_0x1ac616('user',idx=>{document.getElementById('claimBtn').style.display='block';_0x7fe482(idx,true);});
}
function _0xa84a16(){
_0x1ac616('admin',idx=>{_0xf2f416.push({name:_0x640ca4[idx],color:_0xb8601e[idx]});_0xdb9fa0();document.getElementById('claimBtn').style.display='none';_0x7fe482(idx,false);});
}
function _0x7fe482(idx,showClaim){
_0xa6f8f1=_0x640ca4[idx];const img=_0xe8d922[idx],color=_0xb8601e[idx]||'#4a6fa5';
if(img){document.getElementById('winImg').src=img;document.getElementById('winImgWrap').style.display='block';document.getElementById('winColor').style.display='none';}
else{document.getElementById('winImgWrap').style.display='none';document.getElementById('winColor').style.display='block';document.getElementById('winColor').style.background=color;}
document.getElementById('winName').textContent=_0xa6f8f1;
document.getElementById('claimBtn').style.display=showClaim?'block':'none';
document.getElementById('winModal').classList.add('show');
_0xd4af21(color);
}
function _0xed4a92(){document.getElementById('winModal').classList.remove('show');}
function _0xc8c805(){
document.getElementById('winModal').classList.remove('show');
document.getElementById('claimName').value=_0x035df4.name;
document.getElementById('claimPhone').value=_0x035df4.phone;
document.getElementById('claimNote').value='';
document.getElementById('claimErr').style.display='none';
document.getElementById('claimModal').classList.add('show');
}
function _0x0eed40(){document.getElementById('claimModal').classList.remove('show');}
function _0xef171c(){
const name=document.getElementById('claimName').value.trim(),phone=document.getElementById('claimPhone').value.trim(),note=document.getElementById('claimNote').value.trim();
if(!name||!phone){document.getElementById('claimErr').style.display='block';return;}
_0x30543f({name,phone,note,item:_0xa6f8f1,time:new Date().toLocaleString('th-TH')});
document.getElementById('claimModal').classList.remove('show');
document.getElementById('successModal').classList.add('show');
}
function _0xc2784d(){document.getElementById('successModal').classList.remove('show');}
function _0x638b34(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function _0xfa7813(){_0x2edfce=!document.getElementById('unlimitedToggle').checked;_0x59331a();}
function _0x59331a(){
const on=_0x2edfce;
const slider=document.getElementById('toggleSlider'),dot=document.getElementById('toggleDot');
const row=document.getElementById('limitRow'),status=document.getElementById('spinLimitStatus');
if(slider){slider.style.background=on?'#1565c0':'var(--surface2)';slider.style.borderColor=on?'#4fc3f7':'rgba(79,195,247,.15)';}
if(dot){dot.style.transform=on?'translateX(20px)':'translateX(0)';dot.style.background=on?'#90caf9':'var(--muted)';}
if(row)row.style.display=on?'flex':'none';
if(status)status.style.display=on?'block':'none';
}
function _0x3ed13a(){
const wrap=document.getElementById('spinStatsWrap');if(!wrap||!db)return;
db.ref('spinCounts').once('value').then(snap=>{
const data=snap.val();
if(!data){wrap.innerHTML='<div style="font-size:.72rem;color:var(--muted);text-align:center;padding:8px;">ยังไม่มีข้อมูล</div>';return;}
const stats=Object.entries(data).map(([phone,used])=>({phone,used})).sort((a,b)=>b.used-a.used);
wrap.innerHTML=stats.map(s=>{
const pct=Math.min(100,Math.round((s.used/_0x0b5ecd)*100)),over=s.used>=_0x0b5ecd;
return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid rgba(79,195,247,.06);">
<div style="font-size:.72rem;color:var(--ink2);flex:1;">📞 ${_0x638b34(s.phone)}</div>
<div style="font-size:.7rem;color:${over?'#ef5350':'#4fc3f7'};font-weight:700;">${s.used}/${_0x0b5ecd}</div>
<div style="width:40px;height:6px;background:var(--surface);border-radius:3px;overflow:hidden;">
<div style="width:${pct}%;height:100%;background:${over?'#ef5350':'#4fc3f7'};border-radius:3px;"></div>
</div>
</div>`;
}).join('');
});
}
function _0x32e97c(){
if(!db)return;
if(!confirm('รีเซ็ตสปินทุกคน?\nทุกคนจะหมุนได้ใหม่'))return;
db.ref('spinCounts').remove().then(()=>{_0xc4c1dd=0;_0x3ed13a();_0xbaf165();});
}
function _0xc31667(d){
_0x0b5ecd=Math.max(1,Math.min(99,_0x0b5ecd+d));
document.getElementById('limitVal').textContent=_0x0b5ecd;
document.getElementById('limitDisplay').textContent=_0x0b5ecd;
}
function _0xbaf165(){
const el=document.getElementById('userSpinStatus');if(!el)return;
if(!_0x2edfce||!db){el.textContent='';return;}
const key=_0x035df4.phone||'guest';
db.ref('spinCounts/'+key).once('value').then(snap=>{
const used=snap.val()||0,left=_0x0b5ecd-used;
if(left<=0){
el.innerHTML='<span style="color:#ef5350;">❌ คุณใช้สปินครบแล้ว</span>';
document.getElementById('userSpinBtn').disabled=true;
document.getElementById('userSpinBtn').textContent='หมดสิทธิ์สปิน';
}else{
el.innerHTML=`เหลือสปิน <span style="color:#4fc3f7;font-weight:700;">${left}/${_0x0b5ecd}</span> ครั้ง`;
document.getElementById('userSpinBtn').disabled=false;
document.getElementById('userSpinBtn').textContent='▶ SPIN THE WHEEL';
}
});
}
function _0xd33764(){
const el=document.getElementById('userSpinStatus');
if(el)el.innerHTML='<span style="color:#ef5350;font-size:.85rem;">❌ คุณใช้สปินครบแล้ว</span>';
document.getElementById('userSpinBtn').disabled=true;
document.getElementById('userSpinBtn').textContent='หมดสิทธิ์สปิน';
}
function _0x3e7d80(){
const inp=document.getElementById('adminNameInput'),name=inp.value.trim();if(!name)return;
_0x640ca4.push(name);_0xb8601e.push(_0x3d74c3[_0x640ca4.length%_0x3d74c3.length]||_0x3d74c3[0]);
_0xe8d922.push(null);_0x31ce69.push(null);_0x4ecde3.push(0);inp.value='';
_0x698e3b();_0x63f810('admin');
}
document.getElementById('adminNameInput').addEventListener('keydown',e=>{if(e.key==='Enter')_0x3e7d80();});
function _0xfdfed2(i){_0x640ca4.splice(i,1);_0xb8601e.splice(i,1);_0xe8d922.splice(i,1);_0x31ce69.splice(i,1);_0x4ecde3.splice(i,1);_0x698e3b();_0x63f810('admin');}
function _0x73606f(){if(_0x640ca4.length&&!confirm('ลบทั้งหมด?'))return;_0x640ca4=[];_0xb8601e=[];_0xe8d922=[];_0x31ce69=[];_0x4ecde3=[];_0x698e3b();_0x63f810('admin');}
function _0x4c76ff(){_0x640ca4=['เสื้อ A','เสื้อ B','เสื้อ C','เสื้อ D','เสื้อ E','เสื้อ F'];_0xb8601e=_0x640ca4.map((_,i)=>_0x3d74c3[i%_0x3d74c3.length]);_0xe8d922=_0x640ca4.map(()=>null);_0x31ce69=_0x640ca4.map(()=>null);_0x4ecde3=_0x640ca4.map(()=>0);_0x698e3b();_0x63f810('admin');}
function _0x8b24f9(i,v){_0x4ecde3[i]=Math.min(100,Math.max(0,parseFloat(v)||0));}
function _0x8b098d(i,c){_0xb8601e[i]=c;_0x63f810('admin');}
function _0x2f129a(i,inp){
const file=inp.files[0];if(!file)return;
const reader=new FileReader();
reader.onload=e=>{
const img=new Image();
img.onload=()=>{
const MAX=400,scale=Math.min(MAX/img.width,MAX/img.height,1);
const canvas=document.createElement('canvas');
canvas.width=img.width*scale;canvas.height=img.height*scale;
canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
_0xe8d922[i]=canvas.toDataURL('image/jpeg',.7);_0x31ce69[i]=img;
_0x63f810('admin');_0x698e3b();
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
}
function _0x31e399(i){_0xe8d922[i]=null;_0x31ce69[i]=null;_0x698e3b();_0x63f810('admin');}
function _0x698e3b(){
const list=document.getElementById('adminNameList');
if(!_0x640ca4.length){list.innerHTML='<div class="empty-state">ยังไม่มีรายการ</div>';return;}
list.innerHTML=_0x640ca4.map((n,i)=>{
const c=_0xb8601e[i]||'#ccc',hasImg=!!_0xe8d922[i];
return `<div class="name-item">
<div class="color-swatch" style="background:${c}"><input type="color" value="${c}" oninput="_0x8b098d(${i},this.value);this.parentElement.style.background=this.value"></div>
<span class="name-text" title="${_0x638b34(n)}">${_0x638b34(n)}</span>
<div class="weight-wrap"><input class="weight-input" type="number" min="0" max="100" step="1" value="${_0x4ecde3[i]}" oninput="_0x8b24f9(${i},this.value)"><span class="weight-pct">%</span></div>
<label class="img-btn ${hasImg?'has-img':''}">${hasImg?`<img src="${_0xe8d922[i]}" style="width:100%;height:100%;object-fit:cover;">`:'📷'}<input type="file" accept="image/*" style="display:none" onchange="_0x2f129a(${i},this)"></label>
${hasImg?`<button class="name-del" onclick="_0x31e399(${i})">✕</button>`:''}
<button class="name-del" onclick="_0xfdfed2(${i})">🗑</button>
</div>`;
}).join('');
}
function _0x36a45c(){
const c=document.getElementById('palettePicker');c.innerHTML='';
PALETTES.forEach(pal=>{
const div=document.createElement('div');div.className='palette-preset';
div.innerHTML=pal.map(c=>`<div class="palette-swatch" style="background:${c}"></div>`).join('');
div.onclick=()=>{_0x3d74c3=[...pal];_0xb8601e=_0x640ca4.map((_,i)=>pal[i%pal.length]);_0x698e3b();_0x63f810('admin');};
c.appendChild(div);
});
}
function _0x17ff13(){
const el=document.getElementById('adminOrdersList'),cnt=document.getElementById('orderCount');
if(!el||!db)return;
db.ref('orders').on('value',snap=>{
const data=snap.val(),orders=data?Object.values(data):[];
cnt.textContent=`รวม ${orders.length} คำสั่ง`;
if(!orders.length){el.innerHTML='<div class="empty-state">ยังไม่มีคำสั่ง</div>';return;}
el.innerHTML=[...orders].reverse().map(o=>`<div class="order-card"><div style="display:flex;justify-content:space-between;margin-bottom:3px;"><span style="font-family:'Bebas Neue',cursive;color:#4fc3f7;letter-spacing:2px;font-size:.88rem;">${_0x638b34(o.name)}</span><span style="font-size:.66rem;color:var(--muted);">${o.time}</span></div><div style="font-size:.76rem;color:#90caf9;">📞 ${_0x638b34(o.phone)}</div><div style="font-size:.73rem;color:var(--muted);">🎁 ${_0x638b34(o.item)}${o.note?' · '+_0x638b34(o.note):''}</div></div>`).join('');
});
}
function _0x4eee52(){if(!db||!confirm('ลบคำสั่งทั้งหมด?'))return;db.ref('orders').remove();}
function _0xdb9fa0(){
const el=document.getElementById('adminResults');
if(!_0xf2f416.length){el.innerHTML='<div class="empty-state">ยังไม่มีผล</div>';return;}
el.innerHTML=[..._0xf2f416].reverse().map((r,i)=>`<div style="display:flex;align-items:center;gap:8px;background:var(--surface2);border-radius:8px;padding:7px 10px;"><div style="width:9px;height:9px;border-radius:50%;background:${r.color};flex-shrink:0;"></div><span style="font-size:.83rem;color:var(--ink2);font-weight:600;">${_0x638b34(r.name)}</span><span style="font-size:.66rem;color:var(--muted);margin-left:auto;">#${_0xf2f416.length-i}</span></div>`).join('');
}
function _0xd4af21(mc){
const c=document.getElementById('confetti');c.width=window.innerWidth;c.height=window.innerHeight;
const cx=c.getContext('2d'),cols=[mc,'#4fc3f7','#1565c0','#90caf9','#38bdf8'];
const ps=Array.from({length:90},()=>({x:Math.random()*c.width,y:-10,w:4+Math.random()*8,h:4+Math.random()*8,col:cols[Math.floor(Math.random()*cols.length)],sp:3+Math.random()*5,spin:(Math.random()-.5)*.14,ang:Math.random()*Math.PI*2,dr:(Math.random()-.5)*1.5}));
let f=0;(function draw(){cx.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.y+=p.sp;p.x+=p.dr;p.ang+=p.spin;cx.save();cx.translate(p.x,p.y);cx.rotate(p.ang);cx.fillStyle=p.col;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();});if(++f<100)requestAnimationFrame(draw);else cx.clearRect(0,0,c.width,c.height);})();
}
let db=null;
function _0x1849b3(){
_0xd9d9b0(20,'กำลังเชื่อมต่อ...');
const s1=document.createElement('script');
s1.src='https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
s1.onload=()=>{
_0xd9d9b0(50,'โหลด Firebase...');
const s2=document.createElement('script');
s2.src='https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js';
s2.onload=()=>{
_0xd9d9b0(75,'เชื่อมต่อฐานข้อมูล...');
firebase.initializeApp({apiKey:"AIzaSyCVbVFhL7BTS-R2LvIgapRnitnOwzZ9i-Q",authDomain:"justshrit.firebaseapp.com",databaseURL:"https://justshrit-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"justshrit",storageBucket:"justshrit.firebasestorage.app",messagingSenderId:"266485761926",appId:"1:266485761926:web:6b435c2232352913828e07"});
db=firebase.database();
_0xd9d9b0(90,'โหลดข้อมูลวงล้อ...');
db.ref('wheelConfig').once('value').then(snap=>{
const d=snap.val();
if(d){_0x640ca4=d._0x640ca4||[];_0xb8601e=d._0xb8601e||[];_0xe8d922=d._0xe8d922||[];_0x4ecde3=d._0x4ecde3||[];_0x2edfce=d._0x2edfce||false;_0x0b5ecd=d._0x0b5ecd||1;_0xfa8adc();_0x63f810('user');}
_0x341314();
_0xa5534e();
}).catch(()=>{_0x341314();});
};
document.head.appendChild(s2);
};
document.head.appendChild(s1);
}
_0xd9d9b0(10,'เริ่มต้น...');
requestAnimationFrame(()=>setTimeout(_0x1849b3,100));
