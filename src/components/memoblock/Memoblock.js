import './memoblock.css';

const Memoblock = ({ memoblock, animating, handleMemoClick }) => {
  return (
    <div className="memo-block" onClick={()=>(!memoblock.flipped && !animating) && handleMemoClick(memoblock)}>
      <div
        className={`memo-block-inner ${
          memoblock.flipped && "memo-block-flipped"
        }`}
      >
        <div className="memo-block-front"></div>
        <div className="memo-block-back">{memoblock.emoji}</div>
      </div>
    </div>
  );
};

export default Memoblock;
