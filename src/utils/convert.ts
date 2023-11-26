export const getPageSizeAndOffset = (pageSize: string, offset: string) => {
  const parsedPageSize = parseInt(pageSize ?? '100', 10)
  const parsedOffset = parseInt(offset ?? '0', 10)
  return { parsedPageSize, parsedOffset }
}
