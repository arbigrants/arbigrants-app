import { unstable_noStore as noStore } from "next/cache";

interface OverviewDataParams {
    timeframe: string;
    timescale: string;
    chain: string;
    excludes?: string[];
}

interface OverviewData {
    time: string,
    wallets_stat: { ACTIVE_WALLETS: number }[],
    wallets_pct_stat: { PCT_WALLETS: number }[],
    tvl_stat: { TVL_GRANTEES: number }[],
    // tvl_pct_stat: { PCT_TVL: number }[],
    gas_stat: { GAS_SPEND: number }[],
    gas_pct_stat: { PCT_GAS_SPEND: number }[],
    tvl_chart: any[],
    tvl_chart_eth: any[],
    tvl_chart_post_grant: any[],
    tvl_chart_eth_post_grant: any[],
    accounts_chart: any[],
    accounts_chart_post_grant: any[],
    tvl_pie: any[],
    accounts_pie: any[],
    leaderboard: any[],
    milestones: any[],
    name_list: any[],
}

export async function getOverviewData({ timeframe, timescale, chain, excludes = [] }: OverviewDataParams): Promise<OverviewData> {
    noStore();

    let url = `https://arbigrants-api-i7bq.onrender.com/overview?timeframe=${timeframe}&timescale=${timescale}&chain=${chain}`;

    if (excludes.length > 0) {
        const excludesParam = excludes.map(e => `excludes=${encodeURIComponent(e)}`).join('&');
        url += `&${excludesParam}`;
    }

    const response = await fetch(url, {
        headers: {
            'X-API-Password': process.env.API_PASSWORD || ''
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const overviewData: OverviewData = await response.json();

    return overviewData;
}
