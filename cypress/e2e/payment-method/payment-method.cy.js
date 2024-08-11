describe("Formulário de Pagamento", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve renderizar todos os campos do formulário", () => {
    cy.get(".form-container").should("be.visible");
    cy.get(".payment-input").should("exist");
    cy.get(".cpf-input").should("exist");

    cy.get(".credit-card-fields").should("not.exist");

    cy.get('input[value="boleto"]').should("exist");
    cy.get('input[value="card"]').should("exist");
    cy.get('input[value="pix"]').should("exist");
  });

  it("deve validar campos obrigatórios e CPF", () => {
    cy.get("button").contains("Enviar").click();

    cy.get(".v-messages__message").should("contain", "Campo obrigatório");

    cy.get(".cpf-input").type("123456789").blur();
    cy.get(".v-messages__message").should("contain", "CPF inválido");
  });

  it('deve mostrar campos de cartão de crédito apenas quando o método de pagamento for "Cartão de Crédito"', () => {
    cy.get('input[value="card"]').check();
    cy.get(".credit-card-fields").should("be.visible");

    cy.get('input[value="boleto"]').check();
    cy.get(".credit-card-fields").should("not.exist");
  });

  it("deve validar o preenchimento dos campos de cartão de crédito", () => {
    cy.get('input[value="card"]').check();

    cy.get(".card-input").type("1234 5678 9123 4567");
    cy.get(".card-name").type("João Silva");
    cy.get(".card-valid").type("12/25");
    cy.get(".card-cvv").type("123");

    cy.get(".card-input").should("have.value", "1234 5678 9123 4567");
    cy.get(".card-name").should("have.value", "João Silva");
    cy.get(".card-valid").should("have.value", "12/25");
    cy.get(".card-cvv").should("have.value", "123");
  });

  it("deve validar o CPF e enviar o formulário quando todos os campos estiverem corretos", () => {
    cy.get('input[value="card"]').check();

    cy.get(".cpf-input").type("12345678900");
    cy.get(".card-input").type("1234 5678 9123 4567");
    cy.get(".card-name").type("João Silva");
    cy.get(".card-valid").type("12/25");
    cy.get(".card-cvv").type("123");

    cy.get("button").contains("Finalizar Compra").click();

    cy.window().then((win) => {
      cy.stub(win, "dispatchEvent").as("dispatchEvent");
      cy.get("button").contains("Finalizar Compra").click();
      cy.get("@dispatchEvent").should("have.been.called");
    });
  });

  it("deve mostrar uma mensagem de erro se o CPF for inválido ao submeter", () => {
    cy.get('input[value="card"]').check();

    cy.get(".cpf-input").type("00000000000");
    cy.get(".card-input").type("1234 5678 9123 4567");
    cy.get(".card-name").type("João Silva");
    cy.get(".card-valid").type("12/25");
    cy.get(".card-cvv").type("123");

    cy.get("button").contains("Finalizar Compra").click();

    cy.get(".v-toast").should("contain", "CPF inválido.");
  });
});
