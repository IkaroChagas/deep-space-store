import { http, HttpResponse } from "msw";

const offerData = {
  id: offerCode,
  name: "Miniatura da Millennium Falcon",
  price: 600.0,
  items: [
    "Miniatura detalhada",
    "Base para exposição",
    "Certificado de autenticidade"
  ],
  paymentMethods: ["Cartão de Crédito", "Boleto Bancário", "Pix"],
  images: [
    "https://example.com/images/millennium_falcon_1.jpg",
    "https://example.com/images/millennium_falcon_2.jpg"
  ],
  description:
    "Uma incrível miniatura da Millennium Falcon, perfeita para fãs de Star Wars."
};

export const handlers = [
  http.get("http://localhost:8080/:offerCode", (req) => {
    const { offerCode } = req.params;
    if (offerCode === "offerCode") {
      return HttpResponse.json(offerData);
    }
    return HttpResponse.json(
      { error: "Oferta não encontrada" },
      { status: 404 }
    );
  })
];
