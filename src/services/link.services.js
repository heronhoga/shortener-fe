import { getLinksApi } from "@/api/link.api";

export const getLinks = async (params) => {
  const { data } = await getLinksApi(params)
  return data
}