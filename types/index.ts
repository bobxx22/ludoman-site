export interface DexscreenerPairData {
  pair: {
    chainId: string
    dexId: string
    url: string
    pairAddress: string
    baseToken: {
      address: string
      name: string
      symbol: string
    }
    quoteToken: {
      symbol: string
    }
    priceNative: string
    priceUsd: string
    txns: {
      h24: {
        buys: number
        sells: number
      }
    }
    volume: {
      h24: number
    }
    priceChange: {
      h24: number
    }
    liquidity: {
      usd: number
    }
    marketCap: number
  }
}

export interface Transaction {
  id: string
  attributes: {
    block_timestamp: string
    tx_hash: string
    tx_from_address: string
    from_token_amount: string
    to_token_amount: string
    price_from_in_usd: string
    price_to_in_usd: string
    kind: string
    volume_in_usd: string
  }
}

export interface TableData {
  wallet: string
  amount: string
  cycleDay: string
  lockTime: string
}

export interface BurnedPairData {
  mintable: boolean
  total_supply: string
  admin: {
    address: string
    is_scam: boolean
    is_wallet: boolean
  }
  metadata: {
    address: string
    name: string
    symbol: string
    decimals: string
    image: string
    description: string
    social: string[]
    websites: string[]
  }
  preview: string
  verification: string
  holders_count: number
}

export type Language = "en" | "ru"

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}
