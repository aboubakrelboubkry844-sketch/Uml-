import express from "express";

const app = express();
app.use(express.json());

let taches = [
  { id: 1, titre: "Préparer la réunion", faite: false },
  { id: 2, titre: "Envoyer le devis", faite: true }
];

app.get("/taches", (req, res) => res.json(taches));

app.get("/taches/:id", (req, res) => {
  const tache = taches.find(t => t.id === parseInt(req.params.id));
  if (!tache) return res.status(404).json({ erreur: "Tâche introuvable" });
  res.json(tache);
});

app.post("/taches", (req, res) => {
  const { titre } = req.body;
  if (!titre) return res.status(400).json({ erreur: "Le titre est obligatoire" });
  const nouvelleTache = {
    id: taches.length > 0 ? taches[taches.length - 1].id + 1 : 1,
    titre,
    faite: false
  };
  taches.push(nouvelleTache);
  res.status(201).json(nouvelleTache);
});

app.patch("/taches/:id", (req, res) => {
  const tache = taches.find(t => t.id === parseInt(req.params.id));
  if (!tache) return res.status(404).json({ erreur: "Tâche introuvable" });
  if (req.body.titre !== undefined) tache.titre = req.body.titre;
  if (req.body.faite !== undefined) tache.faite = req.body.faite;
  res.json(tache);
});

app.delete("/taches/:id", (req, res) => {
  const index = taches.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erreur: "Tâche introuvable" });
  taches.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);