import myAxios from '@util/myAxios'

export interface SearchMembersRequestType {
  channelId: number
  searchKeyword: string
}

const getUserInfo = async () => {
  const response = await myAxios.get({ path: '/user/status' })
  return response.data
}

const getUsersByChannel = async ({ channelId }: { channelId: number }) => {
  const response = await myAxios.get({ path: `/user/channel/${channelId}` })
  return response.data
}

const searchMembers = async ({
  channelId,
  searchKeyword,
}: SearchMembersRequestType) => {
  const response = await myAxios.get({
    path: `/user/channel/${channelId}${
      searchKeyword ? `?searchKeyword=${searchKeyword}` : ''
    }`,
  })
  return response.data
}

export default {
  getUserInfo,
  getUsersByChannel,
  searchMembers,
}
