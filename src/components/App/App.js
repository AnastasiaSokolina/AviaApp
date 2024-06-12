import Logo from '../Logo/Logo'
import Transplants from '../Transplants/Transplants'
import Filters from '../Filters/Filters'
import AviaList from '../AviaList/AviaList'


import styles from './app.module.scss'



export default function App() {
    return (
        <section className={ styles.section }>
        <Logo />
        <div className={ styles.container }>
            <Transplants />
            <div className={ styles.main }>
                <Filters />
                <AviaList />
                
            </div>    
        </div>
        </section>
    )
}
