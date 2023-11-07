
type UserActivityListProps = {
  group: Array<any>
}

function GetHourFromDateString(date: string) {
  return date.substring(11, 19)
}

const UserActivityList = ({ group }: UserActivityListProps) => {

  return <>
    <ol>
      {group.map((el, ind) => {
        let typeText = ''
        if (el.type === 'sitevisited') {
          typeText = 'Website visited: '
        } else if (el.type === 'productadded') {
          typeText = 'Product added to cart: '
        } else if (el.type === 'productdeleted') {
          typeText = 'Product deleted from cart: '
        } else if (el.type === 'cartcleared') {
          typeText = 'Cart cleared'
        } else {
          typeText = 'Products bought'
        }
        return <li key={ind}>{typeText}{el.name}, 
          <span className="activity-hour">{GetHourFromDateString(el.date)}</span> 
        </li>
      })}
    </ol>
  </>
}

export default UserActivityList