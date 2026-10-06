# Anchieta · Portal de estudos do 2º ano

Portal estático em HTML, CSS e JavaScript com atividades de revisão escolar.

## Organização

A página inicial reúne jogos e materiais por matéria: História e Geografia, Ciências, Inglês, Português e Matemática. Português e Matemática têm simulados em PDF; as outras matérias também contam com jogos. Os simulados em HTML podem ser impressos ou salvos como PDF pelo navegador.

- `index.html`: catálogo por matéria.
- `assets/portal.css`: visual da página inicial e do Inglês 2.
- `assets/navigation.css` e `assets/navigation.js`: navegação comum dos demais jogos e simulados.
- `assets/english-nature-data.js`: perguntas, alternativas, respostas e explicações do Inglês 2.
- `assets/english-nature.js`: rodadas, pontuação e revisão de erros do Inglês 2.
- Demais páginas HTML e PDFs: atividades e materiais existentes.

## Inglês 2 · Nature Around Us

52 questões em seis atividades: Animals (12), Insects (8), Counting (8), The Chant (8), Nature Words (8) e Animal Actions (8). As 20 questões originais foram mantidas e 32 foram acrescentadas.

Cada acerto vale dez pontos na rodada. Ao terminar, é possível revisar somente os erros ou reiniciar a atividade completa. Repetir o clique na mesma resposta não concede pontos adicionais. A pontuação é temporária; não há cadastro, banco de dados ou sincronização entre aparelhos.

## Executar

Abra `index.html` no navegador com a pasta `assets` ao lado, ou publique todos os arquivos em uma hospedagem estática. Também é possível servir localmente com `python -m http.server 8000`. Algumas atividades antigas usam fontes externas, mas possuem fontes alternativas locais.

## Adicionar conteúdo

No Inglês 2, edite o catálogo `natureActivities` em `assets/english-nature-data.js`. Cada questão contém `id`, `q`, `opts`, `ans` (índice começando em zero) e `explanation`; `emoji` e `alt` são opcionais. Mantenha IDs únicos e atualize as quantidades divulgadas no portal ao adicionar questões. Revise sempre a alternativa correta e a explicação antes de publicar.
