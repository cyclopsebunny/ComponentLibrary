import React, { useState } from 'react';
import { Button, CheckboxField, InputField } from '@component-library/core';

/**
 * OAuth mark SVGs — not part of @component-library/core (no Apple/Google icons in the library).
 * Used only for the sign-in-with-provider affordance.
 */
function AppleMarkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleMarkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const FONT = 'var(--sds-typography-body-font-family, "Inter", sans-serif)';
const TEXT_MUTED = 'var(--sds-color-text-default-secondary, #636363)';
const TEXT_DEFAULT = 'var(--sds-color-text-default-default, #191919)';
const BORDER_SUBTLE = 'var(--sds-color-border-disabled-default, #e2e8f0)';
const BG_PAGE = 'var(--sds-color-background-default-secondary, #f8fafc)';

type AuthMode = 'sign-in' | 'forgot-password';

/** Basic email shape: local@domain.tld (not exhaustive but catches obvious mistakes). */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** `null` when the value is a non-empty, valid email. */
function getEmailFieldError(value: string): string | null {
  const v = value.trim();
  if (!v) return 'Enter your email address.';
  if (!isValidEmail(v)) return 'Enter a valid email address.';
  return null;
}

export function LoginScreen() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [resetEmail, setResetEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [resetEmailError, setResetEmailError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);
    setEmailError(null);
    const emailMsg = getEmailFieldError(email);
    if (emailMsg) {
      setEmailError(emailMsg);
      return;
    }
    if (!password) {
      setStatusMessage('Enter your password.');
      return;
    }
    setStatusMessage(
      remember
        ? 'Demo: sign-in submitted (remember me on). Wire this to your auth API.'
        : 'Demo: sign-in submitted. Wire this to your auth API.',
    );
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);
    setResetEmailError(null);
    const resetMsg = getEmailFieldError(resetEmail);
    if (resetMsg) {
      setResetEmailError(resetMsg);
      return;
    }
    setStatusMessage(
      'Demo: password reset requested. Send a magic link or token to this email from your backend.',
    );
  }

  function handleApple() {
    setStatusMessage('Demo: start Apple Sign In (e.g. Sign in with Apple / OAuth redirect).');
  }

  function handleGoogle() {
    setStatusMessage('Demo: start Google OAuth (e.g. OpenID Connect redirect).');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontFamily: FONT,
        background: BG_PAGE,
      }}
    >
      {/* Branding / welcome */}
      <section
        aria-label="Welcome"
        style={{
          flex: '1 1 320px',
          minHeight: 280,
          padding: 'clamp(2rem, 5vw, 4rem)',
          background:
            'linear-gradient(145deg, var(--sds-color-background-brand-default, #0a76db) 0%, #063a7a 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.02em',
          }}
          aria-hidden
        >
          AC
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 400,
            fontSize: '1rem',
            lineHeight: 1.55,
            opacity: 0.92,
          }}
        >
          Sign in to access your workspace. Replace the logo initials with your product mark and tune
          this copy to match your brand voice.
        </p>
      </section>

      {/* Form panel */}
      <section
        aria-label={mode === 'sign-in' ? 'Sign in' : 'Forgot password'}
        style={{
          flex: '1 1 360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 400,
            background: '#fff',
            borderRadius: 12,
            border: `1px solid ${BORDER_SUBTLE}`,
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            boxShadow: '0 12px 40px rgba(15, 23, 42, 0.06)',
          }}
        >
          {mode === 'sign-in' ? (
            <>
              <h2
                style={{
                  margin: '0 0 0.35rem',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: TEXT_DEFAULT,
                }}
              >
                Sign in
              </h2>
              <p style={{ margin: '0 0 1.5rem', fontSize: 14, color: TEXT_MUTED, lineHeight: 1.5 }}>
                Use your work email or a social account.
              </p>

              <form onSubmit={handleSignIn} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <InputField
                    label="Email"
                    hasLabel
                    isRequired
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    onBlur={(ev) => setEmailError(getEmailFieldError(ev.target.value))}
                    outlined
                    state={emailError ? 'Error' : undefined}
                    hasError={Boolean(emailError)}
                    error={emailError ?? ''}
                  />
                  <InputField
                    label="Password"
                    hasLabel
                    isRequired
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    outlined
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    marginTop: 8,
                    marginBottom: 20,
                  }}
                >
                  <CheckboxField
                    label="Remember me"
                    checked={remember}
                    onChange={(ev) => setRemember(ev.target.checked)}
                  />
                  <Button
                    type="button"
                    variant="subtle"
                    label="Forgot password?"
                    onClick={() => {
                      setStatusMessage(null);
                      setEmailError(null);
                      setResetEmail(email);
                      setMode('forgot-password');
                    }}
                  />
                </div>

                <Button type="submit" variant="CTA" label="Sign in" style={{ width: '100%' }} />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    margin: '24px 0 16px',
                    color: TEXT_MUTED,
                    fontSize: 13,
                  }}
                >
                  <span style={{ flex: 1, height: 1, background: BORDER_SUBTLE }} />
                  <span style={{ whiteSpace: 'nowrap' }}>Or continue with</span>
                  <span style={{ flex: 1, height: 1, background: BORDER_SUBTLE }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleApple}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: 'none',
                    }}
                    iconStart={<AppleMarkIcon />}
                    hasIconStart
                  >
                    Apple
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleGoogle}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      color: TEXT_DEFAULT,
                      border: `1px solid ${BORDER_SUBTLE}`,
                    }}
                    iconStart={<GoogleMarkIcon />}
                    hasIconStart
                  >
                    Google
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2
                style={{
                  margin: '0 0 0.35rem',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: TEXT_DEFAULT,
                }}
              >
                Reset password
              </h2>
              <p style={{ margin: '0 0 1.5rem', fontSize: 14, color: TEXT_MUTED, lineHeight: 1.5 }}>
                Enter your email and we’ll send you a link to choose a new password.
              </p>

              <form onSubmit={handleForgotSubmit} noValidate>
                <InputField
                  label="Email"
                  hasLabel
                  isRequired
                  type="email"
                  name="reset-email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={resetEmail}
                  onChange={(ev) => {
                    setResetEmail(ev.target.value);
                    if (resetEmailError) setResetEmailError(null);
                  }}
                  onBlur={(ev) => setResetEmailError(getEmailFieldError(ev.target.value))}
                  outlined
                  state={resetEmailError ? 'Error' : undefined}
                  hasError={Boolean(resetEmailError)}
                  error={resetEmailError ?? ''}
                />
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Button type="submit" variant="CTA" label="Send reset link" style={{ width: '100%' }} />
                  <Button
                    type="button"
                    variant="subtle"
                    label="Back to sign in"
                    onClick={() => {
                      setStatusMessage(null);
                      setResetEmailError(null);
                      setMode('sign-in');
                    }}
                    style={{ width: '100%' }}
                  />
                </div>
              </form>
            </>
          )}

          {statusMessage && (
            <p
              role="status"
              style={{
                margin: '1.25rem 0 0',
                padding: '12px 14px',
                borderRadius: 8,
                fontSize: 14,
                lineHeight: 1.45,
                background: 'var(--sds-color-background-default-secondary, #f1f5f9)',
                color: TEXT_DEFAULT,
                border: `1px solid ${BORDER_SUBTLE}`,
              }}
            >
              {statusMessage}
            </p>
          )}

          {mode === 'sign-in' && (
            <p
              style={{
                margin: '1.5rem 0 0',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                flexWrap: 'wrap',
                columnGap: '0.35em',
                rowGap: 4,
                fontFamily: FONT,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  lineHeight: '22px',
                  color: TEXT_MUTED,
                }}
              >
                Don’t have an account?
              </span>
              <Button
                type="button"
                variant="subtle"
                label="Create one"
                onClick={() =>
                  setStatusMessage('Demo: navigate to your sign-up flow or open registration.')
                }
              />
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
