import React from 'react'
import {List, ListItem, ListItemText} from '@material-ui/core'

const ItemList = props => {
  return (
    <List>
      {props.items.map(item => (
        <ListItem key={item.id}>
          <ListItemText primary={`${item.title} - ${item.guestId}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default ItemList
