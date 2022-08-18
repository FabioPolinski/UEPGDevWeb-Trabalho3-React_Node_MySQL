// Utiliza o express e o executa no app
const express = require("express");
const app  = express();

// Banco
const mysql = require("mysql");
const banco = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db_registrofilmes"
});

// Conexao front-back
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Método GET - visualizar nos cards os filmes já registrados
app.get("/visualizar", (req, res) => {

    let sql = "SELECT * FROM filme ORDER BY data DESC";

    banco.query(sql, (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });
});

// Método POST - registrar no banco os dados colocados no campo pelo usuário
app.post("/registrar", (req, res) => {
    const titulo = req.body.titulo;
    const data = req.body.data;
    const nota = req.body.nota;

    //console.log("Titulo: "+titulo+", Data: "+data+", Nota: "+nota);

    let sql = "INSERT INTO filme (titulo, data, nota) VALUES (?, ?, ?)";

    //Enviando os dados pelas []
    banco.query(sql, [titulo, data, nota], (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });
});

// Método PUT - alterar os dados no banco
app.put("/editar", (req, res) => {
    const id = req.body.id;
    const titulo = req.body.titulo;
    const data = req.body.data;
    const nota = req.body.nota;

    let sql = "UPDATE filme SET titulo = ?, data = ?, nota = ? WHERE idfilme = ?";

    banco.query(sql, [titulo, data, nota, id], (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });
});

// Método DELETE - deletar dados do banco

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    let sql = "DELETE FROM filme WHERE idfilme = ?";

    banco.query(sql, [id], (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });
});

// Método de Pesquisa para automatizar a interface

app.post("/pesquisar", (req, res) => {
    const titulo = req.body.titulo;
    const data = req.body.data;
    const nota = req.body.nota;

    let sql = "SELECT * FROM filme WHERE titulo = ? AND data = ? AND nota = ?";

    banco.query(sql, [titulo, data, nota], (err, result) => {
        if (err)
            console.log(err);
        else
            res.send(result);
    });

});

// Método GET d teste para ver se os dados estao entrando no banco
/*app.get('/', (req, res) => {
    res.send("Teste");

    let sql = "INSERT INTO filme (titulo, data, nota) VALUES ('Senhor dos Anéis', '2022-08-16', '10')";

    banco.query(sql, (err, result) => {
        if (err)
            console.log(err);
    });
});*/

// Rodando o app
// Para executar, npm run dev (package.json)
app.listen(3001, () => {
    console.log("Server ON");
});