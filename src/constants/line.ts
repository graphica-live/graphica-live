export const LINE_OFFICIAL_ACCOUNT_ID = '@952xlela'

export const LINE_ADD_FRIEND_URL = 'https://line.me/R/ti/p/%40952xlela'

export function buildLineMessageUrl(message: string) {
  const encodedAccountId = encodeURIComponent(LINE_OFFICIAL_ACCOUNT_ID)
  const encodedMessage = encodeURIComponent(message)

  return `https://line.me/R/oaMessage/${encodedAccountId}/?${encodedMessage}`
}