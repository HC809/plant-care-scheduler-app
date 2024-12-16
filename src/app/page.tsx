'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useAxiosData } from '@/hooks/use-axios-data';
import { Plant } from '@/types/Plant';
import TableSkeleton from '@/components/table-skeleton';
import { DataTable } from './data-table';
import { columns } from './columns';
import ErrorAlert from '@/components/error-alert';
import PlantForm from '@/components/plants/plant-form';

export default function Home() {
  const { data: plants, isLoading, error, hasFetched, fetchData } = useAxiosData<Plant[]>();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchData('/plants');
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

  if (hasFetched && (!plants || plants.length === 0) && !isLoading) {
    return <div>No plants available.</div>;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  const handleCreate = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handlePlantAdded = () => {
    fetchData('/plants');
    setIsFormOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Plants</h1>
        <Button onClick={handleCreate}>Add New Plant</Button>
      </div>
      {plants && <DataTable columns={columns({ fetchData: () => fetchData('/plants') })} data={plants} />}

      {isFormOpen && (
        <PlantForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onPlantAdded={handlePlantAdded}
        />
      )}
    </div>
  );
}
