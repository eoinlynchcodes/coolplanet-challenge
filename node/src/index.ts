import express, { Request, Response } from "express";
import users from "../users.json";
import cors from "cors";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ users });
});

app.get("/users", (req: Request, res: Response) => {
  res.json({ users });
});

app.get("/user/:id", (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = users.filter((userFromDb) => userFromDb.id === userId);
  const userObject = Object.assign({}, ...user);
  if (user.length > 0) {
    res.send(userObject);
  } else {
    res.status(404).send("No user has the ID that you requested.");
  }
});

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});
