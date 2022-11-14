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
  function simularPartidoMuerte(pais1,pais2){
    let resultadoEquipo1 = Math.floor(Math.random() * 6);
    let resultadoEquipo2 = Math.floor(Math.random() * 6);
    let resultado ="";
    if (resultadoEquipo1 > resultadoEquipo2){
        pais1.puntos +=3;
        resultado = `${pais1.pais} ${resultadoEquipo1} - ${resultadoEquipo2} ${pais2.pais}`;
    }
    else if(resultadoEquipo1 < resultadoEquipo2){
        pais2.puntos += 3;
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
            pais1.puntos +=3;
        }
        else if(penal1 < penal2){
            pais2.puntos += 3;
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
     
    //   CREE LA TABLA DE POSICIONES
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

function octavos(mundial){    

    mundial.sort((a,b)=>{
        if((a.puntos > b.puntos) && (a.grupo == b.grupo)){
            return -1;
        }
        else if((a.puntos < b.puntos) && (a.grupo == b.grupo)){
            return 1;
        }
        
        else{
            return 0; } 
            
        });
    let oct = [0,0,0,0,0,0,0,0];
//    NOSE COMO HACERLO AUTOMATICO
// OCTAVOS
    oct[0] = simularPartidoMuerte(mundial[0],mundial[5]);
    mundial[0].partidos.push(oct[0]);
    mundial[5].partidos.push(oct[0]);


    oct[1] = simularPartidoMuerte(mundial[1],mundial[4]);
    mundial[1].partidos.push(oct[1]);
    mundial[4].partidos.push(oct[1]);

    oct[2] = simularPartidoMuerte(mundial[8],mundial[13]);
    mundial[8].partidos.push(oct[2]);
    mundial[13].partidos.push(oct[2]);

    oct[3] = simularPartidoMuerte(mundial[9],mundial[12]);
    mundial[9].partidos.push(oct[3]);
    mundial[12].partidos.push(oct[3]);

    oct[4] = simularPartidoMuerte(mundial[16],mundial[21]);
    mundial[16].partidos.push(oct[4]);
    mundial[21].partidos.push(oct[4]);

    oct[5] = simularPartidoMuerte(mundial[17],mundial[20]);
    mundial[17].partidos.push(oct[5]);
    mundial[20].partidos.push(oct[5]);

    oct[6] = simularPartidoMuerte(mundial[24],mundial[29]);
    mundial[24].partidos.push(oct[6]);
    mundial[29].partidos.push(oct[6]);

    oct[7] = simularPartidoMuerte(mundial[25],mundial[28]);
    mundial[25].partidos.push(oct[7]);
    mundial[28].partidos.push(oct[7]);
    
    document.getElementById("tablaGrupo").style.display ="none";
    let titulo =document.createElement("h3");
    titulo.innerHTML = "Octavos de final";
    document.getElementById("faseMuerte").append(titulo);
    for (const partido of oct) {
        let texto = document.createElement("p");
        texto.innerHTML = partido;
        document.getElementById("faseMuerte").append(texto);
    }
    
    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>cuartos(mundial));
}
    // CUARTOS

function cuartos(mundial){
    let cuarto = [0,0,0,0]
    mundial.sort((a,b) => {
        if(a.puntos > b.puntos){
            return -1;
        }
        else if(a.puntos < b.puntos){
            return 1;
        }
        else{
            return 0; } 
            
        });

    cuarto[0] = simularPartidoMuerte(mundial[0],mundial[1]);
    mundial[0].partidos.push(cuarto[0]);
    mundial[1].partidos.push(cuarto[0]);


    cuarto[1] = simularPartidoMuerte(mundial[2],mundial[3]);
    mundial[2].partidos.push(cuarto[1]);
    mundial[3].partidos.push(cuarto[1]);

    cuarto[2] = simularPartidoMuerte(mundial[4],mundial[5]);
    mundial[4].partidos.push(cuarto[2]);
    mundial[5].partidos.push(cuarto[2]);

    cuarto[3]= simularPartidoMuerte(mundial[6],mundial[7]);
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

    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>semifinal(mundial));


}
    
function semifinal(mundial){
    mundial.sort((a,b) => {
        if(a.puntos > b.puntos){
            return -1;
        }
        else if(a.puntos < b.puntos){
            return 1;
        }
        else{
            return 0; } 
            
        });
    let semi = [0,0];
    semi[0]= simularPartidoMuerte(mundial[0],mundial[1]);
    mundial[0].partidos.push(semi[0]);
    mundial[1].partidos.push(semi[0]);
    semi[1]= simularPartidoMuerte(mundial[2],mundial[3]);
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

    let simulado = document.getElementById("boton");
    simulado.addEventListener("click",()=>final(mundial));
}

function final(mundial){
    mundial.sort((a,b) => {
        if(a.puntos > b.puntos){
            return -1;
        }
        else if(a.puntos < b.puntos){
            return 1;
        }
        else{
            return 0; } 
            
        });
    let ganador = simularPartidoMuerte(mundial[0],mundial[1]);
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
                  "Cameron","Portugal","Ghana","Uruguay","Corea del sur" ];
    
    let selecciones=[];
    for (const pais of paises) {
        let seleccion = new Seleccion(pais)
        selecciones.push(seleccion);
    }
    // GRUPO A
    selecciones[0].partidos = ["20 de Noviembre - 13:00 hs VS Ecuador","25 de Noviembre - 10:00 hs VS Senegal","29 de Noviembre - 12:00 hs VS Holanda"];
    selecciones[1].partidos = ["20 de Noviembre - 13:00 hs VS Qatar", "25 de Noviembre - 13:00 hs VS Holanda","29 de Noviembre - 12:00 hs VS Senegal"];
    selecciones[2].partidos = ["21 de Noviembre - 13:00 hs VS a Holanda","25 de Noviembre - 10:00 hs VS Qatar","29 de Noviembre -12:00 hs VS Ecuador"];
    selecciones[3].partidos = ["21 de Noviembre -13:00 hs VS a Holanda","25 de Noviembre 13:00 hs VS Holanda","29 de Noviembre - 12:00 hs VS Qatar"];

    // GRUPO B

    selecciones[4].partidos = ["21 de Noviembre - 10:00 hs VS Iran", "25 de Noviembre - 16:00 hs   VS a Estados Unidos","29 de Novimebre - 16:00 hs   VS a Wales"];
    selecciones[5].partidos = ["21 de Noviembre - 10:00 hs VS Inglaterra","25 de Noviembre - 07:00 hs   VS Wales.","29 de Noviembre - 16:00 hs   VS Estados Unidos"];
    selecciones[6].partidos = ["21 de Noviembre - 16:00 hs VS Wales","25 de Noviembre - 16:00 hs   VS a Inglaterra","29 de Noviembre - 16:00 hs   VS Iran"];
    selecciones[7].partidos = ["21 de Noviembre - 16:00 hs VS Estados Unidos","25 de Noviembre - 07:00 hs   VS Iran","29 de Novimebre - 16:00 hs   VS a Inglaterra"];

    // GRUPO C
    selecciones[8].partidos = ["22 de Noviembre - 07:00 hs VS Arabia Saudita","26 de Noviembre - 16:00 hs VS Mexico","30 de Noviembre - 16:00 hs VS Polonia"];
    selecciones[9].partidos = ["22 de Noviembre - 07:00 hs VS Argentina","26 de Noviembre - 10:00 hs VS Polonia ","30 de Noviembre - 16:00 hs VS a Mexico"];
    selecciones[10].partidos = ["22 de Noviembre - 13:00 VS Polonia","26 de Noviembre - 16:00 hs VS Argentina","30 de Noviembre - 16:00 hs VS a Arabia Saudita"];
    selecciones[11].partidos = ["22 de Noviembre - 13:00 VS Mexico","26 de Noviembre - 10:00 hs VS Arabia Saudita","30 de Noviembre - 16:00 hs VS Argentina"];

    // GRUPO D
    selecciones[12].partidos = ["22 de Noviembre - 16:00 hs VS Australia","26 de Noviembre - 13:00 hs VS Dinamarca","30 de Noviembre - 12:00 hs VS Tunisia"];
    selecciones[13].partidos = ["22 de Noviembre - 16:00 hs VS Francia","26 de Noviembre - 07:00 hs VS Tunisia","30 de Noviembre - 12:00 hs VS Dinamarca"];
    selecciones[14].partidos = ["22 de Noviembre - 10:00 hs VS Tunisia","26 de Noviembre - 13:00 hs VS Francia","30 de Noviembre - 12:00 hs VS Australia"];
    selecciones[15].partidos = ["22 de Noviembre - 10:00 hs VS Dinamarca", "26 de Noviembre - 07:00 hs VS Australia","30 de Noviembre - 12:00 hs VS Francia"];
    
    // GRUPO E
    selecciones[16].partidos = ["23 de Noviembre - 13:00 hs VS Costa Rica","27 de Noviembre - 16:00 hs VS Alemania","1 de Diciembre - 16:00 hs VS Japon"];
    selecciones[17].partidos = ["23 de Noviembre - 13:00 hs VS España","27 de Noviembre - 07:00 hs VS Japon","1 de Diciembre - 16:00 hs VS Alemania"];
    selecciones[18].partidos = ["23 de Noviembre - 10 hs VS Japon","27 de Noviembre - 16:00 hs VS España","1 de Diciembre - 16:00 hs VS Costa Rica"];
    selecciones[19].partidos = ["23 de Noviembre - 10 hs VS Alemania","27 de Noviembre - 07:00 hs VS Costa Rica","1 de Diciembre - 16:00 hs VS España"];

    // GRUPO F
    selecciones[20].partidos = ["23 de Noviembre - 16:00 hs VS Canada","27 de Noviembre - 10:00 hs VS Marruecos","1 de Diciembre - 12:00 hs VS Crocia"];
    selecciones[21].partidos = ["23 de Noviembre - 16:00 hs VS Belgica","27 de Noviembre - 13:00 hs VS Croacia","1 de Diciembre - 12:00 hs VS Marruecos"];
    selecciones[22].partidos = ["23 de Noviembre - 07:00 hs VS Croacia","27 de Noviembre - 10:00 hs VS Belgica","1 de Diciembre - 12:00 hs VS Canada"];
    selecciones[23].partidos = ["23 de Noviembre - 07:00 hs VS Marruecos","27 de Noviembre - 13:00 hs VS Canada","1 de Diciembre - 12:00 hs VS Belgica"]

    // GRUPO G
    selecciones[24].partidos = ["24 de Noviembre - 16:00 hs VS Serbia","28 de Noviembre - 13:00 hs VS Suiza","2 de Diciembre - 16:00 hs VS Camerun"];
    selecciones[25].partidos = ["24 de Noviembre - 16:00 hs VS Brasil","28 de Noviembre - 07:00 hs VS Camerun","2 de Diciembre - 16:00 hs VS Suiza"];
    selecciones[26].partidos = ["24 de Noviembre - 07:00 hs VS Camerun","28 de Noviembre - 13:00 hs VS Brasil","2 de Diciembre - 16:00 hs VS Serbia"];
    selecciones[27].partidos = ["24 de Noviembre - 07:00 hs VS Suiza","28 de Noviembre - 07:00 hs VS Serbia","2 de Diciembre - 16:00 hs VS Brasil"];

    // GRUPO H 
    selecciones[28].partidos = ["24 de Noviembre - 13:00 hs VS Ghana","28 de Noviembre - 16:00 hs VS Uruguay", "2 de Diciembre - 12:00 hs VS Corea del sur"];
    selecciones[29].partidos = ["24 de Noviembre - 13:00 hs VS Portugal", "28 de Noviembre - 10:00 hs VS Corea del sur","2 de Diciembre - 12:00 hs VS Uruguay"];
    selecciones[30].partidos = ["24 de Noviembre - 10:00 hs VS Corea del Sur","28 de Noviembre - 16:00 hs VS Portugal", "2 de Diciembre - 12:00 hs VS Ghana"];
    selecciones[31].partidos = ["24 de Noviembre - 10:00 hs VS Uruguay","28 de Noviembre - 10:00 hs VS Ghana","2 de Diciembre - 12:00 hs VS Portugal"];

    return selecciones;
}

function busqueda(selecciones){
    let buscar = prompt("Ingrese el pais que desea saber sus partidos.")
    buscar = buscar.toLowerCase();
    let encontrado;
    let flag = false;
    for (const seleccion of selecciones) {
        if(buscar == seleccion.pais.toLowerCase()){
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
        alert("No se encontro ese pais.");
    }
    for (const partido of encontrado.partidos) {
       let texto = document.createElement("p");
       texto.innerHTML = partido;
       document.getElementById("faseMuerte").append(texto);      
    }

}

function info(){
    let partidos = crearEvento();
    busqueda(partidos);


}

let informacion = document.getElementById("informacion");
informacion.addEventListener("click",()=>info());


