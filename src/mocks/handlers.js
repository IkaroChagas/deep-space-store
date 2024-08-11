import { http, HttpResponse } from "msw";

const offerData = {
  id: "ae55qa4qa656",
  name: "Boneco Buzz lightyear",
  price: 600.0,
  items: [
    "Boneco detalhado",
    "Base para exposição",
    "Certificado de autenticidade"
  ],
  paymentMethods: ["Cartão de Crédito", "Boleto Bancário", "Pix"],
  images: ["https://m.media-amazon.com/images/I/61uqdfdzPhL._AC_SL1000_.jpg"],
  description:
    "Um incrível boneco do Buzz lightyear, perfeito para fãs de Toy Story."
};

export const handlers = [
  http.get("https://api.deepspacestore.com/offers/:offerCode", () => {
    return HttpResponse.json(offerData);
  }),
  http.post(
    "https://api.deepspacestore.com/offers/:offerCode/create_order",
    (req) => {
      const data = req.body;
      if (data.cpf === "00000000000") {
        return new HttpResponse(null, {
          status: 400,
          statusText: "CPF inválido"
        });
      }
      return HttpResponse.json({
        id: "2556aqaaq56a4a45",
        status: "SUCCESS",
        offerCode: "ae55qa4qa656"
      });
    }
  )
];
