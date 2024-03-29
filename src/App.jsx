import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import Filtros from './components/Filtro'
import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
// construccion de hooks
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isvalidp, setIsvalidp] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  // funciones

  useEffect (() =>{
    if( Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout( () => {
        setAnimarModal(true);
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  useEffect(() =>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  })

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter ( gasto => gasto.categoria === filtro ); 
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLS > 0){
      setIsvalidp(true)
    }
  },[])
  const handleNuevoGasto = () =>{
    setGastoEditar([]);

    setModal(true);
    setTimeout( () => {
      setAnimarModal(true);
    }, 500)
  }
  const guardarGasto = gasto => {
    if (gasto.id){
      //actualiza
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{
      // nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }    
      setAnimarModal(false)
        setTimeout( () => {
            setModal(false)
          }, 500)

  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
            <div className={modal ? "fijar" : ''}>
                  <Header 
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  isvalidp={isvalidp}
                  setIsvalidp={setIsvalidp}
                  gastos={gastos}
                  setGastos={setGastos}
                  />
            {/** valida presupuesto y genera listado de gastos*/}
                  { isvalidp && (
                    <>  
                      <main>
                        <Filtros 
                          filtro={filtro}
                          setFiltro={setFiltro}
                        />
                        <ListadoGastos 
                        gastos={gastos}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                        filtro={filtro}
                        gastosFiltrados={gastosFiltrados}
                        />
                      </main>
                        <div className='nuevo-gasto'>
                        <img 
                        src={IconoNuevoGasto}
                        alt="Icono Nuevo Gasto"
                        onClick={handleNuevoGasto}
                        />
                      </div>
                    </>
                  )}
             {/** genera formulario de ingreso de gastos */}
                    {modal && <Modal 
                        setModal={setModal} 
                        animarModal={animarModal}
                        setAnimarModal={setAnimarModal}
                        guardarGasto={guardarGasto}
                        gastoEditar={gastoEditar}
                        setGastoEditar={setGastoEditar}
                                />
                    }       

            </div>
  )
}

export default App
