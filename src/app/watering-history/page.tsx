"use client";

import ErrorAlert from "@/components/error-alert";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { useAxiosData } from "@/hooks/use-axios-data";
import { WateringHistory } from "@/types/WateringHistory";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export default function WateringHistoryPage() {
    const { data: wateringHistory, isLoading, error, hasFetched, fetchData } = useAxiosData<WateringHistory[]>();

    useEffect(() => {
        if (!hasFetched) {
            fetchData('/watering');
        }
    }, [hasFetched, fetchData]);

    if (error) {
        return (
            <div>
                <ErrorAlert error={error} />
                <Button
                    onClick={() => {
                        fetchData('/plants');
                    }}
                    className="mt-2"
                >
                    <ReloadIcon className="mr-2 h-4 w-4" /> Retry
                </Button>
            </div>
        );
    }

    if (hasFetched && (!wateringHistory || wateringHistory.length === 0) && !isLoading) {
        return <div>No watering history available.</div>;
    }

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Watering History</h1>
            </div>
            {wateringHistory && <DataTable columns={columns} data={wateringHistory} />}         
        </div>
    );
}