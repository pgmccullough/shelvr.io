import { Model } from '../';
import { type FC } from 'react';
import { type Board } from '../../types/AppTypes';
import style from './Pallet.module.scss';


export const Pallet: FC<{cutList: Array<Board>}> = ({ cutList }) => {
    return (
        <section className={style['pallet']}>
            {cutList.map((board: Board) => 
                <article className={style['pallet__item']}>
                    <Model
                        key={board.id}
                        width={board.width}
                        height={board.height}
                        depth={board.depth}
                        finish={board.finish}
                    />
                </article>
            )}
        </section>
    )
}