import express from "express";

const app = express();
app.use(express.json());

let contacts = [
  { id: 1, nom: "Amina", ville: "Rabat" },
  { id: 2, nom: "Karim", ville: "Casablanca" },
  { id: 3, nom: "Salma", ville: "Rabat" }
];

app.get("/contacts", (req, res) => {
  const villeFilter = req.query.ville;
  if (villeFilter) {
    return res.json(contacts.filter(c => c.ville.toLowerCase() === villeFilter.toLowerCase()));
  }
  res.json(contacts);
});

app.get("/contacts/:id", (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).json({ erreur: "Contact introuvable" });
  res.json(contact);
});

app.post("/contacts", (req, res) => {
  const { nom, ville } = req.body;
  if (!nom || !ville) return res.status(400).json({ erreur: "Le nom et la ville sont obligatoires" });
  const nouveauContact = {
    id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
    nom,
    ville
  };
  contacts.push(nouveauContact);
  res.status(201).json(nouveauContact);
});

app.delete("/contacts/:id", (req, res) => {
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ erreur: "Contact introuvable" });
  contacts.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);