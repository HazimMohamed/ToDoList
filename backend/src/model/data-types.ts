interface Item {
  id: string;
  content: string;
}

interface User {
  id: string,
  name: string,
  profilePicture: string | undefined
}

interface Session {
  id: string,
  userId: string,
  expirationTime: Date
}

interface ItemCollection {
  id: string,
  name: string,
  items: Item[]
}

export { Item, Session, ItemCollection }