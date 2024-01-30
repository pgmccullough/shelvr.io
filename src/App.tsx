import { useState } from 'react';

import { Model } from './components/Model/Model';

import './App.css'
import { Board } from './types/AppTypes';

function App() {

  // const [ newBoardData, setNewBoardData ] = useState<Board>();
  const [ boardList, setBoardList ] = useState<Array<Board>>([])

console.log(boardList);

  return (
    <>
    <button onClick={() => setBoardList([...boardList, {id: "x", width: 4, height: 0.2, depth: 1, finish: "Oak"}])}>
      Add
    </button>
      {boardList.map((board: Board) => 
          
          <div style={{background: "gray", width: "200px", height: "200px"}}><Model
            key={board.id}
            width={board.width}
            height={board.height}
            depth={board.depth}
            finish={board.finish}
          /></div>
      )}
    </>
  )
}

export default App
