import styles from './transplants.module.scss'
import { Checkbox } from 'antd'

import { filtersTransplants } from '../../redux/slices/slicesTransplants'
import { useSelector, useDispatch } from 'react-redux'

export default function Transplants() {

    const dispatch = useDispatch()
    const statusMain = useSelector((state) => state.transplants.statusMain)
    const statusCheckboxes = useSelector((state) => state.transplants.statusCheckboxes)

    const checkboxChange = (transplant) => {
        dispatch(filtersTransplants(transplant)) 
    }

    return (
        <div className={ styles.container }>
            <h5 className={ styles.title }>Количество пересадок</h5>
            <ul className={ styles.list }>
                { statusCheckboxes.map((option) => {
                    const isCheched = statusMain.includes(option.text)
                    return (
                        <li className={ styles.item } key={ option.id } >
                           <label htmlFor={`checkbox-${option.id}`} >
                                <Checkbox id={`checkbox-${option.id}`}
                                 onChange = {() => checkboxChange(option.text)}
                                 checked={ isCheched } />
                                <span className={ styles.name }>{option.text}</span>
                            </label>  
                        </li>    
                    )
                }) }
            </ul>
        </div>
    )
}