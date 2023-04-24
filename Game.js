class Game {
    constructor () {

        //? Agregamos el fondo:
        this.background = new Image();
        this.background.src = "imagenes/fondo-nivel1.jpg"

        //? Agregamos el personaje principal:
        this.danteObj = new Dante();
        console.log(this.danteObj)


        //? Añadimos los pinchos y corazones:
        this.pinchosArr = [];
        this.corazonesArr = [];
        this.puntos = 0;

        this.isGameOn = true;

    }


    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
      };
    
    gameOver = () => {
        // 1- detener el juego 
        this.isGameOn = false;
        primerNivel.classList.add("hide")
        gameOver.classList.remove("hide")
      };
    
    pinchosEnPantalla = () => {
        if (this.pinchosArr.length === 0 || this.pinchosArr[this.pinchosArr.length - 1].x < canvas.width) {
            let posicionRandomPincho = Math.random() * 300 + canvas.width + 200;
            let nuevoPincho = new Pincho(565, posicionRandomPincho);
            this.pinchosArr.push(nuevoPincho)
        }
      };
      
    corazonesEnPantalla = () => {
        if (this.corazonesArr.length === 0 || this.corazonesArr[this.corazonesArr.length - 1].x < canvas.width) {
          let posicionRandomCorazon = Math.random() * 300 + canvas.width + 400;
          let nuevoCorazon = new Corazon(505, posicionRandomCorazon);
          this.corazonesArr.push(nuevoCorazon);
        }
      };

    colisionDantePincho = () => {
      this.pinchosArr.forEach((eachPincho) => {
        if (eachPincho.x < this.danteObj.x + this.danteObj.w &&
          eachPincho.x + eachPincho.w > this.danteObj.x &&
          eachPincho.y < this.danteObj.y + this.danteObj.h &&
          eachPincho.h + eachPincho.y > this.danteObj.y) {
            //console.log("dante se pinchó")
            this.gameOver()
          }
      })
      };  
    
    colisionDanteCorazon = () => {
      this.corazonesArr.forEach((eachCorazon, index) => {
        if (eachCorazon.x < this.danteObj.x + this.danteObj.w &&
          eachCorazon.x + eachCorazon.w > this.danteObj.x &&
          eachCorazon.y < this.danteObj.y + this.danteObj.h &&
          eachCorazon.h + eachCorazon.y > this.danteObj.y) {
            this.puntos++
            this.corazonesArr.splice(index, 1)
          }
      })
    }  
    
    dibujadoPuntuacion = () => {
      ctx.font = "26px Comic Sans MS"
      ctx.fillStyle = "pink"
      ctx.fillText(`Puntos: ${this.puntos}`, 430, 50)
    }

      gameLoop = () => {
        console.log("ejecutando recursion")

        //? Limpieza del canvas


        //? Acciones y movimientos de los elementos
        this.pinchosEnPantalla()
        this.colisionDantePincho()
        this.colisionDanteCorazon()
        this.danteObj.logicaSalto()
        this.pinchosArr.forEach((eachPincho) => {
            eachPincho.pinchosSeMueven()
        })
        this.corazonesArr.forEach((eachCorazon) => {
          eachCorazon.corazonesSeMueven();
        })

        this.corazonesEnPantalla()
        

        //? Dibujado de los elementos
        this.drawBackground()
        this.danteObj.draw()
        this.pinchosArr.forEach((eachPincho) => {
            eachPincho.draw()
        })
        this.corazonesArr.forEach((eachCorazon) => {
          eachCorazon.draw()
        })

        this.dibujadoPuntuacion()
        

        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop)
        }

      }


}