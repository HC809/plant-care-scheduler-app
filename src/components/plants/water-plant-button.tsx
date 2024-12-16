"use client";

import { Button } from "@/components/ui/button";
import { useAxiosMutation } from "@/hooks/use-axios-mutation";
import { RegisterWatering } from "@/types/Plant";
import { Droplet } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface ActionButtonProps {
    plantId: string;
    fetchData: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ plantId, fetchData }) => {
    const { mutate, isLoading: isSubmitting, error: submitError } = useAxiosMutation<RegisterWatering>();

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
};

export default ActionButton;
