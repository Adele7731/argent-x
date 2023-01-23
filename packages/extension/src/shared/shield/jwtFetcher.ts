import { getJwt } from "@argent/guardian"

import { fetcher } from "../api/fetcher"
import { IS_DEV } from "../utils/dev"
import { coerceErrorToString } from "../utils/error"

/** wraps fetcher, generates and uses bearer jwt */

export const jwtFetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const jwt = await getJwt()
  const initWithArgentJwtHeaders = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  }
  try {
    return fetcher(input, initWithArgentJwtHeaders)
  } catch (error) {
    IS_DEV && console.warn(coerceErrorToString(error))
    throw error
  }
}
