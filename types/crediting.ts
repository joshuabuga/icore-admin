
export interface CustomersToBeCredited {
    name: string;
    phoneNumber: string;
    amount: number;
}

// Marketing types
export interface Promos {
    id: string;
    title: string;
    info: {
        action: string;
        url: string;
        content: string;
        qualificationCriteria: [string];
        prizes: {
            maxAmount: number;
            maxWinnings: number;
            dailyWinners: number;
        };
        gameTypes: [];
        minimumOdds: number;
        timeRestrictions: {
            startTime: Date;
            endTime?: Date;
        };
    };
    description: string;
    carousel_image: string;
    image: string;
    start: Date;
    end: Date;
    terms_and_conditions: string;
    amount?: number;
    is_active: boolean;
}

export interface Campaign {
    id: string;
    title: string;
    description: string;
    is_active: boolean;
    message: {
        amount: number;
        name: string;
        phoneNumber: string;
    };
}

//Payments
export interface PaymentRecipient {
    name: string;
    phoneNumber: string;
    amount: number;
    httpStatus?: number; // HTTP status code from payment API (e.g., 200, 400, 404, 500)
    errorMessage?: string;
}

export interface Payments {
    id: string;
    batch_no: string;
    total_amount: number;
    particulars: string;
    status:
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED'
        | 'PROCESSING'
        | 'COMPLETED'
        | 'FAILED'
        | 'PARTIALLY_COMPLETED';
    csv: string;
    recipients: PaymentRecipient[];
    date_initiated: Date;
    date_approved: Date | null;
    approved_by: {
        name: string;
        role: string;
    } | null;
}

export interface CreditRequest {
    msisdn: string;
    amount: number;
    subject: string;
    description: string;
}

export interface SMSRequest {
    phone: string;
    amount: number;
    name?: string;
    message?: string;
    promo?: string;
}

export interface ProcessingResult {
    user_id: string;
    status: 'CREDITED' | 'FAILED' | 'PENDING';
    sms_status: string;
    error_message?: string;
    credit_response?: any;
}

export interface BatchProcessingConfig {
    api_key: string;
    api_url: string;
    sms_api_url: string;
    sms_config: {
        apikey: string;
        clientId: string;
        shortcode: string;
    };
}
