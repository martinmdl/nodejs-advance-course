const request = require("supertest");
const app = require('../app');

// defino grupo de pruebas a realizar en este archivo

// nombre prueba = "Ruta inicial"
describe('Ruta inicial', () => {

    // test -> crear prueba
    test('debe devolver una respuesta por GET', (done) => {
        // EVALUACION DE RESPUESTA
        // si llamamos por GET -> respuesta 200 (postiva)
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done(); // callback para cerrar prueba y continuar
        });
    });

    test('no debe devolver una respuesta por POST', (done) => {
        // EVALUACION DE RESPUESTA
        // si llamamos por POST -> respuesta 404 (negativa) (= !200, redundante)
        //                      -> respuesta !202 (negativa) (= 404, redundante)
        request(app).post('/').then((response) => {
            expect(response.statusCode).toBe(404);
            expect(response.statusCode).not.toBe(200);
            done(); 
        });
    });

    test('debe mostrar Bienvenido', (done) => {
        // EVALUACION DE CONTENIDO
        request(app).get('/').then((response) => {
            expect(response.text).toMatch(/Bienvenido/)
            done();
        });
    });

})