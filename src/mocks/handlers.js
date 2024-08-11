import { http, HttpResponse } from "msw";

const offerData = {
  id: "1",
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
  http.get("https://api.deepspacestore.com/offers/:offerCode", () => {
    return HttpResponse.json(offerData);
  }),
  http.post(
    "https://api.deepspacestore.com/offers/:offerCode/create_order",
    (req) => {
      const data = req.body;
      if (data?.cpf === "00000000000000") {
        return new HttpResponse(null, {
          status: 400,
          statusText: "CPF inválido"
        });
      }
      return HttpResponse.json({
        id: "2556aqaaq56a4a45",
        status: "SUCCESS",
        offerCode: req.params.offerCode
      });
    }
  )
];
