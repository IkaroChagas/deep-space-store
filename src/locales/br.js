export default {
  checkoutPage: {
    title: "DEEP SPACE STORE",
    subtitle: "Checkout",
    nextButtom: "Próximo",
    backButtom: "Voltar",
    personalDataTitle: "Dados Pessoais:",
    deliveryDataTitle: "Dados de Entrega:",
    paymentDataTitle: "Método de Pagamento:",
    finishCheckoutButtom: "Finalizar Compra",
    toast: {
      fetchOffer: "Erro ao buscar a oferta.",
      submitError: "Erro ao finalizar a compra.",
      warningStep: "Por favor, preencha todos os campos obrigatórios.",
      invalidCPF: "CPF inválido. Por favor, revise as informações."
    }
  },

  successPage: {
    title: "DEEP SPACE STORE",
    subtitle: "Pedido Realizado com Sucesso!",
    cardMethod: "Pagamento efetuado com sucesso, pedido realizado.",
    pixMethod: "Por favor, escaneie o QR Code para validar o pagamento.",
    boletoMethod: "Escaneie o código de barras no seu aplicativo bancário.",
    unknownMethod: "Método de pagamento desconhecido.",
    backButton: "Voltar para Home"
  },

  paymentMethhodComponent: {
    labels: {
      boleto: "Boleto",
      creditCard: "Cartão de Crédito",
      pix: "Pix",
      cpf: "CPF*",
      cardNumber: "Número do Cartão*",
      cardHolderName: "Nome do titular*",
      cardExpiry: "MM/AA*",
      cvv: "CVV*"
    },
    toast: {
      requiredField: "Campo obrigatório",
      cardNumber: "Número do cartão inválido",
      submitError: "Preencha todos os campos corretamente.",
      paymentError: "Método de pagamento não suportado",
      invalidCPF: "CPF inválido"
    }
  },

  deliveryDataComponent: {
    labels: {
      cep: "CEP*",
      address: "Endereço*",
      number: "Número*",
      neighborhood: "Bairro*",
      city: "Cidade*"
    },
    toast: {
      invalidCep: "Formato de CEP inválido.",
      fetchAddressError: "Erro ao buscar endereço.",
      requiredField: "Campo obrigatório!"
    },
    placeholders: {
      searching: "Buscando..."
    }
  },

  offerPage: {
    title: "Detalhes do Produto",
    includedItems: "Itens Inclusos",
    price: "Preço",
    paymentMethods: "Formas de Pagamento",
    loading: "Carregando..."
  },

  personalDataForm: {
    nameLabel: "Nome Completo*",
    emailLabel: "E-mail",
    phoneLabel: "Telefone*",
    rules: {
      required: "Campo obrigatório",
      invalidEmail: "E-mail inválido",
      invalidPhone: "Telefone deve ter pelo menos 11 dígitos"
    }
  }
};
