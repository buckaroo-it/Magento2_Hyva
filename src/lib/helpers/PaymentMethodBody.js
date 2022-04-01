export function GetPaymentMethodBody(method, address, email, additionalData) {
  return {
    paymentMethod: {
      additional_data: additionalData,
      method,
    },
    email,
    billingAddress: {
      city: address.city,
      company: address.company,
      countryId: address.country,
      firstname: address.firstname,
      lastname: address.lastname,
      postcode: address.zipcode,
      region: address.region,
      street: address.street,
      telephone: address.phone,
    },
  };
}
