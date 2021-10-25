import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import UserRepository from "./authentication/infrastructure/UserRepository";

const app = express();
const port = 8000;

const repositoryClient = new PrismaClient();
const userRepository = new UserRepository(repositoryClient);

app.listen(port, () => {
  console.log(`Le backend pour Café Baileys roule sur le port ${port}`);
});

const login = (request: Request, response: Response, next: NextFunction) => {
  const fakeCredentials = { username: "aUsername", password: "aPassword" };

  response.status(200).json(fakeCredentials);
};

const signup = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json({ message: "signup" });
};

app.get("/login", login);
app.get("/signup", signup);
