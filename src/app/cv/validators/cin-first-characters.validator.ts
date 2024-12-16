import { ValidatorFn } from "@angular/forms";

export const cinFirstCharactersValidator: ValidatorFn = (formControl) => {
  const error = {
    cinFirstCharacters: true,
  };

  const age = Number(formControl.get("age")?.value);
  const cin: string | undefined = formControl.get("cin")?.value;

  if (cin === undefined || !Number.isInteger(age) || age < 0) {
    return error;
  }

  const cinFirstCharacters = cin.substring(0, 2);
  const regex = new RegExp("\\d{2}");

  if (!regex.test(cinFirstCharacters)) {
    return error;
  }

  const cinFirstCharactersValue = Number(cinFirstCharacters);

  if (
    age >= 60 && cinFirstCharactersValue <= 19 ||
    age < 60 && cinFirstCharactersValue > 19
  ) {
    return null;
  }

  return error;
};
