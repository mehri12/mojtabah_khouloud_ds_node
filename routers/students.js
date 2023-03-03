const{student_schema,student_update_schema}=require('../models/models_student');
const express=require('express');
const app=express.Router();
let students=[
   {
       "nom ": "john doe",
       "classe" : "GLSI",
       "modules" : [
               {
                   "module" : "Spring",
                   "note" : 14
               },
               {
                   "module" : "Angular",
                   "note" : 18
               },
               {
                   "module" : "Agile",
                   "note" : 10
               }
           ],
       "moyenne" : 14
   },
   {
      "nom ": "jane doe",
      "classe" : "GLSI",
      "modules" : [
              {
                  "module" : "Agile",
                  "note" : 12
              },
              {
                  "module" : ".Net",
                  "note" : 10
              }
          ],
      "moyenne" : 11
  }
]
//afficher tous les ètudiants
app.get('/',(req,res)=>{
   res.send(students);
});


//affiche un ètudiant par son nom
app.get('/:stdnom',(req,res)=>{
   let student=students.find(std => std.nom == parseInt(req.params.stdnom));
   if(!student)
   return res.status(404).send('student not found..')
   res.send(student);
});

// afficher chaque étudiant avec leur meilleure et leur moindre module.
app.get('/maxmin/:stdnom',(req,res)=>{
   let student=students.find(std => std.nom == parseInt(req.params.stdnom));
   if(!student)
   return res.status(404).send('student not found..')

   const meilleur = { module: '', note: 0 };
      const moindre = { module: '', note: 20 };

      student.modules.forEach((module) => {
        if (module.note > meilleur.note) {
          meilleur.module = module.module;
          meilleur.note = module.note;
        }

        if (module.note < moindre.note) {
          moindre.module = module.module;
          moindre.note = module.note;
        }
      });

      resultats.push({
        nom: student.nom,
        meilleurModule: meilleur,
        moindreModule: moindre,
      });
    res.json(resultats);
   });


   //  afficher la moyenne de tous les étudiants.
   app.get('/moyenne', (req, res) => {
    let total = 0;
    let count = 0;
    etudiants.forEach(etudiant => {
        total += etudiant.moyenne;
        count++;
    });
    const moyenneGenerale = total / count;
    res.json({ moyenne: moyenneGenerale });
});



// Endpoint pour ajouter un module à un étudiant
app.post('/modules/:stdnom', (req, res) => {
  
  const { module, note } = req.body;

  let student=students.find(std => std.nom == parseInt(req.params.stdnom));

  if (!student) {
    return res.status(404).send('Étudiant non trouvé.');
  }

  student.modules.push({ module, note });

  res.send(student);
});

  
   
   


//le calcul automatique de la moyenne
app.post('', (req, res)=>{
let valid_res = student_schema.validate(req.body);
if(valid_res.error)
return res.status(400).send(valid_res.error.message);

 let student={
   nom:req.body.nom,
   classe:req.body.classe,
   modules: req.body.modules,
   moyenne: calculateAverage(req.body.modules),
  };
 
 students.push(student);
 res.status(201).send(student);
});



//update
app.put('/:stdnom', (req, res)=>
{
 let valid_res = student_update_schema.validate(req.body);
if(valid_res.error)
return res.status(400).send(valid_res.error.message);
   let student=students.find(std => std.nom == parseInt(req.params.stdnom));
   if(!student)
   return res.status(404).send('student not found..')
   if(req.body.nom)
     student.nom=req.body.nom;
   if(req.body.classe)
     student.classe=req.body.classe;
     //modules[] à regler
   if(req.body)  
   res.status(202).send(student);

});

//delete
app.delete('/:stdid', (req, res)=>
{
   let student=students.find(std => std.id === parseInt(req.params.stdid));
   if(!student)
   return res.status(404).send('student not found..')
   students=students.filter(std => std.id !== parseInt(req.params.stdid))
   res.send(student);

});
// ajout d'un ètudiant
app.post('', (req, res)=>{
  let valid_res = student_schema.validate(req.body);
  if(valid_res.error)
  return res.status(400).send(valid_res.error.message);
  
   let student={
     nom:req.body.nom,
     classe:req.body.classe,
     modules: req.body.modules,
     moyenne: req.body.moyenne,
    };
   
   students.push(student);
   res.status(201).send(student);
  });

module.exports=app;