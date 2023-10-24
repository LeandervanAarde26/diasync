import { bloodSugarEntryType } from "./BloodSugarEntryType";

export type ReadingGroupType = {
    date: string;
    average: string;
    testAmount: number;
    tests: bloodSugarEntryType[];
  };