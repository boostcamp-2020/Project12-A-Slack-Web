import { UserType } from '@type/user.type'

const getDMChannelTitle = (members: UserType[], memberCount: number) => {
  const memberNameString = members.reduce((prev, cur, curIdx, arr) => {
    const suffix = curIdx < arr.length - 1 ? ', ' : ''
    return prev + cur.name + suffix
  }, '')
  const moreMembers = memberCount - members.length
  return moreMembers > 0
    ? `${memberNameString}... and ${moreMembers} more`
    : memberNameString
}

export default getDMChannelTitle
