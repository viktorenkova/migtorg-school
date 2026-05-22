import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { useAuth } from "../auth";
import { ApiError } from "../api";
import { CityInput, PhoneInput } from "../components/FormFields";
import { GlowButton, Logo, SectionEyebrow } from "../components/ui";

type AuthPageProps = {
  mode: "login" | "register";
};

const experienceOptions = ["Новичок", "Автоброкер", "Автоподборщик", "СТО/ремонт", "Другое"];

const PASSWORD_MIN_LENGTH = 15;
const PASSWORD_MAX_LENGTH = 64;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+7\d{10}$/;
const CITY_PATTERN = /^[\p{L}\s-]{2,}$/u;

type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  experience: string;
  auctionExperience: string;
};

type RegistrationValidationError = {
  fieldName: keyof RegistrationPayload;
  message: string;
};

const registrationErrorMessages: Record<string, string> = {
  email_already_registered: "Этот email уже зарегистрирован. Войдите в аккаунт или используйте другой email.",
  registration_validation_failed: "Проверьте данные регистрации: одно или несколько полей заполнены некорректно.",
  school_course_not_configured: "Аккаунт не создан: программа школы еще не настроена. Напишите нам, и мы откроем доступ вручную.",
  request_failed: "Сервер вернул неожиданный ответ. Попробуйте еще раз чуть позже.",
  network_error: "Не удалось связаться с сервером. Проверьте интернет или попробуйте еще раз позже.",
  server_error: "Регистрация временно недоступна из-за ошибки сервера. Попробуйте позже.",
  unknown_error: "Не удалось создать аккаунт. Попробуйте еще раз или напишите нам."
};

function getRegistrationValidationError(payload: RegistrationPayload): RegistrationValidationError | null {
  if (!payload.name) {
    return { fieldName: "name", message: "Укажите имя, чтобы мы могли создать аккаунт." };
  }

  if (payload.name.length < 2) {
    return { fieldName: "name", message: "Имя должно содержать минимум 2 символа." };
  }

  if (!payload.phone || payload.phone === "+7") {
    return { fieldName: "phone", message: "Укажите телефон в формате +7XXXXXXXXXX." };
  }

  if (!PHONE_PATTERN.test(payload.phone)) {
    return { fieldName: "phone", message: "Телефон должен начинаться с +7 и содержать 10 цифр после кода страны." };
  }

  if (!payload.city) {
    return { fieldName: "city", message: "Укажите город, чтобы мы понимали ваш регион." };
  }

  if (!CITY_PATTERN.test(payload.city)) {
    return { fieldName: "city", message: "Город должен содержать минимум 2 буквы. Можно использовать пробелы и дефисы." };
  }

  if (!payload.email) {
    return { fieldName: "email", message: "Укажите email, на него будет привязан доступ к школе." };
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return { fieldName: "email", message: "Введите корректный email, например name@example.com." };
  }

  if (!payload.password) {
    return { fieldName: "password", message: "Придумайте пароль для входа в личный кабинет." };
  }

  if (payload.password.length < PASSWORD_MIN_LENGTH) {
    return { fieldName: "password", message: `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов.` };
  }

  if (payload.password.length > PASSWORD_MAX_LENGTH) {
    return { fieldName: "password", message: `Пароль должен быть не длиннее ${PASSWORD_MAX_LENGTH} символов.` };
  }

  if (!payload.experience) {
    return { fieldName: "experience", message: "Выберите ваш опыт в авто." };
  }

  if (!payload.auctionExperience) {
    return { fieldName: "auctionExperience", message: "Укажите, есть ли у вас опыт участия в автоаукционах." };
  }

  return null;
}

function focusFormField(form: HTMLFormElement, fieldName: string) {
  const field = form.elements.namedItem(fieldName);

  if (field instanceof HTMLElement) {
    field.focus();
  }
}

function getRegistrationSubmitErrorMessage(submitError: unknown) {
  if (submitError instanceof ApiError) {
    const mappedMessage = registrationErrorMessages[submitError.code];

    if (mappedMessage) {
      return mappedMessage;
    }

    if (submitError.status >= 500) {
      return registrationErrorMessages.server_error;
    }

    return registrationErrorMessages.unknown_error;
  }

  if (submitError instanceof TypeError) {
    return registrationErrorMessages.network_error;
  }

  return registrationErrorMessages.unknown_error;
}

export function AuthPage({ mode }: AuthPageProps) {
  const { user, isLoading, login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [experience, setExperience] = useState(experienceOptions[0]);
  const [auctionExperience, setAuctionExperience] = useState("Нет");
  const next = searchParams.get("next") ?? "/learn";
  const isRegister = mode === "register";

  if (!isLoading && user) {
    return <Navigate to={next} replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const registrationPayload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
      phone: String(form.get("phone") ?? "").trim(),
      city: String(form.get("city") ?? "").trim(),
      experience,
      auctionExperience
    };
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (isRegister) {
      const validationError = getRegistrationValidationError(registrationPayload);

      if (validationError) {
        setError(validationError.message);
        focusFormField(event.currentTarget, validationError.fieldName);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isRegister) {
        await register(registrationPayload);
      } else {
        await login({ email, password });
      }

      navigate(next, { replace: true });
    } catch (submitError) {
      if (isRegister) {
        setError(getRegistrationSubmitErrorMessage(submitError));
        return;
      }

      const message = submitError instanceof Error && submitError.message === "email_already_registered"
        ? "Этот email уже зарегистрирован. Войдите в аккаунт или используйте другой email."
        : "Не удалось выполнить вход. Проверьте данные и попробуйте еще раз.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-logo-link">
        <Logo href="/" />
      </div>

      <section className="auth-card">
        <div className="auth-copy">
          <SectionEyebrow>{isRegister ? "ДОСТУП К ШКОЛЕ" : "ЛИЧНЫЙ КАБИНЕТ"}</SectionEyebrow>
          <h1>{isRegister ? "Создайте аккаунт и откройте первый урок" : "Войдите, чтобы продолжить обучение"}</h1>
          <p>
            После регистрации уроки открываются последовательно: завершаете текущий материал и получаете доступ к следующему модулю.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate={isRegister}>
          {isRegister ? (
            <>
              <label>
                <span>Имя</span>
                <div className="auth-input">
                  <UserRound aria-hidden="true" />
                  <input name="name" autoComplete="name" required />
                </div>
              </label>
              <label>
                <span>Телефон</span>
                <div className="auth-input">
                  <Phone aria-hidden="true" />
                  <PhoneInput name="phone" autoComplete="tel" required />
                </div>
              </label>
              <label>
                <span>Город</span>
                <div className="auth-input">
                  <CityInput name="city" listId="auth-city-options" autoComplete="address-level2" required />
                </div>
              </label>
            </>
          ) : null}

          <label>
            <span>Email</span>
            <div className="auth-input">
              <Mail aria-hidden="true" />
              <input name="email" type="email" autoComplete="email" required />
            </div>
          </label>
          <label>
            <span>Пароль</span>
            <div className="auth-input auth-password-input">
              <LockKeyhole aria-hidden="true" />
              <input
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={isRegister ? PASSWORD_MIN_LENGTH : undefined}
                maxLength={isRegister ? PASSWORD_MAX_LENGTH : undefined}
                aria-describedby={isRegister ? "password-requirements" : undefined}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                aria-label={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
                aria-pressed={isPasswordVisible}
                onClick={() => setIsPasswordVisible((current) => !current)}
              >
                {isPasswordVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>
            {isRegister ? (
              <small id="password-requirements" className="auth-password-hint">
                Минимум 15 символов, максимум 64. Можно использовать буквы, цифры, пробелы и символы.
              </small>
            ) : null}
          </label>

          {isRegister ? (
            <>
              <fieldset className="auth-choice-group">
                <legend>Опыт в авто</legend>
                <div className="auth-segmented">
                  {experienceOptions.map((option) => (
                    <button key={option} type="button" className={experience === option ? "is-selected" : ""} onClick={() => setExperience(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="auth-choice-group">
                <legend>Есть опыт участия в автоаукционах?</legend>
                <div className="auth-toggle">
                  {["Да", "Нет"].map((option) => (
                    <button key={option} type="button" className={auctionExperience === option ? "is-selected" : ""} onClick={() => setAuctionExperience(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          ) : null}

          {error ? <p className="auth-error">{error}</p> : null}

          <GlowButton type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Проверяем..." : isRegister ? "Получить доступ к школе" : "Войти в кабинет"}
            <ArrowRight aria-hidden="true" />
          </GlowButton>

          <p className="auth-switch">
            {isRegister ? "Уже есть аккаунт?" : "Еще нет аккаунта?"}{" "}
            <Link to={isRegister ? `/auth/login?next=${encodeURIComponent(next)}` : `/auth/register?next=${encodeURIComponent(next)}`}>
              {isRegister ? "Войти" : "Зарегистрироваться"}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
