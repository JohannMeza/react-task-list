export const validarCampos = (data) => {
  for (let el in data) {
    let {value, pattern, require, message} = data[el];
    let regExp = new RegExp(pattern, 'ig');
    let arrValidaciones = ['', "", [], {}, null, undefined, 0, '0']

    // Validar campos vacios
    if (require && arrValidaciones.includes(value)) return { error: true, message: message || `El campo ${el.substring(0, 1)}${el.substring(1)} es obligatorio` }

    // Validar si viene un pattern al cual validar
    if (pattern && !value.match(regExp)) return { error: true, message: message || `El campo ${el.substring(0, 1)}${el.substring(1)} no cumple con las especificaciones indicadas` }
  } 

  return { error: false }
}