import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { freelancers, timeEntries, worklogs } from "@/mockData"
import ListWorkLogs from "@/components/WorkLogs/ListWorkLogs"
import PaymentReviewDialog from "@/components/WorkLogs/PaymentReviewDialog"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_layout/worklogs")({
    component: WorklogsPage,
})

function WorklogsPage() {
    const [selectedWorklogs, setSelectedWorklogs] = useState<string[]>([])
    const [filter, setFilter] = useState<string>("all")
    const [isReviewOpen, setIsReviewOpen] = useState(false)

    // Calculate total earnings for each worklog from time entries
    const enrichedWorklogs = useMemo(() => {
        return worklogs.map((wl) => {
            const entries = timeEntries.filter((e) => e.worklogId === wl.id)
            const total = entries.reduce((acc, curr) => acc + curr.amount, 0)
            return { ...wl, totalEarnings: total }
        })
    }, [])

    const filteredWorklogs = useMemo(() => {
        if (filter === "all") return enrichedWorklogs
        // Simple mock filter logic based on date range string for demonstration
        if (filter === "march-early")
            return enrichedWorklogs.filter(
                (wl) =>
                    wl.dateRange.includes("2024-03-01") ||
                    wl.dateRange.includes("2024-03-05"),
            )
        if (filter === "march-late")
            return enrichedWorklogs.filter((wl) =>
                wl.dateRange.includes("2024-03-10"),
            )
        return enrichedWorklogs
    }, [filter, enrichedWorklogs])

    const toggleSelect = (id: string) => {
        setSelectedWorklogs((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )
    }

    const toggleSelectAll = () => {
        if (selectedWorklogs.length === filteredWorklogs.length) {
            setSelectedWorklogs([])
        } else {
            setSelectedWorklogs(filteredWorklogs.map((wl) => wl.id))
        }
    }

    const selectedTotal = useMemo(() => {
        return enrichedWorklogs
            .filter((wl) => selectedWorklogs.includes(wl.id))
            .reduce((acc, curr) => acc + (curr.totalEarnings || 0), 0)
    }, [selectedWorklogs, enrichedWorklogs])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        WorkLog Payments
                    </h1>
                    <p className="text-muted-foreground">
                        Review and process freelancer payments
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedWorklogs([])}
                        disabled={selectedWorklogs.length === 0}
                    >
                        Clear Selection
                    </Button>
                    <Button
                        onClick={() => setIsReviewOpen(true)}
                        disabled={selectedWorklogs.length === 0}
                    >
                        Review Batch ({selectedWorklogs.length})
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">Filter by Period:</div>
                <Tabs value={filter} onValueChange={setFilter} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all">All Time</TabsTrigger>
                        <TabsTrigger value="march-early">Early March</TabsTrigger>
                        <TabsTrigger value="march-late">Late March</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <ListWorkLogs
                selectedWorklogs={selectedWorklogs}
                filteredWorklogs={filteredWorklogs}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                timeEntries={timeEntries}
                freelancers={freelancers}
            />

            {/* Payment Review Dialog */}
            <PaymentReviewDialog
                isReviewOpen={isReviewOpen}
                setIsReviewOpen={setIsReviewOpen}
                selectedWorklogs={selectedWorklogs}
                selectedTotal={selectedTotal}
                enrichedWorklogs={enrichedWorklogs}
                freelancers={freelancers}
                toggleSelect={toggleSelect}
                setSelectedWorklogs={setSelectedWorklogs}
            />
        </div>
    )
}
