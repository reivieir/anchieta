(() => {
  const byId = id => document.getElementById(id);
  let activity, questions, index = 0, hits = 0, answered = false, mistakes = [], reviewing = false;
  const menu = byId('menu'), quiz = byId('quiz'), result = byId('result');
  function showMenu() {
    quiz.hidden = true; result.hidden = true; menu.hidden = false;
    if (activity) document.querySelector('[data-activity="' + activity.id + '"]').focus();
  }
  function start(a, reviewQuestions) {
    activity = a; reviewing = Boolean(reviewQuestions); questions = reviewQuestions || a.questions;
    index = 0; hits = 0; mistakes = []; menu.hidden = true; result.hidden = true; quiz.hidden = false;
    byId('activity-title').textContent = a.title + (reviewing ? ' · Revisão' : '');
    render();
  }
  function render() {
    answered = false;
    const q = questions[index];
    byId('position').textContent = 'Questão ' + (index + 1) + ' de ' + questions.length + ' · ' + hits * 10 + ' pontos';
    const percent = Math.round(index / questions.length * 100);
    byId('bar').style.width = percent + '%'; byId('progress').setAttribute('aria-valuenow', percent);
    byId('emoji').textContent = q.emoji || ''; byId('emoji').hidden = !q.emoji;
    byId('emoji').setAttribute('aria-label', q.alt || '');
    byId('question').textContent = q.q;
    byId('options').replaceChildren();
    q.opts.forEach((text, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'option';
      button.textContent = text; button.addEventListener('click', () => answer(i)); byId('options').append(button);
    });
    byId('feedback').hidden = true; byId('feedback').textContent = ''; byId('next').hidden = true;
    byId('next').textContent = index === questions.length - 1 ? 'Ver resultado →' : 'Próxima →';
    byId('question').focus();
  }
  function answer(selected) {
    if (answered) return;
    answered = true;
    const q = questions[index], correct = selected === q.ans;
    if (correct) hits++; else mistakes.push(q);
    const buttons = [...byId('options').children];
    buttons.forEach((button,i) => {
      button.disabled = true;
      if (i === q.ans) { button.classList.add('correct'); button.textContent = '✓ ' + q.opts[i]; }
      else if (i === selected) { button.classList.add('wrong'); button.textContent = '✕ ' + q.opts[i]; }
    });
    byId('feedback').textContent = (correct ? 'Muito bem! ' : 'Vamos aprender! Resposta: ' + q.opts[q.ans] + ' ') + q.explanation;
    byId('feedback').hidden = false; byId('next').hidden = false;
    byId('position').textContent = 'Questão ' + (index + 1) + ' de ' + questions.length + ' · ' + hits * 10 + ' pontos';
    const percent = Math.round((index + 1) / questions.length * 100);
    byId('bar').style.width = percent + '%'; byId('progress').setAttribute('aria-valuenow',percent);
    byId('next').focus();
  }
  byId('next').onclick = () => {
    if (!answered) return;
    if (++index < questions.length) { render(); return; }
    quiz.hidden = true; result.hidden = false;
    byId('result-score').textContent = hits * 10 + ' pontos';
    byId('result-text').textContent = 'Você acertou ' + hits + ' de ' + questions.length + (reviewing ? ' questões na revisão.' : ' questões nesta rodada.');
    byId('review').hidden = mistakes.length === 0;
    byId('result-title').focus();
  };
  byId('review').onclick = () => start(activity, [...mistakes]);
  byId('again').onclick = () => start(activity);
  byId('home').onclick = byId('back').onclick = showMenu;
  natureActivities.forEach(a => {
    const button = document.createElement('button'); button.className = 'game-card'; button.dataset.activity = a.id;
    const icon = document.createElement('span'); icon.className = 'icon'; icon.textContent = a.icon; icon.setAttribute('aria-hidden','true');
    const title = document.createElement('h2'); title.lang = 'en'; title.textContent = a.title;
    const description = document.createElement('p'); description.textContent = a.subtitle;
    const count = document.createElement('small'); count.textContent = a.questions.length + ' questões · Começar →';
    button.append(icon,title,description,count); button.onclick = () => start(a); menu.append(button);
  });
})();
