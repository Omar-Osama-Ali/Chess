/* Local 2-Player Chess: dependency-free rules engine + UI. */
const FILES = 'abcdefgh';
const PIECES = { p:'pawn', n:'knight', b:'bishop', r:'rook', q:'queen', k:'king' };
const PIECE_SVGS = {
  w: {
    k:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><path d="M45 10h10v10h8v8H37v-8h8z"/><path d="M38 28h24l5 10-7 7 5 34H35l5-34-7-7z"/><path d="M30 79h40l8 9v5H22v-5z"/></g></svg>',
    q:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><path d="M25 20l7 8 8-15 10 15 10-15 8 15 7-8-7 46H32z"/><circle cx="25" cy="20" r="4"/><circle cx="40" cy="13" r="4"/><circle cx="50" cy="13" r="4"/><circle cx="60" cy="13" r="4"/><circle cx="75" cy="20" r="4"/><path d="M28 69h44l8 10v8H20v-8z"/></g></svg>',
    r:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><path d="M27 16h9v10h8V16h12v10h8V16h9v18H66l4 35H30l4-35H27z"/><path d="M25 69h50l7 10v8H18v-8z"/></g></svg>',
    b:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><path d="M50 12c-10 0-17 8-17 17 0 11 8 17 12 22l-8 18h26l-8-18c4-5 12-11 12-22 0-9-7-17-17-17z"/><path d="M25 69h50l7 10v8H18v-8z"/><path d="M43 27l10 11"/></g></svg>',
    n:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><path d="M30 80c2-12 3-19 2-29-1-11 4-26 17-35l14 2 9 12-8 10 8 12-8 10 7 18z"/><path d="M22 80h54l8 9v6H15v-6z"/><path d="M48 31l8 8"/></g></svg>',
    p:'<svg viewBox="0 0 100 100"><g fill="#f8fbf8" stroke="#18201f" stroke-width="2.4" stroke-linejoin="round"><circle cx="50" cy="28" r="15"/><path d="M40 42h20l7 27H33z"/><path d="M27 69h46l8 11v8H19v-8z"/></g></svg>'
  },
  b: {
    k:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><path d="M45 10h10v10h8v8H37v-8h8z"/><path d="M38 28h24l5 10-7 7 5 34H35l5-34-7-7z"/><path d="M30 79h40l8 9v5H22v-5z"/></g></svg>',
    q:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><path d="M25 20l7 8 8-15 10 15 10-15 8 15 7-8-7 46H32z"/><circle cx="25" cy="20" r="4"/><circle cx="40" cy="13" r="4"/><circle cx="50" cy="13" r="4"/><circle cx="60" cy="13" r="4"/><circle cx="75" cy="20" r="4"/><path d="M28 69h44l8 10v8H20v-8z"/></g></svg>',
    r:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><path d="M27 16h9v10h8V16h12v10h8V16h9v18H66l4 35H30l4-35H27z"/><path d="M25 69h50l7 10v8H18v-8z"/></g></svg>',
    b:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><path d="M50 12c-10 0-17 8-17 17 0 11 8 17 12 22l-8 18h26l-8-18c4-5 12-11 12-22 0-9-7-17-17-17z"/><path d="M25 69h50l7 10v8H18v-8z"/><path d="M43 27l10 11"/></g></svg>',
    n:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><path d="M30 80c2-12 3-19 2-29-1-11 4-26 17-35l14 2 9 12-8 10 8 12-8 10 7 18z"/><path d="M22 80h54l8 9v6H15v-6z"/><path d="M48 31l8 8"/></g></svg>',
    p:'<svg viewBox="0 0 100 100"><g fill="#101616" stroke="#0a0e0e" stroke-width="2.4" stroke-linejoin="round"><circle cx="50" cy="28" r="15"/><path d="M40 42h20l7 27H33z"/><path d="M27 69h46l8 11v8H19v-8z"/></g></svg>'
  }
};

const state = {
  screen:'setup', board:[], turn:'w', orientation:'w', selected:null, legalTargets:[], lastMove:null,
  history:[], snapshots:[], players:{w:'',b:''}, scores:{w:0,b:0,draws:0}, settings:{color:'white',seconds:0,increment:0,autoFlip:true,sound:true,theme:0},
  gameOver:false, result:null, pendingPromotion:null, pendingConfirm:null, timerId:null, clocks:{w:0,b:0}, lastTick:0,
  repetition:new Map(), halfmove:0, sessionStarted:false
};

const $ = id => document.getElementById(id);
const cloneBoard = b => b.map(p => p ? {...p} : null);
const piece = (color,type, moved=false) => ({color,type,moved});
const idx = (r,c) => r*8+c;
const rc = i => [Math.floor(i/8), i%8];
const inBounds = (r,c) => r>=0&&r<8&&c>=0&&c<8;
const algebraic = i => { const [r,c]=rc(i); return FILES[c] + (8-r); };
const opposite = c => c==='w'?'b':'w';

function initialBoard(){
  const b=Array(64).fill(null); const back=['r','n','b','q','k','b','n','r'];
  for(let c=0;c<8;c++){ b[c]=piece('b',back[c]); b[8+c]=piece('b','p'); b[48+c]=piece('w','p'); b[56+c]=piece('w',back[c]); }
  return b;
}
function fenLike(board=state.board, turn=state.turn){ return board.map(p=>p?p.color+p.type:'--').join('')+'|'+turn+'|'+castlingRights(board)+'|'+(state.enPassant ?? '-'); }
function castlingRights(board){
  let s='';
  const wk=board[60],wrA=board[56],wrH=board[63],bk=board[4],brA=board[0],brH=board[7];
  if(wk?.color==='w'&&wk.type==='k'&&!wk.moved&&wrH?.color==='w'&&wrH.type==='r'&&!wrH.moved)s+='K';
  if(wk?.color==='w'&&wk.type==='k'&&!wk.moved&&wrA?.color==='w'&&wrA.type==='r'&&!wrA.moved)s+='Q';
  if(bk?.color==='b'&&bk.type==='k'&&!bk.moved&&brH?.color==='b'&&brH.type==='r'&&!brH.moved)s+='k';
  if(bk?.color==='b'&&bk.type==='k'&&!bk.moved&&brA?.color==='b'&&brA.type==='r'&&!brA.moved)s+='q';
  return s||'-';
}
function squareAttacked(board, square, byColor){
  const [r,c]=rc(square);
  const pawnDir=byColor==='w'?-1:1;
  for(const dc of [-1,1]){ const rr=r-pawnDir, cc=c-dc; if(inBounds(rr,cc)){const p=board[idx(rr,cc)]; if(p?.color===byColor&&p.type==='p')return true;} }
  const jumps=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  for(const [dr,dc] of jumps){const rr=r+dr,cc=c+dc;if(inBounds(rr,cc)){const p=board[idx(rr,cc)];if(p?.color===byColor&&p.type==='n')return true;}}
  for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){
    let rr=r+dr,cc=c+dc;while(inBounds(rr,cc)){const p=board[idx(rr,cc)];if(p){if(p.color===byColor&&(p.type==='r'||p.type==='q'))return true;break;}rr+=dr;cc+=dc;}
  }
  for(const [dr,dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]){
    let rr=r+dr,cc=c+dc;while(inBounds(rr,cc)){const p=board[idx(rr,cc)];if(p){if(p.color===byColor&&(p.type==='b'||p.type==='q'))return true;break;}rr+=dr;cc+=dc;}
  }
  for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const rr=r+dr,cc=c+dc;if(inBounds(rr,cc)){const p=board[idx(rr,cc)];if(p?.color===byColor&&p.type==='k')return true;}}
  return false;
}
function kingSquare(board,color){ return board.findIndex(p=>p?.color===color&&p.type==='k'); }
function inCheck(board,color){ const k=kingSquare(board,color); return k>=0 && squareAttacked(board,k,opposite(color)); }

function pseudoMoves(board, from, includeCastle=true){
  const p=board[from]; if(!p)return [];
  const [r,c]=rc(from), out=[];
  const add=(to,extra={})=>{if(inBounds(...rc(to))){const q=board[to]; if(!q||q.color!==p.color)out.push({from,to,...extra});}};
  if(p.type==='p'){
    const dir=p.color==='w'?-1:1, start=p.color==='w'?6:1, end=p.color==='w'?0:7;
    const one=idx(r+dir,c); if(inBounds(r+dir,c)&&!board[one]){out.push({from,to:one,promotion:r+dir===end});const two=idx(r+2*dir,c);if(r===start&&!board[two])out.push({from,to:two,doublePawn:true});}
    for(const dc of [-1,1]){const rr=r+dir,cc=c+dc;if(!inBounds(rr,cc))continue;const to=idx(rr,cc),q=board[to];if(q&&q.color!==p.color)out.push({from,to,promotion:rr===end}); else if(state.enPassant===to)out.push({from,to,enPassant:true});}
  } else if(p.type==='n'){
    for(const [dr,dc] of [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]){const rr=r+dr,cc=c+dc;if(inBounds(rr,cc))add(idx(rr,cc));}
  } else if(p.type==='k'){
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(dr||dc){const rr=r+dr,cc=c+dc;if(inBounds(rr,cc))add(idx(rr,cc));}}
    if(includeCastle&&!p.moved&&!inCheck(board,p.color)){
      const row=p.color==='w'?7:0, rookKing=idx(row,7), rookQueen=idx(row,0);
      const rk=board[rookKing],rq=board[rookQueen];
      if(rk?.type==='r'&&rk.color===p.color&&!rk.moved&&!board[idx(row,5)]&&!board[idx(row,6)]&&!squareAttacked(board,idx(row,5),opposite(p.color))&&!squareAttacked(board,idx(row,6),opposite(p.color))) out.push({from,to:idx(row,6),castle:'k'});
      if(rq?.type==='r'&&rq.color===p.color&&!rq.moved&&!board[idx(row,1)]&&!board[idx(row,2)]&&!board[idx(row,3)]&&!squareAttacked(board,idx(row,3),opposite(p.color))&&!squareAttacked(board,idx(row,2),opposite(p.color))) out.push({from,to:idx(row,2),castle:'q'});
    }
  } else {
    const dirs=p.type==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:p.type==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    for(const [dr,dc] of dirs){let rr=r+dr,cc=c+dc;while(inBounds(rr,cc)){const to=idx(rr,cc);if(!board[to])out.push({from,to});else{if(board[to].color!==p.color)out.push({from,to});break;}rr+=dr;cc+=dc;}}
  }
  return out;
}
function applyMove(board, move, promotionType='q'){
  const b=cloneBoard(board), p={...b[move.from]}; let captured=b[move.to];
  b[move.from]=null;
  if(move.enPassant){ const [r,c]=rc(move.to); const cap=idx(r+(p.color==='w'?1:-1),c); captured=b[cap]; b[cap]=null; }
  p.moved=true; if(move.promotion)p.type=promotionType;
  b[move.to]=p;
  if(move.castle==='k'){const row=p.color==='w'?7:0;const rf=idx(row,7),rt=idx(row,5);b[rt]={...b[rf],moved:true};b[rf]=null;}
  if(move.castle==='q'){const row=p.color==='w'?7:0;const rf=idx(row,0),rt=idx(row,3);b[rt]={...b[rf],moved:true};b[rf]=null;}
  return {board:b,captured};
}
function legalMovesFor(board, color){
  const all=[];
  for(let i=0;i<64;i++){if(board[i]?.color!==color)continue;for(const m of pseudoMoves(board,i,true)){const res=applyMove(board,m,m.promotion?'q':'q');if(!inCheck(res.board,color))all.push(m);}}
  return all;
}
function legalMovesFrom(from){
  const p=state.board[from]; if(!p||p.color!==state.turn)return [];
  return pseudoMoves(state.board,from,true).filter(m=>!inCheck(applyMove(state.board,m,'q').board,p.color));
}
function notation(move, before, after, promotionType, captured){
  const p=before[move.from]; const dest=algebraic(move.to); const capture=!!captured||move.enPassant;
  if(move.castle==='k') return 'O-O'+suffix(after,opposite(p.color));
  if(move.castle==='q') return 'O-O-O'+suffix(after,opposite(p.color));
  let s=''; if(p.type!=='p')s=p.type==='n'?'N':p.type.toUpperCase(); else if(capture)s=FILES[rc(move.from)[1]];
  if(capture)s+='x'; s+=dest; if(move.promotion)s+='='+promotionType.toUpperCase(); return s+suffix(after,opposite(p.color));
}
function suffix(board,nextColor){ const moves=legalMovesFor(board,nextColor); if(inCheck(board,nextColor))return moves.length?' +':'#'; return ''; }
function insufficientMaterial(board){
  const pieces=board.filter(Boolean); const nonKings=pieces.filter(p=>p.type!=='k');
  if(nonKings.length===0)return true;
  if(nonKings.some(p=>['p','r','q'].includes(p.type)))return false;
  if(nonKings.length===1)return true;
  if(nonKings.every(p=>p.type==='b')){
    const bishops=board.map((p,i)=>p?.type==='b'?i:null).filter(x=>x!==null);
    return bishops.every((i,_,arr)=>((rc(i)[0]+rc(i)[1])%2)==((rc(arr[0])[0]+rc(arr[0])[1])%2));
  }
  if(nonKings.length===2&&nonKings.every(p=>p.type==='n'))return true;
  return false;
}
function positionKey(){
  return state.board.map(p=>p?p.color+p.type:'--').join('')+'|'+state.turn+'|'+castlingRights(state.board)+'|'+(state.enPassant??'-');
}
function drawStatus(){
  if(insufficientMaterial(state.board))return 'INSUFFICIENT MATERIAL';
  if(state.halfmove>=100)return '50-MOVE DRAW';
  if((state.repetition.get(positionKey())||0)>=5)return 'FIVEFOLD REPETITION';
  return '';
}
function claimAvailable(){ return state.halfmove>=100 || (state.repetition.get(positionKey())||0)>=3; }

function saveSnapshot(){
  state.snapshots.push({board:cloneBoard(state.board),turn:state.turn,orientation:state.orientation,lastMove:state.lastMove?{...state.lastMove}:null,history:[...state.history],clocks:{...state.clocks},halfmove:state.halfmove,enPassant:state.enPassant,repetition:new Map(state.repetition),gameOver:state.gameOver,result:state.result});
  if(state.snapshots.length>200)state.snapshots.shift();
}
function restoreSnapshot(s){Object.assign(state,{board:cloneBoard(s.board),turn:s.turn,orientation:s.orientation,lastMove:s.lastMove?{...s.lastMove}:null,history:[...s.history],clocks:{...s.clocks},halfmove:s.halfmove,enPassant:s.enPassant,repetition:new Map(s.repetition),gameOver:s.gameOver,result:s.result});}

function playMove(move,promotion='q'){
  if(state.gameOver)return;
  const before=cloneBoard(state.board), moving=before[move.from];
  const result=applyMove(before,move,promotion), captured=result.captured;
  saveSnapshot();
  state.board=result.board;
  state.enPassant=move.doublePawn?move.to+(moving.color==='w'?8:-8):null;
  state.halfmove=(moving.type==='p'||captured)?0:state.halfmove+1;
  const after=state.board, text=notation(move,before,after,promotion,captured);
  state.history.push(text);
  state.lastMove={from:move.from,to:move.to};
  state.turn=opposite(state.turn);
  const key=positionKey(); state.repetition.set(key,(state.repetition.get(key)||0)+1);
  if(state.settings.autoFlip)state.orientation=state.turn;
  if(state.settings.sound)playSound(captured?'capture':(inCheck(state.board,state.turn)?'check':'move'));
  evaluateGameEnd(); renderAll();
}
function evaluateGameEnd(){
  const moves=legalMovesFor(state.board,state.turn), check=inCheck(state.board,state.turn);
  if(check&&moves.length===0){ endGame({type:'checkmate',winner:opposite(state.turn)}); return; }
  if(!check&&moves.length===0){ endGame({type:'stalemate',winner:null}); return; }
  const automatic=drawStatus();
  if(automatic && automatic!=='50-MOVE DRAW' && automatic!=='FIVEFOLD REPETITION'){ endGame({type:'draw',winner:null,reason:automatic}); return; }
  if((state.repetition.get(positionKey())||0)>=5){ endGame({type:'draw',winner:null,reason:'FIVEFOLD REPETITION'}); return; }
  state.result=null;
}
function endGame(result){
  if(state.gameOver)return;
  state.gameOver=true; state.result=result; stopClock();
  if(result.winner)state.scores[result.winner]++;
  else state.scores.draws++;
  if(state.settings.sound)playSound('gameover');
  renderAll(); setTimeout(()=>showResultDialog(),80);
}
function resign(color=state.turn){ endGame({type:'resignation',winner:opposite(color)}); }
function timeout(color){ endGame({type:'timeout',winner:opposite(color)}); }

function formatClock(sec){ sec=Math.max(0,sec); const m=Math.floor(sec/60), s=Math.floor(sec%60); return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
function startClock(){
  stopClock(); if(!state.settings.seconds)return;
  state.lastTick=performance.now();
  state.timerId=setInterval(()=>{
    if(state.gameOver)return;
    const now=performance.now(), delta=(now-state.lastTick)/1000; state.lastTick=now;
    state.clocks[state.turn]-=delta;
    if(state.clocks[state.turn]<=0){state.clocks[state.turn]=0;timeout(state.turn);} renderPlayers();
  },100);
}
function stopClock(){if(state.timerId){clearInterval(state.timerId);state.timerId=null;}}
function startGame(){
  const white=$('whiteName').value.trim(), black=$('blackName').value.trim();
  if(!white||!black){$('setupError').hidden=false;$('setupError').textContent='Enter both player names to start.';return;}
  $('setupError').hidden=true;
  let whiteColor=$('colorChoice')?.value;
  const color=state.settings.color;
  let players={w:white,b:black};
  if(color==='black')players={w:black,b:white};
  if(color==='random' && Math.random()>.5)players={w:black,b:white};
  state.players=players; state.board=initialBoard(); state.turn='w'; state.orientation='w'; state.selected=null; state.legalTargets=[]; state.lastMove=null; state.history=[]; state.snapshots=[]; state.gameOver=false; state.result=null; state.pendingPromotion=null; state.halfmove=0; state.enPassant=null; state.repetition=new Map([[positionKey(),1]]);
  state.clocks={w:state.settings.seconds,b:state.settings.seconds}; state.sessionStarted=true; state.screen='game';
  $('setupScreen').classList.add('hidden');$('gameScreen').classList.remove('hidden'); startClock(); renderAll();
}
function rematch(){ hideAllOverlays(); state.board=initialBoard();state.turn='w';state.orientation='w';state.selected=null;state.legalTargets=[];state.lastMove=null;state.history=[];state.snapshots=[];state.gameOver=false;state.result=null;state.halfmove=0;state.enPassant=null;state.repetition=new Map([[positionKey(),1]]);state.clocks={w:state.settings.seconds,b:state.settings.seconds};startClock();renderAll(); }
function exitToSetup(){ hideAllOverlays(); stopClock();state.screen='setup';$('gameScreen').classList.add('hidden');$('setupScreen').classList.remove('hidden');renderSetupDefaults(); }

function renderBoard(){
  const board=$('chessBoard'); board.innerHTML='';
  const files=state.orientation==='w'?[0,1,2,3,4,5,6,7]:[7,6,5,4,3,2,1,0];
  const ranks=state.orientation==='w'?[0,1,2,3,4,5,6,7]:[7,6,5,4,3,2,1,0];
  for(const r of ranks)for(const c of files){
    const i=idx(r,c), sq=document.createElement('button'); sq.type='button';sq.className='square '+((r+c)%2?'dark':'light');sq.dataset.square=i;sq.setAttribute('role','gridcell');sq.setAttribute('aria-label',squareAria(i));
    if(state.selected===i)sq.classList.add('selected'); if(state.lastMove&&(state.lastMove.from===i||state.lastMove.to===i))sq.classList.add('last');
    if(state.legalTargets.some(m=>m.to===i)){const target=state.board[i];sq.classList.add(target?'capture':'legal');}
    const p=state.board[i]; if(p?.type==='k'&&p.color===state.turn&&inCheck(state.board,state.turn))sq.classList.add('check');
    if((c===0&&state.orientation==='w')||(c===7&&state.orientation==='b')){const label=document.createElement('span');label.className='coords rank-label';label.textContent=8-r;sq.appendChild(label);}
    if((r===7&&state.orientation==='w')||(r===0&&state.orientation==='b')){const label=document.createElement('span');label.className='coords file-label';label.textContent=FILES[c];sq.appendChild(label);}
    if(p){const img=document.createElement('img');img.className='piece';img.alt=`${p.color==='w'?'White':'Black'} ${PIECES[p.type]}`;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(PIECE_SVGS[p.color][p.type]);img.draggable=true;img.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',String(i));});sq.appendChild(img);}
    sq.addEventListener('click',()=>handleSquare(i));sq.addEventListener('dragover',e=>{if(!state.gameOver)e.preventDefault();});sq.addEventListener('drop',e=>{e.preventDefault();const from=Number(e.dataTransfer.getData('text/plain'));if(Number.isInteger(from))attemptMove(from,i);});
    board.appendChild(sq);
  }
}
function squareAria(i){const p=state.board[i];return `${algebraic(i)}${p?`, ${p.color==='w'?'white':'black'} ${PIECES[p.type]}`:''}`;}
function handleSquare(i){
  if(state.gameOver)return;
  if(state.pendingPromotion)return;
  const p=state.board[i];
  if(state.selected!==null){
    const move=state.legalTargets.find(m=>m.to===i); if(move){if(move.promotion)showPromotion(move);else playMove(move);return;}
  }
  if(p?.color===state.turn){state.selected=i;state.legalTargets=legalMovesFrom(i);renderBoard();return;}
  state.selected=null;state.legalTargets=[];renderBoard();
}
function attemptMove(from,to){
  if(state.gameOver||state.turn!==state.board[from]?.color)return;
  state.selected=from;state.legalTargets=legalMovesFrom(from);const move=state.legalTargets.find(m=>m.to===to);if(!move){renderBoard();return;} if(move.promotion)showPromotion(move);else playMove(move);
}

function renderPlayers(){
  const card=(color)=>{const name=state.players[color],active=state.turn===color&&!state.gameOver;return `<div class="player-head"><div><div class="player-side">${color==='w'?'WHITE':'BLACK'}</div><div class="player-name">${escapeHtml(name)} ${active?'<span class="active-dot" aria-label="Active player"></span>':''}</div></div><div class="player-side">${state.scores[color]} WIN${state.scores[color]===1?'':'S'}</div></div>${state.settings.seconds?`<div class="clock ${state.clocks[color]<10?'low':''} ${state.clocks[color]<=0?'zero':''}">${formatClock(state.clocks[color])}</div>`:''}<div class="player-meta"><span>${active?'Your turn':'Waiting'}</span><span>${color==='w'?'White':'Black'}</span></div>`;};
  $('blackPlayer').innerHTML=card('b');$('whitePlayer').innerHTML=card('w');$('blackPlayer').classList.toggle('active',state.turn==='b'&&!state.gameOver);$('whitePlayer').classList.toggle('active',state.turn==='w'&&!state.gameOver);
}
function renderStatus(){
  const banner=$('statusBanner'),turn=$('turnIndicator'); let status='';
  if(state.gameOver){status=state.result.type==='checkmate'?'CHECKMATE':state.result.type==='stalemate'?'STALEMATE':state.result.type==='timeout'?'TIME OUT':state.result.type==='resignation'?'RESIGNATION':'DRAW';}
  else if(inCheck(state.board,state.turn))status='CHECK';
  banner.textContent=status;turn.textContent=state.gameOver?'Game Over':`${state.players[state.turn]}'s Turn`;
}
function renderHistory(){const h=$('moveHistory');h.innerHTML='';for(let i=0;i<state.history.length;i+=2){const div=document.createElement('div');div.className='history-move';div.textContent=`${Math.floor(i/2)+1}. ${state.history[i]||''} ${state.history[i+1]||''}`;h.appendChild(div);}}
function renderAll(){renderBoard();renderPlayers();renderStatus();renderHistory();$('undoBtn').disabled=state.snapshots.length===0||state.gameOver;$('menuUndo').disabled=$('undoBtn').disabled;$('claimDrawBtn').classList.toggle('hidden',!claimAvailable()||state.gameOver);$('soundMenuBtn').textContent=`Sound: ${state.settings.sound?'ON':'OFF'}`;}
function renderSetupDefaults(){
  $('whiteName').value=state.players.w||'';$('blackName').value=state.players.b||'';
  document.querySelectorAll('[data-color]').forEach(b=>b.classList.toggle('active',b.dataset.color===state.settings.color));
  document.querySelectorAll('[data-time]').forEach(b=>b.classList.toggle('active',String(b.dataset.time)===String(state.settings.seconds)||b.dataset.time==='0'&&state.settings.seconds===0));
}
function escapeHtml(s){return s.replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}

function showPromotion(move){
  state.pendingPromotion=move;$('promotionModal').classList.remove('hidden');$('promotionChoices').innerHTML='';
  for(const type of ['q','r','b','n']){const b=document.createElement('button');b.type='button';b.className='promotion-choice';b.setAttribute('aria-label',`Promote to ${PIECES[type]}`);const img=document.createElement('img');img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(PIECE_SVGS[state.turn][type]);img.alt='';b.appendChild(img);b.addEventListener('click',()=>{const m=state.pendingPromotion;state.pendingPromotion=null;$('promotionModal').classList.add('hidden');playMove(m,type);});$('promotionChoices').appendChild(b);}
}
function showConfirm(title,text,onConfirm,okLabel='Confirm'){
  $('confirmTitle').textContent=title;$('confirmText').textContent=text;$('confirmOk').textContent=okLabel;$('confirmModal').classList.remove('hidden');state.pendingConfirm=onConfirm;
}
function hideConfirm(){ $('confirmModal').classList.add('hidden');state.pendingConfirm=null; }
function showResultDialog(){
  const r=state.result; const title=r.type==='checkmate'?'CHECKMATE':r.type==='timeout'?'TIME OUT':r.type==='resignation'?'RESIGNATION':r.type==='stalemate'?'STALEMATE':'DRAW';
  const winner=r.winner?`${state.players[r.winner]} Wins`:r.reason||'Draw';
  showConfirm(title,`${winner}\n\n${state.players.w} — ${state.scores.w} Wins\n${state.players.b} — ${state.scores.b} Wins\nDraws — ${state.scores.draws}`,
    ()=>{hideConfirm();showResultActions(title,winner);},'Continue');
}
function showResultActions(title,winner){
  $('confirmTitle').textContent=title;$('confirmText').textContent=winner;
  const actions=$('confirmModal').querySelector('.dialog-actions');actions.innerHTML='';
  const rem=document.createElement('button');rem.className='primary-button';rem.textContent='Rematch';rem.onclick=()=>rematch();
  const ng=document.createElement('button');ng.className='secondary-button';ng.textContent='New Game';ng.onclick=()=>rematch();
  const setup=document.createElement('button');setup.className='secondary-button';setup.textContent='Back to Setup';setup.onclick=()=>exitToSetup();
  actions.append(rem,ng,setup);$('confirmModal').classList.remove('hidden');
}
function openMenu(){ $('modalLayer').classList.remove('hidden');$('menuPanel').classList.remove('hidden');$('menuPanel').setAttribute('aria-hidden','false'); }
function closeMenu(){ $('modalLayer').classList.add('hidden');$('menuPanel').classList.add('hidden');$('menuPanel').setAttribute('aria-hidden','true'); }
function hideAllOverlays(){closeMenu();hideConfirm();$('promotionModal').classList.add('hidden');state.pendingPromotion=null;}
function undo(){if(state.snapshots.length===0||state.gameOver)return;const s=state.snapshots.pop();restoreSnapshot(s);startClock();renderAll();}
function restart(){showConfirm('Restart Game?','The current game will return to the starting position. The session score will remain unchanged.',()=>{hideConfirm();rematch();},'Restart');}
function flipBoard(){state.orientation=state.orientation==='w'?'b':'w';renderBoard();}
function claimDraw(){if(!claimAvailable()||state.gameOver)return;hideAllOverlays();endGame({type:'draw',winner:null,reason:state.halfmove>=100?'50-MOVE DRAW':'THREEFOLD REPETITION'});}
function theme(){state.settings.theme=(state.settings.theme+1)%2;document.documentElement.style.setProperty('--light-square',state.settings.theme?'#d8dfd0':'#e8eadc');document.documentElement.style.setProperty('--dark-square',state.settings.theme?'#557761':'#6e8b68');renderBoard();}
function toggleSound(){state.settings.sound=!state.settings.sound;$('sound').checked=state.settings.sound;renderAll();}
async function fullscreen(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{} }
function playSound(kind){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=playSound.ctx||(playSound.ctx=new C());const o=c.createOscillator(),g=c.createGain();o.type='sine';const f={move:440,capture:330,check:660,gameover:220}[kind]||440;o.frequency.value=f;g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.05,c.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.16);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.17);}catch{}}

function setupEvents(){
  $('setupForm').addEventListener('submit',e=>{e.preventDefault();startGame();});
  document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{state.settings.color=b.dataset.color;document.querySelectorAll('[data-color]').forEach(x=>x.classList.toggle('active',x===b));}));
  document.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.time;if(v==='custom'){$('customTimeWrap').classList.remove('hidden');$('presetIncrementWrap').classList.add('hidden');state.settings.seconds=Number($('customMinutes').value)*60;}else{$('customTimeWrap').classList.add('hidden');$('presetIncrementWrap').classList.remove('hidden');state.settings.seconds=Number(v);$('customMinutes').value=state.settings.seconds?state.settings.seconds/60:10;}$('increment').value=$('presetIncrement').value;document.querySelectorAll('[data-time]').forEach(x=>x.classList.toggle('active',x===b));}));
  $('autoFlip').addEventListener('change',e=>state.settings.autoFlip=e.target.checked);$('sound').addEventListener('change',e=>state.settings.sound=e.target.checked);
  $('customMinutes').addEventListener('input',e=>{state.settings.seconds=Math.max(60,Math.min(10800,Number(e.target.value||10)*60));});
  $('increment').addEventListener('input',e=>state.settings.increment=Math.max(0,Math.min(60,Number(e.target.value||0))));$('presetIncrement').addEventListener('input',e=>state.settings.increment=Math.max(0,Math.min(60,Number(e.target.value||0))));
  $('undoBtn').onclick=undo;$('newGameBtn').onclick=restart;$('menuBtn').onclick=openMenu;$('topMenuBtn').onclick=openMenu;$('closeMenuBtn').onclick=closeMenu;$('modalLayer').onclick=closeMenu;$('menuUndo').onclick=()=>{closeMenu();undo();};$('restartBtn').onclick=()=>{closeMenu();restart();};$('flipBtn').onclick=()=>{flipBoard();};$('soundMenuBtn').onclick=toggleSound;$('themeBtn').onclick=theme;$('resignBtn').onclick=()=>{closeMenu();showConfirm('Resign Game?','The opponent will be recorded as the winner.',()=>{hideConfirm();resign();},'Resign');};$('claimDrawBtn').onclick=claimDraw;$('fullscreenBtn').onclick=fullscreen;$('fullscreenMenuBtn').onclick=fullscreen;$('setupBtn').onclick=()=>exitToSetup();
  $('confirmCancel').onclick=hideConfirm;$('confirmOk').onclick=()=>{if(state.pendingConfirm)state.pendingConfirm();};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(!$('promotionModal').classList.contains('hidden')){$('promotionModal').classList.add('hidden');state.pendingPromotion=null;}else if(!$('confirmModal').classList.contains('hidden'))hideConfirm();}});
}

function commitIncrement(color){ if(state.settings.seconds && state.settings.increment)state.clocks[color]+=state.settings.increment; }
const originalPlayMove=playMove;
playMove=function(move,promotion='q'){ const movingColor=state.turn; originalPlayMove(move,promotion); if(!state.gameOver)commitIncrement(movingColor); };

setupEvents();renderSetupDefaults();
