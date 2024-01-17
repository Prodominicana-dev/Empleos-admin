export const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    
    // Verificar si hay un código de país (11 dígitos)
    const matchWithCountryCode = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (matchWithCountryCode) {
      return `+${matchWithCountryCode[1]} (${matchWithCountryCode[2]}) ${matchWithCountryCode[3]}-${matchWithCountryCode[4]}`;
    }
  
    // Verificar si es un número local (10 dígitos)
    const matchWithoutCountryCode = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (matchWithoutCountryCode) {
      return `(${matchWithoutCountryCode[1]}) ${matchWithoutCountryCode[2]}-${matchWithoutCountryCode[3]}`;
    }
  
    // Si no se puede aplicar el formato, devolver el número sin cambios
    return number;
  };