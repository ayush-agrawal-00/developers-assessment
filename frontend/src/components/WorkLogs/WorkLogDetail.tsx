import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

interface WorkLogDetailProps {
    wl: any
    timeEntries: any[]
    freelancerName: string
}
function WorkLogDetail({ wl, timeEntries, freelancerName }: WorkLogDetailProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Time Entries: {freelancerName}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date (UTC)</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Hours
                                </TableHead>
                                <TableHead className="text-right">Rate</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {timeEntries
                                .filter((e) => e.worklogId === wl.id)
                                .map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell className="font-mono text-xs">
                                            {entry.date}
                                        </TableCell>
                                        <TableCell>{entry.description}</TableCell>
                                        <TableCell className="text-right">
                                            {entry.hours}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${entry.rate}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            ${entry.amount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default WorkLogDetail