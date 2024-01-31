import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CutMenu, Model } from '../';
import style from './Hero.module.scss';
import { Board } from '../../types/AppTypes';

export const Hero: FC<{ 
    setCutList: Dispatch<SetStateAction<Array<Board>>>
}> = ({ setCutList }) => {

    const [ previewBoard, setPreviewBoard ] = useState<Board>({
      id: uuidv4(),
      length: 96,
      width: 3.5,
      depth: 1.5,
      finish: "Oak"
    });

    return (
        <>
            <div className={style['hero']}>
                <Model
                    key={previewBoard.id}
                    width={previewBoard.width}
                    length={previewBoard.length}
                    depth={previewBoard.depth}
                    finish={previewBoard.finish}
                />
                <CutMenu
                  previewBoard={previewBoard}
                  setPreviewBoard={setPreviewBoard}
                  setCutList={setCutList}
                />
            </div>
        </>
    )
};
