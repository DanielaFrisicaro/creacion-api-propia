const db = require("../database/models");
const sequelize = db.sequelize;
//const fs = require('fs');
const path = require('path')

//.............................JSON...........................................................................//  

//const notas_path = path.join(__dirname, '../data/notas.json');//1er paso
//const file_data = fs.readFileSync(notas_path, 'utf-8');//2do paso
//const notas = JSON.parse(file_data)//3er paso. Esta es la variable central.

//.............................FIN JSON...........................................................................//  

//..................................................DETAIL.....................................................//
const getEvento = (req, res) => {
//.............................JSON...........................................................................//  
/*
    //con destructuring//
    // const { id_nota } = req.params;

    //sin destructuring
    const nota = req.params.id_nota
    const nota_seleccionada = notas.find((el) => el.id === parseInt(nota))// o se hace con doble igual o se deja el triple igual con parseInt porque nota lo que llega es string
    // res.send('Hola desde la nota ' + id_nota)
    res.render('detalleNota', { nota: nota_seleccionada });//envio nombre nota que se uso en la vista y el resultado que es la nota seleccionada.
    */
     //con destructuring//
       // const { id_nota } = req.params;//lo que viene por params

         //sin destructuring
        const id_evento = req.params.id_evento
        db.Eventos.findOne({
          where: {id_evento: id_evento },//el 1ero es el ID real y el 2do el de la variable creada.
        }).then((evento) => {
          res.render("detalleEvento", { evento });
        });


}

//..................................................LIST......................................................//
const listEvento = (req, res) => {
    
    db.Eventos.findAll()
    .then((evento) => {
        //res.send("pruebas con DB"); 
       res.render("listEventos",{evento})//notas está en la vista
      });
   
    //res.send('probando el ListNota')
};
//..................................................CREATE-GET................................................//
const register = (req, res) => {
    db.Eventos.findAll({
      //
    }).then((evento) => {
      res.render("crearEvento", { evento });
    });
//.............................JSON...........................................................................//  
    //res.send('aqui va el formulario de creación')
    //res.render('crearNota')
};
//..................................................CREATE-POST................................................//
const postEvento = (req, res) => {
    //const info = req.body
    db.Eventos.create({
        id_evento: req.params.id,
        nota: req.body.nota,
        titulo: req.body.titulo,
    
      }).then((resultado) => {
        res.redirect("/eventos");
      });

  //.............................JSON...........................................................................//  
  /*
  const titulo = req.body.titulo;
    const nota = req.body.nota;
    const id = notas.length + 1;
    console.log(notas)//notas es el archivo JSON parseado
    //console.log(info);
    // console.log(info.titulo);
    //console.log(info.nota);
    notas.push({
        titulo: titulo,
        nota: nota,
        id
    })

    const notas_string = JSON.stringify(notas, null, 2);//4to paso
    fs.writeFileSync(notas_path, notas_string)//5to paso. Se escribe en el JSON

    console.log(notas)
    console.log('estoy pasando por el post')

    res.redirect('/')*/
};
//..................................................EDITAR-GET.................................................//
const editarEvento = (req, res) => {
//.............................JSON...........................................................................//    
   /*  
    // res.send('Estamos cargando la vista para hacer el put')

    const indice = req.params.id_nota;
    const nota_seleccionada = notas.find((el) => el.id === parseInt(indice));
    //console.log(indice);

    res.render('editarNotaFormulario', { nota: nota_seleccionada });
*/
   
        db.Eventos.findByPk(req.params.id_evento)
        .then((evento) => {
          res.render("editarEventoFormulario",{ evento });//el elemento que va a la vista es evento en este caso.
        });
      

};
//..................................................EDITAR-PUT................................................//
const putEvento = (req, res) => {
//...........................JSON.............................................................................//    
/*
    const id_nota = req.params.id_nota;
    const titulo = req.body.titulo;
    const nota = req.body.nota;
    console.log(id_nota);
    console.log(titulo);
    console.log(nota);


    notas.forEach(element => {
        if (element.id === parseInt(id_nota)) {
            element.titulo = titulo;
            element.nota = nota;
        }
    });
    const data = JSON.stringify(notas, null, 2)//4to paso
    fs.writeFileSync(notas_path, data)//5to paso. Se escribe en el JSON
    res.redirect('/')
*/
  //...........................................................................................................//      
        db.Eventos.update(
          {
        id_evento: req.params.id_evento,//si lo dejamos o no a esta linea, no cambia nada.
        nota: req.body.nota,//datos que salen del formulario
        titulo: req.body.titulo,//datos que salen del formulario
          },
          {
            where: { id_evento : req.params.id_evento},//el 1ero es el ID real y el 2do el de la variable creada.
          }
        ).then((resultado) => {     //el elemento resultado no es necesario en este caso que este.
          res.redirect("/eventos");
        });
     
};
//..................................................DELETE.................................................//
const borrarEvento = (req, res) => {
//...........................JSON.........................................................................//
    // res.send('se esta borrando la nota')

   /* const id_nota = req.params.id_nota;
    const notas_filtradas = notas.filter(el => el.id !== parseInt(id_nota))

    // console.log(id_nota)
    const data = JSON.stringify(notas_filtradas, null, 2)//4to paso
    fs.writeFileSync(notas_path, data)//5to paso. Se escribe en el JSON
   res.redirect('/')*/
//.......................................................................................................//
        db.Eventos.destroy({ where: { id_evento: req.params.id_evento } })
        .then(() => {
            res.redirect("/eventos");
          }
        );
      

}


module.exports = {
      getEvento,
      listEvento,
      register,
      postEvento,
      editarEvento,
      putEvento,
      borrarEvento
}