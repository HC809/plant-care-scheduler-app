'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useAxiosMutation } from '@/hooks/use-axios-mutation';
import ErrorMessage from '../error-message';
import { CreatePlant, Plant } from '@/types/Plant';
import { plantSchema } from '@/lib/plants/plant-schema';
import { ReloadIcon } from '@radix-ui/react-icons';

type PlantFormValues = z.infer<typeof plantSchema>;

interface FormProps {
    isOpen: boolean;
    onClose: () => void;
    onPlantAdded: () => void;
}

export default function PlantForm({ isOpen, onClose, onPlantAdded }: FormProps) {
    const { mutate, isLoading: isSubmitting, error: submitError } = useAxiosMutation<Plant>();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<PlantFormValues>({
        resolver: zodResolver(plantSchema),
        defaultValues: {},
    });

    const onSubmit = async (data: PlantFormValues) => {
        const newPlant: CreatePlant = data;
        await mutate('POST', '/plants', newPlant);
        reset();
        onPlantAdded();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent
                className="max-w-4xl"
                onEscapeKeyDown={(event) => event.preventDefault()}
                onPointerDownOutside={(event) => event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Add New Plant</DialogTitle>
                    <DialogDescription>
                        Enter the new plant information
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register('name')} />
                            <ErrorMessage error={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="type">Type</Label>
                            <Controller
                                name="type"
                                control={control}
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Succulent">Succulent</SelectItem>
                                            <SelectItem value="Tropical">Tropical</SelectItem>
                                            <SelectItem value="Herb">Herb</SelectItem>
                                            <SelectItem value="Cacti">Cacti</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorMessage error={errors.type} />
                        </div>
                        <div>
                            <Label htmlFor="wateringFrequencyDays">Watering Frequency Days</Label>
                            <Input id="wateringFrequencyDays" type='number'  {...register('wateringFrequencyDays', { valueAsNumber: true })} />
                            <ErrorMessage error={errors.wateringFrequencyDays} />
                        </div>
                        <div>
                            <Label htmlFor="lastWateredDate">Last Watered Date</Label>
                            <Input
                                id="lastWateredDate"
                                type="date"
                                {...register('lastWateredDate', { required: 'Last watered date is required' })}
                            />
                            <ErrorMessage error={errors.lastWateredDate} />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" {...register('location')} />
                            <ErrorMessage error={errors.location} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={isSubmitting} 
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting} 
                        >
                            {isSubmitting ? (
                                <ReloadIcon className="animate-spin mr-2 h-4 w-4" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
                {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
            </DialogContent>
        </Dialog>
    );
};
