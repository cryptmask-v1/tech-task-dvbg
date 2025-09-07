interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  user_id: number;
  title: string;
}

export type { User, Post };
