// Добавление сообщения
export const showInputError = (formElement, inputElement, validationConfigurate) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfigurate.inputErrorClass);    
    errorElement.classList.add(validationConfigurate.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  // Удаление  сообщения
 export const hideInputError = (formElement, inputElement, validationConfigurate) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
      inputElement.classList.remove(validationConfigurate.inputErrorClass);
      errorElement.classList.remove(validationConfigurate.errorClass);
      errorElement.textContent = "";
    }
  };
  
  // Проверка на валидность
 export const checkInputValidity = (formElement, inputElement, validationConfigurate) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfigurate);
    } else {
      hideInputError(formElement, inputElement, validationConfigurate);
    }
  };

  //Включение валидации
  export const setEventListeners = (formElement, validationConfigurate) => {
     const inputList = Array.from(formElement.querySelectorAll(validationConfigurate.inputSelector));
     const buttonElement = formElement.querySelector(validationConfigurate.submitButtonSelector);
     // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, validationConfigurate, buttonElement);
 
     inputList.forEach((inputElement) => {
       inputElement.addEventListener("input", function () {
         checkInputValidity(formElement, inputElement, validationConfigurate);
  // чтобы проверять его при изменении любого из полей
         toggleButtonState(inputList, validationConfigurate, buttonElement);
       });
     });
   };
   
  // Проверка, все ли поля прошли валидацию
 export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
    
  // добавление ко всем формам 
  export const enableValidation = (validationConfigurate) => {
    const formList = Array.from(document.querySelectorAll(validationConfigurate.formSelector));
    formList.forEach((formElement) => {        
      setEventListeners(formElement, validationConfigurate);
    });
  };
  
  // Очистка поля
export  function clearValidation(formElement, validationConfigurate) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfigurate.inputSelector));
    const buttonElementReturn = formElement.querySelector(validationConfigurate.inactiveButtonClass);
  
    inputList.forEach((inputElement) =>
      hideInputError(formElement, inputElement, validationConfigurate));
      formElement.reset();
    toggleButtonState(inputList, validationConfigurate, buttonElementReturn);
  }

  // включение и выключение  кнопки
 export const toggleButtonState = (inputList, validationConfigurate, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(validationConfigurate.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", false);
      buttonElement.classList.remove(validationConfigurate.inactiveButtonClass);
    }
  };

