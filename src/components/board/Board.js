import Memoblock from '../memoblock/Memoblock';
import './board.css';
 
 const Board = ({memoblocks, animating, handleMemoClick}) => {
  console.log(memoblocks)
   return (
     <main className='board'>
        {memoblocks.map((memoblock,i) => {
            return <Memoblock key={`${i}_${memoblock.emoji}`} memoblock={memoblock}  animating={animating} handleMemoClick={handleMemoClick} />
        })}
     </main>
   );
 }
 
 export default Board