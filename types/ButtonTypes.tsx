export type ButtonType = {
  label: string;
  id?: string;
  type: "primary" | "secondary" | "tertiary" | "outline";
  disabled?: boolean;
  clickHandler: () => void;
};
