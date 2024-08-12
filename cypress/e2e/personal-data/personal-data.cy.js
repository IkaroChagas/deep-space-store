describe("Formulário de Cadastro", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve renderizar todos os campos do formulário", () => {
    cy.get(".form-container").should("be.visible");
    cy.get("#name-input").should("exist");
    cy.get("#email-input").should("exist");
    cy.get("#phone-input").should("exist");
  });

  it("deve validar o campo Nome Completo como obrigatório", () => {
    cy.get("#name-input").type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");
  });

  it("deve validar o campo E-mail corretamente", () => {
    cy.get("#email-input").type("invalid-email").blur();
    cy.get(".v-messages__message").should("contain", "E-mail inválido");

    cy.get("#email-input").clear().type("test@example.com").blur();
    cy.get(".v-messages__message").should("not.exist");
  });

  it("deve validar o campo Telefone como obrigatório e verificar o formato", () => {
    cy.get("#phone-input").type("123456").blur();
    cy.get(".v-messages__message").should(
      "contain",
      "Telefone deve ter pelo menos 11 dígitos"
    );

    cy.get("#phone-input").clear().type("(12) 34567 8910").blur();
    cy.get(".v-messages__message").should("not.exist");
  });

  it("deve enviar o formulário quando todos os campos estiverem válidos", () => {
    cy.get("#name-input").type("João Silva");
    cy.get("#phone-input").type("joao.silva@example.com");
    cy.get("#phone-input").type("(12) 34567 8910");

    cy.contains("Próximo").click();

    cy.window().then((win) => {
      cy.stub(win, "dispatchEvent").as("dispatchEvent");
      cy.contains("Próximo").click();
    });
  });
});
