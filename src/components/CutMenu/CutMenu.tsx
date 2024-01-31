import type { Board } from '../../types/AppTypes';
import type { Dispatch, FC, SetStateAction } from 'react';
import style from './CutMenu.module.scss';

export const CutMenu: FC<{
  previewBoard: Board,
  setPreviewBoard: Dispatch<SetStateAction<Board>>
  setCutList: Dispatch<SetStateAction<Array<Board>>>
}> = ({ previewBoard, setPreviewBoard, setCutList }) => {

  const updateProperty = (attr: string, e: any) => {
    setPreviewBoard({...previewBoard, [attr]: e.target.value})
  }

  return (
    <div className={style['cut-menu']}>
      {["length","width","depth"].map((measurement: string) =>
        <div key={measurement}>
          <label htmlFor={`cut-menu--${measurement}`}>{measurement} (inches)</label>
          <input 
            type="number"
            className={style['cut-menu__input']}
            id={`cut-menu__input--${measurement}`}
            value={(previewBoard as any)[measurement]}
            onChange={(e) => updateProperty(measurement, e)}
          />
        </div>
      )}
      <button onClick={
        () => setCutList((previousCutList: Array<Board>) => {
          return [...previousCutList, previewBoard]
        })
      }>add</button>
    </div>
  )
}