import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CircleCheckBig, Eye, EyeOff, KeyRound, Mail, ShieldAlert } from "lucide-react";
import { EMAIL_PATTERN, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../authValidation";
import { passwordRecovery } from "../passwordRecovery";
import { GlowButton, Logo, SectionEyebrow } from "../components/ui";

type PasswordRecoveryPageProps = {
  mode: "request" | "reset";
};

type RequestView = "form" | "confirmation";
type ResetView = "form" | "success";

function loginPath(next: string) {
  return `/auth/login?next=${encodeURIComponent(next)}`;
}

function PasswordToggle({
  visible,
  onToggle
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="auth-password-toggle"
      aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
      aria-pressed={visible}
      onClick={onToggle}
    >
      {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
    </button>
  );
}

export function PasswordRecoveryPage({ mode }: PasswordRecoveryPageProps) {
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") ?? "/learn";
  const token = searchParams.get("token") ?? "";

  return mode === "request" ? <ResetRequest next={next} /> : <NewPassword next={next} token={token} />;
}

function ResetRequest({ next }: { next: string }) {
  const [view, setView] = useState<RequestView>("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const submittedEmail = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(submittedEmail)) {
      setError("Введите корректный email, например name@example.com.");
      return;
    }

    setEmail(submittedEmail);
    setIsSubmitting(true);

    try {
      const result = await passwordRecovery.requestResetLink(submittedEmail);
      setIsPreview(result === "preview");
      setView("confirmation");
    } catch {
      setError("Не удалось отправить ссылку. Попробуйте еще раз чуть позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RecoveryShell
      eyebrow="ВОССТАНОВЛЕНИЕ ДОСТУПА"
      title="Верните доступ к обучению"
      description="Укажите email аккаунта. В рабочем сценарии на него придет одноразовая ссылка для создания нового пароля."
    >
      {view === "form" ? (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email</span>
            <div className="auth-input">
              <Mail aria-hidden="true" />
              <input name="email" type="email" autoComplete="email" required />
            </div>
          </label>

          <p className="auth-password-hint">
            Мы не будем сообщать, существует ли аккаунт с таким email.
          </p>

          {error ? <p className="auth-error" role="alert">{error}</p> : null}

          <GlowButton type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Проверяем..." : "Получить ссылку"}
            <ArrowRight aria-hidden="true" />
          </GlowButton>

          <AuthBackLink href={loginPath(next)} />
        </form>
      ) : (
        <div className="auth-form auth-recovery-status" aria-live="polite">
          <CircleCheckBig className="auth-status-icon is-success" aria-hidden="true" />
          <h2>Проверьте почту</h2>
          <p>
            Если аккаунт с email <strong>{email}</strong> существует, мы отправили ссылку для восстановления пароля.
            Проверьте также папку «Спам».
          </p>

          {isPreview ? (
            <p className="auth-preview-note" role="status">
              Демонстрационный режим: отправка email еще не подключена, письмо не отправлено.
            </p>
          ) : null}

          <Link className="auth-secondary-action" to={loginPath(next)}>
            Вернуться ко входу
          </Link>
          {isPreview ? (
            <Link className="auth-preview-link" to={`/auth/reset-password?token=preview&next=${encodeURIComponent(next)}`}>
              Посмотреть экран нового пароля
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      )}
    </RecoveryShell>
  );
}

function NewPassword({ next, token }: { next: string; token: string }) {
  const [view, setView] = useState<ResetView>("form");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const hasToken = token.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const passwordConfirmation = String(form.get("passwordConfirmation") ?? "");

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов.`);
      return;
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
      setError(`Пароль должен быть не длиннее ${PASSWORD_MAX_LENGTH} символов.`);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Пароли не совпадают. Проверьте ввод и попробуйте еще раз.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await passwordRecovery.setNewPassword(token, password);
      setIsPreview(result === "preview");
      setView("success");
    } catch {
      setError("Не удалось сохранить новый пароль. Запросите новую ссылку или попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RecoveryShell
      eyebrow="НОВЫЙ ПАРОЛЬ"
      title="Создайте новый пароль"
      description="Ссылка из письма откроет защищенную форму. После успешной смены пароля вы сможете вернуться к обучению."
    >
      {!hasToken ? (
        <div className="auth-form auth-recovery-status">
          <ShieldAlert className="auth-status-icon" aria-hidden="true" />
          <h2>Ссылка недействительна</h2>
          <p>Срок действия ссылки истек или она уже была использована. Запросите новую ссылку для восстановления.</p>
          <Link className="auth-secondary-action" to={`/auth/forgot-password?next=${encodeURIComponent(next)}`}>
            Запросить новую ссылку
          </Link>
          <AuthBackLink href={loginPath(next)} />
        </div>
      ) : view === "form" ? (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Новый пароль</span>
            <div className="auth-input auth-password-input">
              <KeyRound aria-hidden="true" />
              <input
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
                aria-describedby="reset-password-requirements"
                required
              />
              <PasswordToggle visible={isPasswordVisible} onToggle={() => setIsPasswordVisible((current) => !current)} />
            </div>
          </label>
          <label>
            <span>Повторите пароль</span>
            <div className="auth-input auth-password-input">
              <KeyRound aria-hidden="true" />
              <input
                name="passwordConfirmation"
                type={isConfirmationVisible ? "text" : "password"}
                autoComplete="new-password"
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
                required
              />
              <PasswordToggle
                visible={isConfirmationVisible}
                onToggle={() => setIsConfirmationVisible((current) => !current)}
              />
            </div>
            <small id="reset-password-requirements" className="auth-password-hint">
              Минимум {PASSWORD_MIN_LENGTH} символов, максимум {PASSWORD_MAX_LENGTH}.
            </small>
          </label>

          {error ? <p className="auth-error" role="alert">{error}</p> : null}

          <GlowButton type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем..." : "Сохранить новый пароль"}
            <ArrowRight aria-hidden="true" />
          </GlowButton>
          <AuthBackLink href={loginPath(next)} />
        </form>
      ) : (
        <div className="auth-form auth-recovery-status" aria-live="polite">
          <CircleCheckBig className="auth-status-icon is-success" aria-hidden="true" />
          <h2>Пароль изменен</h2>
          <p>Теперь вы можете войти в кабинет с новым паролем и продолжить обучение.</p>

          {isPreview ? (
            <p className="auth-preview-note" role="status">
              Демонстрационный режим: backend еще не подключен, пароль аккаунта не изменен.
            </p>
          ) : null}

          <Link className="auth-secondary-action" to={loginPath(next)}>
            Перейти ко входу
          </Link>
        </div>
      )}
    </RecoveryShell>
  );
}

function AuthBackLink({ href }: { href: string }) {
  return (
    <Link className="auth-back-link" to={href}>
      <ArrowLeft aria-hidden="true" />
      Вернуться ко входу
    </Link>
  );
}

function RecoveryShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="auth-shell">
      <div className="auth-logo-link">
        <Logo href="/" />
      </div>

      <section className="auth-card auth-recovery-card">
        <div className="auth-copy">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
