import { unstable_noStore as noStore } from "next/cache";

interface GranteeInfo {
    NAME: string;
    DESCRIPTION: string;
    DUNE: string;
    LOGO: string;
    TWITTER: string;
    WEBSITE: string;
}

interface LlamaBool {
    LLAMA_COUNT: number;
}

interface GrantDateBool {
    GRANT_DATE_COUNT: number;
}

interface GranteeData {
    info: GranteeInfo[];
    wallets_chart: any[];
    gas_chart: any[];
    txns_chart: any[];
    tvl_chart: any[];
    llama_bool: LlamaBool[];
    grant_date: any[] | 0;
    grant_date_bool: GrantDateBool[];
    milestones: any[];
}

interface GranteeDataParams {
    timeframe: string;
    grantee_name: string;
}


export async function getGranteeData({ timeframe, grantee_name }: GranteeDataParams): Promise<GranteeData> {
    noStore();
    const response = await fetch(`https://arbigrants-api-i7bq.onrender.com/grantee?timeframe=${timeframe}&grantee_name=${grantee_name}`, {
        headers: {
            'X-API-Password': process.env.API_PASSWORD || ''
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const granteeData: GranteeData = await response.json();

    return granteeData;
}
