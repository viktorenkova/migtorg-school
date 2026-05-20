import { useState, type InputHTMLAttributes, type KeyboardEvent } from "react";

const PHONE_PREFIX = "+7";
const PHONE_DIGITS_LIMIT = 10;

const russianCities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Красноярск",
  "Самара",
  "Уфа",
  "Ростов-на-Дону",
  "Омск",
  "Краснодар",
  "Воронеж",
  "Пермь",
  "Волгоград",
  "Саратов",
  "Тюмень",
  "Тольятти",
  "Ижевск",
  "Барнаул",
  "Ульяновск",
  "Иркутск",
  "Хабаровск",
  "Ярославль",
  "Владивосток",
  "Махачкала",
  "Томск",
  "Оренбург",
  "Кемерово",
  "Новокузнецк",
  "Рязань",
  "Астрахань",
  "Набережные Челны",
  "Пенза",
  "Липецк",
  "Киров",
  "Чебоксары",
  "Калининград",
  "Тула",
  "Курск",
  "Сочи",
  "Ставрополь",
  "Улан-Удэ",
  "Тверь",
  "Магнитогорск",
  "Иваново",
  "Брянск",
  "Белгород",
  "Сургут",
  "Владимир",
  "Архангельск",
  "Чита",
  "Калуга",
  "Смоленск",
  "Волжский",
  "Курган",
  "Орел",
  "Череповец",
  "Вологда",
  "Саранск",
  "Мурманск",
  "Якутск",
  "Тамбов",
  "Стерлитамак",
  "Грозный",
  "Кострома",
  "Петрозаводск",
  "Новороссийск",
  "Йошкар-Ола"
] as const;

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "inputMode" | "pattern" | "maxLength"
>;

type CityInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "pattern"> & {
  listId: string;
};

function normalizePhoneValue(rawValue: string) {
  let digits = rawValue.replace(/\D/g, "");

  if (rawValue.trim().startsWith(PHONE_PREFIX) || (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8")))) {
    digits = digits.slice(1);
  }

  return `${PHONE_PREFIX}${digits.slice(0, PHONE_DIGITS_LIMIT)}`;
}

function normalizeCityValue(rawValue: string) {
  return rawValue.replace(/[^\p{L}\s-]/gu, "").replace(/\s{2,}/g, " ");
}

export function PhoneInput(props: PhoneInputProps) {
  const [value, setValue] = useState(PHONE_PREFIX);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return;
    }

    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <input
      {...props}
      type="tel"
      inputMode="numeric"
      maxLength={PHONE_PREFIX.length + PHONE_DIGITS_LIMIT}
      pattern="\+7[0-9]{10}"
      value={value}
      onChange={(event) => setValue(normalizePhoneValue(event.currentTarget.value))}
      onFocus={() => setValue((currentValue) => (currentValue.startsWith(PHONE_PREFIX) ? currentValue : PHONE_PREFIX))}
      onKeyDown={handleKeyDown}
    />
  );
}

export function CityInput({ listId, ...props }: CityInputProps) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        {...props}
        type="text"
        list={listId}
        pattern="[A-Za-zА-Яа-яЁё\s\-]{2,}"
        value={value}
        onChange={(event) => setValue(normalizeCityValue(event.currentTarget.value))}
      />
      <datalist id={listId}>
        {russianCities.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </>
  );
}
