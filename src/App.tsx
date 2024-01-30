import { useState } from 'react';

import { Header, Hero, Model, Pallet } from './components';
import { Board } from './types/AppTypes';

function App() {

  const [ cutList, setCutList ] = useState<Array<Board>>([])

  return (
    <>
      <Header />
      <Hero setCutList={setCutList} />
      <Pallet cutList={cutList} />
    </>
  )
}

export default App
