import { formatearFecha} from '../helpers'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import AhorroIco from '../img/icono_ahorro.svg'
import CasaIco from '../img/icono_casa.svg'
import ComidaIco from '../img/icono_comida.svg'
import GastosIco from '../img/icono_gastos.svg'
import OcioIco from '../img/icono_ocio.svg'
import SaludIco from '../img/icono_salud.svg'
import SuscripcionesIco from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro : AhorroIco,
    comida : ComidaIco,
    casa : CasaIco,
    gastos : GastosIco,
    ocio : OcioIco,
    salud : SaludIco,
    suscripciones : SuscripcionesIco
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const{id, nombre, cantidad, categoria, fecha} = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)}
                         destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
  return (
    <SwipeableList>
        <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        >
                    <div className="gasto sombra">
                        <div className="contenido-gasto">
                            {/* Imagenes */}
                            <img 
                            src={diccionarioIconos[categoria]}
                            alt="icono gasto"
                            />
                            <div className="descripcion-gasto">
                                <p className="categoria">{categoria}</p>
                                <p className="nombre-gasto">{nombre}</p>
                                <p className="fecha-gasto">
                                        Agregado el: {' '}
                                        <span>{formatearFecha(fecha)}</span>

                                </p>
                            </div>
                            
                        </div>
                        <p className='cantidad-gasto'>$ {cantidad}</p>
                    </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto