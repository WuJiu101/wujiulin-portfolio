/* PROTOTYPE JS v4 — Contact console · Name opacity · All observers */
/* Release: root-relative paths */
(function(){
'use strict';
var hero=document.querySelector('.hero-section');
var heroBg=document.querySelector('.hero-bg-fallback');
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Entrance */
function startReveal(){
  if(rm){hero.classList.remove('is-loading');hero.classList.add('is-ready');return}
  requestAnimationFrame(function(){hero.classList.add('is-revealing');hero.classList.remove('is-loading')});
  setTimeout(function(){hero.classList.add('is-ready')},2200);
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',startReveal)}else{startReveal()}

/* 2. Mouse parallax */
if(heroBg&&hero&&!rm){
  hero.addEventListener('pointermove',function(e){
    if(!hero.classList.contains('is-ready'))return;
    var r=hero.getBoundingClientRect();
    heroBg.style.transform='translate('+((e.clientX-r.left)/r.width-.5)*-22+'px,'+((e.clientY-r.top)/r.height-.5)*-18+'px) scale(1.05)';
    heroBg.style.transition='transform .9s cubic-bezier(.22,.61,.36,1)';
  });
  hero.addEventListener('pointerleave',function(){heroBg.style.transform='';heroBg.style.transition='transform 2s cubic-bezier(.22,.61,.36,1)'});
}

/* 3. Name scroll with base opacity */
var hn=document.querySelector('.hero-name');
var BASE_OPACITY=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--name-opacity'))||0.52;
if(hn&&!rm){
  window.addEventListener('scroll',function(){
    var s=window.scrollY;
    hn.style.opacity=Math.max(0,BASE_OPACITY*(1-s/420));
    hn.style.transform='translateY('+(s*.22)+'px)';
  },{passive:true});
}

/* 4. Contact console */
var contactBtns=document.querySelectorAll('.contact-icon');
var contactLabel=document.getElementById('contact-label');
var contactValue=document.getElementById('contact-value');
var contactData={
  email:{label:'邮箱',value:'1169155828@qq.com',href:'mailto:1169155828@qq.com'},
  wechat:{label:'微信',value:'wu1169155828',href:null},
  phone:{label:'电话',value:'18282725022',href:'tel:18282725022'},
  resume:{label:'简历',value:'下载简历',href:'resume/吴玖林-视觉设计师-简历.pdf'}
};
for(var i=0;i<contactBtns.length;i++){
  contactBtns[i].addEventListener('click',function(){
    var key=this.getAttribute('data-contact');
    var d=contactData[key];
    if(!d)return;
    for(var j=0;j<contactBtns.length;j++)contactBtns[j].classList.remove('is-active');
    this.classList.add('is-active');
    if(contactLabel)contactLabel.textContent=d.label;
    if(contactValue){
      if(d.href){contactValue.outerHTML='<a id="contact-value" href="'+d.href+'"'+(key==='resume'?' download':'')+'>'+d.value+'</a>'}
      else{contactValue.outerHTML='<strong id="contact-value">'+d.value+'</strong>'}
      contactValue=document.getElementById('contact-value');
    }
  });
}

/* 5. Contact section scroll reveal */
var contactShell=document.querySelector('.contact-shell');
if('IntersectionObserver' in window&&contactShell){
  var ctObs=new IntersectionObserver(function(e){
    if(e[0].isIntersecting){e[0].target.classList.add('is-visible');ctObs.unobserve(e[0].target)}
  },{threshold:.15});
  ctObs.observe(contactShell);
}

/* 6. Project rows — scale-based editorial order */
var workSection=document.querySelector('.work-section');
var projectOrder=[
  'category=event&work=01',
  'category=display&work=01',
  'category=display&work=02',
  'category=brand&work=01',
  'category=event&work=03',
  'category=display&work=03',
  'category=brand&work=03',
  'category=product&work=02',
  'category=brand&work=02',
  'category=display&work=04',
  'category=brand&work=05',
  'category=event&work=02',
  'category=brand&work=06',
  'category=product&work=01',
  'category=display&work=05'
];
var projectLabels={
  'category=event&work=01':'汽车品牌发布会系统',
  'category=display&work=01':'国际赛事场馆视觉',
  'category=display&work=02':'赛区公共空间视觉',
  'category=brand&work=01':'气象科技品牌系统',
  'category=event&work=03':'校庆文创获奖作品',
  'category=display&work=03':'产业大会视觉系统',
  'category=brand&work=03':'城市文化礼赠系统',
  'category=brand&work=02':'金融企业内容画册',
  'category=display&work=04':'宠物活动整合传播',
  'category=brand&work=05':'餐饮品牌全案',
  'category=event&work=02':'湖畔音乐活动视觉',
  'category=brand&work=06':'生活方式品牌识别',
  'category=product&work=02':'国际汽车服务画册',
  'category=product&work=01':'银行助农主题画册',
  'category=display&work=05':'五一节日传播视觉'
};
if(workSection){
  var originalRows=Array.prototype.slice.call(workSection.querySelectorAll('.project-row'));
  projectOrder.forEach(function(key,index){
    var row=originalRows.find(function(item){return item.querySelector('.project-cover').getAttribute('href').indexOf(key)>-1});
    if(!row)return;
    row.classList.toggle('project-row-alt',index%2===1);
    var num=row.querySelector('.project-num');
    var label=row.querySelector('.project-hl');
    if(num)num.textContent=String(index+1).padStart(2,'0')+' / 15';
    if(label)label.textContent=projectLabels[key];
    workSection.appendChild(row);
  });
  var shengtai=workSection.querySelector('a[href*="category=brand"][href*="work=02"]');
  if(shengtai){
    var shengtaiTitle=shengtai.closest('.project-row').querySelector('.project-title');
    if(shengtaiTitle)shengtaiTitle.textContent='盛泰金融画册设计';
  }
}
var rows=document.querySelectorAll('.project-row');
if('IntersectionObserver' in window){
  var pObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');pObs.unobserve(e.target)}});
  },{threshold:.12,rootMargin:'0px 0px -10% 0px'});
  for(var i=0;i<rows.length;i++)pObs.observe(rows[i]);
}else{for(var j=0;j<rows.length;j++){rows[j].style.opacity='1';rows[j].style.transform='none';rows[j].style.filter='none'}}

/* 7. Timeline */
var nodes=document.querySelectorAll('.exp-node');
var prog=document.querySelector('.exp-progress');
var timeline=document.querySelector('.exp-timeline');
if('IntersectionObserver' in window&&nodes.length){
  var vc=0;
  var tObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting&&!e.target.classList.contains('is-visible')){
        e.target.classList.add('is-visible');vc++;
        if(prog&&timeline)prog.style.height=(vc/nodes.length*100)+'%';
      }
    });
  },{threshold:.2,rootMargin:'0px 0px -15% 0px'});
  for(var k=0;k<nodes.length;k++)tObs.observe(nodes[k]);
  setTimeout(function(){
    if(vc===0&&timeline&&timeline.getBoundingClientRect().top<window.innerHeight){
      for(var n=0;n<nodes.length;n++)nodes[n].classList.add('is-visible');
      if(prog)prog.style.height='100%';
    }
  },500);
}else{for(var m=0;m<nodes.length;m++){nodes[m].style.opacity='1';nodes[m].style.transform='none';nodes[m].style.filter='none'}if(prog)prog.style.height='100%'}

/* 8. Marquee pause */
var mq=document.querySelector('.marquee-track'),ms=document.querySelector('.marquee-section');
if(mq&&ms&&!rm){ms.addEventListener('pointerenter',function(){mq.style.animationPlayState='paused'});ms.addEventListener('pointerleave',function(){mq.style.animationPlayState='running'})}

/* 9. Nav scroll */
var links=document.querySelectorAll('.nav-links a[href^="#"]');
for(var l=0;l<links.length;l++){links[l].addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})}

var nav=document.querySelector('.nav-bar');
window.addEventListener('scroll',function(){nav.style.background=window.scrollY>80?'rgba(10,10,10,.8)':'transparent';nav.style.backdropFilter=window.scrollY>80?'blur(14px)':'none'},{passive:true});

console.log('Prototype v4 ready');
})();
