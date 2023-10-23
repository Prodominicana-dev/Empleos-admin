import Layout from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/Nosotros.module.css'
const Nosotros = () => {
  return (
    
    <Layout pagina='Nosotros'>
       
        <main className="contenedor">
            <h2 className="heading">Nosotros</h2>

            <div className={styles.contenido}>

                <Image layout="responsive" width={600} height={410} src="/img/nosotros.jpg" 
                alt="Imagen sobre nosotros"/>

                <div>
                    <p>In hac habitasse platea dictumst. Nulla
                     interdum vestibulum nunc ac pellentesque. 
                     Donec consectetur sodales efficitur. Cras 
                     vitae quam lacinia, lobortis tellus nec, 
                     rhoncus ipsum. Interdum et malesuada fames 
                     ac ante ipsum primis in faucibus. Sed 
                     venenatis laoreet facilisis. Fusce pellentesque 
                     dui et scelerisque aliquet. Donec eu enim eros.</p>
                     <p>In hac habitasse platea dictumst. Nulla
                     interdum vestibulum nunc ac pellentesque. 
                     Donec consectetur sodales efficitur. Cras 
                     vitae quam lacinia, lobortis tellus nec, 
                     rhoncus ipsum. Interdum et malesuada fames 
                     ac ante ipsum primis in faucibus. Sed 
                     venenatis laoreet facilisis. Fusce pellentesque 
                     dui et scelerisque aliquet. Donec eu enim eros.</p>

                </div>
            </div>

        </main>

    </Layout>
        
    )
}

export default Nosotros

