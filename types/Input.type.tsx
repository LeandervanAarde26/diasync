export type InputType = {
  width: string;
  label: string;
  icon?: any;
  placeholder: string;
  type: string;
  err: boolean;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value?: string | number;
};
