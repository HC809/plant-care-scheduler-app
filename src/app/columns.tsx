"use client"

import { Plant } from "@/types/Plant"
import { ColumnDef } from "@tanstack/react-table"

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
]
