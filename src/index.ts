import { default as axios } from "axios";

interface candidate {
  candidato: string;
  numero_votos: string;
  partido: string;
  porcentagem: string;
}

interface responseData {
  cand: {
    n: string; // Partido
    nm: string; // Nome
    pvap: string; // Porcentagem
    vap: string; // Votos
  }[];
}

const urlApi =
  "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json";

const logCandidate = async () => {
  const response = await axios(urlApi);

  const data = response.data as responseData;

  const candidates: candidate[] = data.cand.map((cand) => ({
    candidato: cand.nm,
    partido: cand.n,
    numero_votos: cand.vap,
    porcentagem: cand.pvap,
  }));

  console.table(candidates);

  setTimeout(logCandidate, 60000); // 1 minuto
};

logCandidate();
