import { Model } from '../';
import { type FC } from 'react';
import { type Board } from '../../types/AppTypes';
import style from './Pallet.module.scss';


export const Pallet: FC<{cutList: Array<Board>}> = ({ cutList }) => {
    return (
        <>
            {cutList.map((board: Board) => 
                <div style={{background: "gray", width: "200px", height: "200px"}}>
                    <Model
                        key={board.id}
                        width={board.width}
                        height={board.height}
                        depth={board.depth}
                        finish={board.finish}
                    />
                </div>
            )}
        </>
    )
}