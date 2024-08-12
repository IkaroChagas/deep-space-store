describe("Formulário de Endereço", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#name-input").type("João Silva");
    cy.get("#email-input").type("joao.silva@example.com");
    cy.get("#phone-input").type("(12) 34567 8910");

    cy.contains("Próximo").click();
  });

  it("deve renderizar todos os campos do formulário", () => {
    cy.get(".form-container").should("be.visible");
    cy.get("#zipcode-input").should("exist");
    cy.get("#address-input").should("exist");
    cy.get("#address-number-input").should("exist");
    cy.get("#neighborhood-input").should("exist");
    cy.get("#city-input").should("exist");
  });

  it("deve buscar e preencher o endereço com base no CEP", () => {
    cy.get("#zipcode-input").type("01001000").blur();

    cy.wait(1000);

    cy.get("#address-input").should("have.value", "Praça da Sé");
    cy.get("#neighborhood-input").should("have.value", "Sé");
    cy.get("#city-input").should("have.value", "São Paulo");
  });

  it("deve limpar o formulário se o CEP for inválido ou se houver erro", () => {
    cy.get("#zipcode-input").type("00000000").blur();
    cy.get("#address-input").should("have.value", "");
    cy.get("#neighborhood-input").should("have.value", "");
    cy.get("#city-input").should("have.value", "");
  });

  it("deve enviar o formulário quando todos os campos estiverem válidos", () => {
    cy.get("#zipcode-input").type("01001000").blur();
    cy.get("#address-input").type("Praça da Sé");
    cy.get("#address-number-input").type("123");
    cy.get("#neighborhood-input").type("Sé");
    cy.get("#city-input").type("São Paulo");

    cy.contains("Próximo").click();
  });
});
