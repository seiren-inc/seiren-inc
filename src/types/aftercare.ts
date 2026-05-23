export type AftercarePageKey = "index" | "survey" | "review" | "album";

export type SatisfactionScore = 1 | 2 | 3 | 4 | 5;

export type AftercarePageDefinition = {
  key: AftercarePageKey;
  title: string;
  heading: string;
  description: string;
  href: string;
  eyebrow: string;
};

export type AftercareSurveyInput = {
  overallSatisfaction: SatisfactionScore | null;
  staffSatisfaction: SatisfactionScore | null;
  comment: string;
  source: string;
  caseId?: string | null;
  token?: string | null;
};

export type AftercareSubmission = {
  id: string;
  createdAt: string;
  overallSatisfaction: SatisfactionScore;
  staffSatisfaction: SatisfactionScore;
  comment: string;
  reviewClick: boolean;
  albumClick: boolean;
  source: string;
  caseId?: string;
  aftercareToken?: string;
};

export type AftercareSubmissionResponse = {
  id: string;
  nextPath: string;
};

export type AftercareValidationErrors = Partial<
  Record<keyof AftercareSurveyInput, string>
>;

export type AftercareEventType = "review_click" | "album_click";

export type AftercareEventPayload = {
  id: string;
  eventType: AftercareEventType;
};

export type AftercareCaseRecord = {
  caseId: string;
  customerName: string;
  serviceDate: string;
  albumTitle: string;
  albumUrl: string;
  albumPassword: string;
  albumQrImageUrl: string;
  reviewUrl: string;
  reviewQrImageUrl: string;
  aftercareToken: string;
  aftercareUrl: string;
  pdfUrl: string;
  createdBy: string;
  configuredAt: string | null;
  verifiedBy: string;
  isConfigured: boolean;
  isVerified: boolean;
  isShipped: boolean;
  verifiedAt: string | null;
  shippedAt: string | null;
  notes: string;
};

export type AftercareCaseStatus = {
  isConfigured: boolean;
  isVerified: boolean;
  isShipped: boolean;
  isReadyForShipment: boolean;
};

export type AftercareResolvedCase = {
  caseRecord: AftercareCaseRecord | null;
  token: string | null;
};

export type AftercareCasePatch = {
  albumUrl?: string;
  albumPassword?: string;
  albumQrImageUrl?: string;
  reviewUrl?: string;
  reviewQrImageUrl?: string;
  pdfUrl?: string;
  aftercareUrl?: string;
  isConfigured?: boolean;
  configuredAt?: string | null;
};

export type AftercareGuideTemplateData = {
  caseId: string;
  customerName: string;
  serviceDate: string;
  serviceDateLabel: string;
  albumTitle: string;
  albumUrl: string;
  albumPassword: string;
  albumQrImageUrl: string;
  reviewUrl: string;
  reviewQrImageUrl: string;
  aftercareToken: string;
  aftercareUrl: string;
  pdfUrl: string;
  createdBy: string;
  configuredAt: string | null;
  verifiedBy: string;
  verifiedAt: string | null;
  shippedAt: string | null;
  notes: string;
  status: AftercareCaseStatus;
  reviewSection: {
    title: string;
    description: string;
    url: string;
    qrImageUrl: string;
  };
  albumSection: {
    title: string;
    description: string;
    url: string;
    password: string;
    qrImageUrl: string;
  };
};
