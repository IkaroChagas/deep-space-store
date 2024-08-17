export const fetchAddressByCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }
    return data;
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    throw error;
  }
};
