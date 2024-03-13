import {useEffect, useState} from 'react';
import Board from './components/board/Board';
import './App.css';

function App() {
  const emojiList = [...'🦋🐣🐯🦁🦊🐼🐶👽🐻🐊🦔🦚🐺🐰🐮🐧🐢🐌']
  // se guardarán las imagenes desordenadas para que aparecan de forma aleatoria
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]); 
// se guarda el block seleccionado
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  // chequea la animacion y coincidencia del bloque seleccionado hasta que culmina sino se dan vuelta nuevamente
 const[animating, setAnimating]= useState(false)


  // para mezclarlas imagenes, recibo un array y devuelvo de forma aleatoria.
  const shuffleArray = a => {
    for (let i = a.length -1; i > 0; i--){
      const j = Math.floor(Math.random()* (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a;
  }
  //cadavez que se renderice se ejecutara el array con dos veces cargada la lista de emojis ya que necesita emparejarlo, luego se realizará un map para encontrar match
  useEffect(()=>{
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList])
    setShuffledMemoBlocks(shuffledEmojiList.map((emoji,i) => ({index: i, emoji, flipped: false })));
  },[]);

  const handleMemoClick = memoblock => {
    const flippedMemoBlock ={
      ...memoblock, flipped: true
    };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks]
    shuffledMemoBlocksCopy.splice(memoblock.index, 1, flippedMemoBlock)
    setShuffledMemoBlocks(shuffledMemoBlocksCopy)
    if(selectedMemoBlock === null){
      setSelectedMemoBlock(memoblock)
    } else if(selectedMemoBlock.emoji === memoblock.emoji){
      setSelectedMemoBlock(null)
    } else {
      setAnimating(true)
      setTimeout(() =>
      {
        shuffledMemoBlocksCopy.splice(memoblock.index,1,memoblock)
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index,1,selectedMemoBlock)
        setShuffledMemoBlocks(shuffledMemoBlocksCopy)
        setSelectedMemoBlock(null)
        setAnimating(false)
      }, 1000)
    }

  }


  return (
    <div>
    <h1 className='titulo'>MEMOBLOCK</h1>
    <Board memoblocks={shuffledMemoBlocks}  animating={animating} handleMemoClick={handleMemoClick}/>
    </div>
  );
}

export default App;


