import type { FC } from 'react';
import style from './CutMenu.module.scss';

export const CutMenu: FC<{
  previewBoard: any,
  setPreviewBoard: any,
}> = ({ previewBoard, setPreviewBoard }) => {

  const updateProperty = (attr: "width"|"height"|"depth"|"finish", e: any) => {
    setPreviewBoard({...previewBoard, [attr]: e.target.value})
  }

  return (
    <div className={style['cut-menu']}>
      <input 
        value={previewBoard.width}
        onChange={(e) => updateProperty('width', e)}
      />
    </div>
  )
}