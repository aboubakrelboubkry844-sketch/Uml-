import express from "express";

const app = express();
app.use(express.json());

let projets = [
  { id: 1, nom: "Site vitrine", termine: false },
  { id: 2, nom: "Application mobile", termine: false }
];

app.get("/projets", (req, res) => res.json(projets));

app.post("/projets", (req, res) => {
  const { nom } = req.body;
  if (!nom) return res.status(400).json({ erreur: "Le nom est obligatoire" });
  const nouveau = { id: projets.length + 1, nom, termine: false };
  projets.push(nouveau);
  res.status(201).json(nouveau);
});

app.get("/projets/:id", (req, res) => {
  const projet = projets.find(p => p.id === parseInt(req.params.id));
  if (!projet) return res.status(404).json({ erreur: "Projet introuvable" });
  res.json(projet);
});

app.patch("/projets/:id", (req, res) => {
  const projet = projets.find(p => p.id === parseInt(req.params.id));
  if (!projet) return res.status(404).json({ erreur: "Projet introuvable" });
  if (req.body.nom !== undefined) projet.nom = req.body.nom;
  if (req.body.termine !== undefined) projet.termine = req.body.termine;
  res.json(projet);
});

app.delete("/projets/:id", (req, res) => {
  const index = projets.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erreur: "Projet introuvable" });
  projets.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);