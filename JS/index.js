    // SIMUALCION DE MUNDIAL
    //    CREATE CLASS
  class Equipo{
      constructor(pais,grupo,puntos){
          this.pais = pais;
          this.grupo = grupo;
          this.partidos = [];
          this.puntos = puntos;
      }
  }

    // CREATE GROUPS AND TEAM
  function crearMunidal(){
      let paises = ["Qatar","Ecuador","Senegal","Netherlands","England","Iran","USA","Wales","Argentina","Saudi Arabia","Mexico","Poland","France",
                  "Australia","Denmark","Tunisia","Spain","Costa Rica","Germany","Japan","Belgium","Canada","Morocco","Croatia","Brazil","Serbia","Switzerland",
                  "Cameroon","Portugal","Ghana","Uruguay","Korea Republic" ];
      let abecedario = ['A','B','C','D','E','F','G','H'];
      let mundial = [];

      for (let index = 0; index < paises.length; index++) {
          if(index < 4){
              let pais = new Equipo(paises[index],abecedario[0],0)
              mundial.push(pais);
          }
          else if (index < 8){
              let pais = new Equipo(paises[index],abecedario[1],0)
              mundial.push(pais);
          }
          else if(index < 12){
              let pais = new Equipo(paises[index],abecedario[2],0)
              mundial.push(pais);
          }
          else if(index < 16){
              let pais = new Equipo(paises[index],abecedario[3],0)
              mundial.push(pais);
          }
          else if(index < 20){
              let pais = new Equipo(paises[index],abecedario[4],0)
              mundial.push(pais);
          }
          else if(index < 24){
              let pais = new Equipo(paises[index],abecedario[5],0)
              mundial.push(pais);
          }
          else if(index < 28){
              let pais = new Equipo(paises[index],abecedario[6],0)
              mundial.push(pais);
          }
          else{
              let pais = new Equipo(paises[index],abecedario[7],0)
              mundial.push(pais);
          }

     }
     return mundial;
  }

    // SIMULATE MATCH

  function simularPartidoGrupo(pais1,pais2){
      let resultadoEquipo1 = Math.floor(Math.random() * 6);
      let resultadoEquipo2 = Math.floor(Math.random() * 6);
      if(pais1.pais == "Argentina"){
          resultadoEquipo1 +=2;
      }
      else if(pais2.pais == "Argentina"){
            resultadoEquipo2 += 2;
      }
      if (resultadoEquipo1 > resultadoEquipo2){
          pais1.puntos +=3;
      }
      else if(resultadoEquipo1 < resultadoEquipo2){
          pais2.puntos += 3;
      }
      else{
          pais1.puntos +=1;
          pais2.puntos +=1;
      }
      let resultado = `${pais1.pais} ${resultadoEquipo1} - ${resultadoEquipo2} ${pais2.pais}`;
      return resultado;
  }
  function simularPartidoMuerte(pais1,pais2,fase){
    let resultadoEquipo1 = Math.floor(Math.random() * 6);
    let resultadoEquipo2 = Math.floor(Math.random() * 6);
    if(pais1.pais == "Argentina"){
        resultadoEquipo1 +=2;
    }
    else if(pais2.pais == "Argentina"){
          resultadoEquipo2 += 2;
    }
    let resultado ="";
    let n =0;
    if(fase=="oct"){
        n = 10;
    }
    else if(fase=="cuart"){
        n = 20;
    }
    else if(fase == "sem"){
        n = 35;
    }
    else if(fase == "fin"){
        n = 50;
    }
    if (resultadoEquipo1 > resultadoEquipo2){
        pais1.puntos += n;
        resultado = `${pais1.pais} ${resultadoEquipo1} - ${resultadoEquipo2} ${pais2.pais}`;
    }
    else if(resultadoEquipo1 < resultadoEquipo2){
        pais2.puntos += n;
        resultado = `${pais1.pais} ${resultadoEquipo1} - ${resultadoEquipo2} ${pais2.pais}`;

    }
    else{
        let penal1 = Math.floor(Math.random() * 8);
        let penal2 = Math.floor(Math.random() * 8);
        while(penal1==penal2){
            penal1 = Math.floor(Math.random() * 8);
            penal2 = Math.floor(Math.random() * 8);
        }
        if (penal1 > penal2){
            pais1.puntos +=n;
        }
        else if(penal1 < penal2){
            pais2.puntos += n;
        }
        resultado = `${pais1.pais} ${resultadoEquipo1}(${penal1}) - ${resultadoEquipo2}(${penal2}) ${pais2.pais}`;
        
    }
    return resultado;
}

    // SIMULADOR FASE DE GRUPOS CON FUNCION SIMULATE MATCH
  function simularFaseGrupos(mundial){
      for (let i = 0; i < mundial.length; i= i+4) {
            let partido1,partido2,partido3,partido4,partido5,partido6;
            // EQUIPO 1
            partido1 = simularPartidoGrupo(mundial[i],mundial[i+1]);
            partido2 = simularPartidoGrupo(mundial[i],mundial[i+2]);
            partido3 = simularPartidoGrupo(mundial[i],mundial[i+3]);
            mundial[i].partidos.push(partido1,partido2,partido3);            
            // EQUIPO 2
            partido4 = simularPartidoGrupo(mundial[i+1],mundial[i+2]);
            partido5 = simularPartidoGrupo(mundial[i+1],mundial[i+3]);
            mundial[i+1].partidos.push(partido1,partido4,partido5);
            // EQUIPO 3
            partido6 = simularPartidoGrupo(mundial[i+2],mundial[i+3]);
            mundial[i+1].partidos.push(partido2,partido4,partido6);
            // EQUIPO 4
            mundial[i+2].partidos.push(partido3,partido5,partido6); 
       
                     
      } 
      mundial.sort(ordenar_grupo);
     
    //   CREE LA TABLA DE POSICIONES
      let crearTabla = function(lista){
          let stringTabla = "<tr><th>Pais</th><th>Grupo</th><th>Puntos</th></tr>"
          for(let equipo of lista){
              let fila = "<tr> <td >";
              fila += equipo.pais;
              fila += "</td>";
              fila += `<td class="${equipo.grupo}">`;
              fila += equipo.grupo;
              fila += "</td>";
              fila += "<td>";
              fila += equipo.puntos;
              fila += "</td>";
              fila += "</tr>";
              stringTabla += fila;
          }
          return stringTabla;
      };
    // BORRAR LOS BOTONES Y EL TITULO
    let borrar = document.getElementById("contenedor");
    borrar.style.display = "none";
    document.getElementById("svg").style.display ="none";    
    // CREO LA TABLA 
    document.getElementById("tablaGrupo").innerHTML = crearTabla(mundial);
    let boton = document.createElement("input");
    boton.type = "button";
    boton.id = "boton";
    boton.value="Siguiente ronda";
    document.body.append(boton);

    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>octavos(mundial));
    
  }
function ordenar_grupo(a,b){
    if( ( a.puntos < b.puntos )&&(a.grupo==b.grupo)){
        return 1;
      }
      if (( a.puntos > b.puntos )&&(a.grupo==b.grupo)){
        return -1;
      }
      return 0;
    }


function octavos(mundial){
    mundial.sort(ordenar_grupo);    
    let oct = [0,0,0,0,0,0,0,0];
//    NOSE COMO HACERLO AUTOMATICO
// OCTAVOS
    oct[0] = simularPartidoMuerte(mundial[0],mundial[5],"oct");
    mundial[0].partidos.push(oct[0]);
    mundial[5].partidos.push(oct[0])

    oct[1] = simularPartidoMuerte(mundial[1],mundial[4],"oct");
    mundial[1].partidos.push(oct[1]);
    mundial[4].partidos.push(oct[1]);

    oct[2] = simularPartidoMuerte(mundial[8],mundial[13],"oct");
    mundial[8].partidos.push(oct[2]);
    mundial[13].partidos.push(oct[2]);

    oct[3] = simularPartidoMuerte(mundial[9],mundial[12],"oct");
    mundial[9].partidos.push(oct[3]);
    mundial[12].partidos.push(oct[3]);

    oct[4] = simularPartidoMuerte(mundial[16],mundial[21],"oct");
    mundial[16].partidos.push(oct[4]);
    mundial[21].partidos.push(oct[4]);

    oct[5] = simularPartidoMuerte(mundial[17],mundial[20],"oct");
    mundial[17].partidos.push(oct[5]);
    mundial[20].partidos.push(oct[5]);

    oct[6] = simularPartidoMuerte(mundial[24],mundial[29],"oct");
    mundial[24].partidos.push(oct[6]);
    mundial[29].partidos.push(oct[6]);

    oct[7] = simularPartidoMuerte(mundial[25],mundial[28],"oct");
    mundial[25].partidos.push(oct[7]);
    mundial[28].partidos.push(oct[7]);
    
    document.getElementById("tablaGrupo").innerHTML="";
    let titulo =document.createElement("h3");
    titulo.innerHTML = "Octavos de final";
    document.getElementById("faseMuerte").append(titulo);
    for (const partido of oct) {
        let texto = document.createElement("p");
        texto.innerHTML = partido;
        document.getElementById("faseMuerte").append(texto);
    }
    mundial.sort(ordenar_subita);
    let finales = mundial.slice(0,8);
    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>cuartos(finales));
}
    // CUARTOS
    function ordenar_subita(a,b){
        if(  a.puntos < b.puntos ){
            return 1;
          }
          if ( a.puntos > b.puntos ){
            return -1;
          }
          return 0;
        }
    
function cuartos(mundial){

    let cuarto = [0,0,0,0]
    
    cuarto[0] = simularPartidoMuerte(mundial[0],mundial[1],"cuart");
    mundial[0].partidos.push(cuarto[0]);
    mundial[1].partidos.push(cuarto[0]);


    cuarto[1] = simularPartidoMuerte(mundial[2],mundial[3],"cuart");
    mundial[2].partidos.push(cuarto[1]);
    mundial[3].partidos.push(cuarto[1]);

    cuarto[2] = simularPartidoMuerte(mundial[4],mundial[5],"cuart");
    mundial[4].partidos.push(cuarto[2]);
    mundial[5].partidos.push(cuarto[2]);

    cuarto[3]= simularPartidoMuerte(mundial[6],mundial[7],"cuart");
    mundial[6].partidos.push(cuarto[3]);
    mundial[7].partidos.push(cuarto[3]);
   
    let borrar = document.getElementById("faseMuerte");
    borrar.innerHTML="";
    let titulo =document.createElement("h3");
    titulo.innerHTML = "Cuartos de final";
    document.getElementById("faseMuerte").append(titulo);
    for (const partido of cuarto) {
        let texto = document.createElement("p");
        texto.innerHTML = partido;
        document.getElementById("faseMuerte").append(texto);
    }
    mundial.sort(ordenar_subita);
    let finales = mundial.slice(0,4);
    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>semifinal(finales));


}
    
function semifinal(mundial){
    mundial.sort(ordenar_subita);
   
    let semi = [0,0];
    semi[0]= simularPartidoMuerte(mundial[0],mundial[1],"sem");
    mundial[0].partidos.push(semi[0]);
    mundial[1].partidos.push(semi[0]);
    semi[1]= simularPartidoMuerte(mundial[2],mundial[3],"sem");
    mundial[2].partidos.push(semi[1]);
    mundial[3].partidos.push(semi[1]);
    
    let borrar = document.getElementById("faseMuerte");
    borrar.innerHTML="";
    let titulo =document.createElement("h3");
    titulo.innerHTML = "Semifinal";
    document.getElementById("faseMuerte").append(titulo);
    for (const partido of semi) {
        let texto = document.createElement("p");
        texto.innerHTML = partido;
        document.getElementById("faseMuerte").append(texto);
    }
    mundial.sort(ordenar_subita);
    let finales = mundial.slice(0,2);
    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>final(finales));
}

function final(mundial){
    let ganador = simularPartidoMuerte(mundial[0],mundial[1],"fin");
    mundial[0].partidos.push(ganador);
    mundial[1].partidos.push(ganador);

    let borrar = document.getElementById("faseMuerte");
    borrar.innerHTML="";
    let titulo =document.createElement("h3");
    titulo.innerHTML = "Final del Mundo.";
    document.getElementById("faseMuerte").append(titulo);
    let texto = document.createElement("p");
    texto.innerHTML = ganador;
    document.getElementById("faseMuerte").append(texto);
    document.getElementById("boton").value="Volver al menu";
    
    mundial.sort(ordenar_subita);
    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>restaurar());


    
}

function restaurar(){
    let rest = document.getElementById("faseMuerte");
    rest.innerHTML="";
    let borrar = document.getElementById("contenedor");
    borrar.style.display = "block";
    document.getElementById("svg").style.display ="block";
    let simulado = document.getElementById("boton");
    simulado.remove();
    let tabla = document.getElementById("tablaGrupo");
    tabla.innerHTML="";



}

let crearTabla = function(lista){
    let stringTabla = "<tr><th>Pais</th><th>Grupo</th><th>Puntos</th></tr>"
    for(let equipo of lista){
        let fila = "<tr> <td>";
        fila += equipo.pais;
        fila += "</td>";
        fila += "<td>";
        fila += equipo.grupo;
        fila += "</td>";
        fila += "<td>";
        fila += equipo.puntos;
        fila += "</td>";
        fila += "</tr>";
        stringTabla += fila;
    }
    return stringTabla;
};

function simulacion(){
    let mundial = crearMunidal();
    simularFaseGrupos(mundial);

}
let simulado = document.getElementById("simulacion");
simulado.addEventListener("click",()=>simulacion());


// ***************
// PARTIDOS DEL MUNDIAL OFICIAL 

class Seleccion{
    constructor(pais){
        this.pais = pais;
        this.partidos= [];
    }
}

function crearEvento(){
    let paises = ["Qatar","Ecuador","Senegal","Holanda","Inglaterra","Iran","USA","Wales","Argentina","Arabia Saudita","Mexico","Polonia","Francia",
                  "Australia","Dinamarca","Tunisia","España","Costa Rica","Alemania","Japon","Belgica","Canada","Marruecos","Croacia","Brasil","Serbia","Suiza",
                  "Cameron","Portugal","Ghana","Uruguay","Corea del sur","Octavos","Cuartos","Semifinal","Final" ];
    
    let selecciones=[];
    for (const pais of paises) {
        let seleccion = new Seleccion(pais)
        selecciones.push(seleccion);
    }
    // GRUPO A
    selecciones[0].partidos = ["el 20 de Noviembre  <span>Perdio 2 a 0</span> VS Ecuador","25 de Noviembre <span>Perdio 3 a 1</span> VS Senegal","29 de Noviembre <span>Perdio 2 a 0</span> VS Holanda"];
    selecciones[1].partidos = ["el 20 de Noviembre  <span>Gano 2 a 0</span> VS Qatar", "25 de Noviembre <span>Igualo 1 a 1</span> VS Holanda","29 de Noviembre <span>Perdio 2 a 1</span> VS Senegal"];
    selecciones[2].partidos = ["21 de Noviembre  <span>Perdio 2 a 0</span> VS a Holanda","25 de Noviembre <span>Gano 3 a 1</span> VS Qatar","29 de Noviembre <span>Gano 2 a 1</span> VS Ecuador"," ","<span>Octavos de final</span>","4 de Diciembre <span>Perdio 3 a 0</span> vs Inglaterra"];
    selecciones[3].partidos = ["21 de Noviembre  <span>Gano 2 a 0</span> a Senegal","25 de Noviembre <span>Igualo 1 a 1</span> VS Holanda","29 de Noviembre <span>Gano 2 a 0</span> VS Qatar"," ","<span>Octavos de final</span>","3 de Diciembre <span>Gano 3 a 1</span> vs Estados unidos"," ","<span>Cuartos de final</span>","9 de Diciembre - 16:00 hs vs Argentina"];

    // GRUPO B

    selecciones[4].partidos = ["21 de Noviembre  <span>Gano 6 a 2</span> VS Iran", "25 de Noviembre <span>Igualo 0 a 0</span> VS a Estados Unidos","29 de Novimebre <span>Gano 3 a 0</span> VS a Wales"," ","<span>Octavos de final</span>","4 de Diciembre <span>Gano 3 a 0</span> vs Senegal"," ","<span>Cuartos de final</span>","10 de Diciembre - 16:00 hs vs Francia"];
    selecciones[5].partidos = ["21 de Noviembre  <span>Perdio 6 a 2</span> VS Inglaterra","25 de Noviembre <span>Gano 2 a 0</span>  VS Wales.","29 de Noviembre <span>Perdio 1 a 0</span> VS Estados Unidos"];
    selecciones[6].partidos = ["21 de Noviembre  <span>Igualo 1 a 1</span> VS Wales","25 de Noviembre <span>Igualo 0 a 0</span> VS a Inglaterra","29 de Noviembre <span>Gano 1 a 0</span> VS Iran"," ","<span>Octavos de final</span>","3 de Diciembre <span>Perdio 3 a 1</span> vs Paises Bajos"];
    selecciones[7].partidos = ["21 de Noviembre  <span>Igualo 1 a 1</span> VS Estados Unidos","25 de Noviembre <span>Perdio 2 a 0</span> VS Iran","29 de Novimebre <span>Perdio 3 a 0</span> VS a Inglaterra"];

    // GRUPO C
    selecciones[8].partidos = ["22 de Noviembre <span>Perdio 2 a 1</span> VS Arabia Saudita","26 de Noviembre <span>Gano 2 a 0</span> hs VS Mexico","30 de Noviembre <span>Gano 2 a 0</span> VS Polonia"," ","<span>Octavos de final</span>","3 de Diciembre <span>Gano 2 a 1</span> vs Australia"," ","<span>Cuartos de final</span>","9 de Diciembre - 16:00 hs vs Holanda"];
    selecciones[9].partidos = ["22 de Noviembre <span>Gano 2 a 1</span> VS Argentina","26 de Noviembre <span>Perdio 2 a 0</span> hs VS Polonia ","30 de Noviembre <span>Perdio 2 a 1</span> VS a Mexico"];
    selecciones[10].partidos = ["22 de Noviembre <span>Igualo 0 a 0</span> VS Polonia","26 de Noviembre <span>Perdio 2 a 0</span> hs VS Argentina","30 de Noviembre <span>Gano 2 a 1</span> a Arabia Saudita"];
    selecciones[11].partidos = ["22 de Noviembre <span>Igualo 0 a 0</span> VS Mexico","26 de Noviembre <span>Gano 2 a 0</span> VS Arabia Saudita","30 de Noviembre <span>Perdio 2 a 0</span> VS Argentina"," ","<span>Octavos de final</span>","4 de Diciembre <span>Perdio 3 a 1</span> vs Francia"];

    // GRUPO D
    selecciones[12].partidos = ["22 de Noviembre <span>Gano 4 a 1</span> VS Australia","26 de Noviembre <span>Gano 2 a 1</span> VS Dinamarca","30 de Noviembre <span>Perdio 1 a 0</span> VS Tunisia"," ","<span>Octavos de final</span>","4 de Diciembre <span>Gano 3 a 1</span> vs Polonia"," ","<span>Cuartos de final</span>","10 de Diciembre - 12:00 hs vs Inglaterra"];
    selecciones[13].partidos = ["22 de Noviembre -<span>Perdio 4 a 1</span> VS Francia","26 de Noviembre <span>Gano 1 a 0</span> VS Tunisia","30 de Noviembre <span>Gano 1 a 0</span> VS Dinamarca"];
    selecciones[14].partidos = ["22 de Noviembre <span>Igualo 0 a 0</span> VS Tunisia","26 de Noviembre <span>Perdio 2 a 1</span> VS Francia","30 de Noviembre <span>Perdio 1 a 0</span> VS Australia"," ","<span>Octavos de final</span>","3 de Diciembre <span>Perdio 2 a 1</span> vs Argentina"];
    selecciones[15].partidos = ["22 de Noviembre <span>Igualo 0 a 0</span> VS Dinamarca", "26 de Noviembre <span>Perdio 1 a 0</span> VS Australia","30 de Noviembre <span>Gano 1 a 0</span> VS Francia"];
    
    // GRUPO E
    selecciones[16].partidos = ["23 de Noviembre <span>Gano 7 a 0</span> VS Costa Rica","27 de Noviembre <span>Igualo 1 a 1</span> hs VS Alemania","1 de Diciembre <span>Perdio 2 a 1</span> VS Japon"," ","<span>Octavos de final</span>","6 de Diciembre - 12:00 hs vs Marruecos"];
    selecciones[17].partidos = ["23 de Noviembre <span>Perdio 7 a 0</span> VS España","27 de Noviembre <span>Gano 1 a 0</span> VS Japon","1 de Diciembre <span>Perdio 4 a 2</span> VS Alemania"];
    selecciones[18].partidos = ["23 de Noviembre <span>Perdio 2 a 1</span> VS Japon","27 de Noviembre <span>Igualo 1 a 1</span> VS España","1 de Diciembre <span>Gano 4 a 2</span> VS Costa Rica"];
    selecciones[19].partidos = ["23 de Noviembre <span>Gano 2 a 1</span> VS Alemania","27 de Noviembre <span>Perdio 1 a 0</span> VS Costa Rica","1 de Diciembre <span>Gano 2 a 1</span> VS España" ," ","<span>Octavos de final</span>","5 de Diciembre <span>Perdio 1(1) a 1(3)</span> vs Croacia"];

    // GRUPO F
    selecciones[20].partidos = ["23 de Noviembre <span>Gano 1 a 0</span> hs VS Canada","27 de Noviembre <span>Perdio 2 a 0</span> hs VS Marruecos","1 de Diciembre <span>Igualo 0 a 0</span> VS Crocia"];
    selecciones[21].partidos = ["23 de Noviembre <span>Perdio 1 a 0</span> VS Belgica","27 de Noviembre <span>Perdio 4 a 1</span> VS Croacia","1 de Diciembre <span>Perdio 2 a 1</span> VS Marruecos"];
    selecciones[22].partidos = ["23 de Noviembre <span>Igualo 0 a 0</span> VS Croacia","27 de Noviembre <span>Gano 2 a 0</span> VS Belgica","1 de Diciembre <span>Gano 2 a 1</span> VS Canada" ," ","<span>Octavos de final</span>","6 de Diciembre - 12:00 hs vs España"];
    selecciones[23].partidos = ["23 de Noviembre <span>Igualo 0 a 0</span> VS Marruecos","27 de Noviembre <span>Gano 4 a 1</span> VS Canada","1 de Diciembre <span>Igualo 0 a 0</span> VS Belgica" ," ","<span>Octavos de final</span>","5 de Diciembre <span>Gano 1(3) a 1(1)</span> vs Japon"," ","<span>Cuartos de final</span>","9 de Diciembre - 12:00 hs vs Brasil"]

    // GRUPO G
    selecciones[24].partidos = ["24 de Noviembre <span>Gano 2 a 0</span> VS Serbia","28 de Noviembre - 13:00 hs VS Suiza","2 de Diciembre <span>Perdio 1 a 0</span> VS Camerun"," ","<span>Octavos de final</span>","5 de Diciembre <span>Gano 4 a 1</span> vs Corea del Sur"," ","<span>Octavos de final</span>","9 de Diciembre - 12:00 hs vs Croacia"];
    selecciones[25].partidos = ["24 de Noviembre <span>Perdio 2 a 0</span> VS Brasil","28 de Noviembre <span>Igualo 3 a 3</span> VS Camerun","2 de Diciembre <span>Perdio 3 a 2</span> VS Suiza"];
    selecciones[26].partidos = ["24 de Noviembre <span>Gano 1 a 0</span> VS Camerun","28 de Noviembre - 13:00 hs VS Brasil","2 de Diciembre <span>Gano 3 a 2</span> VS Serbia"," ","<span>Octavos de final</span>","6 de Diciembre - 16:00 hs vs Portugal"];
    selecciones[27].partidos = ["24 de Noviembre <span>Perdio 0 a 0</span> VS Suiza","28 de Noviembre <span>Igualo 3 a 3</span> VS Serbia","2 de Diciembre <span>Gano 1 a 0</span> VS Brasil"];

    // GRUPO H 
    selecciones[28].partidos = ["24 de Noviembre <span>Gano 3 a 2</span> VS Ghana","28 de Noviembre - 16:00 hs VS Uruguay", "2 de Diciembre <span>Perdio 2 a 1</span> VS Corea del sur"]," ","<span>Octavos de final</span>","6 de Diciembre - 16:00 hs vs Suiza";
    selecciones[29].partidos = ["24 de Noviembre <span>Perdio 3 a 2</span> VS Portugal", "28 de Noviembre - 10:00 hs VS Corea del sur","2 de Diciembre <span>Perdio 2 a 0</span> VS Uruguay"];
    selecciones[30].partidos = ["24 de Noviembre <span>Igualo 0 a 0</span> VS Corea del Sur","28 de Noviembre - 16:00 hs VS Portugal", "2 de Diciembre <span>Gano 2 a 0</span> hs VS Ghana"];
    selecciones[31].partidos = ["24 de Noviembre <span>Igualo 0 a 0</span> VS Uruguay","28 de Noviembre - 10:00 hs VS Ghana","2 de Diciembre <span>Gano 2 a 1</span> VS Portugal"," ","<span>Octavos de final</span>","5 de Diciembre <span>Perdio 4 a 1</span> vs Brasil"];

    // FASE ELIMINATORIA
    selecciones[32].partidos = ["3 de Diciembre <span>Holanda 3 - 1 Estados Unidos</span>","3 de Diciembre <span>Argentina 2 - 1 Australia</span>","4 de Diciembre <span>Francia 3 - 1 Polonia</span>","4 de Diciembre <span>Inglaterra 3 - 0 Senegal</span>","5 de Diciembre <span>Cracia 1(3) - 1(1) Japon</span>","5 de Diciembre <span>Brasil 4 - 1 Corea del sur</span>","6 de Diciembre - 12:00 hs <span>España vs Marruecos</span>","6 de Diciembre - 16:00 hs <span>Portugual vs Suiza</span>"];
    selecciones[33].partidos = ["9 de Diciembre - 12:00 hs <span>Croacia vs Brasil</span>","9 de Diciembre - 16:00 hs <span>Argentina vs Holanda</span>","10 de Diciembre - 12:00 hs ","10 de Diciembre - 16:00 hs <span>Francia vs Inglaterra</span>"];
    selecciones[34].partidos =["13 de Diciembre - 16:00 hs","14 de Diciembre - 16:00 hs"];
    selecciones[35].partidos = ["18 de Diciembre - 12:00 hs"];
    return selecciones;
}

function busqueda(selecciones,equipo){
    let encontrado;
    let flag = false;
    for (const seleccion of selecciones) {
        if(equipo == seleccion.pais.toLowerCase()){
            let borrar = document.getElementById("contenedor");
            borrar.style.display = "none";
            document.getElementById("svg").style.display ="none";   
            let titulo =document.createElement("h3");
            titulo.innerHTML = seleccion.pais;
            titulo.style.marginBottom="4%"
            document.getElementById("faseMuerte").append(titulo); 
            let boton = document.createElement("input");
            boton.type = "button";
            boton.id = "boton";
            boton.value="Volver al menu";
            document.body.append(boton);
            let simulado = document.getElementById("boton");
            simulado.addEventListener("click",()=>restaurar());
            encontrado = seleccion;
            flag = true;
        }
    }
    if(!flag){
        Swal.fire({
            title: 'Error!',
            text: 'No se encontro ningun pais',
            icon: 'warning',
            confirmButtonText: 'Ok',
            background: 'url(../imagenes/fondo_login.JPEG)',
            color: '#fffdf7',
            confirmButtonColor:'#50B8A8',
          })    }
    for (const partido of encontrado.partidos) {
       let texto = document.createElement("p");
       texto.innerHTML = partido;
       document.getElementById("faseMuerte").append(texto);      
    }

}

function info(){
    let partidos = crearEvento();
    encontrado(partidos);


}
function encontrado(selecciones){

    Swal.fire({
        icon:'question',
        title: 'Ingrese el pais a buscar',
        input: "text",
        inputPlaceholder: 'Argentina',
        confirmButtonText: 'Ok',
        background: 'url(../imagenes/fondo_login.JPEG)',
        color: '#fffdf7',
        confirmButtonColor:'#50B8A8'
    }).then((result) => {
        if (result.isConfirmed){
            let equipo = result.value.toLowerCase();
            busqueda(selecciones,equipo);
    }
});
    
}
// CREE UN ACCESO A TU EQUIPO FAVORITO, SE QUE NO ES EL USO QUE NOS PIDIERON PERO NO CONSIDERE ESO AL MOMENTO INICIAL DEL PROYECTO

function favorito(selecciones){
    if(sessionStorage.getItem("equipo")!=null){
        document.getElementById("star").style.fontWeight="bold";
        let equipo = sessionStorage.getItem("equipo");
        busqueda(selecciones,equipo);
    }
    else{
        Swal.fire({
            icon:'question',
            title: 'Ingrese el pais a añadir favorito',
            input: "text",
            inputPlaceholder: 'Argentina',
            confirmButtonText: 'Ok',
            background: 'url(../imagenes/fondo_login.JPEG)',
            color: '#fffdf7',
            confirmButtonColor:'#50B8A8'
        }).then((result) => {
            if (result.isConfirmed){
                let equipo = result.value.toLowerCase();
                sessionStorage.setItem("equipo",equipo);
                busqueda(selecciones,equipo);
                document.getElementById("star").style.fontWeight="bold";
        }
    });

    
}
}

let informacion = document.getElementById("informacion");
informacion.addEventListener("click",()=>info());

let fav = document.getElementById("star");
let partidos = crearEvento();
fav.addEventListener("click",()=>favorito(partidos));
if(sessionStorage.getItem("equipo")!=null){
    document.getElementById("star").style.fontWeight="bold";
    let equipo = sessionStorage.getItem("equipo");
    busqueda(selecciones,equipo);
}