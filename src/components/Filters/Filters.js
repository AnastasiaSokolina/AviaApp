import { Space, Radio } from 'antd';
import styles from './filters.module.scss'
import './filters.scss'

import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '../../redux/slices/slicesFilters';

export default function Filters() {

    const buttons = useSelector((state) => state.filters)
    const dispatch = useDispatch()
  
    // const handleClick = (id) => {
    //   dispatch(setActive(id)) 
    // }

    return(
        <Space className={ styles.space }>
            <Radio.Group value='position' size='large'
            className={ styles.name }>
                {buttons.map((button) => (
                    <Radio.Button key={button.id} value={button.id} className={ styles.button }
                    onClick={() => dispatch(setActive(button.id))}>{button.text}</Radio.Button>
                ))}
            </Radio.Group>
        </Space>
    )
}