export interface User {
  slug: string;
  userName: string;
  targetName: string;
}

// Statische Datenstruktur für alle Teilnehmer
export const users: User[] = [
  { slug: 'alice', userName: 'Alice', targetName: 'Bob' },
  { slug: 'bob', userName: 'Bob', targetName: 'Charlie' },
  { slug: 'charlie', userName: 'Charlie', targetName: 'Diana' },
  { slug: 'diana', userName: 'Diana', targetName: 'Eve' },
  { slug: 'eve', userName: 'Eve', targetName: 'Frank' },
  { slug: 'frank', userName: 'Frank', targetName: 'Grace' },
  { slug: 'grace', userName: 'Grace', targetName: 'Henry' },
  { slug: 'henry', userName: 'Henry', targetName: 'Alice' },
  // Weitere User können hier hinzugefügt werden
];

export function getUserBySlug(slug: string): User | undefined {
  return users.find(user => user.slug === slug);
}

