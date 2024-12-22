function simulatePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;  // Puedes cambiar esto para simular un error

            if (success) {
                resolve(2);  // Si la promesa se resuelve
            } else {
                reject("Hubo un error al resolver la promesa.");  // Si la promesa es rechazada
            }
        }, 2000);  // 2 segundos de retraso
    });
}

class Rectangulo {
    constructor(alto, ancho) {
      this.alto = alto;
      this.ancho = ancho;
      this.init();
    }

    async init(){
        try {
            console.log("paso por init")
            const result = await simulatePromise();  // Espera la resolución de la promesa
            this.alto = this.alto + result;
        } catch (error) {
            console.error(error);  // Si la promesa es rechazada, se maneja el error
        }
    }

    async getAlto(){
        if (this.alto === 10) {
            console.log("no a actualizado")
            await this.init
        }
        console.log("alto: " + this.alto); 
    }
  }

const cuadrado = new Rectangulo(10, 10);
cuadrado.getAlto()