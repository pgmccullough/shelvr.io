import { Model } from '../';
import { type FC } from 'react';
import { type Board } from '../../types/AppTypes';
import style from './Pallet.module.scss';

export const Pallet: FC<{cutList: Array<Board>}> = ({ cutList }) => {
    return (
        !cutList.length 
        ? ""
        : <div>
            <h2>My Pallet</h2>
            <section className={style['pallet']}>
                {cutList.map((board: Board) => 
                    <article className={style['pallet__item']}>
                        <Model
                            key={board.id}
                            width={board.width}
                            length={board.length}
                            depth={board.depth}
                            finish={board.finish}
                        />
                    </article>
                )}
            </section>
        </div>
    )
}