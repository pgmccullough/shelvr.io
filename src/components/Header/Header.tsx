import { FC } from "react";
import style from "./Header.module.scss";
import { Board } from "../../types/AppTypes";

export const Header: FC<{cutList: Array<Board>}> = ({ cutList }) => {
    return (
        <header className={style.header}>
            my pallet: {cutList.length}
        </header>
    )
}