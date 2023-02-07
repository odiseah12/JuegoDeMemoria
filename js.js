let tarjetasDestapadas = 0
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 25;
let tiempoRegresivoId = null;
let timerInicial = 25;
let botones = [];
for (let i = 0; i <= 14; i++) {
  botones[i] = document.getElementById(i.toString());
  botones[i].addEventListener("click", function() {
    var audio = new Audio("./efects/sonido.mp3.mp3");
    audio.play();
  });
}
//libreria


//apuntando a documentos html
let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.52});

let mostraTiempo = document.getElementById("t-restante")
Swal.fire(
    'Presiona el primer cuadro y el juego empezara',
    'Corre que el tiempo Avanza!',
    'success'
  )


function contarTiempo(){

  tiempoRegresivoId =  setInterval(()=>{
        timer--;
        mostraTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        
        if(timer == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Perdiste!'
              })
            var audioFail = new Audio("./efects/fail.mp3");
            audioFail.play();
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas();
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😭😭`;
            mostraTiempo.innerHTML = `Perdiste: ${timerInicial - timer} segundos`;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}😡`;
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15 ; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
        
    }
}
function destapar(id){
     
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
      
        
       

    }

    tarjetasDestapadas++;
    

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        tarjeta1.disabled = true;

        
    }else if( tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            
            tarjetasDestapadas = 0;
            var audio = new Audio("./efects/ok.mp3");
            audio.play();
           
        
            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8 ){
                Swal.fire({
                   
                    title: `Aciertos:${aciertos}😎 
                    👏Genial solo tardaste:${timerInicial - timer}segundos  
                    Movimientos:${movimientos} `,
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  })
                var audioGanador = new Audio("./efects/ganar.mp3");
                audioGanador.play();
                let changeBackground = true;

                
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                mostraTiempo.innerHTML = `Genial solo tardaste: ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}👏`;
               

            }



        }else{
            
            setTimeout(()=> {
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                
                
            }, 600);
            
        }
       
    }

}