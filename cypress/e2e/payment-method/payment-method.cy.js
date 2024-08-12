describe("Formulário de Pagamento", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#name-input").type("João Silva");
    cy.get("#email-input").type("joao.silva@example.com");
    cy.get("#phone-input").type("(12) 34567 8910");

    cy.contains("Próximo").click();

    cy.get("#zipcode-input").type("01001000").blur();
    cy.get("#address-input").type("Praça da Sé");
    cy.get("#address-number-input").type("123");
    cy.get("#neighborhood-input").type("Sé");
    cy.get("#city-input").type("São Paulo");

    cy.contains("Próximo").click();
  });

  it("deve selecionar o método de pagamento 'Boleto', preencher o CPF e clicar em 'Finalizar Compra'", () => {
    cy.get("#radio-boleto").check({ force: true });

    cy.get("#cpf-input").type("12345678900");

    cy.get("button").contains("Finalizar Compra").click();
  });

  it("deve selecionar o método de pagamento 'Pix', preencher o CPF e clicar em 'Finalizar Compra'", () => {
    cy.get("#radio-pix").check({ force: true });

    cy.get("#cpf-input").type("12345678900");

    cy.get("button").contains("Finalizar Compra").click();
  });

  it('deve mostrar campos de cartão de crédito apenas quando o método de pagamento for "Cartão de Crédito"', () => {
    cy.get("#radio-credit-card").check({ force: true });
    cy.get("#credit-card-number-input").should("be.visible");

    cy.get("#radio-boleto").check({ force: true });
    cy.get("#credit-card-number-input").should("not.exist");
  });

  it("deve validar o preenchimento dos campos de cartão de crédito", () => {
    cy.get("#radio-credit-card").check({ force: true });

    cy.get("#credit-card-number-input").type("1234 5678 9123 4567");
    cy.get("#credit-card-name-input").type("João Silva");
    cy.get("#credit-card-valid-input").type("12/25");
    cy.get("#credit-card-cvv-input").type("123");

    cy.get("#credit-card-number-input").should(
      "have.value",
      "1234 5678 9123 4567"
    );
    cy.get("#credit-card-name-input").should("have.value", "João Silva");
    cy.get("#credit-card-valid-input").should("have.value", "12/25");
    cy.get("#credit-card-cvv-input").should("have.value", "123");
  });

  it("deve validar o CPF e enviar o formulário quando todos os campos estiverem corretos", () => {
    cy.get("#radio-credit-card").check({ force: true });

    cy.get("#cpf-input").type("12345678900");
    cy.get("#credit-card-number-input").type("1234 5678 9123 4567");
    cy.get("#credit-card-name-input").type("João Silva");
    cy.get("#credit-card-valid-input").type("12/25");
    cy.get("#credit-card-cvv-input").type("123");

    cy.get("button").contains("Finalizar Compra").click();

    cy.window().then((win) => {
      cy.stub(win, "dispatchEvent").as("dispatchEvent");
      cy.get("button").contains("Finalizar Compra").click();
    });
  });

  it("deve mostrar uma mensagem de erro se o CPF for inválido ao submeter", () => {
    cy.get("#radio-credit-card").check({ force: true });

    cy.get("#cpf-input").type("00000000000");
    cy.get("#credit-card-number-input").type("1234 5678 9123 4567");
    cy.get("#credit-card-name-input").type("João Silva");
    cy.get("#credit-card-valid-input").type("12/25");
    cy.get("#credit-card-cvv-input").type("123");

    cy.get("button").contains("Finalizar Compra").click();
  });
});
