import { SelectInterface } from '@avla/ui-design';

export type CountryLanguages = 'es' | 'en' | 'pt';

export const flagsSelection: SelectInterface[] = [
  {key: 'chile', value: 'Chile', icon: 'chile'},
  {key: 'mexico', value: 'Mexico', icon: 'mexico'},
  {key: 'peru', value: 'Peru', icon: 'peru'},
  {key: 'usa', value: 'USA', icon: 'usa'},
  {key: 'brazil', value: 'Brasil', icon: 'brazil'},
];

export const countryLanguages: { [key: string]: string } = {
  chile: 'CL',
  peru: 'PE',
  mexico: 'MX',
  brazil: 'BR',
  usa: 'US',
};

export enum CountryLanguage {
  CHILE= 'CL',
  PERU= 'PE',
  MEXICO= 'MX',
  BRAZIL= 'BR',
  USA= 'US',
}

export const countryIsoLanguages: { [key: string]: string } = {
  CL: 'es',
  PE: 'es',
  MX: 'es',
  BR: 'pt',
  US: 'en',
};

// * Return array of languages Keys
// * Example: ['CL', 'PE', 'MX', 'BR', 'US']
export const countryIsoKeys: string[] = Object.keys(countryIsoLanguages);

// * Return by default the first item on flagSelection array.
// * Example:  { key: 'chile', value: 'Chile' }
export const flagsSelectionDefault = flagsSelection[0];

// * Return the values of flagsSelection in an array list.
// * Example ['Chile','Peru','Mexico','USA]
export const flagsSelectionValues = Object.values(
  flagsSelection.map((flag) => flag.value as string),
);

// * Return selected Iso Country by default example: CL | PE | MX | BR | US
export const flagSelectionValueDefault =
  countryLanguages[flagsSelectionValues[0].toLowerCase().trim()];

// * Return 'es' | 'en' | 'pt' values selected default
export const CountryLanguageValueDefault =
  countryIsoLanguages[flagSelectionValueDefault];

export const flagsSelectionLocation = 'svg/flags/';

// * List of active countries for the country-select dropdown
export const countriesActive = ['BR'];