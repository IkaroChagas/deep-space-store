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
      fetchOffer: "Erro ao buscar oferta.",
      warningStep: "Por favor, preencha todos os campos do formulário.",
      submitError: "Erro ao finalizar a compra"
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
      fetchAddressError: "Erro ao buscar endereço."
    },
    placeholders: {
      searching: "Buscando..."
    }
  }
};
