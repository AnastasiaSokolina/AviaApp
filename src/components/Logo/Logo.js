import logo from './Logo.svg'
import styles from './logo.module.scss'

export default function Logo() {
    return (
        <div className={ styles.container }>
            <img src= { logo } alt='logo' 
            className={ styles.logo } />
        </div>
    )
}