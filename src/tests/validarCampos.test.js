import { validarCampos } from "../utils/validarCampos";

describe('Validar los campos de entrada', () => {
  describe('validarCampos', () => {
    test('Debe retornar true si envio un campo vacio con una propiedad require', () => {
      const result = validarCampos({
        titulo: { value: 'Titulo Nuevo', require: true},
        descripcion: { value: '', require: true}
      })
      expect(result.error).toBeTruthy()
    })

    test('Debe retornar true al enviar un pattern y que no cumpla con el valor de la propiedad', () => {
      const result = validarCampos({
        titulo: { value: 'Titulo Nuevo', require: true, pattern: /^\d*$/},
        descripcion: { value: 'Descripcion', require: true}
      })

      expect(result.error).toBeTruthy()
    })

    test('Debe retornar false si la validacion fue exitosa', () => {
      const result = validarCampos({
        titulo: { value: '123456789', require: true, pattern: /^\d*$/},
        descripcion: { value: 'Descripcion de la Tarea nueva', require: true}
      })

      expect(result.error).toBeFalsy()
    })
  })
})