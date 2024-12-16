"use client";

import { WateringHistory } from "@/types/WateringHistory";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";


export const columns: ColumnDef<WateringHistory>[] = [
    {
        accessorKey: "plantName",
        header: "Plant",
    },
    {
        accessorKey: "plantType",
        header: "Type",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "wateringDate",
        header: "Watered Date",
        cell: ({ row }) => {
            const date = row.original.wateringDate;
            if (!date) return "N/A";

            return format(new Date(date), "yyyy-MM-dd");
        },
    }
];
