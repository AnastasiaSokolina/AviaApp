import styles from './showMoreButton.module.scss'

import { moreTickets } from '../../redux/slices/slicesTickets'
import { useDispatch } from 'react-redux'

export default function ShowMoreButton() {

    const dispatch = useDispatch()

    return(
        <button className={ styles.button } type='button'
        onClick={() => dispatch(moreTickets())}>
            Показать еще пять билетов!
        </button>
    )
}