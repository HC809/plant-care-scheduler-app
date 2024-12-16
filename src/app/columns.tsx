"use client";

import { Plant, RegisterWatering } from "@/types/Plant";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Droplet } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAxiosMutation } from "@/hooks/use-axios-mutation";
import { toast } from "sonner"
import { useEffect } from "react";

interface ColumnsProps {
    fetchData: () => void;
  }

  export const columns = ({ fetchData }: ColumnsProps): ColumnDef<Plant>[] => [
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
        cell: ({ row }) => {
            const date = row.original.lastWateredDate;
            if (!date) return "N/A";

            return format(new Date(date), "yyyy-MM-dd");
        },
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
        cell: ({ row }) => {
            const date = row.original.nextWateringDate;
            if (!date) return "N/A";

            return format(new Date(date), "yyyy-MM-dd");
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { mutate, isLoading: isSubmitting, error: submitError } = useAxiosMutation<RegisterWatering>();
            const plantId = row.original.id;

            const handleWatering = async () => {
                try {
                    const newWatering: RegisterWatering = { plantId };
                    const response = await mutate('POST', '/watering', newWatering);

                    if (response) {
                        fetchData();
                        toast.success("Watering registered successfully!", {
                            style: {
                                backgroundColor: "rgb(16, 185, 129)", 
                                color: "white",
                            },
                        });
                    }
                } catch (error) {
                    console.error("Error during watering registration:", error);
                }
            };
            
            useEffect(() => {
                if (submitError) {
                    toast.error(`${submitError || "Unexpected error"}`, {
                        style: {
                            backgroundColor: "rgb(239, 68, 68)", 
                            color: "white",
                        },
                    });
                }
            }, [submitError]);

            return (
                <div className="flex flex-col gap-2">
                    <Button
                        size={"sm"}
                        variant="outline"
                        onClick={handleWatering}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <span>Watering...</span>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <>
                                <Droplet className="w-4 h-4 text-blue-500 ml-2" />
                                Water Plant
                            </>
                        )}
                    </Button>
                  
                </div>
            );
        },
    },

];
