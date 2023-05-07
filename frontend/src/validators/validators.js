import { string, object, array, ref } from 'yup'

export const validateCompanyProfile = object({
  nip: string()
    .matches(/^[0-9]{10}$/, 'NIP powinien składać się z 10 cyfr.')
    .required('Pole NIP jest obowiązkowe'),
  name: string()
    .required('Pole poziom stanowiska jest obowiązkowe')
    .max(255, 'Nazwa firmy może mieć maksymalnie 255 znaków.'),
  phone_number: string()
    .required('Pole numer telefonu jest obowiązkowe')
    .matches(/^\+\d{11}$/, 'Numer telefonu musi być w formacie +XX XXXXXXXXX'),
  email: string()
    .email('To nie jest prawidłowy adres email')
    .required('Pole adres email jest obowiązkowe'),
  location: object({
    street_address: string()
      .required('Pole ulica jest wymagane.')
      .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-\/]+$/, 'Pole ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika.')
      .max(255, 'Pole ulica może mieć maksymalnie 255 znaków.'),
    postal_code: string()
      .matches(/^\d{2}-\d{3}$/, 'Kod pocztowy powinien być w formacie XX-XXX.')
      .required('Kod pocztowy jest wymagany')
      .max(6, 'Kod pocztowy powinien być w formacie XX-XXX.'),
    city: string()
      .matches(/^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/, 'Miejscowość powinna składać się tylko z liter.')
      .required('Miejscowość jest wymagana')
      .max(255, 'Pole miejcowość może mieć maksymalnie 255 znaków.'),
  }),
  website: string()
    .matches(/^(ftp|http|https):\/\/[^ ']+$/, 'Niepoprawny format adresu strony internetowej.'),
  description: string()
    .required('Pole opis firmy jest obowiązkowe'),
  })

export const validateOffer = object({
  position: string()
    .required('Pole stanowisko jest obowiązkowe'),
  position_level: string()
    .required('Pole poziom stanowiska jest obowiązkowe'),
  salary: string()
    .matches(/^\d+(\s*-\s*\d+)?$/, 'Wynagrodzenie powinno być w formie pojedynczej kwoty bądź widełek płacowych.'),
  location: object({
    street_address: string()
      .required('Pole ulica jest wymagane.')
      .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-\/]+$/, 'Pole ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika.')
      .max(255, 'Pole ulica może mieć maksymalnie 255 znaków.'),
    postal_code: string()
      .matches(/^\d{2}-\d{3}$/, 'Kod pocztowy powinien być w formacie XX-XXX.')
      .required('Kod pocztowy jest wymagany')
      .max(6, 'Kod pocztowy powinien być w formacie XX-XXX.'),
    city: string()
      .matches(/^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/, 'Miejscowość powinna składać się tylko z liter.')
      .required('Miejscowość jest wymagana')
      .max(255, 'Pole miejcowość może mieć maksymalnie 255 znaków.'),
  }),
  working_mode: array()
    .min(1, 'Wybierz co najmniej jedną opcję'),
  working_time: array()
    .min(1, 'Wybierz co najmniej jedną opcję'),
  contract_type: array()
    .min(1, 'Wybierz co najmniej jedną opcję'),
  })

  export const validateNewUser = object({
    email: string()
      .email('To nie jest prawidłowy adres email')
      .required('Pole adres email jest obowiązkowe'),
    password: string()
      .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
      .matches(/[0-9]/, 'Hasło musi zawierać co najmniej 1. cyfrę')
      .matches(/[A-Z]/, 'Hasło musi zawierać co najmniej 1. wielką literę ')
      .required('Hasło jest obowiązkowe'),
    re_password: string()
      .oneOf([ref('password'), null], 'Wprowadzone hasła różnią się od siebie.')
      .required('Powtórz wprowadzone hasło'),
  })