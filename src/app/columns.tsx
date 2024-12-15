"use client";

import { Plant } from "@/types/Plant";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge"; // Asegúrate de importar el componente Badge
import { Droplet } from "lucide-react"; // Usa un ícono como Droplet de lucide-react

export const columns: ColumnDef<Plant>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "wateringFrequencyDays",
        header: "Watering Frequency Days",
    },
    {
        accessorKey: "lastWateredDate",
        header: "Last Watered Date",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "daysUntilNextWatering",
        header: "Days Until Next Watering",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            const getBadgeProps = (status: string) => {
                switch (status) {
                    case "Overdue":
                        return {
                            color: "text-red-500 bg-red-100",
                            icon: <Droplet className="w-4 h-4 text-red-500 ml-2" />,
                        };
                    case "Due Soon":
                        return {
                            color: "text-orange-500 bg-orange-100",
                            icon: null,
                        };
                    case "OK":
                        return {
                            color: "text-green-500 bg-green-100",
                            icon: null,
                        };
                    default:
                        return {
                            color: "text-gray-500 bg-gray-100",
                            icon: null,
                        };
                }
            };

            const { color, icon } = getBadgeProps(status);

            return (
                <div className="flex items-center">
                    <Badge className={`px-2 py-1 rounded-md ${color}`}>
                        {status}
                    </Badge>
                    {icon}
                </div>
            );
        },
    },
    {
        accessorKey: "nextWateringDate",
        header: "Next Watering Date",
    },
];
