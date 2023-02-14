const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const finalJustice = {
  "id": 3,
  "name": "Escudo do Capitão América"
};

const newProductName = {
  "name": 'Rykiel Vaquinha Maltesa',
};

const editedName = {
  "name": "Hamon Bubbles",
};

const expectedEdited = {
  "id": 1,
  "name": "Hamon Bubbles"
};

const editedOk =  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "info": "Rows matched: 1  Changed: 0  Warnings: 0",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  };

module.exports = {
  allProducts,
  finalJustice,
  newProductName,
  expectedEdited,
  editedName,
  editedOk,
}
