'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useAxiosData } from '@/hooks/use-axios-data';
import { Plant } from '@/types/Plant';
import TableSkeleton from '@/components/table-skeleton';
import { DataTable } from './data-table';
import { columns } from './columns';
import ErrorAlert from '@/components/error-alert';

export default function Home() {
  const { data: plants, isLoading, error, hasFetched, fetchData } = useAxiosData<Plant[]>();

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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Plants</h1>
        <Button asChild>
          <a href="/dashboard/plants/new">New</a>
        </Button>
      </div>
      {plants && <DataTable columns={columns} data={plants} />}
    </div>
  );
}
