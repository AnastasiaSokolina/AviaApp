import styles from './aviaList.module.scss'
import Loader from '../Loader/loader'
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton'
import AviaCards from '../AviaCards/AviaCards'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors } from '../../redux/selectors/export'
import { fetchSearchID, fetchGetTickets } from '../../redux/slices/slicesTickets'


export default function AviaList() {

    const searchId = useSelector(selectors.searchId)
    const stop = useSelector(selectors.stop)
    const transplants = useSelector(selectors.transplants)
    const tickets = useSelector(selectors.tickets)
    const filters = useSelector(selectors.filters)
    const visibleTickets = useSelector(selectors.visibleTickets)
    const error = useSelector(selectors.error)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSearchID())
    }, [dispatch])

    useEffect(() => {
        if (searchId && !stop) {
            dispatch(fetchGetTickets())
        }
    }, [dispatch, tickets, stop, searchId])

    const filterTickets = (ticketsArray, filtersArray) => {
        const activeFilters = filtersArray.statusCheckboxes.filter((transplant) => transplant.isActive)
        if (activeFilters.length === 4) return ticketsArray
        if (!activeFilters.length) return []
        return activeFilters
            .map((transplant) => 
                ticketsArray.filter((ticket) => {
                    switch (transplant.text) {
                        case 'Без пересадок':
                            return ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0
                        case '1 пересадка':
                            return ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1
                        case '2 пересадка':
                            return ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2  
                        case '3 пересадка':
                            return ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3
                        default:
                            return ticket
                    }
                })
            )
            .flat()
    }

    const sortTickets = (ticketsArray, sortArray) => {
        const activeSort = sortArray.find((item) => item.isActive).id 
        switch (activeSort) {
            case 0:
                return [...tickets].sort((a,b) => {
                    const optimalValueA = a.price * a.segments[0].duration
                    const optimalValueB = b.price * b.segments[0].duration
                    return optimalValueA - optimalValueB
                })
            case 1:
                return [...ticketsArray].sort((a, b) => a.price - b.price)
            case 2:
                return [...ticketsArray].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
            default:
                return ticketsArray
        }
    }

    const sortedTickets = sortTickets(tickets, filters)
    const filteredTickets = filterTickets(sortedTickets, transplants)
    const activeFilters = transplants.statusCheckboxes.filter((transplant) => transplant.isActive) 

    const aviaList = filteredTickets
        .map((ticket) => <AviaCards ticket={ ticket } key ={ ticket.id } />)
        .slice(0, visibleTickets)
 
    return error ? (
        <p className={ styles['error-message'] }>{ error.message }</p>
    ) : (
        <>
        { !stop ? (
            <Loader />
        ) : null }
        { activeFilters.length > 0 ? (
            <div>{ aviaList }</div>
        ) : (
            <p className={ styles['no-message'] }>Рейсов, подходящих под заданные фильтры, не найдено</p>
        )}
        { aviaList.length > 0 ? (
            <ShowMoreButton />
        ) : null }
        </>
    )
}