import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"



const Header = ({
    presupuesto,
    setPresupuesto,
    isvalidp,
    setIsvalidp,
    gastos,
    setGastos

}) => {


  return (

    <header>

        <h1>Planificador de Gastos</h1>

        { isvalidp ? (
            <ControlPresupuesto 
            gastos={gastos}
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsvalidp={setIsvalidp}
            />

        ) : (

        <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsvalidp={setIsvalidp}
        />

        )}
      
    </header>
  )
}

export default Header