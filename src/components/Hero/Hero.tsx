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
      width: 1,
      height: 5,
      depth: 0.5,
      finish: "Oak"
    });

    return (
        <>
            <div className={style['hero']}>
                <Model
                    key={previewBoard.id}
                    width={previewBoard.width}
                    height={previewBoard.height}
                    depth={previewBoard.depth}
                    finish={previewBoard.finish}
                />
                <CutMenu
                  previewBoard={previewBoard}
                  setPreviewBoard={setPreviewBoard}
                />
            </div>
        </>
    )
};
