(() => {
  'use strict';
  const LESSONS = window.EEC_LESSONS || [];
  const app = document.getElementById('app');
  const CATEGORIES = ['All topics', 'Everyday English', 'Speaking Skills', 'Campus Life'];
  let currentCategory = 'All topics';
  let searchQuery = '';
  let quizIndex = 0, quizScore = 0, quizSelected = null;
  const QUIZ = [
    {q:'Which greeting is most natural when you have not seen someone for a while?',a:['What’s your age?','How have you been?','What is your problem?'],correct:1,why:'“How have you been?” is commonly used when catching up after some time apart.'},
    {q:'Which question is more likely to start a longer conversation?',a:['Do you like music?','Are you a student?','What kind of music do you usually listen to?'],correct:2,why:'Open-ended questions invite people to share more than “yes” or “no”.'},
    {q:'Someone says “I joined a competition.” What is a good follow-up?',a:['Okay.','What kind of competition?','Goodbye!'],correct:1,why:'Pick a detail they mentioned and ask about it.'},
    {q:'Which sentence is grammatically correct?',a:['I am agree with you.','I agree with you.','I am agreeing you.'],correct:1,why:'The natural phrase is “I agree with you.”, not “I am agree”.'},
    {q:'What is a polite way to disagree?',a:['You’re definitely wrong.','That’s a bad idea.','I see your point, but…'],correct:2,why:'Acknowledging someone’s idea first can make disagreement respectful.'},
    {q:'You do not understand an instruction. What should you say?',a:['Sorry, could you explain that again?','Never mind, I know everything.','I will ignore it.'],correct:0,why:'Asking for clarification is a good communication skill.'},
    {q:'Which phrase helps you join a group discussion politely?',a:['Stop talking.','Can I add something?','You must listen to me.'],correct:1,why:'“Can I add something?” gives you a natural opening to contribute.'},
    {q:'Which closing sounds friendly and natural?',a:['Conversation terminated.','See you around!','I am ending our communication.'],correct:1,why:'“See you around!” is a friendly, casual goodbye.'}
  ];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function readCompleted() { try { return JSON.parse(localStorage.getItem('eec_completed_v1') || '[]'); } catch (e) { return []; } }
  let completed = new Set(readCompleted());
  function saveCompleted(){ try { localStorage.setItem('eec_completed_v1',JSON.stringify([...completed])); } catch(e){} }
  function completedCount(){ return LESSONS.filter(x=>completed.has(x.id)).length; }
  function progressPercent(){ return Math.round(completedCount()/LESSONS.length*100) || 0; }
  function allMaterialsCount(){return LESSONS.length;}
  function lessonCard(lesson){
    const done=completed.has(lesson.id);
    return `<a class="lesson-card" href="#lesson/${lesson.id}" aria-label="Open ${esc(lesson.title)}">
      <div class="card-top"><div class="lesson-icon ${lesson.color}" aria-hidden="true">${lesson.emoji}</div>${done?'<span class="completion-check">✓ COMPLETED</span>':`<span class="card-number">LESSON ${lesson.number}</span>`}</div>
      <h3>${esc(lesson.title)}</h3><p>${esc(lesson.subtitle)}</p>
      <div class="card-bottom"><div class="card-tags"><span>${esc(lesson.category)}</span><span>⏱ ${lesson.minutes} min</span></div><div class="card-arrow" aria-hidden="true">↗</div></div>
    </a>`;
  }
  function home(){
    return `<div class="container hero" id="top"><div class="hero-grid">
       <div><span class="eyebrow-pill">YOUR LITTLE ENGLISH LEARNING SPACE ✦</span><h1>English feels easier <em>when you use it.</em></h1>
       <p>Real phrases. Real situations. Real progress. Explore short, practical lessons to help you speak English with more confidence, one conversation at a time.</p>
       <div class="hero-cta"><a href="#materials" class="button button-dark">Explore materials <span>↗</span></a><a class="button button-outline" href="#practice">Try a quick quiz →</a></div>
       <div class="hero-meta"><div><strong>${LESSONS.length.toString().padStart(2,'0')}</strong><span>bite-sized<br>lessons</span></div><span class="vr"></span><div><strong>100%</strong><span>free to<br>learn</span></div><span class="vr"></span><div><strong>${completedCount().toString().padStart(2,'0')}/${LESSONS.length}</strong><span>lessons<br>completed</span></div></div></div>
       <div class="hero-visual" aria-hidden="true"><span class="float-dot"></span><div class="hero-art"><div class="art-top"><span>EEC LIBREXION / VOL. 01</span><span class="art-star">✳</span></div>
       <div class="art-book"><span class="art-flag">PRACTICAL ENGLISH GUIDE</span><h3>A little practice<br>goes a long way.</h3><p>You don't need perfect grammar to have a good conversation. Start with something simple.</p><div class="art-phrase">“Hey! How's it going?” &nbsp;↗</div></div><div class="art-bottom"><span>READ · SAY IT · USE IT</span><span>↗</span></div></div><div class="float-bubble">You got this! ✦</div></div>
     </div></div>
     <section class="how-section section"><div class="container"><span class="eyebrow">A SIMPLE WAY TO LEARN</span><div class="section-head"><div><h2>Small steps. Big confidence.</h2><p>Four simple steps to make every expression your own.</p></div></div><div class="steps">
       ${[['01','Read','Notice how each phrase is used in real situations.'],['02','Say it','Read the expressions out loud, not just in your head.'],['03','Make it yours','Change the examples to match your own experiences.'],['04','Use it','Try one new expression in an actual conversation.']].map(s=>`<article class="step-card"><span class="step-number">STEP ${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join('')}
     </div></div></section>
     <section class="section library-section container" id="materials"><span class="eyebrow">THE LEARNING LIBRARY</span><div class="section-head"><div><h2>Pick a topic. Start speaking.</h2><p>Short English lessons you can read anytime, anywhere. Each includes expressions, real-life examples, and a quick challenge.</p></div><span class="tiny-pill">${LESSONS.length} lessons available</span></div>
     <div class="library-tools"><div class="filters" role="group" aria-label="Filter lessons">${CATEGORIES.map(c=>`<button type="button" class="filter ${currentCategory===c?'active':''}" data-filter="${esc(c)}" aria-pressed="${currentCategory===c}">${esc(c)}</button>`).join('')}</div>
     <label class="search-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.2 16.2 4 4"/></svg><input id="searchInput" placeholder="Search a lesson..." type="search" aria-label="Search lessons" value="${esc(searchQuery)}" /></label></div>
     <div class="material-grid" id="materialGrid">${cardsForFilter()}</div></section>
     <div class="container"><div class="banner"><div><span class="eyebrow">TIME TO PUT IT INTO PRACTICE</span><h2>Learning is good. Using it is better.</h2><p>Take a quick quiz and see what you remember from the lessons.</p></div><a href="#practice" class="button button-light">Let's practice →</a></div></div>`;
  }
  function cardsForFilter(){
    let filtered=LESSONS.filter(l=>(currentCategory==='All topics'||l.category===currentCategory)&&(`${l.title} ${l.subtitle} ${l.category} ${l.intro}`).toLowerCase().includes(searchQuery.toLowerCase().trim()));
    if(!filtered.length) return '<div class="empty-state no-results"><strong>No lessons found.</strong><p>Try another topic or search term.</p></div>';
    return filtered.map(lessonCard).join('');
  }
  function contentGroups(groups){
    return groups.map(g=>`<section class="content-block"><h2>${esc(g.title)}</h2>${g.note?`<span class="formula">${esc(g.note)}</span>`:''}<div class="expr-grid">${g.items.map(item=>`<div class="expression"><strong>${esc(item[0])}</strong><span>${esc(item[1])}</span></div>`).join('')}</div></section>`).join('');
  }
  function lessonPage(id){
    const lesson=LESSONS.find(l=>l.id===id);if(!lesson)return notFound();
    const index=LESSONS.findIndex(l=>l.id===id);let done=completed.has(id);
    return `<div class="page-wrap"><div class="breadcrumb"><a href="#materials">Materials</a><span>/</span>${esc(lesson.category)}<span>/</span>Lesson ${lesson.number}</div>
      <div class="lesson-hero"><div><span class="eyebrow">LESSON ${lesson.number} · ${esc(lesson.minutes)} MIN READ</span><h1>${esc(lesson.title)}</h1><p>${esc(lesson.subtitle)}</p><span class="tiny-pill">${esc(lesson.category)}</span></div><div class="lesson-emoji" aria-hidden="true">${lesson.emoji}</div></div>
      <div class="lesson-details"><article class="lesson-body">
      <section class="content-block"><h2>Let's get started</h2><p>${esc(lesson.intro)}</p><p>${esc(lesson.secondIntro)}</p></section>
      ${contentGroups(lesson.groups)}
      <section class="content-block"><h2>✦ A natural conversation</h2><div class="dialogue">${lesson.dialogue.map(d=>`<div class="dialogue-line"><span class="speaker">${esc(d[0])}</span><span class="bubble">${esc(d[1])}</span></div>`).join('')}</div></section>
      <div class="tip-box"><strong>💡 QUICK TIP</strong><p>${esc(lesson.tip)}</p></div>
      <div class="challenge-card" style="margin-top:19px"><strong>YOUR MINI CHALLENGE</strong><h2>Now it’s your turn!</h2><p>${esc(lesson.challenge)}</p></div>
      <div class="lesson-actions"><div>${index>0?`<a class="button button-outline" href="#lesson/${LESSONS[index-1].id}">← Previous lesson</a>`:'<a class="button button-outline" href="#materials">← Back to library</a>'}</div><button type="button" class="button ${done?'button-outline':'button-dark'}" data-complete="${lesson.id}">${done?'✓ Completed — Undo':'✓ Mark as completed'}</button>${index<LESSONS.length-1?`<a class="button button-dark" href="#lesson/${LESSONS[index+1].id}">Next lesson →</a>`:'<a class="button button-dark" href="#practice">Try the quiz →</a>'}</div>
      </article><aside class="lesson-side"><div class="side-card"><h4>Your learning progress</h4><strong>${completedCount()} of ${LESSONS.length} lessons</strong><div class="side-progress"><div style="width:${progressPercent()}%"></div></div><small>Saved on this device only.</small></div>
      <div class="side-card"><h4>Explore other lessons</h4><div class="lesson-links">${LESSONS.map(l=>`<a href="#lesson/${l.id}" class="${l.id===lesson.id?'current':''}">${l.number} · ${esc(l.title)} ${completed.has(l.id)?'✓':''}</a>`).join('')}</div></div>
      <div class="side-card"><h4>Practice makes progress ✨</h4><p>Try a few quick questions after your lessons.</p><a href="#practice" class="button button-outline button-sm">Try a quick quiz →</a></div>
      </aside></div></div>`;
  }
  function notFound(){return '<div class="page-wrap"><h1>Lesson not found</h1><p>That lesson is not available yet.</p><a class="button button-dark" href="#materials">Explore materials →</a></div>';}
  function practicePage(){
    let q=QUIZ[quizIndex];
    return `<div class="page-wrap quiz-outer"><div class="breadcrumb"><a href="#home">Home</a><span>/</span>Quick practice</div><div class="page-heading"><span class="eyebrow">TIME TO PRACTICE</span><h1>A little quiz, a lot of progress.</h1><p>No pressure, just practice. Test what you remember from the Practical English Survival Guide.</p></div>
      <div class="quiz-card" id="quizCard">${quizIndex>=QUIZ.length?renderResult():`<div class="quiz-track"><div style="width:${Math.round((quizIndex)/QUIZ.length*100)}%"></div></div><span class="quiz-small">QUESTION ${quizIndex+1} OF ${QUIZ.length}</span><h2 class="quiz-question">${esc(q.q)}</h2><div class="quiz-options">${q.a.map((a,i)=>`<button class="quiz-option ${quizSelected===i?(quizSelected===q.correct?'selected':'wrong'):''}" data-answer="${i}" ${quizSelected!==null?'disabled':''}>${String.fromCharCode(65+i)}. &nbsp;${esc(a)}</button>`).join('')}</div>${quizSelected!==null?`<div class="quiz-feedback ${quizSelected===q.correct?'':'bad'}"><strong>${quizSelected===q.correct?'✓ That’s right!':'Not quite — keep learning!'}</strong><br>${esc(q.why)}</div>`:''}<div class="quiz-footer"><span class="muted-text">Take your time. You’ve got this.</span><button type="button" class="button button-dark" id="quizNext" ${quizSelected===null?'disabled':''}>${quizIndex===QUIZ.length-1?'See my result':'Next question →'}</button></div>`}</div></div>`;
  }
  function renderResult(){return `<div class="quiz-result"><span class="result-emoji">${quizScore>=6?'🌟':'🌱'}</span><span class="eyebrow">YOUR RESULT</span><h2>${quizScore} / ${QUIZ.length} correct answers</h2><p>${quizScore===QUIZ.length?'Amazing work! You really know your everyday English.':quizScore>=5?'Nice work! Keep practicing to build even more confidence.':'Keep going! Every try is part of learning.'}</p><div class="hero-cta" style="justify-content:center"><button id="quizRestart" class="button button-dark">Try again ↻</button><a href="#materials" class="button button-outline">Review lessons →</a></div></div>`;}
  function navigate(){
    const h=decodeURIComponent(location.hash.slice(1)||'home');
    let view=h.split('/');
    if(view[0]==='lesson')app.innerHTML=lessonPage(view[1]);
    else if(view[0]==='practice')app.innerHTML=practicePage();
    else app.innerHTML=home();
    document.querySelectorAll('[data-nav]').forEach(el=>el.classList.toggle('active',(h==='home'&&el.dataset.nav==='home')||(h==='materials'&&el.dataset.nav==='materials')||(h==='practice'&&el.dataset.nav==='practice')));
    if(h==='materials'){ requestAnimationFrame(()=>document.getElementById('materials')?.scrollIntoView({behavior:'smooth',block:'start'}));}
    else {window.scrollTo({top:0,behavior:'instant'});}
    document.getElementById('mobileNav').hidden=true;document.getElementById('mobileMenuBtn').setAttribute('aria-expanded','false');
  }
  app.addEventListener('click',e=>{
    const f=e.target.closest('[data-filter]');if(f){currentCategory=f.dataset.filter;app.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===f);x.setAttribute('aria-pressed',x===f);});document.getElementById('materialGrid').innerHTML=cardsForFilter();return;}
    const c=e.target.closest('[data-complete]');if(c){const id=c.dataset.complete;if(completed.has(id))completed.delete(id);else completed.add(id);saveCompleted();app.innerHTML=lessonPage(id);return;}
    const answer=e.target.closest('[data-answer]');if(answer&&quizSelected===null){quizSelected=Number(answer.dataset.answer);if(quizSelected===QUIZ[quizIndex].correct)quizScore++;app.innerHTML=practicePage();return;}
    if(e.target.closest('#quizNext') && quizSelected!==null){quizIndex++;quizSelected=null;app.innerHTML=practicePage();return;}
    if(e.target.closest('#quizRestart')){quizIndex=0;quizScore=0;quizSelected=null;app.innerHTML=practicePage();}
  });
  app.addEventListener('input',e=>{if(e.target.id==='searchInput'){searchQuery=e.target.value;document.getElementById('materialGrid').innerHTML=cardsForFilter();}});
  const modal=document.getElementById('shareModal');const qrCanvas=document.getElementById('qrCanvas');
  const isLocal=()=>location.protocol==='file:'||['localhost','127.0.0.1','0.0.0.0'].includes(location.hostname);
  const siteUrl=()=>location.origin+location.pathname;
  function makeQr(url){
    const qr=new window.EEC_QR_CODE(0,0);qr.addData(url);qr.make();
    const size=qr.getModuleCount(),quiet=4;
    const canvas=qrCanvas,ctx=canvas.getContext('2d');
    canvas.width=512;canvas.height=512;
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,512,512);
    const cell=512/(size+quiet*2);
    ctx.fillStyle='#163e31';
    for(let r=0;r<size;r++)for(let c=0;c<size;c++)if(qr.isDark(r,c)){
      const x0=Math.floor((c+quiet)*cell),x1=Math.ceil((c+quiet+1)*cell),y0=Math.floor((r+quiet)*cell),y1=Math.ceil((r+quiet+1)*cell);
      ctx.fillRect(x0,y0,x1-x0,y1-y0);
    }
  }
  function showModal(){
    modal.hidden=false;document.body.style.overflow='hidden';
    const status=document.getElementById('qrStatus'),urlBox=document.getElementById('shareUrl'),download=document.getElementById('downloadQr'),copy=document.getElementById('copyLink');
    if(isLocal()){
      qrCanvas.hidden=true;status.textContent='The public QR code will appear here after you publish this website to Vercel.';
      urlBox.textContent='Not published yet · Local preview';download.disabled=true;copy.disabled=true;
    } else {
      qrCanvas.hidden=false;status.textContent='Scan to open the learning library.';
      urlBox.textContent=siteUrl();download.disabled=false;copy.disabled=false;
      try{makeQr(siteUrl());}catch(err){qrCanvas.hidden=true;status.textContent='QR generation failed. You can still copy your website link.';download.disabled=true;}
    }
    document.getElementById('closeShare').focus();
  }
  function closeModal(){modal.hidden=true;document.body.style.overflow='';document.getElementById('shareBtn').focus();}
  document.getElementById('shareBtn').addEventListener('click',showModal);
  document.getElementById('mobileShareBtn').addEventListener('click',showModal);
  document.getElementById('closeShare').addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
  document.getElementById('copyLink').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(siteUrl());e.target.textContent='✓ Copied!';setTimeout(()=>e.target.textContent='Copy website link',1500);}catch(err){e.target.textContent='Select the link above';}});
  document.getElementById('downloadQr').addEventListener('click',()=>{if(isLocal())return;let a=document.createElement('a');a.href=qrCanvas.toDataURL('image/png');a.download='EEC-Librexion-QR.png';a.click();});
  document.getElementById('mobileMenuBtn').addEventListener('click',e=>{const nav=document.getElementById('mobileNav');nav.hidden=!nav.hidden;e.currentTarget.setAttribute('aria-expanded',String(!nav.hidden));});
  document.querySelectorAll('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{document.getElementById('mobileNav').hidden=true;}));
  document.getElementById('year').textContent=new Date().getFullYear();
  window.addEventListener('hashchange',navigate);navigate();
})();
