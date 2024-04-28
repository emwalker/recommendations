'use client';

import { useEffect, useState } from "react";

type User = {
  id: string,
  username: string,
}

type UserListResponse = {
  total: Number,
  items: User[],
  page: Number,
}

async function fetchUsers(): Promise<UserListResponse> {
  const res = await fetch('http://localhost:3000/api/users', { cache: 'no-cache' })

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  return res.json()
}

export default function GET() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function thunk() {
      const res = await fetchUsers()
      setUsers(res.items)
    }

    thunk()
  }, [setUsers])

  return (
    <main className="p-24">
      <h1 className="font-bold text-xl mb-4">
        List of users
      </h1>

      <ul className="mb-4">
        {
          users.map(({ id, username }) => (
            <li key={id}>
              {username} ({id})
            </li>
          ))
        }
      </ul>

      <div>
        <a href="/users/new">Add a user</a>
      </div>
    </main>
  )
}
