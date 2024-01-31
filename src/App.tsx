import { useState } from 'react';

import { Header, Hero, Pallet } from './components';
import { Board } from './types/AppTypes';

function App() {

  const [ cutList, setCutList ] = useState<Array<Board>>([])

  return (
    <>
      <Header cutList={cutList} />
      <Hero setCutList={setCutList} />
      <Pallet cutList={cutList} />
    </>
  )
}

export default App
