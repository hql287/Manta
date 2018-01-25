export default {
  header: {
    name: 'Criar uma nova Fatura',
    btns: {
      clear: 'Apagar',
      update: 'Atualizar',
      saveAndPreview: 'Guardar & Pré-visualizar',
    },
  },
  settings: {
    name: 'Opções de Formulário',
    hint: 'Mostrar/ocultar detalhes do formulário',
  },
  fields: {
    items: {
      name: 'Produto/Serviço',
      description: 'Descrição',
      price: 'Preço',
      quantity: 'Quantidade',
      add: 'Adicionar elemento',
    },
    recipient: {
      name: 'Destinatário',
      select: 'Selecionar',
      add: 'Adicionar',
      fullname: 'Nome Completo',
      company: 'Empresa',
      email: 'Email',
      phone: 'Telefone',
    },
    discount: {
      name: 'Desconto',
      percentage: 'Percentagem',
      flat: 'Valor Fixo',
    },
    dueDate: {
      name: 'Data de Vencimento',
      placeHolder: 'Selecionar Data',
    },
    tax: {
      name: 'Imposto',
      id: 'Número de Contribuinte',
      method: 'Método',
      reverse: 'Autoliquidação',
    },
    note: {
      name: 'Nota',
    },
    currency: {
      name: 'Moeda',
    },
  },
  common: {
    default: 'Predefinido',
    amount: 'Valor',
    saveAsDefault: 'Guardar como Predefinido?',
  },
};
