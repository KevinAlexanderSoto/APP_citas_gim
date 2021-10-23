

const validarExisteRol = async (param)=>{
const RolValido = ['ES','EG','AD','TR','no'];
const result = await RolValido.includes(param);
if (!result) {
    throw new Error('Rol no existe')
}
};


const validarDia =  async ( param)=>{
    if (param !== "ñ") {
     
    const DiaValido = ['L','M','MM','J','V','S'];
    const result = await DiaValido.includes(param)
    
    if ( !result) {
        throw new Error('Dia no exiate ,dias validos L, M , MM ,J , V ,S')
    } 
      
    }
    };

    
const validarTipo =  async ( param)=>{
    const TipoValido = ['PRO','TECN','EGRE','TRAB'];
    
    if (!await TipoValido .includes(param)) {
        throw new Error('Tipo no exiate ,Valores validos PRO ,TECN,EGRE,TRAB')
    }
    };
    

module.exports = {
    validarExisteRol,
    validarDia,
    validarTipo
}