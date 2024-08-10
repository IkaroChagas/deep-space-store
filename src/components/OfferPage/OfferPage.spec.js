import { render, screen } from "@testing-library/vue";
import { rest } from "msw";
import OfferPage from "./OfferPage.vue";
import { server } from "./mocks/server";

test("should display offer details", async () => {
  server.use(
    rest.get("http://localhost:8080/offerCode", (req, res, ctx) => {
      return res(
        ctx.json({
          id: "offerCode",
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
        })
      );
    })
  );

  render(OfferPage);

  expect(
    await screen.findByText(/Miniatura da Millennium Falcon/)
  ).toBeInTheDocument();
});
