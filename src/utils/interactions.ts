import readlineSync = require("readline-sync");
import * as fs from "fs";
import { Flow } from "../interfaces/Flow";

export const askForFileAndReadIt = (): Flow[] => {
  const path = readlineSync.questionPath("Hvilken fil skal analyseres?\n> ", {
    isFile: true,
    limitMessage: "Det var ikke en gyldig .JSON-fil. Prøv igen, tak!"
  });

  return JSON.parse(
    fs
      .readFileSync(path)
      .toString()
      .trim()
  );
};

export const askForMinQuestionCount = (): boolean => {
  const input = readlineSync.question(
    "\nVil du frasortere flows med færre end 50 spørgsmål? [Y/n]: ",
    {
      limit: /^[yn]\s*$|^$/i,
      limitMessage: "Indtast et Y/[enter] for ja, N for nej"
    }
  );
  return input === "Y" || input === "";
};

export const askForIndices = () => {
  let indicesStr = readlineSync.question(
    `Hvilke flows skal eksporteres?
(kommasepareret: 0,1,2, ...)
> `,
    {
      limit: /^(([0-9]){1}[, ]*)+$/,
      limitMessage:
        "Indtast et eller flere indices adskilt af kommaer (og evt. mellemrum)"
    }
  );
  indicesStr = indicesStr.replace(" ", "");
  let indices = indicesStr.split(",");
  return indices.map(i => Number(i));
};

export const askForSemester = (): number => {
  const sem = readlineSync.question(
    "Hvilket semester er spørgsmålet fra? [7|8|9|11] : ",
    {
      limit: [7, 8, 9, 11],
      limitMessage: "Gyldige semestre er: 7, 8, 9 og 11."
    }
  );
  return Number(sem);
};

export const askForExam = (): { year: number; season: string } => {
  console.log("");
  console.log("");
  const exam = readlineSync.question(
    "Hvilken eksamen er flowet fra? [YYYY/(E|F)] : \n> ",
    {
      limit: /^[0-9]{4}\/[EF]$/i,
      limitMessage:
        "Formen skal være fx 2019/F eller 2019/E for hhv. 2019 forår/efterår"
    }
  );
  const year = Number(exam.substring(0, 4));
  const season = exam.substring(5, 6).toUpperCase();
  return { year, season };
};
