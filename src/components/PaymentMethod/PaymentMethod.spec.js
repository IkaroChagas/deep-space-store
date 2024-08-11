import { shallowMount } from "@vue/test-utils";
import PaymentMethod from "./PaymentMethod.vue";

describe("PaymentMethod.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PaymentMethod, {
      propsData: {},
      mocks: {
        $t: (msg) => msg,
        $can: () => true,
        $toast: jest.fn()
      }
    });

    wrapper.vm.$refs = { form: { validate: jest.fn(() => true) } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Garantindo o comportamento do @Property [paymentMethod]", () => {
    it("Valor padrão deve ser uma string vazia", () => {
      const result = wrapper.vm.$options.props.paymentMethod.default();
      expect(result).toBe("");
    });
  });

  describe("Garantindo o comportamento do @Methods [validateCPF]", () => {
    it('Deve chamar $toast com "CPF inválido." para CPF limpo inválido', () => {
      wrapper.vm.$toast = jest.fn();
      wrapper.vm.validateCPF("000.000.000-00");
      expect(wrapper.vm.$toast).toHaveBeenCalledWith("CPF inválido.");
    });

    it('Deve chamar $toast com "CPF deve ter 11 dígitos." para CPF com menos de 11 dígitos', () => {
      wrapper.vm.$toast = jest.fn();
      wrapper.vm.validateCPF("123456789");
      expect(wrapper.vm.$toast).toHaveBeenCalledWith(
        "CPF deve ter 11 dígitos."
      );
    });

    it("Deve retornar true para CPF válido", () => {
      const result = wrapper.vm.validateCPF("12345678901");
      expect(result).toBe(true);
    });
  });

  describe("Garantindo o comportamento do @Methods [submit]", () => {
    it('Deve chamar $toast com "CPF é obrigatório para finalizar a compra." se CPF estiver vazio', () => {
      wrapper.vm.cpf = "";
      wrapper.vm.$refs.form.validate = jest.fn(() => false);
      wrapper.vm.submit();
      expect(wrapper.vm.$toast).toHaveBeenCalledWith(
        "CPF é obrigatório para finalizar a compra."
      );
    });

    it('Deve chamar $toast com "CPF inválido." se CPF for inválido', () => {
      wrapper.vm.cpf = "000.000.000-00";
      wrapper.vm.submit();
      expect(wrapper.vm.$toast).toHaveBeenCalledWith("CPF inválido.");
    });

    it("Deve chamar $emit com os dados corretos se todos os campos estiverem válidos", () => {
      const emitSpy = jest.spyOn(wrapper.vm, "$emit");
      wrapper.vm.cpf = "12345678901";
      wrapper.vm.paymentMethod = "card";
      wrapper.vm.cardNumber = "1234 5678 1234 5678";
      wrapper.vm.name = "Nome";
      wrapper.vm.validCard = "12/34";
      wrapper.vm.cvv = "123";
      wrapper.vm.$refs.form.validate = jest.fn(() => true);
      wrapper.vm.submit();
      expect(emitSpy).toHaveBeenCalledWith("finish", {
        paymentMethod: "card",
        cpf: "12345678901",
        cardNumber: "1234 5678 1234 5678",
        name: "Nome",
        validCard: "12/34",
        cvv: "123"
      });
    });

    it('Deve chamar $toast com "Preencha todos os campos corretamente." se o formulário não for válido', () => {
      wrapper.vm.$refs.form.validate = jest.fn(() => false);
      wrapper.vm.submit();
      expect(wrapper.vm.$toast).toHaveBeenCalledWith(
        "Preencha todos os campos corretamente."
      );
    });
  });
});
