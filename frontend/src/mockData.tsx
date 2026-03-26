export interface Freelancer {
    id: string
    name: string
    email: string
}

export interface TimeEntry {
    id: string
    worklogId: string
    date: string
    description: string
    hours: number
    rate: number
    amount: number
}

export interface WorkLog {
    id: string
    taskId: string
    freelancerId: string
    taskName: string
    status: "PENDING" | "PAID" | "REJECTED"
    dateRange: string
    totalEarnings?: number
}

export const freelancers: Freelancer[] = [
    { id: "f1", name: "Alice Freeman", email: "alice@example.com" },
    { id: "f2", name: "Bob Worker", email: "bob@example.com" },
    { id: "f3", name: "Charlie Dev", email: "charlie@example.com" },
    { id: "f4", name: "David Lee", email: "david@example.com" },
    { id: "f5", name: "Eve Martinez", email: "eve@example.com" },
    { id: "f6", name: "Frank Wilson", email: "frank@example.com" },
    { id: "f7", name: "Grace Taylor", email: "grace@example.com" },
    { id: "f8", name: "Henry Anderson", email: "henry@example.com" },
    { id: "f9", name: "Ivy Thomas", email: "ivy@example.com" },
    { id: "f10", name: "Jack Jackson", email: "jack@example.com" },
]

export const worklogs: WorkLog[] = [
    {
        id: "w1",
        taskId: "t1",
        freelancerId: "f1",
        taskName: "UI Refactor",
        status: "PENDING",
        dateRange: "2024-03-01 to 2024-03-15",
    },
    {
        id: "w2",
        taskId: "t2",
        freelancerId: "f2",
        taskName: "Database Migration",
        status: "PENDING",
        dateRange: "2024-03-05 to 2024-03-20",
    },
    {
        id: "w3",
        taskId: "t3",
        freelancerId: "f3",
        taskName: "API Documentation",
        status: "PENDING",
        dateRange: "2024-03-10 to 2024-03-25",
    },
]

export const timeEntries: TimeEntry[] = [
    {
        id: "e1",
        worklogId: "w1",
        date: "2024-03-02T09:00:00.000Z",
        description: "Header implementation",
        hours: 4,
        rate: 50,
        amount: 200,
    },
    {
        id: "e2",
        worklogId: "w1",
        date: "2024-03-03T10:00:00.000Z",
        description: "Footer implementation",
        hours: 4,
        rate: 50,
        amount: 200,
    },
    {
        id: "e3",
        worklogId: "w2",
        date: "2024-03-06T08:30:00.000Z",
        description: "Schema design",
        hours: 6,
        rate: 60,
        amount: 360,
    },
    {
        id: "e4",
        worklogId: "w2",
        date: "2024-03-07T09:15:00.000Z",
        description: "Data cleanup",
        hours: 4,
        rate: 60,
        amount: 240,
    },
    {
        id: "e5",
        worklogId: "w3",
        date: "2024-03-11T11:00:00.000Z",
        description: "Swagger setup",
        hours: 5,
        rate: 45,
        amount: 225,
    },
]