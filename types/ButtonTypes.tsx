
export type ButtonType = {
    label: string;
    id?: string;
    type: "primary" | 'secondary' | 'tertiary',
    disabled?: boolean;
    clickHandler: () => void;
  };
  
  // ButtonClasses.ts

  