export interface Plant {
    id:                    string;
    name:                  string;
    type:                  string;
    wateringFrequencyDays: number;
    lastWateredDate:       string;
    location:              string;
    daysUntilNextWatering: number;
    status:                string;
    nextWateringDate:      string;
}

export interface CreatePlant {
    name:                  string;
    type:                  string;
    wateringFrequencyDays: number;
    lastWateredDate:       string;
    location:              string;
}

export interface RegisterWatering {
    plantId:               string;
}