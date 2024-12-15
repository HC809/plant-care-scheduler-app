
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    columnWidths?: string[];
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5, 
    columns = 8, 
}) => {
    return (
        <div className="space-y-4"> 
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-4"> 
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className="h-6 w-48 bg-gray-200 rounded-md" 
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
