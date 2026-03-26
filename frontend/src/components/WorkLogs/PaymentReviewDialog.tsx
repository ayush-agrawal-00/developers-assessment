import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'

interface PaymentReviewDialogProps {
    isReviewOpen: boolean
    setIsReviewOpen: (open: boolean) => void
    selectedWorklogs: string[]
    selectedTotal: number
    enrichedWorklogs: any[]
    freelancers: any[]
    toggleSelect: (id: string) => void
    setSelectedWorklogs: (worklogs: string[]) => void
}

function PaymentReviewDialog({ isReviewOpen, setIsReviewOpen, selectedWorklogs, selectedTotal, enrichedWorklogs, freelancers, toggleSelect, setSelectedWorklogs }: PaymentReviewDialogProps) {
    return (
        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Review Payment Batch</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 overflow-hidden flex-1 px-6 pb-6">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg shrink-0">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Payout</p>
                            <p className="text-3xl font-bold">${selectedTotal}</p>
                        </div>
                        <Badge variant="outline" className="text-sm px-4 py-1">
                            {selectedWorklogs.length} Worklogs Included
                        </Badge>
                    </div>

                    <div className="border rounded-md overflow-auto flex-1 min-h-[200px]">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Task Name</TableHead>
                                    <TableHead>Freelancer</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="w-[80px]" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {enrichedWorklogs
                                    .filter((wl) => selectedWorklogs.includes(wl.id))
                                    .map((wl) => (
                                        <TableRow key={wl.id}>
                                            <TableCell>{wl.taskName}</TableCell>
                                            <TableCell>
                                                {
                                                    freelancers.find((f) => f.id === wl.freelancerId)
                                                        ?.name
                                                }
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                ${wl.totalEarnings}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => toggleSelect(wl.id)}
                                                >
                                                    Exclude
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end gap-3 shrink-0">
                        <Button variant="outline" onClick={() => setIsReviewOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                alert("Payment Confirmed!")
                                setIsReviewOpen(false)
                                setSelectedWorklogs([])
                            }}
                        >
                            Confirm Payout
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PaymentReviewDialog