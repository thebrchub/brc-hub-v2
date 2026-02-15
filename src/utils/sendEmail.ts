type InquiryFormInput = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  companyOrWebsite?: string;
  services?: string[];
};

export type MailPorterPayload = {
  name: string;
  email: string;
  message: string;
  mobile: string;
  brand: string;
  services: string[];
  company: string;
  website: string;
};

const EMAIL_API_URL = import.meta.env.VITE_MAIL_PORTER_URL;
const EMAIL_API_KEY = import.meta.env.VITE_MAIL_PORTER_API_KEY;
const EMAIL_BRAND = import.meta.env.VITE_MAIL_PORTER_BRAND || "brchub";

const WEBSITE_REGEX = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

const normalizeCompanyWebsite = (value?: string) => {
  const input = value?.trim() || "";
  if (!input) return { company: "", website: "" };

  if (/^https?:\/\//i.test(input)) {
    return { company: "", website: input };
  }

  if (WEBSITE_REGEX.test(input)) {
    const website = /^https?:\/\//i.test(input) ? input : `https://${input}`;
    return { company: "", website };
  }

  return { company: input, website: "" };
};

export const buildInquiryPayload = (input: InquiryFormInput): MailPorterPayload => {
  const companyWebsite = normalizeCompanyWebsite(input.companyOrWebsite);

  return {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    mobile: (input.phone || "").trim(),
    brand: EMAIL_BRAND,
    services: input.services?.length ? input.services : [],
    company: companyWebsite.company,
    website: companyWebsite.website
  };
};

export const sendInquiryEmail = async (payload: MailPorterPayload) => {
  if (!EMAIL_API_URL || !EMAIL_API_KEY) {
    throw new Error("Email API is not configured. Set VITE_MAIL_PORTER_URL and VITE_MAIL_PORTER_API_KEY.");
  }

  const response = await fetch(EMAIL_API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": EMAIL_API_KEY
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Email request failed with status ${response.status}`);
  }
};
