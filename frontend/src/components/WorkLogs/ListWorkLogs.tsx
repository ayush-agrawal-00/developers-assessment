import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Checkbox } from '../ui/checkbox'
import WorkLogDetail from './WorkLogDetail'

interface ListWorkLogsProps {
    selectedWorklogs: string[]
    filteredWorklogs: any[]
    toggleSelect: (id: string) => void
    toggleSelectAll: () => void
    timeEntries: any[]
    freelancers: any[]
}

function ListWorkLogs({ selectedWorklogs, filteredWorklogs, toggleSelect, toggleSelectAll, timeEntries, freelancers }: ListWorkLogsProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={
                                    selectedWorklogs.length === filteredWorklogs.length &&
                                    filteredWorklogs.length > 0
                                }
                                onCheckedChange={toggleSelectAll}
                            />
                        </TableHead>
                        <TableHead>Task Name</TableHead>
                        <TableHead>Freelancer</TableHead>
                        <TableHead>Date Range</TableHead>
                        <TableHead className="text-right">Earnings</TableHead>
                        <TableHead className="w-[100px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredWorklogs.map((wl) => (
                        <TableRow key={wl.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedWorklogs.includes(wl.id)}
                                    onCheckedChange={() => toggleSelect(wl.id)}
                                />
                            </TableCell>
                            <TableCell className="font-medium">{wl.taskName}</TableCell>
                            <TableCell>
                                {freelancers.find((f) => f.id === wl.freelancerId)?.name}
                            </TableCell>
                            <TableCell className="text-muted-foreground font-mono text-xs">
                                {wl.dateRange}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                ${wl.totalEarnings}
                            </TableCell>
                            <TableCell>
                                {(() => {
                                    const freelancerName = freelancers.find((f) => f.id === wl.freelancerId)?.name || 'Unknown'
                                    return <WorkLogDetail wl={wl} timeEntries={timeEntries} freelancerName={freelancerName} />
                                })()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ListWorkLogs