class Game {
    constructor () {

        //? Agregamos el fondo:
        this.background = new Image();
        this.background.src = "imagenes/fondo-nivel1.jpg"

        //? Agregamos el personaje principal:
        this.danteObj = new Dante();
        console.log(this.danteObj)


        //? Añadimos los pinchos:
        this.pinchosArr = [];

        this.isGameOn = true;

    }


    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
      };
    
    gameOver = () => {
        // 1- detener el juego 
        this.isGameOn = false;
        primerNivel.classList.add("hide")
        this.gameOver.classList.remove("hide")
      }
    
    pinchosEnPantalla = () => {
        if (this.pinchosArr.length === 0 || this.pinchosArr[this.pinchosArr.length - 1].x < this.danteObj.x) {
            let posicionRandom = Math.random() * 300 + canvas.width;
            let nuevoPincho = new Pincho(this.danteObj.y -5, posicionRandom);
            this.pinchosArr.push(nuevoPincho)
        }
    }  

      gameLoop = () => {
        console.log("ejecutando recursion")

        //? Limpieza del canvas


        //? Acciones y movimientos de los elementos
        this.pinchosEnPantalla()
        this.danteObj.logicaSalto()

        //? Dibujado de los elementos
        this.drawBackground()
        this.danteObj.draw()
        this.pinchosArr.forEach((eachPincho) => {
            eachPincho.draw()
        })


        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop)
        }

      }


}