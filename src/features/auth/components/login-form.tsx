"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/brand-logo";
import {
  BdFlagIcon,
  CloseIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/icons";

const land =
  "motion-safe:animate-[cb-land-in_0.42s_ease-out_both] motion-reduce:animate-none";

type DropdownOption = {
  value: string;
  label: string;
};

type DobSelectProps = {
  placeholder: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  fieldId?: string;
  onHover?: (
    fieldId: string,
    event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>,
  ) => void;
  onHide?: () => void;
  minTypeaheadLength?: number;
  typeaheadPattern?: RegExp;
  disabled?: boolean;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  onMouseMove?: (event: React.MouseEvent) => void;
};

function DobSelect({
  placeholder,
  value,
  options,
  onChange,
  fieldId,
  onHover,
  onHide,
  minTypeaheadLength = 1,
  typeaheadPattern,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}: DobSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchBufferRef = useRef("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const runTypeahead = (typedChar: string) => {
    if (typeaheadPattern && !typeaheadPattern.test(typedChar)) return;
    const nextBuffer = `${searchBufferRef.current}${typedChar.toLowerCase()}`;
    const normalizedBuffer =
      minTypeaheadLength > 1 ? nextBuffer.slice(-minTypeaheadLength) : nextBuffer;
    searchBufferRef.current = normalizedBuffer;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchBufferRef.current = "";
    }, 650);

    if (normalizedBuffer.length < minTypeaheadLength) return;

    const match = options.find((option) =>
      option.label.toLowerCase().startsWith(normalizedBuffer),
    );
    if (match) onChange(match.value);
  };

  return (
    <div className="relative z-20 pointer-events-auto" ref={rootRef}>
      <button
        type="button"
        {...(disabled ? {
          onMouseEnter,
          onMouseLeave,
          onMouseMove
        } : {
          onMouseEnter: (e) => fieldId && onHover?.(fieldId, e),
          onMouseLeave: () => onHide?.(),
          onMouseMove: undefined
        })}
        onFocus={(e) => !disabled && fieldId && onHover?.(fieldId, e)}
        onBlur={() => onHide?.()}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const currentIndex = options.findIndex((option) => option.value === value);
            const direction = e.key === "ArrowDown" ? 1 : -1;
            const nextIndex =
              currentIndex === -1
                ? e.key === "ArrowDown"
                  ? 0
                  : options.length - 1
                : (currentIndex + direction + options.length) % options.length;
            onChange(options[nextIndex].value);
            setOpen(true);
            return;
          }

          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
            return;
          }

          if (e.key === "Escape") {
            setOpen(false);
            return;
          }

          if (e.key === "Backspace") {
            e.preventDefault();
            searchBufferRef.current = searchBufferRef.current.slice(0, -1);
            return;
          }

          if (e.key.length === 1 && /\S/.test(e.key)) {
            e.preventDefault();
            runTypeahead(e.key);
          }
        }}
        className={`relative w-full rounded-[16px] border border-transparent bg-white px-4 py-3 text-left text-base outline-none transition-colors duration-200 ease-out dark:bg-[#0A0A0A] dark:text-white ${
          disabled ? 'cursor-not-allowed opacity-50 dark:opacity-50' : 'text-zinc-900 hover:border-[#06392F] focus:border-[#06392F]'
        }`}
      >
        {selectedLabel ?? placeholder}
      </button>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-700 dark:text-zinc-400">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="m5 7 5 6 5-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {open ? (
        <div className="absolute bottom-full left-0 right-0 z-30 mb-1 max-h-56 overflow-auto rounded-[16px] border border-zinc-200 bg-white py-1 shadow-lg shadow-zinc-900/15 dark:border-zinc-800 dark:bg-[#0A0A0A] scrollbar-hide">
          <button
            type="button"
            className="block w-full px-4 py-2 text-center text-base text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
            role="option"
            aria-selected={!value}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="block w-full px-4 py-2 text-center text-base text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/5 cursor-pointer"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type FieldTooltip = {
  id: string;
  message: string;
};

const signupNameExamples = [
  "Rafiq Hossain",
  "Tahmina Akter",
  "Arman Mia",
  "Mithila Sultana",
  "Sabbir Ahmed",
  "Nusrat Jahan",
  "Jahangir Alam",
  "Shathi Rahman",
  "Faisal Karim",
  "Lina Akhtar",
];

const fieldTooltips: Record<string, string> = {
  "signup-name": "Write your full name here.",
  "signup-email": "We'll not send you any unwanted emails",
  "signup-phone": "We'll not share your phone number with anyone",
  "signup-birth-day": "Select the day you were born",
  "signup-birth-month": "Choose the month you were born",
  "signup-birth-year": "Pick the year you were born",
  "signup-username": "Find a fabulous username, something unique that represents you!",
  "signup-password": "Create a password",
  "signup-confirm-password": "Confirm your password",
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupName, setSignupName] = useState("");
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [tooltipArrowLeft, setTooltipArrowLeft] = useState(16);
  const [disabledTooltipVisible, setDisabledTooltipVisible] = useState(false);
  const [disabledTooltipPos, setDisabledTooltipPos] = useState({ top: 0, left: 0 });
  const [disabledTooltipArrowLeft, setDisabledTooltipArrowLeft] = useState(16);
  const [tooltipNameIndex, setTooltipNameIndex] = useState(0);
  const [tooltipNameHidden, setTooltipNameHidden] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const disabledTooltipRef = useRef<HTMLDivElement>(null);
  const activeFieldRef = useRef<
    HTMLInputElement | HTMLSelectElement | HTMLButtonElement | null
  >(null);
  const tooltipNameIntervalRef = useRef<number | null>(null);
  const tooltipNameFadeTimeoutRef = useRef<number | null>(null);

  const getCaretLeft = (input: HTMLInputElement) => {
    const style = window.getComputedStyle(input);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return input.getBoundingClientRect().left + 12;

    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const value = input.value.slice(0, input.selectionStart ?? input.value.length);
    const textWidth = context.measureText(value).width;
    const paddingLeft = parseFloat(style.paddingLeft || "0") || 0;
    return input.getBoundingClientRect().left + paddingLeft + textWidth - input.scrollLeft;
  };

  const updateTooltipPosition = (
    field: HTMLInputElement | HTMLSelectElement | HTMLButtonElement,
  ) => {
    const rect = field.getBoundingClientRect();
    const fieldLeft = field instanceof HTMLInputElement ? getCaretLeft(field) : rect.left + 12;
    const tooltipWidth = tooltipRef.current?.offsetWidth ?? 280;
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 72;

    const panelRect = createModalPanelRef.current?.getBoundingClientRect();
    const minLeft = panelRect ? panelRect.left + 12 : 12;
    const maxLeft = panelRect ? panelRect.right - tooltipWidth - 12 : window.innerWidth - tooltipWidth - 12;
    const naturalLeft = fieldLeft - 8;
    const clampedLeft = Math.min(Math.max(naturalLeft, minLeft), maxLeft);
    const arrowLeft = Math.min(Math.max(fieldLeft - clampedLeft, 12), tooltipWidth - 12);

    const minTop = panelRect ? panelRect.top + 12 : 12;
    const maxTop = panelRect ? panelRect.bottom - tooltipHeight - 12 : window.innerHeight - tooltipHeight - 12;
    const clampedTop = Math.min(Math.max(rect.bottom + 12, minTop), maxTop);

    setTooltipPos({
      top: clampedTop,
      left: clampedLeft,
    });
    setTooltipArrowLeft(arrowLeft);
  };

  const updateDisabledTooltipPosition = (event: React.MouseEvent) => {
    const tooltipWidth = disabledTooltipRef.current?.offsetWidth ?? 280;
    const tooltipHeight = disabledTooltipRef.current?.offsetHeight ?? 72;

    const panelRect = createModalPanelRef.current?.getBoundingClientRect();
    const minLeft = panelRect ? panelRect.left + 12 : 12;
    const maxLeft = panelRect ? panelRect.right - tooltipWidth - 12 : window.innerWidth - tooltipWidth - 12;
    const clampedLeft = Math.min(Math.max(event.clientX - 8, minLeft), maxLeft);
    const arrowLeft = Math.min(Math.max(event.clientX - clampedLeft, 12), tooltipWidth - 12);

    const minTop = panelRect ? panelRect.top + 12 : 12;
    const maxTop = panelRect ? panelRect.bottom - tooltipHeight - 12 : window.innerHeight - tooltipHeight - 12;
    const clampedTop = Math.min(Math.max(event.clientY + 12, minTop), maxTop);

    setDisabledTooltipPos({
      top: clampedTop,
      left: clampedLeft,
    });
    setDisabledTooltipArrowLeft(arrowLeft);
  };

  const handleDisabledFieldMouseEnter = (event: React.MouseEvent) => {
    setDisabledTooltipVisible(true);
    updateDisabledTooltipPosition(event);
  };

  const handleDisabledFieldMouseLeave = () => {
    setDisabledTooltipVisible(false);
  };

  const handleDisabledFieldMouseMove = (event: React.MouseEvent) => {
    if (disabledTooltipVisible) {
      updateDisabledTooltipPosition(event);
    }
  };

  useEffect(() => {
    if (activeFieldId !== "signup-name") return;

    setTooltipNameHidden(false);
    tooltipNameIntervalRef.current && window.clearInterval(tooltipNameIntervalRef.current);
    tooltipNameFadeTimeoutRef.current && window.clearTimeout(tooltipNameFadeTimeoutRef.current);

    tooltipNameIntervalRef.current = window.setInterval(() => {
      setTooltipNameHidden(true);
      tooltipNameFadeTimeoutRef.current = window.setTimeout(() => {
        setTooltipNameIndex((currentIndex) => {
          let nextIndex = Math.floor(Math.random() * signupNameExamples.length);
          while (signupNameExamples.length > 1 && nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * signupNameExamples.length);
          }
          return nextIndex;
        });
        setTooltipNameHidden(false);
      }, 300);
    }, 2800);

    return () => {
      tooltipNameIntervalRef.current && window.clearInterval(tooltipNameIntervalRef.current);
      tooltipNameFadeTimeoutRef.current && window.clearTimeout(tooltipNameFadeTimeoutRef.current);
    };
  }, [activeFieldId]);


  const handleFieldFocus = (
    fieldId: string,
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement> | React.MouseEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
  ) => {
    setActiveFieldId(fieldId);
    activeFieldRef.current = event.currentTarget;
    updateTooltipPosition(event.currentTarget);
  };

  const handleFieldBlur = () => {
    setActiveFieldId(null);
    activeFieldRef.current = null;
  };

  const handleTooltipActivity = (
    event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
  ) => {
    updateTooltipPosition(event.currentTarget);
  };

  useEffect(() => {
    if (!activeFieldRef.current) return;

    const handleInputCursorChange = () => {
      if (!activeFieldRef.current) return;
      updateTooltipPosition(activeFieldRef.current);
    };

    document.addEventListener("selectionchange", handleInputCursorChange);
    document.addEventListener("keydown", handleInputCursorChange);
    document.addEventListener("keyup", handleInputCursorChange);

    return () => {
      document.removeEventListener("selectionchange", handleInputCursorChange);
      document.removeEventListener("keydown", handleInputCursorChange);
      document.removeEventListener("keyup", handleInputCursorChange);
    };
  }, [activeFieldId]);

  const moveFocusToNextField = (form: HTMLFormElement, current: HTMLElement) => {
    const fields = Array.from(
      form.querySelectorAll<HTMLElement>(
        'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button[type="button"]:not([disabled])',
      ),
    ).filter((field) => field.offsetParent !== null);

    const currentIndex = fields.findIndex((field) => field === current);
    const nextField = fields[currentIndex + 1];

    if (nextField) {
      nextField.focus();
      return true;
    }

    return false;
  };

  const handleFormKeyDown = (event: ReactKeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement;
    if (
      !target ||
      !(target instanceof HTMLElement) ||
      !["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)
    ) {
      return;
    }

    const form = event.currentTarget;
    if (!moveFocusToNextField(form, target)) {
      return;
    }

    event.preventDefault();
  };
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [verificationPopupOpen, setVerificationPopupOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isPhoneVerifying, setIsPhoneVerifying] = useState(false);
  const [isPhoneNumberTaken, setIsPhoneNumberTaken] = useState(false);
  const usedPhoneNumbers = ["1555123456", "1712345678", "1888123456"];
  const [signupStep1Attempted, setSignupStep1Attempted] = useState(false);
  const [signupStep2Attempted, setSignupStep2Attempted] = useState(false);
  const createModalPanelRef = useRef<HTMLDivElement>(null);
  const createAccountTriggerRef = useRef<HTMLAnchorElement>(null);

  const monthOptions: DropdownOption[] = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  const dayOptions: DropdownOption[] = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  const yearOptions: DropdownOption[] = Array.from({ length: 100 }, (_, i) => {
    const year = String(new Date().getFullYear() - i);
    return { value: year, label: year };
  });

  const isSignupNameValid = signupName.trim().length >= 2;
  const isSignupEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.trim());
  const isSignupPhoneValid = /^\d{10}$/.test(signupPhone);
  const isSignupPhoneAvailable = isSignupPhoneValid && !isPhoneNumberTaken && !isPhoneVerifying;
  const isBirthDateComplete = Boolean(birthDay && birthMonth && birthYear);
  const canContinueSignupStep1 = isSignupNameValid && isSignupEmailValid && isSignupPhoneAvailable && isBirthDateComplete;

  const signupEmailTooltipError =
    signupEmail.trim().length >= 5 && !isSignupEmailValid
      ? "Email format is invalid."
      : undefined;
  const signupEmailTooltipInfo =
    signupEmail.trim().length >= 5 && !isSignupEmailValid
      ? "A valid email has an @ symbol, such as name@example.com."
      : undefined;

  const signupPhoneTooltipError =
    signupPhone.length >= 5 && !isSignupPhoneValid
      ? "Phone number format is invalid."
      : undefined;
  const signupPhoneTooltipInfo =
    signupPhone.length >= 5 && !isSignupPhoneValid
      ? "Enter 10 digits for Bangladesh phone number."
      : undefined;
  const signupPhoneInUseError =
    isSignupPhoneValid && isPhoneNumberTaken
      ? "This number is already associated with an account."
      : undefined;

  const isUsernameValid = signupUsername.trim().length >= 3;
  const isPasswordValid = signupPassword.length >= 6;
  const isConfirmPasswordValid = signupPassword === signupConfirmPassword && signupConfirmPassword.length > 0;
  const canContinueSignupStep2 =
    isUsernameValid && isPasswordValid && isConfirmPasswordValid;

  const signupUsernameTooltipError =
    signupUsername.trim().length > 0 && !isUsernameValid
      ? "Username must be at least 3 characters."
      : undefined;
  const signupUsernameTooltipInfo =
    signupUsername.trim().length > 0 && !isUsernameValid
      ? "Pick something unique that is easy to remember."
      : undefined;
  const signupPasswordTooltipError =
    signupPassword.length > 0 && !isPasswordValid
      ? "Password must be at least 6 characters."
      : undefined;
  const signupPasswordTooltipInfo =
    signupPassword.length > 0 && !isPasswordValid
      ? "Use a longer password with numbers or symbols for better security."
      : undefined;
  const signupConfirmPasswordTooltipError =
    signupConfirmPassword.length > 0 && !isConfirmPasswordValid
      ? "Passwords do not match."
      : undefined;
  const signupConfirmPasswordTooltipInfo =
    signupConfirmPassword.length > 0 && !isConfirmPasswordValid
      ? "Re-enter your password exactly as above."
      : undefined;
  const canContinueSignup =
    signupStep === 1 ? canContinueSignupStep1 : canContinueSignupStep2;

  const handleSignupSubmit = () => {
    if (signupStep === 1) {
      setSignupStep1Attempted(true);
      if (!canContinueSignupStep1) return;
      setSignupStep(2);
      setSignupStep2Attempted(false);
      return;
    }
    setSignupStep2Attempted(true);
    if (!canContinueSignupStep2) return;
    setCreateModalOpen(false);
  };

  const startPhoneVerification = () => {
    if (!isSignupPhoneAvailable || isPhoneVerifying) return;
    const phoneInput = document.getElementById("signup-phone") as HTMLInputElement | null;
    setActiveFieldId("signup-phone");
    activeFieldRef.current = phoneInput;
    if (phoneInput) updateTooltipPosition(phoneInput);
    setVerificationPopupOpen(true);
    setResendTimer(60);
  };

  useEffect(() => {
    if (signupPhone.length === 10) {
      // Stop verification animation when 10th digit is entered
      setIsPhoneVerifying(false);
      setIsPhoneNumberTaken(usedPhoneNumbers.includes(signupPhone));
    } else if (signupPhone.length > 0 && signupPhone.length < 10) {
      // Keep verifying animation active while user is typing digits 1-9
      setIsPhoneVerifying(true);
    } else if (signupPhone.length === 0) {
      // Stop verification when field is cleared
      setIsPhoneVerifying(false);
    }
  }, [signupPhone]);

  useEffect(() => {
    if (!createModalOpen) return;
    const triggerEl = createAccountTriggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: globalThis.globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setCreateModalOpen(false);
      if (e.key !== "Tab") return;
      const panel = createModalPanelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    setTimeout(() => {
      createModalPanelRef.current
        ?.querySelector<HTMLElement>('button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])')
        ?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerEl?.focus();
    };
  }, [createModalOpen]);

  useEffect(() => {
    if (verificationPopupOpen && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [verificationPopupOpen, resendTimer]);

  return (
    <>
      <form onKeyDown={handleFormKeyDown} suppressHydrationWarning className="login-form w-full min-w-0 max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-900/5 transition-shadow duration-300 ease-out motion-safe:animate-[cb-modal-in_0.48s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none dark:border-white/5 dark:bg-[#0A0A0A] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)] dark:ring-0 sm:p-8 relative">
        <div
          suppressHydrationWarning
          className={`${land} mb-6 text-center motion-safe:[animation-delay:40ms]`}
        >
        <div className="mb-6 leading-none">
          <BrandLogo className="text-[2.25rem] tracking-tight text-zinc-900 dark:text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Back to the drop
        </h1>
        <p className="mx-auto mt-2 w-full max-w-none text-[13px] leading-snug text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-relaxed">
          Sign in to manage your listings, saved finds, and fit picks.
        </p>
        </div>

      <div suppressHydrationWarning className={`${land} motion-safe:[animation-delay:100ms]`}>
        <label
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
          htmlFor="email"
        >
          Email address
        </label>
        <div className="relative mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-700 dark:text-zinc-400">
            <MailIcon className="h-5 w-5" />
          </div>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-14 w-full rounded-[16px] border border-transparent bg-white pl-12 pr-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F]"
            required
          />
        </div>
      </div>

      <div suppressHydrationWarning className={`${land} motion-safe:[animation-delay:160ms]`}>
        <label
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-700 dark:text-zinc-400">
            <LockIcon className="h-5 w-5" />
          </div>
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-14 w-full rounded-[16px] border border-transparent bg-white pl-12 pr-12 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-3 flex cursor-pointer items-center justify-center rounded-md px-1 text-zinc-700 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06392F]/35 dark:text-zinc-400"
          >
            {showPassword ? (
              <EyeOpenIcon className="h-5 w-5" />
            ) : (
              <EyeClosedIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        suppressHydrationWarning
        className={`${land} mt-3 mb-5 flex items-center justify-between gap-4 text-sm motion-safe:[animation-delay:220ms]`}
      >
        <label className="flex cursor-pointer items-center gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="remember-box">
            <input type="checkbox" name="remember" aria-label="Remember me" />
            <svg viewBox="0 0 64 64" height="1.25em" width="1.25em" aria-hidden="true">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938"
                className="remember-path"
              />
            </svg>
          </span>
          Remember me
        </label>
        <a
          href="#"
          className="relative inline-block cursor-pointer whitespace-nowrap font-semibold text-zinc-800 no-underline transition-colors duration-200 ease-out after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-[#06392F] after:origin-center after:transition-transform after:duration-300 after:ease-out hover:text-zinc-900 hover:after:scale-x-100 active:text-zinc-900 active:after:scale-x-100 dark:text-zinc-200 dark:hover:text-white dark:active:text-white"
        >
          Forgot Password?
        </a>
      </div>

        <div suppressHydrationWarning className={`${land} motion-safe:[animation-delay:280ms]`}>
          <button
            type="submit"
            className="relative h-14 w-full cursor-pointer overflow-hidden rounded-[16px] bg-black px-5 text-base font-semibold text-white shadow-sm shadow-black/20 transition-colors duration-300 ease-out after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-[#06392F] after:transition-transform after:duration-500 after:ease-out hover:text-white hover:after:scale-[30] active:text-white active:after:scale-[30] focus:text-white focus:after:scale-[30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06392F]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-black dark:shadow-sm dark:shadow-black/30 dark:hover:text-white dark:active:text-white dark:focus:text-white dark:focus-visible:ring-offset-black"
          >
            <span className="relative z-10">Log in</span>
          </button>
        </div>

      <p
        className={`${land} mt-5 text-center text-sm text-zinc-600 motion-safe:[animation-delay:340ms] dark:text-zinc-400`}
      >
        New here?{" "}
        <a
          href="#"
          ref={createAccountTriggerRef}
          onClick={(e) => {
            e.preventDefault();
            setSignupStep(1);
            setCreateModalOpen(true);
          }}
          className="relative inline-block cursor-pointer font-semibold text-zinc-900 no-underline transition-colors duration-200 ease-out after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-[#06392F] after:origin-center after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 active:after:scale-x-100 dark:text-white"
        >
          Create an account
        </a>
      </p>

        <div
          suppressHydrationWarning
          className={`${land} mt-4 text-center text-[11px] font-medium tracking-wide text-zinc-500 motion-safe:[animation-delay:400ms] dark:text-zinc-500`}
        >
          Secured by{" "}
          <span className="text-zinc-700 dark:text-zinc-300">Classified</span>
        </div>
      </form>

      {createModalOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-4">
              <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-[backdrop-filter,filter,background-color] duration-300 ease-out motion-safe:animate-[cb-backdrop-in_0.22s_ease-out_both] dark:bg-black/55"
                aria-label="Close create account popup"
                onClick={() => setCreateModalOpen(false)}
              />
              <div
                ref={createModalPanelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-account-title"
                className="relative z-10 flex max-h-[92dvh] w-full max-w-xl flex-col overflow-y-auto rounded-3xl border border-zinc-200 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3 text-zinc-900 shadow-[0_20px_80px_rgba(0,0,0,0.28)] transition-[box-shadow,transform] duration-300 ease-out motion-safe:animate-[cb-modal-in_0.36s_cubic-bezier(0.16,1,0.3,1)_0.06s_both] motion-reduce:animate-none dark:border-zinc-900 dark:bg-[#0A0A0A] dark:text-zinc-100 dark:shadow-[0_20px_80px_rgba(0,0,0,0.72)] sm:max-h-[88dvh] sm:px-8 sm:pb-6 sm:pt-5"
              >
                <div className="mb-7 grid grid-cols-3 items-center">
                  {signupStep === 2 ? (
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="inline-flex h-10 w-10 items-center justify-center justify-self-start rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label="Go back"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <path
                          d="m14.5 6.5-5 5 5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ) : (
                    <span className="h-10 w-10 justify-self-start" aria-hidden="true" />
                  )}
                  <BrandLogo className="justify-self-center text-[2.25rem] tracking-tight text-zinc-900 dark:text-zinc-100" />
                  {signupStep === 1 ? (
                    <button
                      type="button"
                      onClick={() => setCreateModalOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label="Close"
                    >
                      <CloseIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <span className="h-10 w-10 justify-self-end" aria-hidden="true" />
                  )}
                </div>

                <form
                  id="create-account-form"
                  className="mx-auto w-full max-w-md"
                  noValidate
                  onKeyDown={handleFormKeyDown}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSignupSubmit();
                  }}
                >
                  <div className="overflow-x-hidden">
                    <div
                      className={`flex w-[200%] transition-transform duration-500 ease-out ${
                        signupStep === 1 ? "translate-x-0" : "-translate-x-1/2"
                      }`}
                    >
                      <div className="w-1/2 pr-0 sm:pr-1 relative">
                        <h2 id="create-account-title" className="text-center text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                          Create your account
                        </h2>
                        <p className="mt-2 text-center text-[13px] leading-snug text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-relaxed">
                          Join Classified to manage listings, saved finds, and your profile in one place.
                        </p>

                        <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500 dark:text-zinc-400">
                              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                                <path
                                  d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.25 7.5a7.25 7.25 0 0 1 14.5 0"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <input
                              id="signup-name"
                              type="text"
                              placeholder="Full name"
                              aria-label="Full name"
                              aria-invalid={!isSignupNameValid}
                              autoComplete="name"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              onFocus={(e) => handleFieldFocus("signup-name", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              required
                              className="h-14 w-full rounded-[16px] border border-transparent bg-white pl-12 pr-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F]"
                            />
                          </div>
                          <div 
                            className="relative"
                            onMouseEnter={(!isSignupNameValid || isPhoneVerified) ? handleDisabledFieldMouseEnter : undefined}
                            onMouseLeave={(!isSignupNameValid || isPhoneVerified) ? handleDisabledFieldMouseLeave : undefined}
                            onMouseMove={(!isSignupNameValid || isPhoneVerified) ? handleDisabledFieldMouseMove : undefined}
                          >
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500 dark:text-zinc-400">
                              <MailIcon className="h-5 w-5" />
                            </div>
                            <input
                              id="signup-email"
                              type="email"
                              placeholder="Email address"
                              autoComplete="email"
                              aria-invalid={!isSignupEmailValid}
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              onFocus={(e) => handleFieldFocus("signup-email", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              disabled={!isSignupNameValid || isPhoneVerified}
                              required
                              className={`h-14 w-full rounded-[16px] border border-transparent bg-white pl-12 pr-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F] ${
                                !isSignupNameValid || isPhoneVerified ? 'cursor-not-allowed' : ''
                              }`}
                            />
                          </div>
                          <div 
                            className="relative"
                            onMouseEnter={(!isSignupEmailValid || isPhoneVerified) ? handleDisabledFieldMouseEnter : undefined}
                            onMouseLeave={(!isSignupEmailValid || isPhoneVerified) ? handleDisabledFieldMouseLeave : undefined}
                            onMouseMove={(!isSignupEmailValid || isPhoneVerified) ? handleDisabledFieldMouseMove : undefined}
                          >
                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                              <PhoneIcon className="h-5 w-5" />
                              <BdFlagIcon className="h-3.5 w-5 shrink-0 rounded-[2px]" />
                              <span className="text-sm font-medium">+880</span>
                            </div>
                            <input
                              id="signup-phone"
                              type="tel"
                              placeholder="Phone Number"
                              autoComplete="tel"
                              aria-label="Bangladesh phone number"
                              aria-invalid={!isSignupPhoneValid}
                              value={signupPhone}
                              onChange={(e) => {
                                let digits = e.target.value.replace(/\D/g, "");
                                // First digit must be "1", block any other digit for first position
                                if (digits.length > 0 && digits[0] !== "1") {
                                  digits = "1" + digits.slice(1);
                                }
                                // Only allow up to 10 digits
                                digits = digits.slice(0, 10);
                                const wasEmpty = signupPhone.length === 0;
                                setSignupPhone(digits);
                                if (isPhoneVerified) setIsPhoneVerified(false);
                                // Animation will start automatically via useEffect when first digit is entered
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && isSignupPhoneValid && !isPhoneNumberTaken) {
                                  startPhoneVerification();
                                }
                              }}
                              onFocus={(e) => handleFieldFocus("signup-phone", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              disabled={!isSignupEmailValid || isPhoneVerified}
                              inputMode="numeric"
                              maxLength={10}
                              pattern="\d{10}"
                              required
                              className={`h-14 w-full rounded-[16px] border border-transparent bg-white pl-28 pr-16 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F] ${
                                !isSignupEmailValid ? 'cursor-not-allowed' : ''
                              }`}
                            />
                            {signupPhone.length === 10 && !isPhoneVerified && !isPhoneNumberTaken && !isPhoneVerifying && (
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={startPhoneVerification}
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 px-3 flex items-center justify-center bg-gradient-to-br from-[#06392F] to-[#052A24] text-white text-xs font-semibold rounded-[10px] active:scale-95 transition-all duration-300 ease-out border border-[#06392F]/50 cursor-pointer"
                              >
                                Verify
                              </button>
                            )}
                            {isPhoneVerified && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/40 animate-in zoom-in-50 duration-500 ease-out">
                                <svg className="h-5 w-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Date of birth</h3>
                          <p className="mt-2 max-w-xl text-[13px] leading-snug text-zinc-600 dark:text-zinc-500 sm:text-sm sm:leading-relaxed">
                            This will not be shown publicly. Confirm your age to continue creating your personal account.
                          </p>

                    <div className="relative z-20 mt-4 grid grid-cols-3 gap-2 pointer-events-auto sm:mt-5 sm:gap-3">
                            <div
                              onMouseEnter={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseEnter : undefined}
                              onMouseLeave={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseLeave : undefined}
                              onMouseMove={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseMove : undefined}
                            >
                              <DobSelect
                                fieldId="signup-birth-day"
                                placeholder="Day"
                                value={birthDay}
                                options={dayOptions}
                                onChange={setBirthDay}
                                onHover={handleFieldFocus}
                                onHide={handleFieldBlur}
                                disabled={!isSignupPhoneValid}
                              />
                            </div>
                            <div
                              onMouseEnter={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseEnter : undefined}
                              onMouseLeave={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseLeave : undefined}
                              onMouseMove={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseMove : undefined}
                            >
                              <DobSelect
                                fieldId="signup-birth-month"
                                placeholder="Month"
                                value={birthMonth}
                                options={monthOptions}
                                onChange={setBirthMonth}
                                onHover={handleFieldFocus}
                                onHide={handleFieldBlur}
                                disabled={!isSignupPhoneValid}
                              />
                            </div>
                            <div
                              onMouseEnter={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseEnter : undefined}
                              onMouseLeave={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseLeave : undefined}
                              onMouseMove={(!isSignupPhoneValid || !isPhoneVerified) ? handleDisabledFieldMouseMove : undefined}
                            >
                              <DobSelect
                                fieldId="signup-birth-year"
                                placeholder="Year"
                                value={birthYear}
                                options={yearOptions}
                                onChange={setBirthYear}
                                onHover={handleFieldFocus}
                                onHide={handleFieldBlur}
                                minTypeaheadLength={4}
                                typeaheadPattern={/\d/}
                                disabled={!isSignupPhoneValid}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2 pl-4 sm:pl-5">
                        <h2 className="text-center text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                          Secure your account
                        </h2>
                        <p className="mt-2 text-center text-[13px] leading-snug text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-relaxed">
                          Choose a username and password to finish your account setup.
                        </p>

                        <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                          <div
                            onMouseEnter={!isBirthDateComplete ? handleDisabledFieldMouseEnter : undefined}
                            onMouseLeave={!isBirthDateComplete ? handleDisabledFieldMouseLeave : undefined}
                            onMouseMove={!isBirthDateComplete ? handleDisabledFieldMouseMove : undefined}
                          >
                            <input
                              id="signup-username"
                              type="text"
                              placeholder="Username"
                              value={signupUsername}
                              onChange={(e) => setSignupUsername(e.target.value)}
                              onFocus={(e) => handleFieldFocus("signup-username", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              disabled={!isBirthDateComplete}
                              className={`h-14 w-full rounded-[16px] border border-transparent bg-white px-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F] ${
                                !isBirthDateComplete ? 'cursor-not-allowed' : ''
                              }`}
                            />
                          </div>
                          <div
                            onMouseEnter={!isUsernameValid ? handleDisabledFieldMouseEnter : undefined}
                            onMouseLeave={!isUsernameValid ? handleDisabledFieldMouseLeave : undefined}
                            onMouseMove={!isUsernameValid ? handleDisabledFieldMouseMove : undefined}
                          >
                            <input
                              id="signup-password"
                              type="password"
                              placeholder="Password (min 6 characters)"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              onFocus={(e) => handleFieldFocus("signup-password", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              disabled={!isUsernameValid}
                              className={`h-14 w-full rounded-[16px] border border-transparent bg-white px-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F] ${
                                !isUsernameValid ? 'cursor-not-allowed' : ''
                              }`}
                            />
                          </div>
                          <div
                            onMouseEnter={!isPasswordValid ? handleDisabledFieldMouseEnter : undefined}
                            onMouseLeave={!isPasswordValid ? handleDisabledFieldMouseLeave : undefined}
                            onMouseMove={!isPasswordValid ? handleDisabledFieldMouseMove : undefined}
                          >
                            <input
                              id="signup-confirm-password"
                              type="password"
                              placeholder="Confirm password"
                              value={signupConfirmPassword}
                              onChange={(e) => setSignupConfirmPassword(e.target.value)}
                              onFocus={(e) => handleFieldFocus("signup-confirm-password", e)}
                              onInput={handleTooltipActivity}
                              onKeyUp={handleTooltipActivity}
                              onClick={handleTooltipActivity}
                              onBlur={handleFieldBlur}
                              disabled={!isPasswordValid}
                              className={`h-14 w-full rounded-[16px] border border-transparent bg-white px-4 text-base text-zinc-900 outline-none transition-colors duration-200 ease-out placeholder:text-zinc-400 focus:border-[#06392F] dark:bg-[#0A0A0A] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-[#06392F] ${
                                !isPasswordValid ? 'cursor-not-allowed' : ''
                              }`}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </form>

                <div className="mx-auto mt-6 w-full max-w-md sm:mt-8">
                  <button
                    type="submit"
                    form="create-account-form"
                    aria-disabled={!canContinueSignup}
                    className={`relative h-14 w-full overflow-hidden rounded-[16px] px-5 text-base font-semibold transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06392F]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black ${
                      canContinueSignup
                        ? "cursor-pointer bg-black text-white shadow-sm shadow-black/20 after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-[#06392F] after:transition-transform after:duration-500 after:ease-out hover:text-white hover:after:scale-[30] active:text-white active:after:scale-[30] focus:text-white focus:after:scale-[30] dark:bg-white dark:text-black dark:shadow-sm dark:shadow-black/30 dark:hover:text-white dark:active:text-white dark:focus:text-white"
                        : "cursor-not-allowed bg-zinc-300 text-zinc-500 after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-zinc-400/40 after:transition-transform after:duration-500 after:ease-out hover:bg-zinc-300/90 hover:after:scale-[30] dark:bg-zinc-700 dark:text-zinc-400 dark:after:bg-zinc-500/25 dark:hover:bg-zinc-700/90 dark:hover:after:scale-[30]"
                    }`}
                  >
                    <span className="relative z-10 text-base">
                      {signupStep === 1 ? "Continue" : "Create account"}
                    </span>
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {verificationPopupOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
              <div className="mx-4 w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-900/5 dark:border-white/5 dark:bg-[#0A0A0A] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)] dark:ring-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Verify Phone Number
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    We've sent a 4-digit verification code to +880{signupPhone}
                  </p>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter 4-digit code"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setVerificationCode(value);
                      }}
                      className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-center text-lg font-mono text-zinc-900 outline-none focus:border-[#06392F] dark:border-zinc-600 dark:bg-[#0A0A0A] dark:text-white"
                      maxLength={4}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setVerificationPopupOpen(false)}
                      className="flex-1 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (verificationCode.length === 4) {
                          // Handle verification logic here
                          setIsPhoneVerified(true);
                          setVerificationPopupOpen(false);
                          setVerificationCode("");
                        }
                      }}
                      disabled={verificationCode.length !== 4}
                      className="flex-1 rounded-lg bg-[#06392F] px-4 py-2 text-sm font-medium text-white hover:bg-[#052A24] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (resendTimer === 0) {
                        setResendTimer(60);
                        // Handle resend logic here
                      }
                    }}
                    disabled={resendTimer > 0}
                    className="mt-4 w-full text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      {activeFieldId && (fieldTooltips[activeFieldId] || activeFieldId === "signup-name" || activeFieldId === "signup-email" || activeFieldId === "signup-phone") && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={tooltipRef}
              className="fixed z-50 max-w-[18rem] min-w-0 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none animate-in fade-in duration-200 break-words"
              style={{
                top: `${tooltipPos.top}px`,
                left: `${tooltipPos.left}px`,
                border: "1px solid #7D39EB",
                color: "#ffffff",
              }}
            >
              <div className="flex items-start gap-2 whitespace-normal">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#7D39EB]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.488 281.488" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M140.744 0C63.138 0 0 63.138 0 140.744s63.138 140.744 140.744 140.744 140.744-63.138 140.744-140.744S218.351 0 140.744 0m0 263.488C73.063 263.488 18 208.426 18 140.744S73.063 18 140.744 18s122.744 55.063 122.744 122.744-55.063 122.744-122.744 122.744" />
                    <path d="m163.374 181.765-16.824 9.849v-71.791a9 9 0 0 0-13.143-7.989l-23.981 12.436a9 9 0 0 0-3.847 12.132 9 9 0 0 0 12.133 3.847l10.838-5.62v72.684a9.003 9.003 0 0 0 9 9 9 9 0 0 0 4.546-1.232l30.371-17.778a9 9 0 0 0 3.221-12.314c-2.511-4.29-8.025-5.734-12.314-3.224" />
                    <circle cx="137.549" cy="86.612" r="12.435" />
                  </svg>
                </span>
                <div className="leading-5 whitespace-normal">
                  {activeFieldId === "signup-name" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {/* Validation Errors */}
                      {signupName.trim().length > 0 && !isSignupNameValid && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">Name too short</p>
                            <p className="text-xs text-white/70">Enter at least 2 characters</p>
                          </div>
                        </div>
                      )}

                      {/* Status */}
                      {signupName.trim().length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isSignupNameValid ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Valid name</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <div className="flex-1 bg-white/15 rounded-full h-0.5">
                                  <div
                                    className="bg-blue-400 h-0.5 rounded-full transition-all duration-300"
                                    style={{ width: `${(signupName.trim().length / 2) * 100}%` }}
                                  />
                                </div>
                                <span className="text-[9px] text-white/50 ml-1">{signupName.trim().length}/2</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Privacy */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Your name stays private</p>
                        </div>
                      </div>
                    </div>
                  ) : activeFieldId === "signup-email" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {/* Validation Errors */}
                      {signupEmailTooltipError && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">{signupEmailTooltipError}</p>
                            <p className="text-xs text-white/70">{signupEmailTooltipInfo}</p>
                          </div>
                        </div>
                      )}

                      {/* Status */}
                      {signupEmail.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isSignupEmailValid ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Valid email</span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-xs text-white/70">Enter valid email</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <div className="flex-1 bg-white/15 rounded-full h-0.5">
                                    <div
                                      className="bg-blue-400 h-0.5 rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min((signupEmail.length / 20) * 100, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-[9px] text-white/50 ml-1">{signupEmail.length}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Privacy */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Your email stays private</p>
                        </div>
                      </div>
                    </div>
                  ) : activeFieldId === "signup-username" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {signupUsernameTooltipError && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">{signupUsernameTooltipError}</p>
                            <p className="text-xs text-white/70">{signupUsernameTooltipInfo}</p>
                          </div>
                        </div>
                      )}
                      {signupUsername.trim().length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isUsernameValid ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Valid username</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <p className="text-xs text-white/70">Enter at least 3 characters</p>
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 bg-white/15 rounded-full h-0.5">
                                    <div
                                      className="bg-blue-400 h-0.5 rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min((signupUsername.trim().length / 3) * 100, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-[9px] text-white/50 ml-1">{signupUsername.trim().length}/3</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Your username stays private and is only used for login.</p>
                        </div>
                      </div>
                    </div>
                  ) : activeFieldId === "signup-password" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {signupPasswordTooltipError && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">{signupPasswordTooltipError}</p>
                            <p className="text-xs text-white/70">{signupPasswordTooltipInfo}</p>
                          </div>
                        </div>
                      )}
                      {signupPassword.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isPasswordValid ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Strong enough</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <p className="text-xs text-white/70">Add at least 6 characters</p>
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 bg-white/15 rounded-full h-0.5">
                                    <div
                                      className="bg-blue-400 h-0.5 rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min((signupPassword.length / 6) * 100, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-[9px] text-white/50 ml-1">{signupPassword.length}/6</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Passwords are encrypted and never shared.</p>
                        </div>
                      </div>
                    </div>
                  ) : activeFieldId === "signup-confirm-password" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {signupConfirmPasswordTooltipError && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">{signupConfirmPasswordTooltipError}</p>
                            <p className="text-xs text-white/70">{signupConfirmPasswordTooltipInfo}</p>
                          </div>
                        </div>
                      )}
                      {signupConfirmPassword.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isConfirmPasswordValid ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Passwords match</span>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-xs text-white/70">Confirm password to match.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Only you can see your password values.</p>
                        </div>
                      </div>
                    </div>
                  ) : activeFieldId === "signup-phone" ? (
                    <div className="space-y-3 break-words max-w-[16rem] sm:max-w-[18rem]">
                      {/* Validation Errors */}
                      {signupPhoneTooltipError && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Error</span>
                          </div>
                          <div className="pl-1.5 border-l border-red-400/40 space-y-0.5">
                            <p className="text-xs font-medium text-red-400">{signupPhoneTooltipError}</p>
                            <p className="text-xs text-white/70">{signupPhoneTooltipInfo}</p>
                          </div>
                        </div>
                      )}

                      {/* Verification Status */}
                      {signupPhone.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                          </div>
                          <div className="pl-1.5 border-l border-blue-400/40 space-y-1">
                            {isPhoneVerifying ? (
                              <div className="flex items-center gap-2">
                                <span className="inline-flex h-3.5 w-3.5 animate-spin rounded-full border border-white/40 border-t-white" />
                                <span className="text-xs text-white">Checking number...</span>
                              </div>
                            ) : signupPhone.length === 10 && isSignupPhoneValid && !isPhoneNumberTaken ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-green-400">
                                  <span className="text-xs">✓</span>
                                  <span className="text-xs font-medium">Valid number</span>
                                </div>
                                <p className="text-xs text-white/70">Click verify button</p>
                              </div>
                            ) : signupPhone.length === 10 && isSignupPhoneValid && isPhoneNumberTaken ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5 text-red-400">
                                  <span className="text-xs">✗</span>
                                  <span className="text-xs font-medium">Number taken</span>
                                </div>
                                <p className="text-xs text-white/70">Use different number</p>
                              </div>
                            ) : signupPhone.length > 0 && signupPhone.length < 10 ? (
                              <div className="space-y-1">
                                <p className="text-xs text-white/70">Enter 10 digits</p>
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 bg-white/15 rounded-full h-0.5">
                                    <div
                                      className="bg-blue-400 h-0.5 rounded-full transition-all duration-300"
                                      style={{ width: `${(signupPhone.length / 10) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-[9px] text-white/50 ml-1">{signupPhone.length}/10</span>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {/* Privacy */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Privacy</span>
                        </div>
                        <div className="pl-1.5 border-l border-purple-400/40">
                          <p className="text-xs text-white/70">Your phone number stays private</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    fieldTooltips[activeFieldId]
                  )}
                </div>
              </div>
              <div
                className="absolute -top-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent"
                style={{ left: `${tooltipArrowLeft}px`, borderBottomColor: "#7D39EB" }}
              />
            </div>,
            document.body,
          )
        : null}

      {disabledTooltipVisible && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={disabledTooltipRef}
              className="fixed z-[60] max-w-[18rem] min-w-0 bg-zinc-900/90 backdrop-blur-md text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none animate-in fade-in duration-200 break-words"
              style={{
                top: `${disabledTooltipPos.top}px`,
                left: `${disabledTooltipPos.left}px`,
                border: "1px solid #7D39EB",
                color: "#ffffff",
              }}
            >
              <div className="flex items-start gap-2 whitespace-normal">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#7D39EB]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.488 281.488" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M140.744 0C63.138 0 0 63.138 0 140.744s63.138 140.744 140.744 140.744 140.744-63.138 140.744-140.744S218.351 0 140.744 0m0 263.488C73.063 263.488 18 208.426 18 140.744S73.063 18 140.744 18s122.744 55.063 122.744 122.744-55.063 122.744-122.744 122.744" />
                    <path d="m163.374 181.765-16.824 9.849v-71.791a9 9 0 0 0-13.143-7.989l-23.981 12.436a9 9 0 0 0-3.847 12.132 9 9 0 0 0 12.133 3.847l10.838-5.62v72.684a9.003 9.003 0 0 0 9 9 9 9 0 0 0 4.546-1.232l30.371-17.778a9 9 0 0 0 3.221-12.314c-2.511-4.29-8.025-5.734-12.314-3.224" />
                    <circle cx="137.549" cy="86.612" r="12.435" />
                  </svg>
                </span>
                <div className="leading-5 whitespace-normal">
                  <p className="text-sm text-white/80">
                    {isPhoneVerified ? "This information is submi" : "Complete the previous field to unlock this"}
                  </p>
                </div>
              </div>
              <div
                className="absolute -top-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent"
                style={{ left: `${disabledTooltipArrowLeft}px`, borderBottomColor: "#7D39EB" }}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
