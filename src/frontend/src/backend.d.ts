import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface MatchCredentials {
    roomPassword: string;
    roomId: string;
}
export interface ResultInput {
    username: string;
    userId: UserId;
    rank: bigint;
    prize: bigint;
    kills: bigint;
}
export type Timestamp = bigint;
export interface UserPublic {
    id: UserId;
    status: UserStatus;
    contact: string;
    username: string;
    createdAt: Timestamp;
    walletBalance: bigint;
    ffUid: string;
}
export interface PaymentPublic {
    id: PaymentId;
    status: PaymentStatus;
    userId: UserId;
    createdAt: Timestamp;
    matchId: MatchId;
    utrNumber: string;
    screenshot: ExternalBlob;
}
export type ResultId = string;
export type MatchId = string;
export type UserId = string;
export interface CreateMatchInput {
    scheduledTime: Timestamp;
    name: string;
    roomPassword: string;
    entryFee: bigint;
    roomId: string;
    prizePool: bigint;
}
export interface Result {
    id: ResultId;
    username: string;
    userId: UserId;
    rank: bigint;
    matchId: MatchId;
    prize: bigint;
    kills: bigint;
}
export interface UpdateProfileInput {
    username?: string;
    password?: string;
    ffUid?: string;
}
export type PaymentId = string;
export interface SubmitPaymentInput {
    matchId: MatchId;
    utrNumber: string;
    screenshot: ExternalBlob;
}
export interface RegisterInput {
    contact: string;
    username: string;
    password: string;
    ffUid: string;
}
export interface MatchPublic {
    id: MatchId;
    status: MatchStatus;
    scheduledTime: Timestamp;
    name: string;
    createdAt: Timestamp;
    playerCount: bigint;
    entryFee: bigint;
    prizePool: bigint;
}
export interface UpdateMatchInput {
    scheduledTime?: Timestamp;
    name?: string;
    roomPassword?: string;
    entryFee?: bigint;
    roomId?: string;
    prizePool?: bigint;
}
export enum MatchStatus {
    closed = "closed",
    open = "open",
    completed = "completed"
}
export enum PaymentStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserStatus {
    active = "active",
    suspended = "suspended"
}
export interface backendInterface {
    approvePayment(paymentId: PaymentId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    closeMatch(matchId: MatchId): Promise<void>;
    createMatch(input: CreateMatchInput): Promise<MatchPublic>;
    deleteMatch(matchId: MatchId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getMatch(matchId: MatchId): Promise<MatchPublic | null>;
    getMatchPlayers(matchId: MatchId): Promise<Array<UserId>>;
    getMatchResults(matchId: MatchId): Promise<Array<Result>>;
    getMyPayments(): Promise<Array<PaymentPublic>>;
    getMyProfile(): Promise<UserPublic | null>;
    getRoomCredentials(matchId: MatchId): Promise<MatchCredentials>;
    getUserById(userId: UserId): Promise<UserPublic | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllPayments(): Promise<Array<PaymentPublic>>;
    listMatches(): Promise<Array<MatchPublic>>;
    listPaymentsByMatch(matchId: MatchId): Promise<Array<PaymentPublic>>;
    listUsers(): Promise<Array<UserPublic>>;
    loginUser(identifier: string, password: string): Promise<UserPublic | null>;
    register(input: RegisterInput): Promise<UserPublic>;
    rejectPayment(paymentId: PaymentId): Promise<void>;
    submitPayment(input: SubmitPaymentInput): Promise<PaymentPublic>;
    suspendUser(userId: UserId): Promise<void>;
    unsuspendUser(userId: UserId): Promise<void>;
    updateMatch(matchId: MatchId, input: UpdateMatchInput): Promise<MatchPublic>;
    updateMyProfile(input: UpdateProfileInput): Promise<UserPublic>;
    uploadResults(matchId: MatchId, entries: Array<ResultInput>): Promise<Array<Result>>;
}
