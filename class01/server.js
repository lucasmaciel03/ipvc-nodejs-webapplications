// Importar node packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
//..imports
import fs from "fs";
import Router from "express";
import e from "express";

//--REST SERVER--//
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = "http://localhost:5500";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// output dados de pedido HTTP - logger
app.use(morgan("short"));

// parse dados dos pedidos no content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--ROUTES--//
const router = Router();

const datajson = fs.readFileSync("data.json", "utf-8"); // Read string-json from file
const data = JSON.parse(datajson); // Parse to JSON

// GET all data method route
router.get("/", (req, res) => {
  res.send(data);
});

// TODO: endpoint to get:
//		- person name
router.get("/name", (req, res) => {
  res.send(data.nome);
});
//		- person professional experience list
router.get("/experience", (req, res) => {
  res.send(data.hab_profissionais);
});
//		- person current age
router.get("/age", (req, res) => {
  res.send({ age: calcAge(data.data_nascimento) });
});

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}
//		- person current academic level
router.get("/academic", (req, res) => {
  const habs = data.hab_academicas.filter((item) => item.data_fim);

  res.send(habs[habs.length - 1].tipo_curso);
});

// - new habit academic
router.post("/academic", (req, res) => {
  const academic = req.body;
  const newdata = { ...data };
  newdata.hab_academicas.push(academic);

  const fileData = JSON.stringify(newdata);
  fs.writeFileSync("savedData.json", fileData, "utf-8");
  res
    .status(201)
    .json({ message: `HabAcademic ${academic.tipo_curso} created` });
});

// - get all hab academic
router.get("/academic", (req, res) => {
  res.send(data.hab_academicas);
})

// - put - update hab academic
router.put("/academic", (req, res) => {
  
})

//		- person current job
router.get("/getCurrentJob", (req, res) => {
  const CurrentJob = data.hab_profissionais;
  CurrentJob.map((job) => {
    if (job.data_fim == null) {
      res.send(job.empresa);
    }
  });
});

app.use(router);

router.post("/post-example", (req, res) => {
  const requestBody = req.body;
  const fileData = JSON.stringify(requestBody);
  fs.writeFileSync("savedData.json", fileData, "utf-8");

  res.send({ message: "file saved", data: requestBody });
});

// correr server no url host:port definido em .env
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});
