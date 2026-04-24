export type MatchStatus = "open" | "closed" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "approved" | "rejected";
export type UserStatus = "active" | "suspended";

export interface User {
  id: string;
  username: string;
  contact: string; // email or phone
  ffUid: string;
  status: UserStatus;
  isAdmin: boolean;
  createdAt: string;
  walletBalance: number;
}

export interface Match {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  scheduledAt: string;
  status: MatchStatus;
  playerCount: number;
  maxPlayers: number;
  roomId?: string;
  roomPassword?: string;
  map: string;
  gameMode: string;
}

export interface Payment {
  id: string;
  matchId: string;
  matchName: string;
  userId: string;
  username: string;
  utrNumber: string;
  screenshotUrl: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  reviewedAt?: string;
}

export interface Result {
  id: string;
  matchId: string;
  matchName: string;
  userId: string;
  username: string;
  rank: number;
  kills: number;
  prize: number;
}

export interface MatchCredentials {
  roomId: string;
  roomPassword: string;
}

export interface ProfileUpdatePayload {
  username: string;
  ffUid: string;
}
