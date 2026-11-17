
function shuffle(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function options(q){return shuffle([q.a,...q.d]);}
function visual(v){
 if(!v||v.kind==="calc")return "";
 if(v.kind==="table")return '<table><caption>'+v.title+'</caption><tr><th>Item</th><th>Quantidade</th></tr>'+v.labels.map((l,i)=>'<tr><td>'+l+'</td><td>'+v.values[i]+'</td></tr>').join('')+'</table>';
 if(v.kind==="chart")return '<figure><figcaption>'+v.title+'</figcaption><svg viewBox="0 0 420 180" role="img" aria-label="'+v.labels.map((l,i)=>l+': '+v.values[i]+' votos').join('; ')+'">'+[0,2,4,6,8].map(n=>'<line x1="40" y1="'+(140-n*14)+'" x2="400" y2="'+(140-n*14)+'" stroke="#ccd5df"/><text x="15" y="'+(145-n*14)+'">'+n+'</text>').join('')+v.labels.map((l,i)=>'<rect x="'+(65+i*115)+'" y="'+(140-v.values[i]*14)+'" width="60" height="'+(v.values[i]*14)+'" fill="#30699c"/><text text-anchor="middle" x="'+(95+i*115)+'" y="165">'+l+'</text>').join('')+'</svg></figure>';
 let s='',x=5; for(let c=0;c<v.c;c++){for(let r=0;r<10;r++)for(let col=0;col<10;col++)s+='<rect x="'+(x+col*5)+'" y="'+(5+r*5)+'" width="5" height="5" fill="#ffebaf" stroke="#665622" stroke-width=".35"/>';x+=60;}
 for(let d=0;d<v.d;d++){for(let r=0;r<10;r++)s+='<rect x="'+x+'" y="'+(5+r*5)+'" width="5" height="5" fill="#ffebaf" stroke="#665622" stroke-width=".35"/>';x+=12;}
 for(let u=0;u<v.u;u++){s+='<rect x="'+x+'" y="5" width="5" height="5" fill="#ffebaf" stroke="#665622" stroke-width=".35"/>';x+=12;}
 return '<figure><svg viewBox="0 0 '+Math.max(230,x)+' 65" role="img" aria-label="'+v.c+' placas, '+v.d+' barras e '+v.u+' cubinhos">'+s+'</svg><figcaption>Placa = 100 · Barra = 10 · Cubinho = 1</figcaption></figure>';
}
const root=document.getElementById('app');let round=[],pos=0,score=0,errors=[],locked=false,label='';
function menu(){
 root.innerHTML='<h1>Expedição Matemática</h1><p>2º ano · 3º trimestre · 60 desafios</p><p>Escolha a data da avaliação. As perguntas e alternativas são embaralhadas dentro da data escolhida.</p><div class="missions"><button id="day18"><small>AVALIAÇÃO · 18/11</small>Primeira revisão<span>40 desafios: contas, dobro e partes iguais, tabelas, gráficos e possibilidades →</span></button><button id="day19"><small>AVALIAÇÃO · 19/11</small>Segunda revisão<span>20 desafios: material dourado, números, antecessor e sucessor, problemas, tabelas e gráficos →</span></button></div>';
 document.getElementById('day18').onclick=()=>dateMenu('18/11');
 document.getElementById('day19').onclick=()=>dateMenu('19/11');
}
function dateMenu(date){
 const bank=QUESTIONS.filter(q=>q.date===date),topics=[...new Set(bank.map(q=>q.t))];
 root.innerHTML='<h1>Avaliação de '+date+'</h1><p>2º ano · '+bank.length+' desafios · Use papel para montar as contas.</p><button id="playdate">Jogar todos os desafios de '+date+'</button><div class="missions">'+topics.map((t,i)=>'<button data-topic="'+i+'"><small>'+date+'</small>'+t+'<span>'+bank.filter(q=>q.t===t).length+' desafios →</span></button>').join('')+'</div><button id="dates" class="secondary">Escolher outra data</button><p>Tabelas e gráficos fazem parte das duas avaliações.</p>';
 root.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{const topic=topics[+b.dataset.topic];start(bank.filter(q=>q.t===topic),date+' · '+topic)});
 document.getElementById('playdate').onclick=()=>start(bank,'Avaliação de '+date);
 document.getElementById('dates').onclick=menu;
}
function start(qs,title){round=shuffle(qs);pos=0;score=0;errors=[];label=title;show();}
function show(){locked=false;const q=round[pos];root.innerHTML='<p class="eyebrow">'+label+'</p><p>Desafio '+(pos+1)+' de '+round.length+' · Acertos: '+score+'</p><progress max="'+round.length+'" value="'+pos+'"></progress><h1 tabindex="-1" id="question">'+q.q+'</h1>'+visual(q.v)+'<div class="answers">'+options(q).map((a,i)=>'<button data-answer="'+i+'">'+a+'</button>').join('')+'</div><div id="feedback" role="status" aria-live="polite"></div><button id="next" hidden>Próximo desafio →</button><button id="menu" class="secondary">Voltar às missões</button>';root.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(b,q));document.getElementById('next').onclick=()=>{pos++;pos<round.length?show():finish()};document.getElementById('menu').onclick=menu;document.getElementById('question').focus();}
function answer(b,q){if(locked)return;locked=true;const correct=b.textContent===q.a;if(correct)score++;else errors.push(q);root.querySelectorAll('[data-answer]').forEach(el=>{el.disabled=true;if(el.textContent===q.a)el.classList.add('correct');});if(!correct)b.classList.add('wrong');document.getElementById('feedback').textContent=(correct?'Muito bem! ':'Vamos aprender: a resposta é '+q.a+'. ')+q.e;document.getElementById('next').hidden=false;}
function finish(){const retry=errors.slice();const full=round.slice();root.innerHTML='<h1>Missão concluída!</h1><p class="result">'+score+' de '+round.length+' acertos</p><p>'+ (errors.length?'Cada tentativa ajuda a aprender. Revise os desafios que precisam de mais prática.':'Você concluiu todos os desafios desta rodada!')+'</p>'+(errors.length?'<button id="review">Revisar '+errors.length+' desafio(s)</button>':'')+'<button id="again">Jogar novamente</button><button id="back" class="secondary">Escolher outra missão</button>';if(retry.length)document.getElementById('review').onclick=()=>start(retry,'Revisão dos erros');document.getElementById('again').onclick=()=>start(full,label);document.getElementById('back').onclick=menu;}
const requestedDate=new URLSearchParams(location.search).get('data');
if(requestedDate==='18'||requestedDate==='19')dateMenu(requestedDate+'/11');else menu();