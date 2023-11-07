type InformationType = {
  heading: string;
  icon?: any;
  unit: string;
  information: string | number;
};

export default function RightBarInformation({heading, icon, unit, information}: InformationType) {
  return (
    <div className="h-[60px]">
      <div className="flex flex-row items-center justify-center ">
        {icon}
        <span className="text-csblack text-lg text-center">{heading}</span>
      </div>
      <p className="text-csblue text-lg text-center">
        <b>{information}{unit}</b>
      </p>
    </div>
  );
}

