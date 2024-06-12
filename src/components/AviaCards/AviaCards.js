import styles from './aviaCards.module.scss'
// import logo from './S7 Logo.svg'

const timeFormat = (date) => {
    const newDate = new Date(date)
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()
    return `${ hours < 10 ? `0${ hours }` : hours }:${ minutes < 10 ? `0${ minutes }` : minutes }`
}

const timeMinutes = (min) => {
    const hours = Math.floor(min / 60)
    const minutes = min % 60
    return `${ hours < 10 ? `0${ hours }` : hours }ч ${ minutes < 10 ? `0${ minutes }` : minutes }м`
} 

const timeEnd = (date, min) => {
    const start = new Date(date)
    const end = new Date(start.getTime() + min * 60000)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    return `${ hours < 10 ? `0${ hours }` : hours }:${ minutes < 10 ? `0${ minutes }` : minutes }`
}

const changingWords = (word) => {
    if (word === 0) {
        return 'пересадок'
    }
    if (word === 1) {
        return 'пересадка'
    }
    if (word >= 2 && word <= 4) {
        return 'пересадки'
    }
    return 'пересадок'
    }

export default function AviaCards({ ticket }) {

    if (!ticket || !ticket.segments) return null

    return(
        <div className={ styles.card }>
            <div className={ styles.title }>
                <span className={ styles.price }>{ ticket.price }р</span>
                <img src={ `//pics.avs.io/99/36/${ticket.carrier}.png` } alt="airline logo" className={ styles.img }/>
            </div>
            { ticket.segments.map((segment, i) => (
                <div key={ `${ ticket.carrier }-${ segment.origin }-${ segment.destination }-${ segment.date }-${ i }` } 
                className={ styles.plane }>
                    <div className={ styles.first }>
                        <span className={ styles.gray }>{ segment.origin } - { segment.destination }</span>
                        <span className={ styles.black }>{ timeFormat(new Date(segment.date))} - { timeEnd(new Date(segment.date), segment.duration) }</span>
                    </div>  
                    <div className={ styles.way }> 
                        <span className={ styles.gray }>в пути</span>
                        <span className={ styles.black }>{ timeMinutes(segment.duration) }</span>
                    </div>   
                    <div className={ styles.transplant }>
                        <span className={ styles.gray }>{ segment.stops.length } { changingWords(segment.stops.length) }</span>
                        <span className={ `${styles.black} ${ styles.uppercase }` }>{ segment.stops.length === 0 ? 'Без пересадок' : segment.stops.join(', ')}</span>
                    </div>        
                </div>    

            ))}
        </div>        
    )
}