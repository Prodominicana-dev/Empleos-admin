import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>




                        <div
                            className="col-12 mt-8 mb-2 p-2 md:p-8"
                            style={{ borderRadius: '20px', background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%)' }}
                        >
                            <div className="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                                <h3 className="text-gray-900 mb-2">Joséphine Miller</h3>
                                <span className="text-gray-600 text-2xl">Peak Interactive</span>
                                <p className="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style={{ maxWidth: '800px' }}>
                                    “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                    laborum.”
                                </p>
                                {/* <img src="/demo/images/landing/peak-logo.svg" className="mt-4" alt="Company logo" /> */}
                            </div>
                        </div>
        {/* <div className={`contenedor ${styles.contenido}`}>
            <nav className={styles.navegacion}>
                <Link href="/">Inicio</Link>
                <Link href="/nosotros">Nosotros</Link>
                <Link href="/blog">Admin</Link>
                
            </nav>

            <p className={styles.copyright}>Todos los derechos reservados</p>
        </div> */}
    </footer>
  )
}

export default Footer