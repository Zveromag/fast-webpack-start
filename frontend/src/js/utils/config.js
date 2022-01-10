export default {
  modal: {
    stickySelectors: [
    ]
  },
  validator: {
    i18n: {
      required: 'Данное поле обязательно для заполнения',
      minLen: 'Минимально допустимое количество символов равно %s%',
      maxLen: 'Максимально допустимое количество символов равно %s%',
      email: 'Поле e-mail имеет неверный формат',
      number: 'Введенные данные должны быть числом',
      equalTo: 'Введенные данные не совпадают'
    },
    regex: {
      phone: {
        pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
        error: 'Неверный формат номера: пример +7 (xxx) xxx-xx-xx'
      }
    }
  }
};
