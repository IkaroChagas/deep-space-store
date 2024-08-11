describe("Formulário de Endereço", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deve renderizar todos os campos do formulário", () => {
    cy.get(".form-container").should("be.visible");
    cy.get('input[aria-label="CEP*"]').should("exist");
    cy.get('input[aria-label="Endereço*"]').should("exist");
    cy.get('input[aria-label="Número*"]').should("exist");
    cy.get('input[aria-label="Bairro*"]').should("exist");
    cy.get('input[aria-label="Cidade*"]').should("exist");
  });

  it("deve validar os campos obrigatórios", () => {
    cy.get('input[aria-label="CEP*"]').type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");

    cy.get('input[aria-label="Endereço*"]').type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");

    cy.get('input[aria-label="Número*"]').type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");

    cy.get('input[aria-label="Bairro*"]').type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");

    cy.get('input[aria-label="Cidade*"]').type(" ").blur();
    cy.get(".v-messages__message").should("contain", "Campo obrigatório");
  });

  it("deve buscar e preencher o endereço com base no CEP", () => {
    cy.intercept("GET", "**/ws/**/json/", {
      fixture: "cep.json"
    }).as("fetchAddress");

    cy.get('input[aria-label="CEP*"]').type("01001000").blur();

    cy.wait("@fetchAddress");

    cy.get('input[aria-label="Endereço*"]').should("have.value", "Praça da Sé");
    cy.get('input[aria-label="Bairro*"]').should("have.value", "Sé");
    cy.get('input[aria-label="Cidade*"]').should("have.value", "São Paulo");
  });

  it("deve mostrar mensagem de erro se o CEP for inválido", () => {
    cy.get('input[aria-label="CEP*"]').type("00000000").blur();
    cy.get(".v-messages__message").should("contain", "CEP não encontrado.");
  });

  it("deve limpar o formulário se o CEP for inválido ou se houver erro", () => {
    cy.get('input[aria-label="CEP*"]').type("00000000").blur();
    cy.get('input[aria-label="Endereço*"]').should("have.value", "");
    cy.get('input[aria-label="Bairro*"]').should("have.value", "");
    cy.get('input[aria-label="Cidade*"]').should("have.value", "");
  });

  it("deve enviar o formulário quando todos os campos estiverem válidos", () => {
    cy.get('input[aria-label="CEP*"]').type("01001000").blur();
    cy.get('input[aria-label="Endereço*"]').type("Praça da Sé");
    cy.get('input[aria-label="Número*"]').type("123");
    cy.get('input[aria-label="Bairro*"]').type("Sé");
    cy.get('input[aria-label="Cidade*"]').type("São Paulo");

    cy.contains("Próximo").click();

    cy.window().then((win) => {
      cy.stub(win, "dispatchEvent").as("dispatchEvent");
      cy.contains("Próximo").click();
      cy.get("@dispatchEvent").should("have.been.called");
    });
  });
});
