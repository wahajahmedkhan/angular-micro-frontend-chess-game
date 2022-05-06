import {CountryInterface} from '../country/country.interface';

export interface UserRegisterInterface {
  country: CountryInterface;
  username: string;
  password?: string;
  email: string;
  full_name?: string;
}

export interface UserSuccessfullyRegisterResponseInterface extends UserRegisterInterface {
  id: number;
}
